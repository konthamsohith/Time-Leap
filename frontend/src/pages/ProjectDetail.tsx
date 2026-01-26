import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Download, Share2, Calendar, MapPin, Layers } from 'lucide-react';
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

  const currentStage = site.restorationStages.find(
    stage => stage.progress <= timelineProgress
  ) || site.restorationStages[0];

  return (
    <div className="min-h-screen bg-[#111111] pt-32 pb-16 px-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <Link to="/explore">
          <Button variant="ghost" className="mb-8 text-[#888888] hover:text-white hover:bg-white/5 rounded-full px-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Explore
          </Button>
        </Link>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center bg-[#222222] border border-white/10 rounded-full px-4 py-1">
              <span className="text-xs font-bold text-[#BBBBBB] uppercase tracking-widest">{site.era}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-medium text-white" style={{ fontFamily: "'Manrope', sans-serif" }}>
              {site.name}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-[#888888] font-medium">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-[#D4AF37]" />
                {site.location}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-[#D4AF37]" />
                Built: {site.yearBuilt}
              </div>
              <div className="flex items-center">
                <Layers className="h-4 w-4 mr-2 text-[#D4AF37]" />
                {site.architectureType}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" size="lg" className="border-white/10 text-[#BBBBBB] hover:bg-white/5 rounded-full px-8">
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </Button>
            <Button className="bg-white text-black hover:bg-white/90 rounded-full px-8 font-bold">
              <Download className="h-5 w-5 mr-2" />
              Download Model
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: 3D Viewer */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#1A1A1A] rounded-[3.5rem] border border-white/5 overflow-hidden shadow-2xl relative">
              <div className="aspect-video bg-[#111111] flex items-center justify-center relative">
                <div className="absolute inset-0 z-0">
                  <MonumentModel
                    modelPath={viewMode === 'before' ? site.models?.before || '' : site.models?.after || ''}
                    scale={site.models?.scales ? site.models.scales[viewMode] : 1}
                    scrollProgress={timelineProgress / 100}
                  />
                </div>

                {/* Before / After Toggle */}
                <div className="absolute top-8 left-8 z-10 bg-[#1A1A1A]/80 backdrop-blur-xl rounded-full p-2 border border-white/10 flex shadow-2xl">
                  <button
                    onClick={() => setViewMode('before')}
                    className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${viewMode === 'before' ? 'bg-white text-black' : 'text-[#888888] hover:text-white'
                      }`}
                  >
                    Historical State
                  </button>
                  <button
                    onClick={() => setViewMode('after')}
                    className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${viewMode === 'after' ? 'bg-white text-black' : 'text-[#888888] hover:text-white'
                      }`}
                  >
                    Current State
                  </button>
                </div>

                {/* Status Indicator */}
                <div className="absolute top-8 right-8 z-10 bg-black/40 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-[#00BFA6] animate-pulse"></div>
                    <span className="text-xs font-bold text-white uppercase tracking-widest">3D Real-time Viewer</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rebuild Timeline */}
            <div className="bg-[#1A1A1A] p-12 rounded-[3.5rem] border border-white/5 shadow-xl">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-medium text-white" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  Historical Timeline
                </h3>
                <div className="bg-[#222222] border border-white/10 px-4 py-1 rounded-full">
                  <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">{timelineProgress}% Visible</span>
                </div>
              </div>

              <div className="space-y-12">
                <div className="px-2">
                  <Slider
                    value={[timelineProgress]}
                    onValueChange={(value) => setTimelineProgress(value[0])}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {site.restorationStages.map((stage, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-6 rounded-[2rem] border transition-all cursor-pointer ${timelineProgress >= stage.progress
                          ? 'bg-[#222222] border-white/20'
                          : 'bg-[#111111] border-white/5 opacity-50'
                        }`}
                      onClick={() => setTimelineProgress(stage.progress)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${timelineProgress >= stage.progress ? 'bg-[#D4AF37]' : 'bg-[#333333]'}`}></div>
                        <div>
                          <p className="font-bold text-white text-sm uppercase tracking-wide">{stage.status}</p>
                          <p className="text-xs text-[#888888] font-medium">{Number(stage.year) > 0 ? `${stage.year} AD` : `${Math.abs(Number(stage.year))} BC`}</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-white">{stage.progress}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="space-y-8">
            <div className="bg-[#1A1A1A] p-10 rounded-[3.5rem] border border-white/5 shadow-xl">
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#111111] p-1 rounded-full border border-white/5">
                  <TabsTrigger value="description" className="rounded-full font-bold">Details</TabsTrigger>
                  <TabsTrigger value="materials" className="rounded-full font-bold">Structure</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="space-y-8">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-4" style={{ fontFamily: "'Manrope', sans-serif" }}>About {site.name}</h3>
                    <p className="text-[#888888] text-sm leading-relaxed" style={{ fontFamily: "'Manrope', sans-serif" }}>
                      {site.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-[#111111] p-6 rounded-[2rem] border border-white/5">
                      <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2">Era</h4>
                      <p className="text-sm text-white font-medium">{site.era}</p>
                    </div>
                    <div className="bg-[#111111] p-6 rounded-[2rem] border border-white/5">
                      <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2">Style</h4>
                      <p className="text-sm text-white font-medium">{site.architectureType}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="materials" className="space-y-8">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-4" style={{ fontFamily: "'Manrope', sans-serif" }}>Construction</h3>
                    <div className="space-y-3">
                      {site.materials.map((material, index) => (
                        <div key={index} className="flex items-center space-x-3 p-4 rounded-2xl bg-[#111111] border border-white/5">
                          <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
                          <span className="text-sm text-[#BBBBBB] font-medium">{material}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#111111] p-6 rounded-[2rem] border border-white/5">
                    <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2">History</h4>
                    <p className="text-sm text-white font-medium mb-1">Built: {site.yearBuilt}</p>
                    {site.yearDestroyed !== 'N/A' && (
                      <p className="text-sm text-[#888888] font-medium">Destroyed: {site.yearDestroyed}</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#222222] p-10 rounded-[3.5rem] border border-[#D4AF37]/20 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
              <h3 className="text-xl font-medium text-white mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>Analysis</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center group-hover:translate-x-1 transition-transform">
                  <span className="text-sm font-bold text-[#888888] uppercase tracking-widest">Accuracy</span>
                  <span className="text-2xl font-bold text-[#00BFA6] tracking-tighter">
                    {site.restorationStages[site.restorationStages.length - 1].progress}%
                  </span>
                </div>
                <div className="flex justify-between items-center group-hover:translate-x-1 transition-transform">
                  <span className="text-sm font-bold text-[#888888] uppercase tracking-widest">Status</span>
                  <span className="text-sm font-bold text-[#D4AF37] uppercase tracking-widest">Active Preserve</span>
                </div>
              </div>
            </div>

            <Button className="w-full bg-[#D4AF37] text-black hover:bg-[#E5C04A] py-10 rounded-full font-bold text-lg shadow-2xl transition-all transform hover:-translate-y-1">
              Start 3D Exploration
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;