"use client"

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import {
  X,
  Send,
  Bot,
  User,
  Info,
  Film,
  Code,
  Image,
  Video,
  RefreshCcw,
  ChevronRight,
  ChevronDown,
  CornerDownLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sample chat history
const initialMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hello! I\'m your video editing assistant. How can I help you today?',
    timestamp: new Date(Date.now() - 60000),
  },
];

export default function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAssistantResponse(input),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Simple response logic for demo
  const getAssistantResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('how to') || lowerQuery.includes('help')) {
      return "To get started with editing, you can drag media from your library onto the timeline. Try using the AI prompt box to describe effects you'd like to apply to your clips.";
    }
    
    if (lowerQuery.includes('effect') || lowerQuery.includes('filter')) {
      return "You can create custom effects by using the prompt box. Try something like 'Apply a cinematic color grade with high contrast' or 'Create a dream-like glowing effect'.";
    }
    
    if (lowerQuery.includes('export') || lowerQuery.includes('save')) {
      return "To export your project, click the Export button in the top toolbar. You can choose from various formats and quality settings.";
    }
    
    return "I can help you edit your video more efficiently. Try asking about specific effects, editing techniques, or tools in the editor.";
  };
  
  return (
    <div
      className={cn(
        "fixed top-16 bottom-0 right-0 w-[350px] border-l border-border/40 bg-black/30 backdrop-blur-lg flex flex-col z-20 transition-transform duration-300",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-border/40 flex items-center justify-between">
        <div className="flex items-center">
          <Bot className="w-5 h-5 mr-2 text-primary" />
          <h3 className="font-medium text-sm">Editing Assistant</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full">
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={cn(
                "flex gap-3 text-sm",
                message.role === 'assistant' ? "items-start" : "items-start flex-row-reverse"
              )}
            >
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                  message.role === 'assistant' 
                    ? "bg-primary/20 text-primary" 
                    : "bg-secondary/20 text-secondary-foreground"
                )}
              >
                {message.role === 'assistant' ? (
                  <Bot className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </div>
              
              <div 
                className={cn(
                  "rounded-lg px-3 py-2 max-w-[85%]",
                  message.role === 'assistant' 
                    ? "bg-primary/10 border border-primary/20" 
                    : "bg-secondary/20 border border-secondary/20 ml-auto"
                )}
              >
                <p className="whitespace-pre-wrap break-words">{message.content}</p>
                <span className="text-[10px] text-muted-foreground mt-1 inline-block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 text-sm items-start">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/20 text-primary shrink-0">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-primary/10 border border-primary/20 rounded-lg px-3 py-2">
                <div className="flex space-x-1 items-center">
                  <div className="w-1.5 h-1.5 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* Suggested Queries */}
      <div className="px-4 py-2 border-t border-border/40">
        <h4 className="text-xs font-medium mb-2">Suggestions</h4>
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="h-auto py-1.5 justify-start text-xs bg-secondary/20 border-secondary/40"
            onClick={() => setInput('How do I add transitions?')}
          >
            <Video className="h-3 w-3 mr-1.5" />
            Add transitions
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="h-auto py-1.5 justify-start text-xs bg-secondary/20 border-secondary/40"
            onClick={() => setInput('Color correction tips')}
          >
            <Image className="h-3 w-3 mr-1.5" />
            Color correction
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="h-auto py-1.5 justify-start text-xs bg-secondary/20 border-secondary/40"
            onClick={() => setInput('How to export in 4K?')}
          >
            <Film className="h-3 w-3 mr-1.5" />
            Export in 4K
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="h-auto py-1.5 justify-start text-xs bg-secondary/20 border-secondary/40"
            onClick={() => setInput('Timeline keyboard shortcuts')}
          >
            <Code className="h-3 w-3 mr-1.5" />
            Keyboard shortcuts
          </Button>
        </div>
      </div>
      
      {/* Input Area */}
      <div className="p-4 border-t border-border/40">
        <div className="relative">
          <Textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about video editing..."
            className="min-h-[80px] resize-none pr-12 bg-background/60 backdrop-blur-lg border-border/50"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className="absolute right-2 bottom-2 h-8 w-8 p-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}