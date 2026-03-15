import type { Request, Response } from 'express';
import { find, create } from '../models/films.js';
import * as z from 'zod';
import type { Prisma } from '../generated/prisma/client.js';

const FilmSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1),
    synopsis: z.string().min(5),
    premiere: z.preprocess((val: string) => new Date(val), z.date()),
    rating: z.preprocess((val) => Number(val), z.number().gte(0).lte(5)),
    duration: z.preprocess((val) => Number(val), z.number().int().positive()),
});

export const getAllFilms = async (req: Request, res: Response) => {
    const films = await find();
    if (films.length === 0) return res.status(404).json('No films found');

    return res.status(200).json({ films });
};

export const register = async (req: Request, res: Response) => {
    const parsedFilm = FilmSchema.parse(req.body);

    const file = req.file;
    if (!file) return res.status(400).json('Film needs a poster');

    const filePath = file.path;

    const data: Prisma.FilmCreateInput = {
        title: parsedFilm.title,
        synopsis: parsedFilm.synopsis,
        premiere: parsedFilm.premiere,
        rating: parsedFilm.rating,
        duration: parsedFilm.duration,
        posterPath: filePath,
    };

    const film = await create(data);
    if (!film) return res.status(400).json('Failed to create film');

    return res.status(201).json({ film });
};
