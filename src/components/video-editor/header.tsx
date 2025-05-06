"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Film, Save, Undo, Redo, Download, Share2, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onToggleChat: () => void;
  showChat: boolean;
}

export default function Header({ onToggleChat, showChat }: HeaderProps) {
  const [projectName, setProjectName] = useState("Untitled Project");
  const [isEditing, setIsEditing] = useState(false);
  
  const handleTitleClick = () => {
    setIsEditing(true);
  };
  
  const handleTitleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsEditing(false);
    if (e.target.value.trim()) {
      setProjectName(e.target.value);
    }
  };
  
  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      if (e.currentTarget.value.trim()) {
        setProjectName(e.currentTarget.value);
      }
    }
  };
  
  return (
    <header className="h-16 border-b border-border/40 backdrop-blur-xl bg-black/30 flex items-center px-4 z-10">
      <div className="flex items-center">
        <Film className="w-6 h-6 text-primary mr-2" />
        <div className="pr-4 mr-4 border-r border-border/40">
          {isEditing ? (
            <input
              type="text"
              className="bg-transparent border-b border-primary/50 focus:border-primary outline-none px-1 text-lg font-semibold"
              defaultValue={projectName}
              autoFocus
              onBlur={handleTitleBlur}
              onKeyDown={handleTitleKeyDown}
            />
          ) : (
            <h1 
              className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors"
              onClick={handleTitleClick}
            >
              {projectName}
            </h1>
          )}
        </div>
      </div>
      
      <div className="flex space-x-2">
        <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full">
          <Undo className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full">
          <Redo className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex-1" />
      
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm" className="bg-secondary/80 backdrop-blur-md">
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        <Button variant="secondary" size="sm" className="bg-secondary/80 backdrop-blur-md">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
        <Button variant="secondary" size="sm" className="bg-secondary/80 backdrop-blur-md">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
        <Button 
          variant={showChat ? "default" : "ghost"} 
          size="icon" 
          className={cn(
            "ml-2 w-9 h-9 rounded-full",
            showChat && "bg-primary text-primary-foreground"
          )}
          onClick={onToggleChat}
        >
          <MessageSquare className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}