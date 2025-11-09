import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv

# --- Import the main Vanna class ---
from vanna.vanna import Vanna

# --- 1. Load Environment Variables ---
load_dotenv()

# --- 2. Vanna AI Setup (The Correct Way) ---
# We tell Vanna to use Groq for the brain and a local ChromaDB file for memory
vn = Vanna(config={
    'model': 'groq/mixtral-8x7b-32768', 
    'vectorstore': 'vanna-v0' # This creates a local file
})
vn.set_api_key(api_key=os.getenv("GROQ_API_KEY"))

# --- 3. Connect Vanna to Your PostgreSQL Database ---
DB_URL = os.getenv("DATABASE_URL")
if not DB_URL:
    raise ValueError("DATABASE_URL environment variable not set.")

VANNA_DB_URL = DB_URL.replace("postgresql://", "postgresql+psycopg://")

try:
    vn.connect_to_postgres(url=VANNA_DB_URL)
    print("✅ Successfully connected to the database.")
except Exception as e:
    print(f"❌ FAILED to connect to database: {e}")
    exit(1)

# --- 4. Train Vanna on Your Schema ---
# This runs *every time the server starts*.
# It will save the training data to a local file.
print("⌛ Starting Vanna training (learning the schema)...")
vn.train(ddl="CREATE TABLE Invoice (id TEXT, invoiceNumber TEXT, amount NUMERIC, issuedAt TIMESTAMP, dueDate TIMESTAMP, status TEXT, vendorId TEXT, categoryId TEXT)")
vn.train(ddl="CREATE TABLE Vendor (id TEXT, name TEXT)")
vn.train(ddl="CREATE TABLE Category (id TEXT, name TEXT)")
vn.train(documentation="The 'Invoice' table contains all invoices.")
vn.train(documentation="The 'Vendor' table lists all company vendors.")
vn.train(documentation="The 'Category' table lists spending categories.")
print("✅ Vanna training complete.")

# --- 5. Create the FastAPI Server ---
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow our Vercel frontend to call this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class QueryRequest(BaseModel):
    question: str

# --- 6. Define the API Endpoint ---
@app.post("/api/ask")
async def ask_question(request: QueryRequest):
    print(f"Received question: {request.question}")
    try:
        sql = vn.generate_sql(question=request.question)
        print(f"Generated SQL: {sql}")
        df = vn.run_sql(sql=sql)
        return {"sql": sql, "result": df.to_json(orient="records")}
    except Exception as e:
        print(f"❌ Error asking question: {e}")
        return {"error": str(e)}

@app.get("/")
def read_root():
    return {"message": "Vanna AI Server with Groq is LIVE"}

# --- 7. Run the Server ---
if __name__ == "__main__":
    import uvicorn
    # Render will use this to start the server
    uvicorn.run(app, host="0.0.0.0", port=8000)