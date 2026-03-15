import { prisma } from '../config/prisma.js';
import type { Film, Prisma } from '../generated/prisma/client.js';

export const find = async () => {
    return await prisma.film.findMany();
};

export const create = async (data: Prisma.FilmCreateInput): Promise<Film> => {
    return await prisma.film.create({ data });
};
