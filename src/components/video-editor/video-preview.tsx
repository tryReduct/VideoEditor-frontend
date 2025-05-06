"use client"

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Volume2, Volume1, VolumeX, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function VideoPreview() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };
  
  const VolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX className="w-4 h-4" />;
    if (volume < 50) return <Volume1 className="w-4 h-4" />;
    return <Volume2 className="w-4 h-4" />;
  };
  
  return (
    <div 
      className="flex-1 relative overflow-hidden"
      ref={containerRef}
    >
      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
        <div className="w-full h-full max-w-[90%] max-h-[90%] relative">
          {/* Video Placeholder */}
          <div className="w-full h-full bg-black/60 rounded-md overflow-hidden backdrop-blur-sm flex items-center justify-center">
            <p className="text-muted-foreground text-sm">No media selected</p>
          </div>
          
          {/* Video Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex flex-col space-y-2">
              {/* Seek Slider */}
              <Slider
                defaultValue={[0]}
                max={100}
                step={1}
                className="w-full"
              />
              
              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white"
                    onClick={togglePlay}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  
                  <div className="flex items-center space-x-2 ml-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white"
                      onClick={toggleMute}
                    >
                      <VolumeIcon />
                    </Button>
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      max={100}
                      step={1}
                      className="w-20"
                      onValueChange={(value) => {
                        setVolume(value[0]);
                        if (value[0] > 0 && isMuted) setIsMuted(false);
                      }}
                    />
                  </div>
                  
                  <span className="text-xs text-white ml-2">00:00 / 00:00</span>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white"
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}