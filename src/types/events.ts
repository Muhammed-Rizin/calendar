export interface EventCardProps {
  id: string;
  isActive: boolean;
  name: string;
  description: string | null;
  durationInMinutes: number;
  clerkUserId: string;
}

export interface EventType {
  id: string;
  isActive: boolean;
  name: string;
  description?: string ;
  durationInMinutes: number;
  clerkUserId: string;
}
