export interface User {
  id: string;
  google_id?: string;
  email: string;
  name: string;
  avatar_url?: string;
  plan_id?: number;
  created_at?: string;
}

export interface Plan {
  id: number;
  name: string;
  monthly_search_limit: number;
  price_inr: number;
  razorpay_plan_id?: string;
}

export interface UsageStats {
  used: number;
  limit: number;
  remaining: number;
  resets_on: string;
  plan_name?: string;
}

export interface Job {
  job_title: string;
  company: string;
  location: string;
  posted_via: string;
  source_site: string;
  date_posted: string;
  job_url: string;
  remote: boolean | string;
  salary: string;
  job_type: string;
  description: string;
}

export interface SearchParams {
  search_terms: string[];
  locations: string[];
  site_names?: string[];
  results_wanted?: number;
  hours_old?: number;
}

export interface SearchResponse {
  success: boolean;
  count: number;
  data: Job[];
  time_taken_seconds: number;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}
