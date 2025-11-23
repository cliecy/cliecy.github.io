import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const links = [
    { path: '/', label: 'Home' },
    { path: '/blog', label: 'Blog' },
    { path: '/gallery', label: 'Gallery' },
];

export default function Navbar() {
    const location = useLocation();

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            padding: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 100,
            boxSizing: 'border-box',
        }}>
            <div style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.05em' }}>
                CLIECY
            </div>
            <div style={{ display: 'flex', gap: '2rem' }}>
                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        style={{
                            textDecoration: 'none',
                            color: '#fff',
                            position: 'relative',
                            opacity: location.pathname === link.path ? 1 : 0.6,
                            transition: 'opacity 0.3s',
                        }}
                    >
                        {link.label}
                        {location.pathname === link.path && (
                            <motion.div
                                layoutId="underline"
                                style={{
                                    position: 'absolute',
                                    bottom: -5,
                                    left: 0,
                                    width: '100%',
                                    height: 2,
                                    background: '#ff0055',
                                }}
                            />
                        )}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
