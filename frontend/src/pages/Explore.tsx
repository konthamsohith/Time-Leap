import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, Calendar } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { historicalSites, HistoricalSite } from '../mock';

const Explore: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const regions = ['all', ...new Set(historicalSites.map(site => site.region))];
  const eras = ['all', ...new Set(historicalSites.map(site => site.era))];
  const types = ['all', ...new Set(historicalSites.map(site => site.architectureType))];

  const filteredSites = useMemo(() => {
    return historicalSites.filter(site => {
      const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = selectedRegion === 'all' || site.region === selectedRegion;
      const matchesEra = selectedEra === 'all' || site.era === selectedEra;
      const matchesType = selectedType === 'all' || site.architectureType === selectedType;

      return matchesSearch && matchesRegion && matchesEra && matchesType;
    });
  }, [searchQuery, selectedRegion, selectedEra, selectedType]);

  return (
    <div className="min-h-screen bg-[#111111] pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center bg-[#222222] border border-white/10 rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-medium text-[#BBBBBB]">Site collection</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-medium text-white mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Explore Historical Sites
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Discover and explore reconstructed historical landmarks. Experience history through immersive visual recreations.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-[#1A1A1A] p-8 rounded-[3rem] border border-white/5 mb-12 shadow-2xl">
          <div className="grid md:grid-cols-4 gap-6">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#888888]" />
              <Input
                type="text"
                placeholder="Search sites or locations..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="pl-12 bg-[#111111] border-white/10 text-white rounded-full py-6 focus:border-[#D4AF37] focus:ring-0 transition-all"
              />
            </div>

            {/* Region Filter */}
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="bg-[#111111] border-white/10 text-white rounded-full h-[52px] px-6">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-[#D4AF37]" />
                  <SelectValue placeholder="Region" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A1A] border-white/10 text-white">
                {regions.map(region => (
                  <SelectItem key={region} value={region}>
                    {region === 'all' ? 'All Regions' : region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Era Filter */}
            <Select value={selectedEra} onValueChange={setSelectedEra}>
              <SelectTrigger className="bg-[#111111] border-white/10 text-white rounded-full h-[52px] px-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-[#D4AF37]" />
                  <SelectValue placeholder="Era" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A1A] border-white/10 text-white">
                {eras.map(era => (
                  <SelectItem key={era} value={era}>
                    {era === 'all' ? 'All Eras' : era}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Architecture Type Filter */}
          <div className="mt-8 flex items-center space-x-4">
            <span className="text-sm font-bold text-[#BBBBBB] uppercase tracking-widest">Filters:</span>
            <div className="flex flex-wrap gap-3">
              {types.map(type => (
                <Button
                  key={type}
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedType(type)}
                  className={`rounded-full px-6 py-4 border-white/10 transition-all ${selectedType === type
                      ? "bg-white text-black hover:bg-white/90"
                      : "bg-[#111111] text-[#888888] hover:text-white hover:bg-[#222222]"
                    }`}
                >
                  {type === 'all' ? 'All Types' : type}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-10 px-4">
          <p className="text-[#888888] font-medium">
            Found <span className="text-white">{filteredSites.length}</span> historical sites
          </p>
        </div>

        {/* Sites Grid */}
        {filteredSites.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSites.map((site) => (
              <Link
                key={site.id}
                to={`/project/${site.id}`}
                className="group"
              >
                <div className="bg-[#1A1A1A] rounded-[3rem] border border-white/5 overflow-hidden transition-all hover:bg-[#1E1E1E] hover:border-white/10 shadow-xl h-full flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={site.thumbnail}
                      alt={site.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                    {/* Hover Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <Button className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-4 font-bold shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        Explore in 3D
                      </Button>
                    </div>

                    {/* Era Badge */}
                    <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/10 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                      {site.era}
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-medium text-white mb-2" style={{ fontFamily: "'Manrope', sans-serif" }}>{site.name}</h3>
                      <div className="flex items-center text-[#888888] text-sm font-medium">
                        <MapPin className="h-4 w-4 mr-2 text-[#D4AF37]" />
                        {site.location}
                      </div>
                    </div>
                  </div>

                  <div className="p-8 flex-grow flex flex-col justify-between">
                    <p className="text-[#888888] text-sm leading-relaxed line-clamp-3 mb-8" style={{ fontFamily: "'Manrope', sans-serif" }}>
                      {site.description}
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <span className="text-xs font-bold text-[#BBBBBB] uppercase tracking-widest">{site.architectureType}</span>
                      <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                        See Details →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-[#1A1A1A] rounded-[3rem] border border-white/5">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-[#111111] rounded-full mb-8 border border-white/10">
              <Search className="h-10 w-10 text-[#888888]" />
            </div>
            <h3 className="text-2xl font-medium text-white mb-2" style={{ fontFamily: "'Manrope', sans-serif" }}>No sites found</h3>
            <p className="text-[#888888]">Try adjusting your search or filters to find more history.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;