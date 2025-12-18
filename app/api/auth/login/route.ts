import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phoneNumber } = body;

    // 1. Check if user exists, if not create them
    // (In real app, verify OTP here first)
    let user = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { phoneNumber },
      });
    }

    // 2. Return the user ID (or a session token)
    return NextResponse.json({ success: true, userId: user.id });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Login failed' }, { status: 500 });
  }
}