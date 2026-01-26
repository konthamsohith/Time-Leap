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
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#00BFA6] bg-clip-text text-transparent">
              Explore Historical Sites
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover and explore reconstructed historical landmarks from around the world
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-12 bg-card/50 backdrop-blur-sm border-2 border-border">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search sites or locations..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-border focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 transition-all"
              />
            </div>

            {/* Region Filter */}
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="bg-background/50 border-border focus:border-[#D4AF37] focus:ring-[#D4AF37]/20">
                <MapPin className="h-4 w-4 mr-2 text-[#D4AF37]" />
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map(region => (
                  <SelectItem key={region} value={region}>
                    {region === 'all' ? 'All Regions' : region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Era Filter */}
            <Select value={selectedEra} onValueChange={setSelectedEra}>
              <SelectTrigger className="bg-background/50 border-border focus:border-[#D4AF37] focus:ring-[#D4AF37]/20">
                <Calendar className="h-4 w-4 mr-2 text-[#00BFA6]" />
                <SelectValue placeholder="Era" />
              </SelectTrigger>
              <SelectContent>
                {eras.map(era => (
                  <SelectItem key={era} value={era}>
                    {era === 'all' ? 'All Eras' : era}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Architecture Type Filter */}
          <div className="mt-4 flex items-center space-x-4">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              {types.map(type => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                  className={selectedType === type ?
                    "bg-gradient-to-r from-[#D4AF37] to-[#00BFA6] hover:from-[#E5C04A] hover:to-[#00D4C0] text-[#1C1C1E]" :
                    "border-border hover:border-[#D4AF37]"}
                >
                  {type === 'all' ? 'All Types' : type}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Found <span className="font-semibold text-[#D4AF37]">{filteredSites.length}</span> sites
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
                <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-2 border-border hover:border-[#D4AF37]/50 transition-all hover:shadow-2xl h-full">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={site.thumbnail}
                      alt={site.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        size="lg"
                        className="bg-white text-[#1C1C1E] hover:bg-[#E0E0E0] font-semibold shadow-2xl"
                      >
                        View in 3D
                      </Button>
                    </div>

                    {/* Info Badge */}
                    <div className="absolute top-4 right-4 bg-[#00BFA6] text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {site.era}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-1">{site.name}</h3>
                      <div className="flex items-center text-white/90 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        {site.location}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {site.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{site.architectureType}</span>
                      <span className="text-[#D4AF37] font-semibold group-hover:underline">
                        See History →
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#D4AF37]/20 to-[#00BFA6]/20 rounded-full mb-4">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No sites found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;