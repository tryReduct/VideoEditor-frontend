"use client"

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import {
  ZoomIn,
  ZoomOut,
  Scissors,
  ChevronsUpDown,
  Plus,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample timeline tracks for demo
const demoTracks = [
  { id: '1', name: 'Video', type: 'video' },
  { id: '2', name: 'Audio', type: 'audio' },
  { id: '3', name: 'Effects', type: 'effects' },
];

// Sample timeline clips for demo
const demoClips = [
  { id: '1', trackId: '1', start: 0, end: 15, name: 'Beach Scene', color: 'bg-blue-600' },
  { id: '2', trackId: '1', start: 15, end: 25, name: 'Mountain View', color: 'bg-green-600' },
  { id: '3', trackId: '2', start: 0, end: 30, name: 'Background Music', color: 'bg-purple-600' },
  { id: '4', trackId: '3', start: 10, end: 20, name: 'Fade Transition', color: 'bg-amber-600' },
];

export default function Timeline() {
  const [zoom, setZoom] = useState(50);
  const [selectedClip, setSelectedClip] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Scale: how many pixels per second
  const timeScale = 10 + (zoom / 5);
  
  // Total timeline visible width
  const totalDuration = 60; // 60 seconds
  const timelineWidth = totalDuration * timeScale;
  
  const handleZoomChange = (value: number[]) => {
    setZoom(value[0]);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getClipStyle = (start: number, end: number) => {
    return {
      left: `${start * timeScale}px`,
      width: `${(end - start) * timeScale}px`,
    };
  };
  
  return (
    <div className="flex flex-col h-full bg-black/40 backdrop-blur-sm">
      {/* Timeline Controls */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/40">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Scissors className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <ZoomOut className="h-4 w-4 text-muted-foreground" />
          <Slider
            value={[zoom]}
            min={10}
            max={100}
            step={1}
            className="w-32"
            onValueChange={handleZoomChange}
          />
          <ZoomIn className="h-4 w-4 text-muted-foreground" />
        </div>
        
        <Button variant="ghost" size="sm" className="h-8 gap-1">
          <ChevronsUpDown className="h-3.5 w-3.5" />
          <span className="text-xs">Tracks</span>
        </Button>
      </div>
      
      {/* Timeline Content */}
      <div className="flex-1 flex min-h-0">
        {/* Track Labels */}
        <div className="w-[120px] min-w-[120px] border-r border-border/40 flex flex-col">
          <div className="h-8 border-b border-border/40 flex items-center px-3">
            <span className="text-xs font-medium">Tracks</span>
          </div>
          
          <ScrollArea className="flex-1">
            {demoTracks.map((track) => (
              <div 
                key={track.id}
                className="border-b border-border/40 h-16 px-3 flex items-center"
              >
                <span className="text-xs truncate">{track.name}</span>
              </div>
            ))}
            
            <div className="px-3 py-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-full justify-start text-xs text-muted-foreground"
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add Track
              </Button>
            </div>
          </ScrollArea>
        </div>
        
        {/* Timeline Tracks */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Time Ruler */}
          <div className="h-8 border-b border-border/40 relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full"
              style={{ width: `${timelineWidth}px` }}
            >
              {Array.from({ length: totalDuration + 1 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute top-0 h-full border-l border-border/40 flex items-center"
                  style={{ left: `${i * timeScale}px` }}
                >
                  <span className="text-[10px] text-muted-foreground ml-1">
                    {formatTime(i)}
                  </span>
                </div>
              ))}
              
              {/* Playhead */}
              <div className="absolute top-0 h-full border-l-2 border-primary z-10" style={{ left: '100px' }}>
                <div className="w-3 h-3 bg-primary transform -translate-x-1/2 rotate-45 absolute -top-1.5"></div>
              </div>
            </div>
          </div>
          
          {/* Tracks and Clips */}
          <ScrollArea className="flex-1">
            <div 
              className="relative"
              style={{ width: `${timelineWidth}px` }}
              ref={timelineRef}
            >
              {demoTracks.map((track) => (
                <div 
                  key={track.id}
                  className="border-b border-border/40 h-16 relative"
                >
                  {/* Clips in this track */}
                  {demoClips
                    .filter(clip => clip.trackId === track.id)
                    .map(clip => (
                      <div
                        key={clip.id}
                        className={cn(
                          "absolute top-2 h-12 rounded-md cursor-grab border border-white/10",
                          clip.color,
                          selectedClip === clip.id ? "ring-2 ring-white" : ""
                        )}
                        style={getClipStyle(clip.start, clip.end)}
                        onClick={() => setSelectedClip(clip.id)}
                      >
                        <div className="p-1 text-[10px] text-white font-medium truncate">
                          {clip.name}
                        </div>
                        
                        {/* Clip handles for resizing */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize" />
                        <div className="absolute right-0 top-0 bottom-0 w-1 cursor-ew-resize" />
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}