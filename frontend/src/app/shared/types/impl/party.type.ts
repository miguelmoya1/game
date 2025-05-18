export interface Party {
  id: string;
  leaderId: string;
  memberIds: string[];
  maxMembers: number;
  creationTime: string; // ISO string
  description?: string;
  status?: 'open' | 'invite_only' | 'closed';
}
