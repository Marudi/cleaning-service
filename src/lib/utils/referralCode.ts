import { customAlphabet } from 'nanoid';

// Create a custom alphabet for referral codes that is unambiguous
// Excludes similar looking characters like 0/O, 1/I/l, etc.
const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';

// Generate a 8-character referral code
const generateReferralCode = customAlphabet(alphabet, 8);

export function createReferralCode(userId: string): string {
  // Generate unique code
  const uniqueCode = generateReferralCode();
  
  // Add prefix for different user types (e.g., CUS for customer)
  const prefix = 'IMZ';
  
  return `${prefix}-${uniqueCode}`;
}