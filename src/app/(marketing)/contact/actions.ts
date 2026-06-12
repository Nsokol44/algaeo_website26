"use server";

import { createClient } from "@/lib/supabase/server";

export interface LeadInput {
  name: string;
  email: string;
  org?: string;
  message: string;
  source?: string;
}

export async function submitLead(input: LeadInput) {
  if (!input.email?.includes("@")) {
    return { error: "Please enter a valid email address." };
  }
  if (!input.message?.trim()) {
    return { error: "Please include a message." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert({
    name: input.name?.trim() || null,
    email: input.email.trim(),
    org: input.org?.trim() || null,
    message: input.message.trim(),
    source: input.source ?? "contact",
  });

  if (error) return { error: "Something went wrong. Please email us directly." };
  return { ok: true };
}
