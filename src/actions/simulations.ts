'use server';

import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

export async function getSimulations() {
  return await prisma.simulation.findMany({
    orderBy: { created_at: 'desc' },
  });
}

export async function createSimulation(data: any) {
  const session = await getSession();
  if (!session) throw new Error('Não autorizado');

  return await prisma.simulation.create({
    data: {
      type: data.type,
      dam_name: data.dam_name,
      latitude: data.latitude,
      longitude: data.longitude,
      rupture_type: data.rupture_type,
      water_reach: data.water_reach,
      water_velocity: data.water_velocity,
      water_depth: data.water_depth,
      arrival_force: data.arrival_force,
      rain_intensity: data.rain_intensity,
      rain_duration: data.rain_duration,
      rain_volume: data.rain_volume,
      return_period_tag: data.return_period_tag,
      others: data.others,
      media_url: data.media_url,
      video_url: data.video_url,
      image_urls: data.image_urls || [],
      time_of_day: data.time_of_day,
      image_titles: data.image_titles || [],
    }
  });
}

export async function updateSimulation(id: string, data: any) {
  const session = await getSession();
  if (!session) throw new Error('Não autorizado');

  return await prisma.simulation.update({
    where: { id },
    data,
  });
}

export async function deleteSimulation(id: string) {
  const session = await getSession();
  if (!session) throw new Error('Não autorizado');

  return await prisma.simulation.delete({
    where: { id }
  });
}
