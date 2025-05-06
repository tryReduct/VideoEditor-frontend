"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Sparkles, Wand2, Settings, CornerUpLeft } from 'lucide-react';

// Sample prompt suggestions
const promptSuggestions = [
  'Add a cinematic color grade',
  'Create a slow-motion effect',
  'Apply film grain texture',
  'Add a subtle vignette',
  'Create an RGB split effect',
  'Apply a dream-like glow',
];

export default function PromptBox() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [recentPrompts, setRecentPrompts] = useState<string[]>([]);
  
  const handleSubmit = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsGenerating(false);
      setRecentPrompts([prompt, ...recentPrompts].slice(0, 5));
      setPrompt('');
    }, 2000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  return (
    <div className="h-full p-4">
      <div className="flex items-start gap-3 h-full">
        <div className="flex-1 flex flex-col h-full">
          <div className="relative flex-1">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe the effect or edit you want to apply..."
              className="min-h-[60px] h-full resize-none pr-24 bg-background/70 backdrop-blur-md border-border/50"
            />
            
            <div className="absolute right-2 bottom-2 flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Sparkles className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="top" className="w-80 p-2">
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-medium">Suggestions</h3>
                    <div className="grid grid-cols-2 gap-1.5">
                      {promptSuggestions.map((suggestion, i) => (
                        <Button
                          key={i}
                          variant="secondary"
                          size="sm"
                          className="h-auto py-1.5 px-3 justify-start text-xs"
                          onClick={() => setPrompt(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Settings className="h-4 w-4" />
              </Button>
              
              <Button 
                onClick={handleSubmit}
                disabled={!prompt.trim() || isGenerating}
                className="relative h-8 rounded-full"
              >
                {isGenerating ? 'Processing...' : 'Apply'}
                <Wand2 className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
          
          {recentPrompts.length > 0 && (
            <div className="mt-2 flex items-center gap-1.5 overflow-x-auto pb-1">
              <span className="text-xs text-muted-foreground shrink-0">Recent:</span>
              {recentPrompts.map((item, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs px-2.5 bg-secondary/40 backdrop-blur-sm border-border/50 flex items-center shrink-0"
                  onClick={() => setPrompt(item)}
                >
                  <span className="truncate max-w-[150px]">{item}</span>
                  <CornerUpLeft className="h-3 w-3 ml-1.5 opacity-70" />
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}