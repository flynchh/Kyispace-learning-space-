import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const topics = await prisma.topic.findMany({
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({
      topics: topics.map(topic => ({
        id: topic.id,
        name: topic.name,
        category: topic.category,
        icon: topic.icon,
        order: topic.order,
      }))
    });
  } catch (error) {
    console.error('Topics API error:', error);
    return NextResponse.json({ topics: [] });
  }
}