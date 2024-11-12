import { prisma } from '../db';
import { createReferralCode } from '../utils/referralCode';

export async function generateReferralCode(userId: string) {
  const code = createReferralCode(userId);
  
  return prisma.referralCode.create({
    data: {
      code,
      userId,
      expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days validity
      trackingData: {
        generatedFrom: 'web_app',
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      }
    }
  });
}

export async function validateReferralCode(code: string) {
  const referral = await prisma.referralCode.findUnique({
    where: { code },
    include: { user: true }
  });

  if (!referral) {
    throw new Error('Invalid referral code');
  }

  if (referral.status !== 'active') {
    throw new Error('Referral code is no longer active');
  }

  if (referral.expiresAt && referral.expiresAt < new Date()) {
    throw new Error('Referral code has expired');
  }

  if (referral.usageCount >= referral.usageLimit) {
    throw new Error('Referral code usage limit reached');
  }

  return referral;
}

export async function trackReferralUsage(code: string, newUserId: string) {
  return prisma.referralCode.update({
    where: { code },
    data: {
      usageCount: { increment: 1 },
      usedBy: { connect: { id: newUserId } },
      trackingData: {
        lastUsed: new Date().toISOString(),
        usedBy: newUserId
      }
    }
  });
}