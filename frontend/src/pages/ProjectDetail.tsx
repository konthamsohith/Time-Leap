import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Calendar, MapPin, Layers, Box, Palette, Settings, Play } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Slider } from '../components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { historicalSites, HistoricalSite } from '../mock';
import MonumentModel from '../components/MonumentModel';


const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const site = historicalSites.find(s => s.id === (id ? parseInt(id) : -1));
  const [timelineProgress, setTimelineProgress] = useState<number>(100);
  const [viewMode, setViewMode] = useState<'before' | 'after'>('before');
  const [activeTab, setActiveTab] = useState<'model' | 'timeline' | 'details'>('model');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!site) {
    return (
      <div className="min-h-screen bg-[#111111] pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-white mb-4">Site not found</h2>
          <Link to="/explore">
            <Button className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-4 font-bold">Back to Explore</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-[#111111]/80 backdrop-blur-xl border-b border-white/5 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <Link to="/explore">
            <Button variant="ghost" className="text-[#888888] hover:text-white hover:bg-white/5 rounded-full px-4 py-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>

          <div className="flex-1 text-center">
            <h1 className="text-lg font-bold text-white">{site.name}</h1>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="border-white/10 text-[#BBBBBB] hover:bg-white/5 rounded-full px-6">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button size="sm" className="bg-white text-black hover:bg-white/90 rounded-full px-6 font-bold">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex flex-1 pt-16">
        {/* Left Sidebar - Operations */}
        <div className="w-64 bg-[#0D0D0D] border-r border-white/5 p-4 overflow-y-auto">
          <div className="space-y-4">
            {/* Project Info */}
            <div className="bg-[#1A1A1A] p-6 rounded-3xl border border-white/5">
              <div className="space-y-3">
                <div className="inline-block bg-[#222222] border border-white/10 rounded-full px-3 py-1">
                  <span className="text-xs font-bold text-[#BBBBBB] uppercase tracking-widest">{site.era}</span>
                </div>
                <h2 className="text-xl font-bold text-white">{site.name}</h2>
                <div className="space-y-2 text-xs text-[#888888]">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-[#D4AF37]" />
                    {site.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-[#D4AF37]" />
                    {site.yearBuilt}
                  </div>
                </div>
              </div>
            </div>

            {/* Operation Buttons */}
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 bg-[#1A1A1A] border border-white/10 hover:border-white/20 hover:bg-[#222222] px-4 py-3 rounded-2xl transition-all group">
                <div className="w-8 h-8 bg-[#222222] rounded-lg flex items-center justify-center group-hover:bg-[#333333]">
                  <Box className="h-4 w-4 text-[#D4AF37]" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-white">Model</p>
                  <p className="text-xs text-[#888888]">View & Configure</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 bg-[#1A1A1A] border border-white/10 hover:border-white/20 hover:bg-[#222222] px-4 py-3 rounded-2xl transition-all group">
                <div className="w-8 h-8 bg-[#222222] rounded-lg flex items-center justify-center group-hover:bg-[#333333]">
                  <Palette className="h-4 w-4 text-[#D4AF37]" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-white">Texture</p>
                  <p className="text-xs text-[#888888]">Edit Material</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 bg-[#1A1A1A] border border-white/10 hover:border-white/20 hover:bg-[#222222] px-4 py-3 rounded-2xl transition-all group">
                <div className="w-8 h-8 bg-[#222222] rounded-lg flex items-center justify-center group-hover:bg-[#333333]">
                  <Settings className="h-4 w-4 text-[#D4AF37]" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-white">Settings</p>
                  <p className="text-xs text-[#888888]">Adjust parameters</p>
                </div>
              </button>
            </div>



            {/* View Mode Toggle */}
            <div className="bg-[#1A1A1A] p-3 rounded-2xl border border-white/10 flex">
              <button
                onClick={() => setViewMode('before')}
                className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'before'
                  ? 'bg-white text-black'
                  : 'text-[#888888] hover:text-white'
                  }`}
              >
                Before
              </button>
              <button
                onClick={() => setViewMode('after')}
                className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'after'
                  ? 'bg-white text-black'
                  : 'text-[#888888] hover:text-white'
                  }`}
              >
                After
              </button>
            </div>

            {/* Primary Action */}
            <Button className="w-full bg-[#D4AF37] text-black hover:bg-[#E5C04A] py-6 rounded-2xl font-bold text-base shadow-xl transition-all transform hover:-translate-y-0.5">
              <Play className="h-4 w-4 mr-2" />
              Explore 3D
            </Button>
          </div>
        </div>

        {/* Center - 3D Viewport */}
        <div className="flex-1 relative p-12">
          <div className="w-full h-[550px] bg-[#111111] rounded-3xl border border-white/5 overflow-hidden flex items-center justify-center relative shadow-2xl">
            <div className="absolute inset-0 z-0">
              <MonumentModel
                modelPath={viewMode === 'before' ? site.models?.before || '' : site.models?.after || ''}
                scale={site.models?.scales ? site.models.scales[viewMode] : 1}
                scrollProgress={timelineProgress / 100}
              />
            </div>

            {/* Center Status Badge */}
            <div className="absolute bottom-8 left-8 z-10 bg-black/40 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-[#00BFA6] animate-pulse"></div>
                <span className="text-xs font-bold text-white uppercase tracking-widest">3D Viewer Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Details & Assets */}
        <div className="w-64 bg-[#0D0D0D] border-l border-white/5 p-4 overflow-y-auto">
          <div className="space-y-4">


            {/* Site Details */}
            <div className="bg-[#1A1A1A] p-6 rounded-3xl border border-white/5">
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4 bg-[#111111] p-1 rounded-lg border border-white/5">
                  <TabsTrigger value="info" className="rounded font-bold text-xs py-2">Info</TabsTrigger>
                  <TabsTrigger value="history" className="rounded font-bold text-xs py-2">History</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4 text-xs">
                  <div>
                    <p className="font-bold text-[#D4AF37] uppercase tracking-widest mb-1">Architecture</p>
                    <p className="text-[#BBBBBB]">{site.architectureType}</p>
                  </div>
                  <div>
                    <p className="font-bold text-[#D4AF37] uppercase tracking-widest mb-1">Era</p>
                    <p className="text-[#BBBBBB]">{site.era}</p>
                  </div>
                  <div>
                    <p className="font-bold text-[#D4AF37] uppercase tracking-widest mb-1">Built</p>
                    <p className="text-[#BBBBBB]">{site.yearBuilt}</p>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="space-y-3 text-xs">
                  <p className="text-[#888888] leading-relaxed">{site.description}</p>
                  <div className="bg-[#111111] p-3 rounded-lg border border-white/10">
                    <p className="font-bold text-white mb-2">Materials Used:</p>
                    <div className="space-y-2">
                      {site.materials.slice(0, 3).map((material, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
                          <span className="text-[#BBBBBB]">{material}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>



            {/* Restoration Stages */}
            <div className="bg-[#1A1A1A] p-6 rounded-3xl border border-white/5">
              <h3 className="text-sm font-bold text-white mb-4">Timeline</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {site.restorationStages.map((stage, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTimelineProgress(stage.progress)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center gap-2 ${timelineProgress >= stage.progress
                      ? 'bg-[#222222] border border-[#D4AF37]/30 text-white'
                      : 'border border-white/5 text-[#888888] hover:text-white hover:border-white/10'
                      }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${timelineProgress >= stage.progress ? 'bg-[#D4AF37]' : 'bg-[#333333]'}`}></div>
                    <div>
                      <p className="font-bold">{stage.status}</p>
                      <p className="text-[#888888] text-xs">{Number(stage.year) > 0 ? `${stage.year} AD` : `${Math.abs(Number(stage.year))} BC`}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;