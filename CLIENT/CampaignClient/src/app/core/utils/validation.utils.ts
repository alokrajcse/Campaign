export class ValidationUtils {
  static isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  static isValidPhone(phone: string): boolean {
    return /^\+?[1-9]\d{1,14}$/.test(phone);
  }

  static isValidLeadId(leadId: string): boolean {
    return /^[A-Z]\d{3,}$/.test(leadId);
  }

  // static sanitizeInput(input: string): string {
  //   return input.trim().replace(/[<>]/g, '');
  // }

  static validateRequired(value: any): boolean {
    return value !== null && value !== undefined && value !== '';
  }
}