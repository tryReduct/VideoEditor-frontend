"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FolderOpen, 
  Upload, 
  Image, 
  Video, 
  Music, 
  File, 
  Plus,
  MoreVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MediaItem {
  id: string;
  name: string;
  type: 'video' | 'image' | 'audio';
  duration?: string;
  thumbnail?: string;
}

// Sample media items for demo
const demoMedia: MediaItem[] = [
  { 
    id: '1', 
    name: 'Beach Sunset', 
    type: 'video', 
    duration: '0:45',
    thumbnail: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  { 
    id: '2', 
    name: 'Mountain View', 
    type: 'image',
    thumbnail: 'https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  { 
    id: '3', 
    name: 'Background Music', 
    type: 'audio', 
    duration: '3:12' 
  },
  { 
    id: '4', 
    name: 'City Timelapse', 
    type: 'video', 
    duration: '1:22',
    thumbnail: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
];

export default function MediaImport() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  
  const filteredMedia = activeTab === 'all' 
    ? demoMedia 
    : demoMedia.filter(item => item.type === activeTab);
  
  const handleImport = () => {
    // This would trigger a file input dialog in a real implementation
    console.log('Import media');
  };
  
  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'image': return <Image className="w-4 h-4" />;
      case 'audio': return <Music className="w-4 h-4" />;
      default: return <File className="w-4 h-4" />;
    }
  };
  
  return (
    <div className="w-[320px] min-w-[320px] border-r border-border/40 bg-black/20 backdrop-blur-md overflow-hidden flex flex-col">
      <div className="p-4 border-b border-border/40">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium">Media Library</h2>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            onClick={handleImport}
            variant="secondary" 
            size="sm" 
            className="flex-1 bg-secondary/80 backdrop-blur-md"
          >
            <FolderOpen className="w-4 h-4 mr-2" />
            Browse
          </Button>
          <Button 
            onClick={handleImport}
            variant="default" 
            size="sm" 
            className="flex-1"
          >
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="border-b border-border/40 px-4">
          <TabsList className="bg-transparent h-10">
            <TabsTrigger 
              value="all" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
            >
              All
            </TabsTrigger>
            <TabsTrigger 
              value="video" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
            >
              Video
            </TabsTrigger>
            <TabsTrigger 
              value="image" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
            >
              Images
            </TabsTrigger>
            <TabsTrigger 
              value="audio" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
            >
              Audio
            </TabsTrigger>
          </TabsList>
        </div>
        
        <ScrollArea className="flex-1 px-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "group relative overflow-hidden rounded-md border border-border/40 cursor-pointer transition-all duration-200",
                  selectedItem === item.id ? "ring-2 ring-primary" : "hover:border-primary/50"
                )}
                onClick={() => setSelectedItem(item.id)}
              >
                {item.type !== 'audio' && item.thumbnail ? (
                  <div className="aspect-video relative">
                    <img 
                      src={item.thumbnail} 
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                    {item.type === 'video' && item.duration && (
                      <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                        {item.duration}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-black/50 text-white">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    {getMediaIcon(item.type)}
                  </div>
                )}
                
                <div className="p-2 bg-background/50 backdrop-blur-md">
                  <div className="flex items-center">
                    {getMediaIcon(item.type)}
                    <span className="text-xs ml-1 truncate">{item.name}</span>
                  </div>
                  {item.duration && <span className="text-xs text-muted-foreground">{item.duration}</span>}
                </div>
              </div>
            ))}
            
            {/* Import placeholder */}
            <div
              className="flex flex-col items-center justify-center border border-dashed border-border/60 rounded-md aspect-video p-4 hover:border-primary/50 cursor-pointer transition-colors"
              onClick={handleImport}
            >
              <Upload className="h-6 w-6 text-muted-foreground mb-2" />
              <span className="text-xs text-muted-foreground text-center">Import media</span>
            </div>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
}