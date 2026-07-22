'use client';

import React, { CSSProperties } from 'react';
import { motion } from 'framer-motion';

interface ResponsiveImage {
    src: string;
    alt?: string;
    srcSet?: string;
}

interface AnimationConfig {
    preview?: boolean;
    scale: number;
    speed: number;
}

interface NoiseConfig {
    opacity: number;
    scale: number;
}

interface ShadowOverlayProps {
    type?: 'preset' | 'custom';
    presetIndex?: number;
    customImage?: ResponsiveImage;
    sizing?: 'fill' | 'stretch';
    color?: string;
    animation?: AnimationConfig;
    noise?: NoiseConfig;
    style?: CSSProperties;
    className?: string;
}

const NOISE_SVG_DATA_URI = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E`;

export function EtherealShadow({
    color = 'rgba(99, 102, 241, 0.22)',
    animation = { scale: 72, speed: 42 },
    noise = { opacity: 0.35, scale: 1.4 },
    style,
    className
}: ShadowOverlayProps) {
    const duration = animation && animation.speed > 0 ? Math.max(12, 50 - animation.speed * 0.35) : 25;
    const isAnimated = !!animation && animation.scale > 0 && animation.speed > 0;

    return (
        <div
            className={className}
            style={{
                overflow: 'hidden',
                position: 'relative',
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                ...style
            }}
        >
            {/* GPU Composited Ambient Glow Orbs */}
            <div className="absolute inset-0 transform-gpu overflow-hidden pointer-events-none">
                <motion.div
                    style={{
                        position: 'absolute',
                        top: '-15%',
                        left: '15%',
                        width: '70vw',
                        height: '70vw',
                        maxWidth: '800px',
                        maxHeight: '800px',
                        borderRadius: '50%',
                        background: `radial-gradient(circle at center, ${color} 0%, rgba(99, 102, 241, 0.08) 45%, transparent 70%)`,
                        filter: 'blur(60px)',
                        willChange: 'transform',
                    }}
                    animate={isAnimated ? {
                        x: [0, 35, -25, 0],
                        y: [0, -25, 20, 0],
                        scale: [1, 1.06, 0.96, 1],
                        rotate: [0, 30, -15, 0]
                    } : {}}
                    transition={{
                        duration: duration,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <motion.div
                    style={{
                        position: 'absolute',
                        top: '10%',
                        right: '10%',
                        width: '55vw',
                        height: '55vw',
                        maxWidth: '650px',
                        maxHeight: '650px',
                        borderRadius: '50%',
                        background: `radial-gradient(circle at center, rgba(139, 92, 246, 0.18) 0%, rgba(99, 102, 241, 0.05) 50%, transparent 70%)`,
                        filter: 'blur(70px)',
                        willChange: 'transform',
                    }}
                    animate={isAnimated ? {
                        x: [0, -40, 20, 0],
                        y: [0, 30, -20, 0],
                        scale: [0.96, 1.08, 1, 0.96]
                    } : {}}
                    transition={{
                        duration: duration * 1.25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            {/* Hardware-accelerated Noise Overlay */}
            {noise && noise.opacity > 0 && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url("${NOISE_SVG_DATA_URI}")`,
                        backgroundSize: `${noise.scale * 140}px`,
                        backgroundRepeat: 'repeat',
                        opacity: noise.opacity * 0.35,
                        mixBlendMode: 'overlay',
                        pointerEvents: 'none'
                    }}
                />
            )}
        </div>
    );
}
