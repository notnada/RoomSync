import { icons, type IconKey } from "./icons";


export const tabs: AppTab[] = [
    { name: "index", title: "Home", icon: icons.home },
    { name: "chat", title: "Chat", icon: icons.activity },
    { name: "listings", title: "Listings", icon: icons.wallet },
    { name: "profile", title: "Profile", icon: icons.setting },
];


// ---------- Chat mock data ----------
export type ChatItem = {
    id: string;
    name: string;
    initials?: string;
    lastMessage: string;
    time: string; // human readable timestamp
    unreadCount?: number;
};

export const CHATS: ChatItem[] = [
    {
        id: "chat-priya",
        name: "Priya M.",
        initials: "PM",
        lastMessage: "Hey! Free to video call this weekend?",
        time: "10:42 AM",
        unreadCount: 2,
    },
    {
        id: "chat-carlos",
        name: "Carlos V.",
        initials: "CV",
        lastMessage: "That Brannan loft looks sick",
        time: "Yesterday",
    },
];

// data.ts

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  bio: string;
  role: string;
  stats: {
    projects: number;
    followers: number;
    following: number;
  };
}

export const mockUserData: UserProfile = {
  id: "user-123",
  name: "Nada Imadache",
  email: "nada@example.com",
  avatarUrl: "https://via.placeholder.com/150",
  bio: "Software Developer & Computer Science Student",
  role: "Instructor & Freelancer",
  stats: {
    projects: 12,
    followers: 240,
    following: 180,
  },
};

// ---------- Profile data ----------

export type ProfileTab = "profile" | "saved" | "settings";

export type LifestyleItem = {
    icon: IconKey;
    label: string;
    value: string;
};

export const PROFILE_USER = {
    name: "Alex Johnson",
    initials: "AJ",
    role: "Tenant",
    location: "San Francisco",
    verified: false,
    profileCompletion: 92,
};

export const PROFILE_STATS = {
    matches: 3,
    saved: 2,
    topScore: 94,
};

export const LIFESTYLE_ITEMS: LifestyleItem[] = [
    {
        icon: "activity",
        label: "Sleep",
        value: "10pm – 7am",
    },
    {
        icon: "activity",
        label: "Noise",
        value: "Low tolerance",
    },
    {
        icon: "setting",
        label: "Smoking",
        value: "No smoking",
    },
    {
        icon: "activity",
        label: "Pets",
        value: "No preference",
    },
    {
        icon: "setting",
        label: "Cleanliness",
        value: "Very neat",
    },
];

export type LikedRoommate = {
    id: string;
    initials: string;
    name: string;
    age: number;
    location: string;
    budget: string;
    score: number;
    avatarColor: string;
};

export const LIKED_ROOMMATES: LikedRoommate[] = [
    {
        id: "priya-m",
        initials: "PM",
        name: "Priya M.",
        age: 23,
        location: "Mission District",
        budget: "$1,200–1,500",
        score: 94,
        avatarColor: "#7c3cff",
    },
    {
        id: "maya-k",
        initials: "MK",
        name: "Maya K.",
        age: 22,
        location: "Noe Valley",
        budget: "$1,300–1,700",
        score: 88,
        avatarColor: "#ff1870",
    },
];

export type SavedListing = {
    id: string;
    title: string;
    location: string;
    price: number;
    availability: string;
    image: string;
};

export const SAVED_LISTINGS: SavedListing[] = [
    {
        id: "sunny-2br-mission",
        title: "Sunny 2BR Mission",
        location: "18th & Valencia, SF",
        price: 1450,
        availability: "Avail Aug 1",
        image:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    },
    {
        id: "victorian-3br-flat",
        title: "Victorian 3BR Flat",
        location: "Haight St, SF",
        price: 1100,
        availability: "Avail Aug 15",
        image:
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    },
];
// ---------- Settings data ----------

export const SETTINGS_ACCOUNT = [
    {
        id: "display-name",
        label: "Display name",
        value: "Alex Johnson",
        icon: "setting" as IconKey,
        editable: true,
    },
    {
        id: "location",
        label: "Location",
        value: "San Francisco",
        icon: "activity" as IconKey,
        editable: true,
    },
];

export const SETTINGS_VERIFICATION = [
    {
        id: "id-verification",
        label: "ID Verification",
        subtitle: "Not verified",
        icon: "setting" as IconKey,
        status: "action" as const,
        action: "Verify now",
    },
    {
        id: "student-email",
        label: "Student email",
        subtitle: undefined,
        icon: "activity" as IconKey,
        status: "verified" as const,
        action: "Verified",
    },
];

export const SETTINGS_PREFERENCES = [
    {
        id: "push-notifications",
        label: "Push notifications",
        value: "On",
        enabled: true,
    },
    {
        id: "email-updates",
        label: "Email updates",
        value: "Weekly",
        enabled: true,
    },
    {
        id: "profile-visibility",
        label: "Profile visibility",
        value: "Public",
        enabled: true,
    },
];

//user data


export type RoommateProfile = {
  id: string;
  name: string;
  age: number;
  image: string;
  location: string;
  price: string;
  match: number;

  bio: string;

  tags: string[];

  preferences: {
    sleepSchedule: string;
    noise: string;
    smoking: string;
    pets: string;
    cleanliness: string;
  };

  verified: boolean;
};

export const roommateProfiles: RoommateProfile[] = [
  {
    id: "1",
    name: "Priya M.",
    age: 23,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&h=1100&fit=crop&auto=format",
    location: "Mission District",
    price: "$1,200–1,600/mo",
    match: 94,

    bio: "Software engineer relocating from Austin. Loves cooking and quiet evenings.",

    tags: [
      "Early bird",
      "Non-smoker",
      "Neat",
    ],

    preferences: {
      sleepSchedule: "10pm–7am",
      noise: "Quiet",
      smoking: "No",
      pets: "No pets",
      cleanliness: "Very neat",
    },

    verified: true,
  },

  {
    id: "2",
    name: "Carlos V.",
    age: 26,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&h=1100&fit=crop&auto=format",
    location: "SoMa",
    price: "$1,100–1,500/mo",
    match: 81,

    bio: "Product designer working remotely. Enjoys gaming, cooking and meeting new people.",

    tags: [
      "Night owl",
      "Has cat",
      "WFH",
    ],

    preferences: {
      sleepSchedule: "12am–8am",
      noise: "Moderate",
      smoking: "No",
      pets: "Has cat",
      cleanliness: "Neat",
    },

    verified: true,
  },

  {
    id: "3",
    name: "Jordan L.",
    age: 24,
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=900&h=1100&fit=crop&auto=format",
    location: "Haight-Ashbury",
    price: "$1,000–1,400/mo",
    match: 77,

    bio: "UCSF graduate student who loves food, exploring the city and hosting friends.",

    tags: [
      "Social",
      "UCSF grad",
      "Foodie",
    ],

    preferences: {
      sleepSchedule: "11pm–7am",
      noise: "Moderate",
      smoking: "No",
      pets: "Dogs OK",
      cleanliness: "Average",
    },

    verified: true,
  },

  {
    id: "4",
    name: "Maya K.",
    age: 22,
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&h=1100&fit=crop&auto=format",
    location: "Noe Valley",
    price: "$1,300–1,700/mo",
    match: 88,

    bio: "Student and freelance illustrator. Looking for a calm and respectful home.",

    tags: [
      "Early bird",
      "No pets",
      "Minimalist",
    ],

    preferences: {
      sleepSchedule: "10pm–7am",
      noise: "Quiet",
      smoking: "No",
      pets: "No pets",
      cleanliness: "Very neat",
    },

    verified: true,
  },

  {
    id: "5",
    name: "Sofia R.",
    age: 25,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&h=1100&fit=crop&auto=format",
    location: "Castro",
    price: "$1,200–1,600/mo",
    match: 85,

    bio: "Marketing professional who enjoys brunch, photography and exploring new restaurants.",

    tags: [
      "Social",
      "Photographer",
      "Foodie",
    ],

    preferences: {
      sleepSchedule: "11pm–7:30am",
      noise: "Moderate",
      smoking: "No",
      pets: "Cats OK",
      cleanliness: "Neat",
    },

    verified: true,
  },

  {
    id: "6",
    name: "Emma T.",
    age: 27,
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=900&h=1100&fit=crop&auto=format",
    location: "Pacific Heights",
    price: "$1,500–1,900/mo",
    match: 83,

    bio: "Software engineer who loves yoga, reading and keeping a peaceful home.",

    tags: [
      "Quiet",
      "Reader",
      "Yoga",
    ],

    preferences: {
      sleepSchedule: "10pm–6:30am",
      noise: "Very quiet",
      smoking: "No",
      pets: "No pets",
      cleanliness: "Very neat",
    },

    verified: true,
  },

  {
    id: "7",
    name: "Lena P.",
    age: 24,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&h=1100&fit=crop&auto=format",
    location: "Nob Hill",
    price: "$1,100–1,500/mo",
    match: 79,

    bio: "Teacher who loves movies, brunch and meeting people from different cultures.",

    tags: [
      "Movie lover",
      "Friendly",
      "Social",
    ],

    preferences: {
      sleepSchedule: "11pm–8am",
      noise: "Moderate",
      smoking: "No",
      pets: "Cats OK",
      cleanliness: "Neat",
    },

    verified: true,
  },

  {
    id: "8",
    name: "Olivia J.",
    age: 26,
    image:
      "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=900&h=1100&fit=crop&auto=format",
    location: "Bernal Heights",
    price: "$1,100–1,500/mo",
    match: 76,

    bio: "UX researcher who enjoys hiking, plants and Sunday morning coffee.",

    tags: [
      "Plant lover",
      "Active",
      "Early bird",
    ],

    preferences: {
      sleepSchedule: "10:30pm–7am",
      noise: "Quiet",
      smoking: "No",
      pets: "Dogs OK",
      cleanliness: "Neat",
    },

    verified: true,
  },
];
