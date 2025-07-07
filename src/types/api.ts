
// API Types for Laravel Backend Integration
export interface Website {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  status: 'active' | 'inactive';
  meta: {
    title: string;
    description: string;
    keywords?: string[];
  };
  settings: {
    theme?: string;
    logo?: string;
    colors?: {
      primary: string;
      secondary: string;
    };
  };
  created_at: string;
  updated_at: string;
}

export interface Page {
  id: string;
  website_id: string;
  name: string;
  slug: string;
  title: string;
  description?: string;
  status: 'active' | 'inactive' | 'draft';
  order: number;
  meta: {
    seo_title?: string;
    seo_description?: string;
    og_image?: string;
  };
  sections: Section[];
  created_at: string;
  updated_at: string;
}

export interface Section {
  id: string;
  page_id: string;
  name: string;
  slug: string;
  type: SectionType;
  order: number;
  status: 'active' | 'inactive';
  config: SectionConfig;
  data: any; // Dynamic data based on section type
  created_at: string;
  updated_at: string;
}

export type SectionType = 
  | 'hero'
  | 'about' 
  | 'players'
  | 'investment'
  | 'donations'
  | 'matches'
  | 'news'
  | 'faq'
  | 'contact'
  | 'custom';

export interface SectionConfig {
  title?: string;
  subtitle?: string;
  description?: string;
  background_color?: string;
  text_color?: string;
  layout?: string;
  settings?: Record<string, any>;
}

// Module-specific interfaces
export interface Player {
  id: string;
  name: string;
  position: string;
  age: number;
  nationality: string;
  image?: string;
  bio?: string;
  stats?: {
    goals?: number;
    assists?: number;
    matches?: number;
  };
  featured: boolean;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  author: string;
  category: string;
  featured: boolean;
  published_at: string;
  status: 'published' | 'draft' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface InvestmentPackage {
  id: string;
  title: string;
  description: string;
  type: 'organization' | 'team' | 'player';
  min_amount: number;
  expected_returns: string;
  image?: string;
  features: string[];
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface Match {
  id: string;
  opponent: string;
  date: string;
  time: string;
  venue: string;
  competition: string;
  is_home: boolean;
  status: 'upcoming' | 'completed' | 'cancelled';
  home_score?: number;
  away_score?: number;
  scorers?: string[];
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface DonationCampaign {
  id: string;
  title: string;
  description: string;
  goal_amount: number;
  current_amount: number;
  image?: string;
  featured: boolean;
  status: 'active' | 'completed' | 'paused';
  end_date?: string;
  created_at: string;
  updated_at: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

// API Endpoints structure
export const API_ENDPOINTS = {
  websites: '/api/websites',
  pages: (websiteId: string) => `/api/websites/${websiteId}/pages`,
  sections: (pageId: string) => `/api/pages/${pageId}/sections`,
  players: '/api/players',
  news: '/api/news',
  investments: '/api/investments',
  matches: '/api/matches',
  faqs: '/api/faqs',
  donations: '/api/donations',
} as const;
