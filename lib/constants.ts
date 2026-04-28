export type EventItem = {
  image: string;
  title: string;
  slug: string;
  location: string;
  date: string; // e.g., "2025-11-07"
  time: string; // e.g., "09:00 AM"
};

export const events: EventItem[] = [
  {
    image: "/images/img_adoptbanner.jpg",
    title: "Adopt 1",
    slug: "event-dog-1",
    location: "event-dog-1",
    date: "Date-1",
    time: "Time-1",
  },
  // {image:'/images/img_octdog.jpg',title:'Adopt 2',slug:'event-dog-2',location:'event-dog-1',date:'Date-1',time:'Time-1'},
  // {image:'/images/img_octdog.jpg',title:'Adopt 3',slug:'event-dog-3',location:'event-dog-1',date:'Date-1',time:'Time-1'},
];
export const PROD_URL = "https://dogslifelove.dog";
export const dogs = [
  {
    id: "1",
    slug: "milo",
    name: "Milo",
    summary: "Playful and affectionate. Loves long walks and human company.",
    featureTag: ["Featured", "Good with kids"],
    imageUrl: "/images/dog-milo-1.jpeg",
    breed: "mongrel",
  },
  {
    id: "2",
    slug: "cloe",
    name: "Cloe",
    summary: "Gentle and calm, perfect for a quieter home and relaxed routine.",
    featureTag: ["New", "Friendly"],
    imageUrl: "/images/dog-cloe-1.jpeg",
    breed: "mongrel",
  },
  {
    id: "3",
    slug: "rocky",
    name: "Rocky",
    summary:
      "Energetic and smart. Great for active adopters who enjoy outdoor time.",
    featureTag: ["Urgent", "New", "Energetic"],
    imageUrl: "/images/dog-rocky-1.jpeg",
    breed: "mongrel",
  },
  {
    id: "4",
    slug: "jasmine",
    name: "Jasmine",
    summary:
      "Sweet-natured and friendly, with a curious personality and bright spirit.",
    featureTag: ["Puppy", "Good with kids"],
    imageUrl: "/images/dog-jasmine-1.jpeg",
    breed: "mongrel",
  },
  {
    id: "5",
    slug: "joffery",
    name: "Joffery",
    summary:
      "Sweet-natured and friendly, with a curious personality and bright spirit.",
    featureTag: ["Puppy", "Calm"],
    imageUrl: "/images/dog-joffery-1.jpeg",
    breed: "mongrel",
  },
  {
    id: "6",
    slug: "margo",
    name: "Margo",
    summary:
      "Sweet-natured and friendly, with a curious personality and bright spirit.",
    featureTag: ["Puppy", "Good with kids"],
    imageUrl: "/images/dog-margo-1.jpeg",
    breed: "mongrel",
  },
  {
    id: "7",
    slug: "maria",
    name: "Maria",
    summary:
      "Sweet-natured and friendly, with a curious personality and bright spirit.",
    featureTag: ["Puppy"],
    imageUrl: "/images/dog-maria-1.jpeg",
    breed: "mongrel",
  },
  {
    id: "8",
    slug: "mia",
    name: "Mia",
    summary:
      "Sweet-natured and friendly, with a curious personality and bright spirit.",
    featureTag: ["Puppy"],
    imageUrl: "/images/dog-mia-1.jpeg",
    breed: "mongrel",
  },
  {
    id: "9",
    slug: "mercury",
    name: "Mercury",
    summary:
      "Sweet-natured and friendly, with a curious personality and bright spirit.",
    featureTag: ["Puppy"],
    imageUrl: "/images/dog-mercury-1.jpeg",
    breed: "mongrel",
  },
];
export const advancedOperationsMetrics = {
  Occupancy_Rate: 98,
  Intake_Number: 8,
  Release_Rate: 12,
  Avg_Length_Of_Stay: "8.5yrs",
  Adoption_Number: 3,
  Return_To_Owner_Rate: 40,
};
