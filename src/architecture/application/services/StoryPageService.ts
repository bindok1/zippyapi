import { StoryPage } from '@prisma/client';
import prisma from '@/lib/prisma';

export class StoryPageService {
  async getAllStoryPages(): Promise<StoryPage[]> {
    return await prisma.storyPage.findMany({
      include: {
        home_page: true
      }
    });
  }

  async getStoryPageById(id: string): Promise<StoryPage | null> {
    return await prisma.storyPage.findUnique({
      where: { id: id },
      include: {
        home_page: true
      }
    });
  }

  async getStoryPagesByHomePageId(homePageId: string): Promise<StoryPage | null> {
    return await prisma.storyPage.findFirst({
      where: {
        home_page_id : homePageId
      },
      include: {
        home_page: true
      }
    });
  }
}