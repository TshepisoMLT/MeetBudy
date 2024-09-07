// Story type
type Story = {
  id: string;
  name: string;
  avatar: string;
  postedTime: string;
  storyImage: string;
  textOverlay?: string;
};

// Users stories array
export const stories: Story[] = [
  {
    id: "1",
    name: "Alex Thompson",
    avatar: `https://randomuser.me/api/portraits/women/20.jpg`,
    postedTime: new Date(Math.floor(Math.random() * 24)).toISOString(),
    storyImage: "https://picsum.photos/seed/story1/1080/1920",
    textOverlay: "Exploring new horizons!",
  },
  {
    id: "2",
    name: "Jordan Lee",
    avatar: `https://randomuser.me/api/portraits/men/53.jpg`,
    postedTime: new Date(Math.floor(Math.random() * 24)).toISOString(),
    storyImage: "https://picsum.photos/seed/story2/1080/1920",
    textOverlay: "Adventure awaits!",
  },
  {
    id: "3",
    name: "Casey Morgan",
    avatar: `https://randomuser.me/api/portraits/women/15.jpg`,
    postedTime: new Date(Math.floor(Math.random() * 24)).toISOString(),
    storyImage: "https://picsum.photos/seed/story3/1080/1920",
    textOverlay: "Living my best life!",
  },
  {
    id: "4",
    name: "Taylor Reed",
    avatar: `https://randomuser.me/api/portraits/women/90.jpg`,
    postedTime: new Date(Math.floor(Math.random() * 24)).toISOString(),
    storyImage: "https://picsum.photos/seed/story4/1080/1920",
    textOverlay: "Chasing dreams!",
  },
  {
    id: "5",
    name: "Sam Patel",
    avatar: `https://randomuser.me/api/portraits/men/63.jpg`,
    postedTime: new Date(Math.floor(Math.random() * 24)).toISOString(),
    storyImage: "https://picsum.photos/seed/story5/1080/1920",
    textOverlay: "Making memories!",
  },
  {
    id: "6",
    name: "Riley Johnson",
    avatar: `https://randomuser.me/api/portraits/women/77.jpg`,
    postedTime: new Date(Math.floor(Math.random() * 24)).toISOString(),
    storyImage: "https://picsum.photos/seed/story6/1080/1920",
    textOverlay: "Embracing the journey!",
  },
  {
    id: "7",
    name: "Quinn Martinez",
    avatar: `https://randomuser.me/api/portraits/women/39.jpg`,
    postedTime: new Date(Math.floor(Math.random() * 24)).toISOString(),
    storyImage: "https://picsum.photos/seed/story7/1080/1920",
    textOverlay: "Seizing the day!",
  },
  {
    id: "8",
    name: "Avery Chen",
    avatar: `https://randomuser.me/api/portraits/men/44.jpg`,
    postedTime: new Date(Math.floor(Math.random() * 24)).toISOString(),
    storyImage: "https://picsum.photos/seed/story8/1080/1920",
    textOverlay: "Creating moments!",
  },
];