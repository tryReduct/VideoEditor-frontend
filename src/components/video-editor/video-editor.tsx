"use client"

import { useState } from 'react';
import Header from './header';
import VideoPreview from './video-preview';
import MediaImport from './media-import';
import Timeline from './timeline';
import PromptBox from './prompt-box';
import ChatPanel from './chat-panel';
import { cn } from '@/lib/utils';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function VideoEditor() {
  const [showChat, setShowChat] = useState(true);
  
  return (
    <div className="flex flex-col h-screen bg-background relative overflow-hidden">
      {/* Grunge Texture Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-10 mix-blend-overlay"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      />
      
      <Header onToggleChat={() => setShowChat(!showChat)} showChat={showChat} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Main Content Area */}
        <div className={cn(
          "flex flex-col flex-1 transition-all duration-300",
          showChat ? "pr-[350px]" : "pr-0"
        )}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={70}>
              <div className="flex flex-1 min-h-0">
                {/* Media Import Section (Left) */}
                <MediaImport />
                
                {/* Video Preview (Right) */}
                <VideoPreview />
              </div>
            </ResizablePanel>
            
            <ResizableHandle />
            
            <ResizablePanel defaultSize={30} minSize={20}>
              <div className="flex flex-col h-full border-t border-border/40 bg-black/20 backdrop-blur-md">
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel defaultSize={30} minSize={15}>
                    <PromptBox />
                  </ResizablePanel>
                  
                  <ResizableHandle />
                  
                  <ResizablePanel defaultSize={70}>
                    <Timeline />
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        
        {/* Chat Panel (Right Sidebar) */}
        <ChatPanel 
          isOpen={showChat} 
          onClose={() => setShowChat(false)} 
        />
      </div>
    </div>
  );
}