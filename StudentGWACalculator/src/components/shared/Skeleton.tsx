import React from 'react';
import { motion } from 'framer-motion';

// Basic pulse animation for the skeleton
const pulseTransition = {
    duration: 1.5,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut" as const
};

interface SkeletonProps {
    className?: string;
    width?: string | number;
    height?: string | number;
    variant?: 'text' | 'circular' | 'rectangular' | 'card';
}

export const Skeleton: React.FC<SkeletonProps> = ({
    className = '',
    width,
    height,
    variant = 'text'
}) => {
    const baseStyles = "bg-gray-200 dark:bg-[#1a1a1a] rounded";

    const getVariantStyles = () => {
        switch (variant) {
            case 'circular':
                return 'rounded-full';
            case 'text':
                return 'rounded h-4 w-full';
            case 'rectangular':
                return 'rounded-md';
            case 'card':
                return 'rounded-xl border border-gray-200 dark:border-[#1a1a1a]';
            default:
                return 'rounded';
        }
    };

    const styles = {
        width: width,
        height: height,
    };

    return (
        <motion.div
            className={`${baseStyles} ${getVariantStyles()} ${className}`}
            style={styles}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={pulseTransition}
        />
    );
};

export const SkeletonText: React.FC<{ rows?: number; className?: string }> = ({ rows = 1, className = '' }) => (
    <div className={`space-y-2 ${className}`}>
        {Array.from({ length: rows }).map((_, i) => (
            <Skeleton
                key={i}
                variant="text"
                width={i === rows - 1 && rows > 1 ? '70%' : '100%'}
            />
        ))}
    </div>
);

export const SkeletonCard: React.FC<{
    className?: string;
    hasImage?: boolean; // If true, adds a large rectangular block at top
    hasTitle?: boolean; // If true, adds a title bar
    lines?: number;     // Number of text lines
}> = ({ className = '', hasImage = false, hasTitle = true, lines = 3 }) => {
    return (
        <div className={`p-4 border border-gray-200 dark:border-[#1a1a1a] rounded-xl bg-white dark:bg-[#0a0a0a] space-y-4 ${className}`}>
            {hasImage && (
                <Skeleton variant="rectangular" height={160} className="w-full mb-4" />
            )}
            {hasTitle && (
                <Skeleton variant="text" width="60%" height={24} className="mb-2" />
            )}
            <SkeletonText rows={lines} />
        </div>
    );
};
