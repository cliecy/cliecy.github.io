import { posts } from '../data/posts';
import { Link } from 'react-router-dom';
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export default function Blog() {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontSize: '3rem', marginBottom: '2rem' }}
            >
                Blog
            </motion.h1>
            <motion.div variants={container} initial="hidden" animate="show">
                {posts.map((post) => (
                    <motion.div
                        key={post.id}
                        variants={item}
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(10px)',
                            padding: '2rem',
                            borderRadius: '1rem',
                            marginBottom: '2rem',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        <Link to={`/blog/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <h2 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '2rem' }}>{post.title}</h2>
                        </Link>
                        <div style={{ fontSize: '0.9rem', color: '#888', marginBottom: '1rem' }}>
                            {post.date} • {post.tags.join(', ')}
                        </div>
                        <p style={{ lineHeight: 1.6, color: '#ccc' }}>{post.excerpt}</p>
                        <Link
                            to={`/blog/${post.id}`}
                            style={{
                                display: 'inline-block',
                                marginTop: '1rem',
                                color: '#ff0055',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                            }}
                        >
                            Read more →
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
