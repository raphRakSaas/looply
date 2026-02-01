export type AppointmentStatus = "planifié" | "terminé" | "annulé" | "no_show";
export type PaymentStatus = "payé" | "impayé" | "inconnu";

export interface Appointment {
  id: string;
  organization_id: string;
  client_id: string;
  scheduled_at: string;
  status: AppointmentStatus;
  payment_status: PaymentStatus;
  amount?: number;
  service_name?: string;
  created_at: string;
  updated_at: string;
}
