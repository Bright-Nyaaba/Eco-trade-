export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  level: number;
  totalWasteRecycled: number; // in kg
  carbonSaved: number; // in kg CO2
  joinDate: string;
  avatar?: string;
}

export type WasteStatus = 'collected' | 'transporting' | 'processing' | 'recycled';

export interface WasteTransaction {
  id: string;
  userId: string;
  type: string; // e.g., 'PET Bottles', 'Mixed Plastic'
  weight: number; // in kg
  images: string[];
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: WasteStatus;
  value: number; // money earned
  timestamp: string;
  lifecycle: {
    status: WasteStatus;
    timestamp: string;
    description: string;
  }[];
}

export interface ForumPost {
  id: string;
  userId: string;
  userName: string;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  commentsCount: number;
  timestamp: string;
}

export interface DropOffLocation {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  types: string[]; // e.g., ['Plastic', 'E-waste']
  distance?: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  image: string;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  points: number;
  rank: number;
}
