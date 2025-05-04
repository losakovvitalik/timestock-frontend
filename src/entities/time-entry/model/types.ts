export interface TimeEntry {
  id: number;
  documentId: string;
  name: string | null;
  start_time: string;
  end_time: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
