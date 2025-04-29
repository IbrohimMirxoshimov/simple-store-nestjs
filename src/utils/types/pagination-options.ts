export interface IPaginationOptions {
  page: number;
  limit: number;
  message?: string;
  filters?: Record<string, any>;
}
