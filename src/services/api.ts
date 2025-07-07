
// API Service for Laravel Backend Integration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

class ApiService {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Generic CRUD methods
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Website methods
  async getWebsite(websiteId: string) {
    return this.get(`/api/websites/${websiteId}`);
  }

  // Page methods
  async getPages(websiteId: string) {
    return this.get(`/api/websites/${websiteId}/pages`);
  }

  async getPage(websiteId: string, pageSlug: string) {
    return this.get(`/api/websites/${websiteId}/pages/${pageSlug}`);
  }

  // Section methods
  async getSections(pageId: string) {
    return this.get(`/api/pages/${pageId}/sections`);
  }

  // Module-specific methods
  async getPlayers(featured?: boolean) {
    const params = featured ? '?featured=true' : '';
    return this.get(`/api/players${params}`);
  }

  async getNews(featured?: boolean, limit?: number) {
    const params = new URLSearchParams();
    if (featured) params.append('featured', 'true');
    if (limit) params.append('limit', limit.toString());
    const queryString = params.toString() ? `?${params.toString()}` : '';
    return this.get(`/api/news${queryString}`);
  }

  async getInvestments() {
    return this.get('/api/investments');
  }

  async getMatches(type?: 'upcoming' | 'recent') {
    const params = type ? `?type=${type}` : '';
    return this.get(`/api/matches${params}`);
  }

  async getFAQs() {
    return this.get('/api/faqs');
  }

  async getDonations() {
    return this.get('/api/donations');
  }
}

export const apiService = new ApiService();
export default ApiService;
