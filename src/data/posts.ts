export interface Post {
    id: string;
    title: string;
    excerpt: string;
    content: string; // Markdown supported
    date: string;
    tags: string[];
}

export const posts: Post[] = [
    {
        "id": "1763892921483",
        "title": "this is a test",
        "excerpt": "",
        "content": "**Hello world!!!**\n\n\n\n\n![Image](data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAF2AMgDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMH/8QAHBABAAMAAwEBAAAAAAAAAAAAAAECAwQRITET/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AMZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABba/FtxcKZYXpvWLftpbTuL++dR151Hn2ewRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABbl75cjStsuNnx4rnWs1pMzFpiOpt7P2fqIAAAAAAAAAAAAAAAAAAA//2Q==)\n\n",
        "date": "2025-11-23",
        "tags": []
    },
    {
        "id": "1",
        "title": "Welcome to My New Portfolio",
        "excerpt": "A look into how I built this 3D interactive site using React Three Fiber.",
        "content": "\n# Welcome to My New Portfolio\n\nThis site is a complete revamp of my previous work. I wanted to create something that stands out, something that feels \"alive\".\n\n## Tech Stack\n\n- **React**: The core framework.\n- **Three.js / React Three Fiber**: For the 3D elements you see in the background.\n- **Framer Motion**: For the smooth page transitions and animations.\n\n## Why 3D?\n\nThe web is moving towards more immersive experiences. 3D allows for a depth of interaction that flat design simply cannot match.\n\nStay tuned for more updates!\n    ",
        "date": "2025-11-23",
        "tags": [
            "React",
            "Three.js",
            "Portfolio"
        ]
    },
    {
        "id": "2",
        "title": "The Future of Web Development",
        "excerpt": "Why I believe immersive web experiences are the next big thing.",
        "content": "\n# The Future of Web Development\n\nWeb development is constantly evolving. From static HTML pages to dynamic web apps, and now to immersive 3D experiences.\n\n## Key Trends\n\n1.  **Performance**: With WebGPU, we can render console-quality graphics in the browser.\n2.  **AI Integration**: AI is helping us write code faster and smarter.\n3.  **Immersive UI**: Spatial computing is influencing web design.\n    ",
        "date": "2025-11-20",
        "tags": [
            "WebDev",
            "Trends"
        ]
    }
];
