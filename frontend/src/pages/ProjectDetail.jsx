import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Download, Share2, Calendar, MapPin, Layers } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Slider } from '../components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { historicalSites } from '../mock';
import MonumentModel from '../components/MonumentModel';


const ProjectDetail = () => {
  const { id } = useParams();
  const site = historicalSites.find(s => s.id === parseInt(id));
  const [timelineProgress, setTimelineProgress] = useState(100);
  const [viewMode, setViewMode] = useState('before');


  if (!site) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Site not found</h2>
          <Link to="/explore">
            <Button>Back to Explore</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentStage = site.restorationStages.find(
    stage => stage.progress <= timelineProgress
  ) || site.restorationStages[0];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#1C1C1E]/50 to-transparent py-12 px-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <Link to="/explore">
            <Button variant="ghost" className="mb-6 hover:text-[#D4AF37]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Explore
            </Button>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#00BFA6] bg-clip-text text-transparent">
                  {site.name}
                </span>
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-[#D4AF37]" />
                  {site.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-[#00BFA6]" />
                  Built: {site.yearBuilt}
                </div>
                <div className="flex items-center">
                  <Layers className="h-5 w-5 mr-2 text-[#D4AF37]" />
                  {site.architectureType}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6 md:mt-0">
              <Button variant="outline" size="icon" className="border-[#D4AF37] hover:bg-[#D4AF37]/10">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="border-[#00BFA6] hover:bg-[#00BFA6]/10">
                <Download className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: 3D Viewer */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-2 border-border mb-8">
              <div className="relative aspect-video bg-gradient-to-br from-[#1C1C1E] to-[#2A2A2E] flex items-center justify-center">
                {/* Mock 3D Viewer */}
                <div className="relative w-full h-full">
                  
                <div className="w-full h-full flex items-center justify-center">
                <MonumentModel
                  modelPath={
                    viewMode === 'before' ? site.models.before : site.models.after
                  }
                  scale={
                    site.models.scales
                      ? site.models.scales[viewMode]
                      : site.models.scale || 1
                  }
                  scrollProgress={timelineProgress / 100}
                />


                </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                 

                  {/* Before / After Toggle */}
                    <div className="absolute top-4 left-4 flex bg-black/40 backdrop-blur-md rounded-lg overflow-hidden border border-white/20">
                      <button
                        onClick={() => setViewMode('before')}
                        className={`px-4 py-2 text-sm font-semibold transition ${
                          viewMode === 'before'
                            ? 'bg-[#D4AF37] text-black'
                            : 'text-white hover:bg-white/10'
                        }`}
                      >
                        Before
                      </button>
                      <button
                        onClick={() => setViewMode('after')}
                        className={`px-4 py-2 text-sm font-semibold transition ${
                          viewMode === 'after'
                            ? 'bg-[#00BFA6] text-black'
                            : 'text-white hover:bg-white/10'
                        }`}
                      >
                        After
                      </button>
                    </div>


                  {/* Mock 3D Controls */}
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0">
                      Reset View
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0">
                      Full Screen
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Rebuild Timeline */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-border">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-[#D4AF37]" />
                Rebuild Timeline
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold">{currentStage.status}</span>
                    <span className="text-sm text-[#00BFA6] font-semibold">{timelineProgress}% Complete</span>
                  </div>
                  <Slider
                    value={[timelineProgress]}
                    onValueChange={(value) => setTimelineProgress(value[0])}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  {site.restorationStages.map((stage, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
                        timelineProgress >= stage.progress
                          ? 'bg-gradient-to-r from-[#D4AF37]/10 to-[#00BFA6]/10 border-[#D4AF37]/30'
                          : 'bg-background/50 border-border'
                      }`}
                      onClick={() => setTimelineProgress(stage.progress)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          timelineProgress >= stage.progress ? 'bg-[#D4AF37]' : 'bg-muted-foreground'
                        }`}></div>
                        <div>
                          <p className="font-semibold text-sm">{stage.status}</p>
                          <p className="text-xs text-muted-foreground">{stage.year > 0 ? `${stage.year} AD` : `${Math.abs(stage.year)} BC`}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-[#00BFA6]">{stage.progress}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Right: Details */}
          <div className="space-y-6">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-border">
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold mb-3">About {site.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {site.description}
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-semibold mb-2 text-[#D4AF37]">Historical Period</h4>
                    <p className="text-sm text-muted-foreground">{site.era}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-semibold mb-2 text-[#D4AF37]">Architecture Style</h4>
                    <p className="text-sm text-muted-foreground">{site.architectureType}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="materials" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold mb-3">Construction Materials</h3>
                    <div className="space-y-2">
                      {site.materials.map((material, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-[#D4AF37]/5 to-transparent border border-border"
                        >
                          <div className="w-2 h-2 rounded-full bg-[#00BFA6]"></div>
                          <span className="text-sm font-medium">{material}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-semibold mb-2 text-[#D4AF37]">Construction Period</h4>
                    <p className="text-sm text-muted-foreground">Started: {site.yearBuilt}</p>
                    {site.yearDestroyed !== 'N/A' && (
                      <p className="text-sm text-muted-foreground">Destroyed: {site.yearDestroyed}</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-[#D4AF37]/10 to-[#00BFA6]/10 border-2 border-[#D4AF37]/30">
              <h3 className="text-lg font-bold mb-3">Reconstruction Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Accuracy</span>
                  <span className="text-lg font-bold text-[#00BFA6]">
                    {site.restorationStages[site.restorationStages.length - 1].progress}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className="text-sm font-semibold text-[#D4AF37]">Active Project</span>
                </div>
              </div>
            </Card>

            <Button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#00BFA6] hover:from-[#E5C04A] hover:to-[#00D4C0] text-[#1C1C1E] font-semibold py-6">
              Download 3D Model
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;