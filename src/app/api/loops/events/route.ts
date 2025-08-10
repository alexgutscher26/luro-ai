import { NextRequest, NextResponse } from 'next/server';
import { LoopsClient } from 'loops';

const loops = new LoopsClient(process.env.LOOPS_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { email, eventName, eventProperties } = await request.json();

    // Send event to Loops
    const result = await loops.sendEvent({
      email,
      eventName,
      eventProperties,
    });

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('Loops event tracking error:', error);
    return NextResponse.json(
      { error: 'Failed to send event' },
      { status: 500 }
    );
  }
}