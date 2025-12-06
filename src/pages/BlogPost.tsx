import { useParams, Link } from 'react-router-dom';
import { posts } from '../data/posts';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
                        remarkPlugins={[remarkGfm]}
                        urlTransform={(value) => value}
                        components={{
                            img: ({ node, ...props }) => (
                                <img
                                    {...props}
                                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '0.5rem', margin: '1rem 0' }}
                                    alt={props.alt || ''}
                                />
                            ),
                            table: ({ node, ...props }) => (
                                <table {...props} style={{
                                    borderCollapse: 'collapse',
                                    width: '100%',
                                    margin: '1rem 0',
                                    border: '1px solid rgba(255,255,255,0.2)'
                                }} />
                            ),
                            th: ({ node, ...props }) => (
                                <th {...props} style={{
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    padding: '0.75rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    textAlign: 'left',
                                    fontWeight: 'bold'
                                }} />
                            ),
                            td: ({ node, ...props }) => (
                                <td {...props} style={{
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    padding: '0.75rem'
                                }} />
                            ),
                            strong: ({ node, ...props }) => (
                                <strong {...props} style={{ fontWeight: 'bold', color: '#fff' }} />
                            ),
                            em: ({ node, ...props }) => (
                                <em {...props} style={{ fontStyle: 'italic' }} />
                            ),
                            code: ({ node, className, children, ...props }: any) => {
                                const inline = !className;
                                return inline ?
                                    <code {...props} style={{
                                        background: 'rgba(255,255,255,0.1)',
                                        padding: '0.2rem 0.4rem',
                                        borderRadius: '0.25rem',
                                        fontSize: '0.9em',
                                        fontFamily: 'monospace'
                                    }}>{children}</code> :
                                    <code {...props} className={className} style={{ fontFamily: 'monospace' }}>{children}</code>
                            },
                            blockquote: ({ node, ...props }) => (
                                <blockquote {...props} style={{
                                    borderLeft: '4px solid #ff0055',
                                    paddingLeft: '1rem',
                                    margin: '1rem 0',
                                    fontStyle: 'italic',
                                    color: '#aaa'
                                }} />
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
