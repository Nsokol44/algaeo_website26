// Domain + database types. The Database type uses the full shape supabase-js
// expects (Views/Functions/Enums/CompositeTypes/Relationships) so query results
// resolve to real row types instead of `never`. In production you may replace
// this with `supabase gen types typescript`.

export type PostStatus = "draft" | "published";
export type OrderStatus = "pending" | "paid" | "fulfilled" | "cancelled";

export interface Product {
  id: string;
  slug: string;
  title: string;
  short_description: string | null;
  description: string | null;
  price: number;
  sku: string | null;
  in_stock: boolean;
  categories: string[];
  image_url: string | null;
  featured: boolean;
  created_at: string;
}

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
      products: {
        Row: Product;
        Insert: Partial<Product> & { slug: string; title: string };
        Update: Partial<Product>;
        Relationships: [];
      };
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
    Enums: { post_status: PostStatus; order_status: OrderStatus };
    CompositeTypes: Record<string, never>;
  };
}
