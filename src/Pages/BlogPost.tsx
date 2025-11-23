import { useParams, Link } from 'react-router-dom';
import { posts } from '../data/posts';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

export default function BlogPost() {
    const { id } = useParams();
    const post = posts.find((p) => p.id === id);

    if (!post) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>Post not found</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}
        >
            <Link to="/blog" style={{ color: '#888', textDecoration: 'none', marginBottom: '2rem', display: 'block' }}>
                ← Back to Blog
            </Link>
            <article style={{
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(20px)',
                padding: '3rem',
                borderRadius: '1rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
                <h1 style={{ fontSize: '3rem', marginTop: 0 }}>{post.title}</h1>
                <div style={{ color: '#888', marginBottom: '2rem' }}>
                    {post.date} • {post.tags.join(', ')}
                </div>
                <div style={{ lineHeight: 1.8, fontSize: '1.1rem', color: '#ddd' }}>
                    <ReactMarkdown
                        urlTransform={(value) => value}
                        components={{
                            img: ({ node, ...props }) => (
                                <img
                                    {...props}
                                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '0.5rem', margin: '1rem 0' }}
                                    alt={props.alt || ''}
                                />
                            ),
                        }}
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>
            </article>
        </motion.div>
    );
}
