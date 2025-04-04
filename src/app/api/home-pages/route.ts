import { NextResponse } from 'next/server';
import { HomePageService } from '@/architecture/application/services/HomePageService';

const homePageService = new HomePageService();

export async function GET() {
  try {
    const homePages = await homePageService.getAllHomePages();
    return NextResponse.json({
      success: true,
      status: 200,
      message: 'Home pages retrieved successfully',
      data: homePages,
      timestamp: new Date().toISOString()
    }, { status: 200 });
  } catch (error) {
    console.error('Home pages error:', error);
    return NextResponse.json({
      success: false,
      status: 500,
      message: 'Failed to fetch home pages',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}