import { galleryItems } from '../data/gallery';
import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 },
};

export default function Gallery() {
    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center' }}
            >
                Gallery
            </motion.h1>
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2rem',
                }}
            >
                {galleryItems.map((art) => (
                    <motion.div
                        key={art.id}
                        variants={item}
                        whileHover={{ scale: 1.05, zIndex: 10 }}
                        style={{
                            position: 'relative',
                            borderRadius: '1rem',
                            overflow: 'hidden',
                            aspectRatio: '4/3',
                            cursor: 'pointer',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                        }}
                    >
                        <img
                            src={art.imageUrl}
                            alt={art.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            padding: '1rem',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                            color: '#fff',
                        }}>
                            <h3 style={{ margin: 0 }}>{art.title}</h3>
                            <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>{art.description}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
