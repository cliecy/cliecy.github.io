import { useState } from 'react';
import { posts, Post } from '../data/posts';
import { motion } from 'framer-motion';
import MDEditor from '@uiw/react-md-editor';

export default function Admin() {
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('**Hello world!!!**');
    const [tags, setTags] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');

    const handleSelectPost = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const postId = e.target.value;
        if (!postId) {
            // Clear form for new post
            setId('');
            setTitle('');
            setExcerpt('');
            setContent('');
            setTags('');
            return;
        }

        const post = posts.find(p => p.id === postId);
        if (post) {
            setId(post.id);
            setTitle(post.title);
            setExcerpt(post.excerpt);
            setContent(post.content);
            setTags(post.tags.join(', '));
        }
    };

    const handleGenerate = () => {
        const postId = id || Date.now().toString();
        const newPost: Post = {
            id: postId,
            title,
            excerpt,
            content,
            date: new Date().toISOString().split('T')[0],
            tags: tags.split(',').map(t => t.trim()).filter(t => t),
        };

        const exists = posts.find(p => p.id === postId);
        let updatedPosts;

        if (exists) {
            updatedPosts = posts.map(p => p.id === postId ? newPost : p);
        } else {
            updatedPosts = [newPost, ...posts];
        }

        const code = `export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Markdown supported
  date: string;
  tags: string[];
}

export const posts: Post[] = ${JSON.stringify(updatedPosts, null, 2)};
`;
        setGeneratedCode(code);
    };

    const onImageUpload = async (file: File): Promise<string> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    // Resize if too big
                    const maxWidth = 800;
                    const scale = maxWidth / img.width;
                    const width = scale < 1 ? maxWidth : img.width;
                    const height = scale < 1 ? img.height * scale : img.height;

                    canvas.width = width;
                    canvas.height = height;
                    ctx?.drawImage(img, 0, 0, width, height);

                    // Compress
                    resolve(canvas.toDataURL('image/jpeg', 0.7));
                };
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        });
    };

    const handlePaste = async (event: React.ClipboardEvent) => {
        const items = event.clipboardData.items;
        for (const item of items) {
            if (item.type.indexOf('image') !== -1) {
                event.preventDefault();
                const file = item.getAsFile();
                if (file) {
                    const base64 = await onImageUpload(file);
                    setContent(prev => prev + `\n\n![Image](${base64})\n\n`);
                }
            }
        }
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem', color: '#fff' }}>
            <h1>Content Creator</h1>
            <p>Draft or edit your post here. <strong>Paste images directly!</strong> Then copy the code below.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <select onChange={handleSelectPost} style={inputStyle} value={id}>
                    <option value="">-- Create New Post --</option>
                    {posts.map(p => (
                        <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                </select>

                <input
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    style={inputStyle}
                />
                <input
                    placeholder="Excerpt"
                    value={excerpt}
                    onChange={e => setExcerpt(e.target.value)}
                    style={inputStyle}
                />
                <input
                    placeholder="Tags (comma separated)"
                    value={tags}
                    onChange={e => setTags(e.target.value)}
                    style={inputStyle}
                />

                <div data-color-mode="dark" onPaste={handlePaste}>
                    <MDEditor
                        value={content}
                        onChange={(val) => setContent(val || '')}
                        height={400}
                        style={{ background: 'transparent' }}
                    />
                </div>

                <button onClick={handleGenerate} style={buttonStyle}>
                    Generate Code
                </button>
            </div>

            {generatedCode && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h3>Generated Code for src/data/posts.ts</h3>
                    <textarea
                        readOnly
                        value={generatedCode}
                        style={{ ...inputStyle, minHeight: '300px', fontSize: '0.8rem', fontFamily: 'monospace' }}
                        onClick={(e) => e.currentTarget.select()}
                    />
                    <p style={{ fontSize: '0.8rem', color: '#aaa' }}>Click to select all, then Copy (Cmd+C) and Paste into src/data/posts.ts</p>
                </motion.div>
            )}
        </div>
    );
}

const inputStyle = {
    padding: '1rem',
    borderRadius: '0.5rem',
    border: '1px solid rgba(255,255,255,0.2)',
    background: 'rgba(0,0,0,0.5)',
    color: '#fff',
    width: '100%',
    boxSizing: 'border-box' as const,
};

const buttonStyle = {
    padding: '1rem 2rem',
    borderRadius: '0.5rem',
    border: 'none',
    background: '#ff0055',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
};
