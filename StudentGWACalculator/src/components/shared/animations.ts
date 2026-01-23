import { Transition } from 'framer-motion';

export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: 'easeOut' } as Transition
};

export const slideUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } as Transition
};

export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.05
        }
    }
};

export const scaleIn = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3, ease: 'easeOut' } as Transition
};

export const tapScale = {
    whileTap: { scale: 0.98 }
};

export const hoverScale = {
    whileHover: { scale: 1.01, transition: { duration: 0.2 } }
};
