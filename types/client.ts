export interface Client {
  id: string;
  organization_id: string;
  name: string;
  email?: string;
  phone?: string;
  note?: string;
  created_at: string;
  updated_at: string;
}
