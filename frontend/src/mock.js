// Mock data for TimeLeap application

export const historicalSites = [
  {
    id: 1,
    name: "Hampi",
    location: "Karnataka, India",
    era: "Medieval",
    architectureType: "Temple City / Ruins",
    region: "Asia",
    description: "Hampi was the capital of the Vijayanagara Empire, one of the richest and most powerful kingdoms in South India. Flourishing between the 14th and 16th centuries, it is known for its grand temples, royal complexes, and advanced urban planning set amid a rocky landscape along the Tungabhadra River.",
    thumbnail: "https://images.unsplash.com/photo-1596018382916-56d2e341d784?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    beforeImage: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1200&q=80",
    materials: ["Granite", "Stone", "Lime mortar"],
    yearBuilt: "1336",
    yearDestroyed: "1565",
    restorationStages: [
      { year: 1336, status: "Founding of Vijayanagara Empire", progress: 100 },
      { year: 1565, status: "Destruction after Battle of Talikota", progress: 40 },
      { year: 2024, status: "Archaeological Preservation and Digital Documentation", progress: 85 }
    ],
    model: "/models/model_after_hampi.glb"
  }
  ,
  {
    id: 2,
    name: "Corfe Castle",
    location: "Dorset, England",
    era: "Medieval",
    architectureType: "Castle",
    region: "Europe",
    description: "Corfe Castle is a fortification standing above the village of Corfe Castle on the Isle of Purbeck peninsula. Built by William the Conqueror in the 11th century, it was partially demolished during the English Civil War.",
    thumbnail: "https://images.unsplash.com/photo-1614258259348-dcef99d81836?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    beforeImage: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=1200&q=80",
    materials: ["Stone", "Limestone", "Mortar"],
    yearBuilt: "1066",
    yearDestroyed: "1646",
    restorationStages: [
      { year: 1066, status: "Original Construction", progress: 100 },
      { year: 1646, status: "Partial Demolition", progress: 40 },
      { year: 2024, status: "Digital Reconstruction", progress: 95 }
    ]
  },
  {
    id: 3,
    name: "Colosseum",
    location: "Rome, Italy",
    era: "Ancient",
    architectureType: "Amphitheater",
    region: "Europe",
    description: "The Colosseum is an oval amphitheater in the center of Rome. Built of travertine limestone, tuff, and brick-faced concrete, it was the largest amphitheater ever built at the time.",
    thumbnail: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
    beforeImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1200&q=80",
    materials: ["Travertine", "Tuff", "Concrete"],
    yearBuilt: "70 AD",
    yearDestroyed: "1349",
    restorationStages: [
      { year: 70, status: "Original Construction", progress: 100 },
      { year: 1349, status: "Earthquake Damage", progress: 55 },
      { year: 2024, status: "Digital Reconstruction", progress: 88 }
    ]
  },
  {
    id: 4,
    name: "Golconda Fort",
    location: "Hyderabad, Telangana, India",
    era: "Medieval",
    architectureType: "Fortress",
    region: "Asia",
    description: "Golconda Fort was the capital of the medieval Golconda Sultanate and later ruled by the Qutb Shahi dynasty.It is famous for its advanced acoustics, water supply system, and strong defensive architecture.",
    thumbnail: "https://images.unsplash.com/photo-1470075446540-4391a96ec621?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    beforeImage: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1200&q=80",
    materials: ["Granite", "Stone", "Lime mortar"],
    yearBuilt: "1143",
    yearDestroyed: "1687",
    restorationStages: [
      { year: 1143, status: "Initial Construction by Kakatiya Dynasty", progress: 100 },
      { year: 1687, status: "Siege and Capture by Mughal Empire", progress: 55 },
      { year: 2024, status: "Conservation and Digital Heritage Mapping", progress: 88 }
    ]
  }
  ,
  {
    id: 5,
    name: "Konark Sun Temple",
    location: "Konark, Odisha, India",
    era: "Medieval",
    architectureType: "Temple",
    region: "Asia",
    description: "The Konark Sun Temple was built in the 13th century by King Narasimhadeva I of the Eastern Ganga dynasty. Designed as a colossal stone chariot of the Sun God Surya, the temple is renowned for its intricate carvings, massive stone wheels, and detailed sculptures.",
    thumbnail: "https://images.unsplash.com/photo-1723871568897-d0680195f20a?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    beforeImage: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1200&q=80",
    materials: ["Khondalite stone", "Laterite stone", "Iron beams"],
    yearBuilt: "1250",
    yearDestroyed: "17th century",
    restorationStages: [
      { year: 1250, status: "Original Construction", progress: 100 },
      { year: 1650, status: "Structural Collapse and Decline", progress: 45 },
      { year: 2024, status: "Archaeological Conservation and Digital Restoration", progress: 90 }
    ]
  },
  {
    id: 6,
    name: "Machu Picchu",
    location: "Cusco Region, Peru",
    era: "Medieval",
    architectureType: "Mountain Citadel",
    region: "South America",
    description: "Machu Picchu was an Incan royal estate or ceremonial city built in the 15th century during the reign of Emperor Pachacuti. The site was abandoned during the Spanish conquest and remained hidden from the outside world until its rediscovery in 1911.",
    thumbnail: "https://images.unsplash.com/photo-1666240073343-9801b7b5b949?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    beforeImage: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1200&q=80",
    materials: ["Granite stone"],
    yearBuilt: "1450",
    yearDestroyed: "Never destroyed",
    restorationStages: [
      { year: 1450, status: "Original Inca Construction", progress: 100 },
      { year: 1572, status: "Abandonment after Spanish Conquest", progress: 65 },
      { year: 2024, status: "Preservation and Digital Reconstruction", progress: 92 }
    ]
  }
  
];

export const testimonials = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    role: "Archaeologist",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    quote: "TimeLeap has revolutionized how we visualize and understand historical sites. The reconstruction accuracy is phenomenal."
  },
  {
    id: 2,
    name: "Prof. James Chen",
    role: "Historian",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
    quote: "An incredible tool for education and research. Students can now experience history in ways we never imagined."
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    role: "Digital Artist",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    quote: "The blend of technology and history is breathtaking. TimeLeap brings ancient civilizations back to life."
  }
];