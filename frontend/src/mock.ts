// Mock data for TimeLeap application

export interface RestorationStage {
  year: number | string;
  status: string;
  progress: number;
}

export interface ModelScales {
  before: number;
  after: number;
}

export interface Models {
  before: string;
  after: string;
  scales: ModelScales;
}

export interface HistoricalSite {
  id: number;
  name: string;
  location: string;
  era: string;
  architectureType: string;
  region: string;
  description: string;
  thumbnail: string;
  beforeImage: string;
  afterImage: string;
  materials: string[];
  yearBuilt: string;
  yearDestroyed: string;
  restorationStages: RestorationStage[];
  models?: Models;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

export const historicalSites: HistoricalSite[] = [
  {
    id: 1,
    name: "Hampi Ruins",
    location: "Karnataka, India",
    era: "14th Century",
    architectureType: "Temple City Reconstruction",
    region: "Asia",
    description: "Experience the capital of the Vijayanagara Empire in its full 14th-century glory. Our 3D reconstruction brings the grand temples and royal complexes back to life, allowing you to walk through the streets that were once the heartbeat of South India.",
    thumbnail: "https://images.unsplash.com/photo-1596018382916-56d2e341d784?q=80&w=1548&auto=format&fit=crop",
    beforeImage: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1200&q=80",
    materials: ["Granite", "Stone", "Lime mortar"],
    yearBuilt: "1336 AD",
    yearDestroyed: "1565 AD",
    restorationStages: [
      { year: 1336, status: "Peak Empire Construction", progress: 100 },
      { year: 1565, status: "Historical Decline", progress: 40 },
      { year: 2024, status: "3D Digital Preserve", progress: 85 }
    ],
    models: {
      before: "/models3d/hampi_before.glb",
      after: "/models3d/hampi_after.glb",
      scales: {
        before: 2.5,
        after: 2.5
      }
    }
  },
  {
    id: 2,
    name: "Roman Colosseum",
    location: "Rome, Italy",
    era: "1st Century",
    architectureType: "Amphitheater Rebirth",
    region: "Europe",
    description: "Visualize the world's largest amphitheater exactly as it stood at its inauguration in 80 AD. Witness the pristine travertine limestone and the complete outer ring of the Flavian Amphitheatre through our interactive visual reconstruction.",
    thumbnail: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
    beforeImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1200&q=80",
    materials: ["Travertine", "Tuff", "Brick-faced concrete"],
    yearBuilt: "70 AD",
    yearDestroyed: "Ongoing Preservation",
    restorationStages: [
      { year: 80, status: "Grand Inauguration", progress: 100 },
      { year: 1349, status: "Seismic Alteration", progress: 55 },
      { year: 2024, status: "Digital Heritage Scan", progress: 88 }
    ],
    models: {
      before: "/models3d/colosseum_before.glb",
      after: "/models3d/colosseum_before.glb",
      scales: {
        before: 2.5,
        after: 2.5
      }
    }
  },
  {
    id: 3,
    name: "Corfe Castle",
    location: "Dorset, England",
    era: "11th Century AD",
    architectureType: "Medieval Norman Fortress",
    region: "United Kingdom",
    description: "Step into the dramatic past of Corfe Castle, once a formidable royal stronghold guarding the Purbeck Hills. Witness towering stone walls, defensive gates, and the scars left by the English Civil War that transformed it into the iconic ruin seen today.",
    thumbnail: "https://images.unsplash.com/photo-1650915427961-7e678648a486?q=80&w=1184&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    beforeImage: "https://images.unsplash.com/photo-1650915427961-7e678648a486?q=80&w=1184&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    afterImage: "https://images.unsplash.com/photo-1650915427961-7e678648a486?q=80&w=1184&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    materials: ["Limestone", "Chalk"],
    yearBuilt: "1086 AD",
    yearDestroyed: "Slighted in 1646 (English Civil War)",
    restorationStages: [
      { year: 1086, status: "Norman Construction", progress: 100 },
      { year: 1646, status: "Civil War Demolition", progress: 35 },
      { year: 2024, status: "Digital Preservation", progress: 80 }
    ],
    models: {
      before: "/models3d/corfe_before.glb",
      after: "/models3d/corfe_before.glb",
      scales: {
        before: 2.5,
        after: 2.5
      }
    }
  },
  {
    id: 4,
    name: "Machu Picchu",
    location: "Cusco Region, Peru",
    era: "15th Century",
    architectureType: "Incan Citadel Archive",
    region: "South America",
    description: "Step into the royal estate of Emperor Pachacuti. See the 'Lost City of the Incas' with its complete thatched roofs and precision stone terraces as they looked before the abandonment of the 16th century.",
    thumbnail: "https://images.unsplash.com/photo-1666240073343-9801b7b5b949?q=80&w=1170&auto=format&fit=crop",
    beforeImage: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1200&q=80",
    materials: ["Granite stone"],
    yearBuilt: "1450 AD",
    yearDestroyed: "Abandoned 1572 AD",
    restorationStages: [
      { year: 1450, status: "Royal Construction", progress: 100 },
      { year: 1572, status: "Historical Inactivity", progress: 65 },
      { year: 2024, status: "Full Digital Rebirth", progress: 95 }
    ]
  },
  {
    id: 5,
    name: "Golconda Fort",
    location: "Hyderabad, Telangana, India",
    era: "Medieval",
    architectureType: "Acoustic Fortress Reimagined",
    region: "Asia",
    description: "Walk through the impenetrable home of the Koh-i-Noor diamond. Our 3D model recreates the legendary acoustic systems and advanced water supply of the Qutb Shahi capital at its defensive peak.",
    thumbnail: "https://images.unsplash.com/photo-1470075446540-4391a96ec621?q=80&w=1074&auto=format&fit=crop",
    beforeImage: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1200&q=80",
    materials: ["Granite", "Stone", "Lime mortar"],
    yearBuilt: "1143 AD",
    yearDestroyed: "1687 AD (Siege)",
    restorationStages: [
      { year: 1143, status: "Kakatiya Founding", progress: 100 },
      { year: 1687, status: "Mughal Siege Damage", progress: 55 },
      { year: 2024, status: "Active Heritage Study", progress: 88 }
    ]
  },
  {
    id: 6,
    name: "Konark Sun Temple",
    location: "Konark, Odisha, India",
    era: "13th Century",
    architectureType: "Celestial Chariot Archive",
    region: "Asia",
    description: "Behold the colossal chariot of the Sun God Surya in its complete form. Explore the 24 intricate stone wheels and the original main deul sanctuary that was lost to the sea and time centuries ago.",
    thumbnail: "https://images.unsplash.com/photo-1723871568897-d0680195f20a?q=80&w=735&auto=format&fit=crop",
    beforeImage: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1200&q=80",
    materials: ["Khondalite stone", "Iron beams"],
    yearBuilt: "1250 AD",
    yearDestroyed: "17th Century Decline",
    restorationStages: [
      { year: 1250, status: "Temple Completion", progress: 100 },
      { year: 1650, status: "Structural Alteration", progress: 45 },
      { year: 2024, status: "Digital Restoration", progress: 90 }
    ]
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Elena Rossi",
    role: "Senior Archeologist",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    quote: "TimeLeap's 3D reconstructions provide a level of detail that was previously impossible. It's a game-changer for digital heritage preservation."
  },
  {
    id: 2,
    name: "Marcus Aurelius",
    role: "History Educator",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
    quote: "My students are finally engaged with history. Instead of reading about ruins, they're walking through them in Full 3D."
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    role: "Heritage Director",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    quote: "The past vs present comparison is the most intuitive tool I've seen for explaining architectural evolution to the public."
  }
];