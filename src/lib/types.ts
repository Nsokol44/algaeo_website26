// Domain + database types for the Algaeo B2B SaaS site: blog CMS + leads
// (demo requests) + auth profiles. No commerce types — this business sells
// software/agronomic intelligence, not a physical, regulated product.

export type PostStatus = "draft" | "published";

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  category: string | null;
  author: string | null;
  status: PostStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  is_admin: boolean;
  created_at: string;
}

export interface Lead {
  id: string;
  name: string | null;
  email: string;
  org: string | null;
  message: string | null;
  source: string;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: Post;
        Insert: Partial<Post> & { slug: string; title: string };
        Update: Partial<Post>;
        Relationships: [];
      };
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & { id: string };
        Update: Partial<Profile>;
        Relationships: [];
      };
      leads: {
        Row: Lead;
        Insert: { email: string; name?: string; org?: string; message?: string; source?: string };
        Update: Partial<Lead>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: { post_status: PostStatus };
    CompositeTypes: Record<string, never>;
  };
}
