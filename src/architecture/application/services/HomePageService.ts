import { HomePage } from '@prisma/client';
import prisma from '@/lib/prisma';

export class HomePageService {
  async getAllHomePages(): Promise<HomePage[]> {
    return await prisma.homePage.findMany();
  }

  async getHomePageById(id: string): Promise<HomePage | null> {
    return await prisma.homePage.findUnique({
      where: { id },
      include: { stories: true }
    });
  }
}