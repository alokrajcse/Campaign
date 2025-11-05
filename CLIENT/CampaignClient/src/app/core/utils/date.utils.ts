export class DateUtils {
  static formatDate(date: string | Date | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  }

  static formatDateTime(date: string | Date | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleString();
  }

  static isValidDateRange(startDate: string, endDate: string): boolean {
    if (!startDate || !endDate) return true;
    return new Date(startDate) < new Date(endDate);
  }

  static getDaysDifference(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}