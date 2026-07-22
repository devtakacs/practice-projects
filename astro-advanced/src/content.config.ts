import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const booksCollection = defineCollection({
    loader: glob({ pattern: "**/*.yaml", base: "./src/content/books" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pages: z.number(),
    }),
});

const articlesCollection = defineCollection({
    type: "content",
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            pubDate: z.date(),
            thumbnail: image().refine((img) => img.format === "jpg", {
                message: "Thumbnail must be a JPG image.",
            })
        }),
});

export const collections = {
    books: booksCollection,
    articles: articlesCollection,
};
