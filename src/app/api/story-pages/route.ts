import { NextResponse } from 'next/server';
import { StoryPageService } from '@/architecture/application/services/StoryPageService';

const storyPageService = new StoryPageService();

export async function GET() {
  try {
    const storyPages = await storyPageService.getAllStoryPages();
    return NextResponse.json({
      success: true,
      status: 200,
      message: 'Story pages retrieved successfully',
      data: storyPages,
      timestamp: new Date().toISOString()
    }, { status: 200 });
  } catch (error) {
    console.error('Story pages error:', error);
    return NextResponse.json({
      success: false,
      status: 500,
      message: 'Failed to fetch story pages',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}