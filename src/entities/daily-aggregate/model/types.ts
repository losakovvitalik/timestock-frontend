export interface DailyAggregateDTO {
  id: number;
  documentId: string;
  date: string; // формат: 'YYYY-MM-DD'
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  publishedAt: string; // ISO 8601
  duration: number; // в секундах
  tracks_count: number;
}
