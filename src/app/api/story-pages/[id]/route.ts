import { NextRequest, NextResponse } from 'next/server';
import type { NextApiRequest } from 'next';
import { StoryPageService } from '@/architecture/application/services/StoryPageService';

const storyPageService = new StoryPageService();


export async function GET(
  request: NextRequest,
  {params}: {params: {id: string}}
) {
  try {
    const {id} = await params;
    const storyPage = await storyPageService.getStoryPageById(id);
    
    if (!storyPage) {
      return NextResponse.json({
        success: false,
        status: 404,
        message: 'Story page not found',
        error: 'Resource not found',
        timestamp: new Date().toISOString()
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      status: 200,
      message: 'Story page retrieved successfully',
      data: storyPage,
      timestamp: new Date().toISOString()
    }, { status: 200 });

  } catch (error) {
    console.error('Story page error:', error);
    return NextResponse.json({
      success: false,
      status: 500,
      message: 'Failed to fetch story page',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}