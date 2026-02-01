/**
 * Types générés depuis Supabase (optionnel).
 * Quand la DB est prête : npx supabase gen types typescript --local > types/database.ts
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Json = any;

export interface Database {
  public: {
    tables: {
      organizations: { Row: unknown; Insert: unknown; Update: unknown };
      clients: { Row: unknown; Insert: unknown; Update: unknown };
      appointments: { Row: unknown; Insert: unknown; Update: unknown };
      [key: string]: { Row: unknown; Insert: unknown; Update: unknown };
    };
  };
}
