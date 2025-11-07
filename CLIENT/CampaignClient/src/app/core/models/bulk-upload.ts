export interface BulkUploadResult {
  processed: number;
  updated: number;
  rejected: number;
  errors: string[];
}