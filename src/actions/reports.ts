'use server';

import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

export async function getReports() {
  return await prisma.report.findMany({
    orderBy: { created_at: 'desc' },
  });
}

export async function createReport(data: any) {
  return await prisma.report.create({
    data: {
      title: data.title,
      description: data.description,
      category: data.category,
      latitude: data.latitude,
      longitude: data.longitude,
      status: 'pendente'
    }
  });
}

export async function updateReportStatus(id: string, status: string) {
  const session = await getSession();
  if (!session) throw new Error('Não autorizado');

  return await prisma.report.update({
    where: { id },
    data: { status }
  });
}

export async function getReportsCount() {
  return await prisma.report.count();
}

export async function getSimulationsCount() {
  return await prisma.simulation.count();
}
