// src/data/operations.ts

export const operations = [
  {
    id: "ajman-hub",
    category: "UAE PRODUCTION",
    title: "AJMAN MANUFACTURING HUB",
    description: "The central nervous system of our UAE production, located in the heart of Ajman.",
    src: "/images/operations/homepage-01.jpg", // Fallback Image
    videoSrc: "/facility-tour.mp4",           // <--- ADD THIS LINE (The actual video file)
    type: "video"
  },
  {
    id: "titanium-launch",
    category: "Product Development",
    title: "TITANIUM PRO 5W-30 LAUNCH",
    description: "Advanced synthetic development phase for our flagship Titanium Pro series.",
    src: "/images/operations/homepage-01.jpg",
    type: "image"
  },
  {
    id: "logistics-expansion",
    category: "Infrastructure",
    title: "AJMAN LOGISTICS EXPANSION",
    description: "Expanding our footprint to ensure rapid delivery across the Emirates.",
    src: "/images/operations/homepage-02.jpg",
    type: "image"
  },
  {
    id: "global-network",
    category: "Strategic Growth",
    title: "GLOBAL PARTNER NETWORK",
    description: "Connecting our Ajman production with global distribution partners.",
    src: "/images/operations/homepage-03.jpg",
    type: "image"
  }
];

export const operationsData = {
  featuredVideo: {
    videoSrc: "/milestone.mp4", // Located in public/ root
    src: "/milestone.mp4" 
  },
  homepageImages: [
    { src: "/milestone-top.webp" },         // Index 1 in album
    { src: "/milestone-bottom-left.webp" },  // Index 2 in album
    { src: "/gallery-6.webp" }               // Index 3 in album (Visible in grid)
  ],
  extraImages: [
    { src: "/milestone-bottom-right.webp" }, // Index 4 in album
    { src: "/gallery-1.webp" },
    { src: "/gallery-2.webp" },
    { src: "/gallery-3.webp" },
    { src: "/gallery-4.webp" },
    { src: "/gallery-5.webp" },
    { src: "/gallery-7.webp" }               // 10th Image
  ]
};