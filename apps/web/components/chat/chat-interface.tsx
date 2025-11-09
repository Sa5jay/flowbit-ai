'use client';

import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, User, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the shape of a message
type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function ChatInterface() {
  // State for the user's current input
  const [input, setInput] = React.useState('');
  
  // State for the list of messages in the chat
  const [messages, setMessages] = React.useState<Message[]>([
    // Start with a welcome message from the assistant
    {
      role: 'assistant',
      content: "Hello! Ask me anything about your invoices, like 'What's the total spend last month?' or 'Show me overdue invoices'.",
    },
  ]);

  // Ref for the message container to auto-scroll
  const messageContainerRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when messages change
  React.useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle the form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // 1. Add the user's message to the state
    const userMessage: Message = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // 2. Clear the input field
    setInput('');

    // 3. (TODO) Send the message to the backend API (Vanna)
    // We will add this logic in the next step.
    
    // 4. (Mock) For now, let's just add a mock assistant response
    // We will replace this with the real API call.
    setTimeout(() => {
      const mockResponse: Message = {
        role: 'assistant',
        content: `You asked: "${input}". I am still a mock response.`,
      };
      setMessages((prevMessages) => [...prevMessages, mockResponse]);
    }, 1000);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Message List */}
      <div
        ref={messageContainerRef}
        className="flex-1 space-y-4 overflow-y-auto p-4 md:p-6"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              'flex items-start gap-3',
              message.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            {/* Avatar */}
            {message.role === 'assistant' && (
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            )}

            {/* Message Bubble */}
            <div
              className={cn(
                'max-w-[75%] rounded-lg p-3 text-sm',
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              )}
            >
              {message.content}
            </div>

            {/* Avatar */}
            {message.role === 'user' && (
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </div>

      {/* Input Form */}
      <div className="border-t p-4 md:p-6">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}