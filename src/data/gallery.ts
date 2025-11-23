export interface GalleryItem {
    id: string;
    title: string;
    description: string;
    imageUrl: string; // Placeholder for now, can be local or remote
}

export const galleryItems: GalleryItem[] = [
    {
        id: '1',
        title: 'Neon City',
        description: 'A cyberpunk inspired concept art.',
        imageUrl: 'https://picsum.photos/id/237/800/600',
    },
    {
        id: '2',
        title: 'Abstract Shapes',
        description: 'Exploration of geometry and light.',
        imageUrl: 'https://picsum.photos/id/238/800/600',
    },
    {
        id: '3',
        title: 'Mountain View',
        description: 'Nature photography from my latest trip.',
        imageUrl: 'https://picsum.photos/id/239/800/600',
    },
    {
        id: '4',
        title: 'Tech Setup',
        description: 'My development workspace.',
        imageUrl: 'https://picsum.photos/id/240/800/600',
    },
];
