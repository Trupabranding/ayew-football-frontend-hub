
# Laravel 12 + Filament Backend Development Prompt

## Project Overview
Create a Laravel 12 backend API with Filament admin panel for a football academy website. The structure follows: Website → Pages → Sections, where sections can scaffold data from various modules.

## Tech Stack
- Laravel 12
- Filament v4 (Admin Panel)
- MySQL/PostgreSQL
- Laravel Sanctum (API Authentication)
- Spatie Laravel Permission (Role-based access)

## Database Structure

### Core Tables

#### websites
```sql
- id (uuid, primary key)
- name (string)
- slug (string, unique)
- domain (string, nullable)
- status (enum: active, inactive)
- meta (json: title, description, keywords)
- settings (json: theme, logo, colors)
- created_at, updated_at
```

#### pages
```sql
- id (uuid, primary key)
- website_id (uuid, foreign key)
- name (string)
- slug (string)
- title (string)
- description (text, nullable)
- status (enum: active, inactive, draft)
- order (integer)
- meta (json: seo_title, seo_description, og_image)
- created_at, updated_at
```

#### sections
```sql
- id (uuid, primary key)
- page_id (uuid, foreign key)
- name (string)
- slug (string)
- type (enum: hero, about, players, investment, donations, matches, news, faq, contact, custom)
- order (integer)
- status (enum: active, inactive)
- config (json: title, subtitle, description, styling)
- data (json: dynamic content based on type)
- created_at, updated_at
```

### Module Tables

#### players
```sql
- id (uuid, primary key)
- name (string)
- position (string)
- age (integer)
- nationality (string)
- image (string, nullable)
- bio (text, nullable)
- stats (json: goals, assists, matches)
- featured (boolean, default false)
- status (enum: active, inactive)
- created_at, updated_at
```

#### news_articles
```sql
- id (uuid, primary key)
- title (string)
- slug (string, unique)
- excerpt (text)
- content (longtext)
- image (string, nullable)
- author (string)
- category (string)
- featured (boolean, default false)
- published_at (timestamp, nullable)
- status (enum: published, draft, archived)
- created_at, updated_at
```

#### investment_packages
```sql
- id (uuid, primary key)
- title (string)
- description (text)
- type (enum: organization, team, player)
- min_amount (decimal, 10,2)
- expected_returns (string)
- image (string, nullable)
- features (json array)
- status (enum: active, inactive)
- created_at, updated_at
```

#### matches
```sql
- id (uuid, primary key)
- opponent (string)
- date (date)
- time (time)
- venue (string)
- competition (string)
- is_home (boolean)
- status (enum: upcoming, completed, cancelled)
- home_score (integer, nullable)
- away_score (integer, nullable)
- scorers (json array, nullable)
- created_at, updated_at
```

#### faqs
```sql
- id (uuid, primary key)
- question (string)
- answer (text)
- category (string)
- order (integer)
- status (enum: active, inactive)
- created_at, updated_at
```

#### donation_campaigns
```sql
- id (uuid, primary key)
- title (string)
- description (text)
- goal_amount (decimal, 10,2)
- current_amount (decimal, 10,2, default 0)
- image (string, nullable)
- featured (boolean, default false)
- status (enum: active, completed, paused)
- end_date (date, nullable)
- created_at, updated_at
```

## Required API Endpoints

### Core Endpoints
```
GET /api/websites/{id}
GET /api/websites/{websiteId}/pages
GET /api/websites/{websiteId}/pages/{slug}
GET /api/pages/{pageId}/sections
```

### Module Endpoints
```
GET /api/players?featured=true
GET /api/news?featured=true&limit=3
GET /api/investments
GET /api/matches?type=upcoming
GET /api/matches?type=recent
GET /api/faqs
GET /api/donations
```

## Laravel Models

### Key Relationships
- Website hasMany Pages
- Page hasMany Sections, belongsTo Website
- Section belongsTo Page
- All module models are independent but can be referenced by sections

### Model Features Required
- UUID primary keys
- Eloquent API Resources for clean JSON responses
- Scopes for filtering (featured, active, etc.)
- Mutators/Accessors for JSON fields
- Image handling with Laravel Storage

## Filament Admin Panel Requirements

### Dashboard
- Website overview stats
- Recent activity
- Quick actions

### Resource Management
1. **WebsiteResource** - Manage websites
2. **PageResource** - Manage pages with section builder
3. **SectionResource** - Dynamic section management
4. **PlayerResource** - Player profiles with image upload
5. **NewsResource** - News articles with rich text editor
6. **InvestmentResource** - Investment packages
7. **MatchResource** - Match management
8. **FAQResource** - FAQ management
9. **DonationResource** - Donation campaigns

### Features Needed
- Rich text editor for content
- Image upload handling
- Bulk actions
- Export functionality
- User roles (Admin, Editor, Viewer)
- Section builder with drag-and-drop ordering

## Section Data Scaffolding Logic

Each section type should automatically populate relevant data:

- **hero**: Static config data
- **about**: Static content with possible team stats
- **players**: Pull from players table (featured players)
- **investment**: Pull from investment_packages table
- **donations**: Pull from donation_campaigns table
- **matches**: Pull recent/upcoming from matches table
- **news**: Pull featured articles from news_articles table
- **faq**: Pull from faqs table grouped by category
- **contact**: Static contact information

## Implementation Steps

1. **Setup Laravel 12 project with required packages**
2. **Create migrations for all tables**
3. **Generate models with relationships**
4. **Create API controllers and resources**
5. **Setup Filament admin panel**
6. **Create Filament resources**
7. **Implement section data scaffolding logic**
8. **Add authentication and permissions**
9. **Create seeders with sample data**
10. **Test all API endpoints**

## Sample Data Requirements

Please create realistic sample data for:
- 1 Website (Mafarah Ayew Football Academy)
- 1 Homepage with all section types
- 10+ Players
- 5+ News articles
- 3 Investment packages
- 10+ Recent/upcoming matches
- 8+ FAQs in different categories
- 2+ Donation campaigns

## Additional Features

- **API Rate Limiting**
- **Response Caching** for static content
- **Image optimization** and thumbnails
- **SEO-friendly URLs**
- **CORS configuration** for frontend integration
- **Validation rules** for all inputs
- **Error handling** with proper HTTP status codes

## Frontend Integration Notes

The React frontend expects:
- Clean JSON responses matching the TypeScript interfaces
- Proper HTTP status codes
- Consistent error response format
- CORS headers for development
- Optional authentication for admin features

This structure provides maximum flexibility while keeping the implementation simple and maintainable.
