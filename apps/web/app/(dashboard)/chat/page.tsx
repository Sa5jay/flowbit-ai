import { ChatInterface } from '@/components/chat/chat-interface';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ChatPage() {
  return (
    // We'll wrap the chat in a Card to give it a nice container
    <Card className="h-full w-full max-w-3xl mx-auto flex flex-col">
      <CardHeader>
        <CardTitle>Chat with Data</CardTitle>
        <CardDescription>
          Ask questions about your data in natural language.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ChatInterface />
      </CardContent>
    </Card>
  );
}