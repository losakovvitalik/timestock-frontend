'use client';

import type { MotionProps } from 'motion/react';
import { motion } from 'motion/react';
import { Button, ButtonProps } from '../button';

const MotionButton = motion(Button);

export type AnimatedButtonProps = ButtonProps & MotionProps;

export function AnimatedButton({ whileTap = { scale: 0.9 }, ...props }: AnimatedButtonProps) {
  return <MotionButton whileTap={whileTap} {...props} />;
}
