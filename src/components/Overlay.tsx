import { motion } from 'framer-motion';
import { personalInfo } from '../config';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.5,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } as const },
};

export default function Overlay() {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10
        }}>
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                style={{ textAlign: 'center', pointerEvents: 'auto' }}
            >
                <motion.h1 variants={item} style={{
                    fontSize: '5rem',
                    fontWeight: 800,
                    margin: 0,
                    background: 'linear-gradient(to right, #fff, #aaa)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.05em'
                }}>
                    {personalInfo.name}
                </motion.h1>
                <motion.p variants={item} style={{
                    fontSize: '1.5rem',
                    color: '#ccc',
                    marginTop: '1rem',
                    fontWeight: 300
                }}>
                    {personalInfo.title}
                </motion.p>
                <motion.p variants={item} style={{
                    fontSize: '1rem',
                    color: '#888',
                    marginTop: '0.5rem',
                    maxWidth: '600px',
                    lineHeight: '1.5'
                }}>
                    {personalInfo.description}
                </motion.p>
                <motion.div variants={item} style={{ marginTop: '3rem', display: 'flex', gap: '2rem', justifyContent: 'center' }}>
                    {personalInfo.socialLinks.map((link) => (
                        <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                            {link.label}
                        </a>
                    ))}
                </motion.div>
            </motion.div>

            <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', fontSize: '0.8rem', color: '#666' }}>
                {personalInfo.footerText}
            </div>
        </div>
    );
}

const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.2rem',
    border: '1px solid rgba(255,255,255,0.2)',
    padding: '0.8rem 2rem',
    borderRadius: '50px',
    transition: 'all 0.3s ease',
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(10px)'
};
