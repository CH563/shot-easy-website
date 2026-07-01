import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        updatedDate: z.date().optional(),
        cover: z.string().optional(),
        coverAlt: z.string().optional(),
        author: z.string().default('ShotEasy'),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false)
    })
});

export const collections = { blog };
