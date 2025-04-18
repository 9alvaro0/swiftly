// src/components/post/LikeAnimation.tsx
"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface LikeAnimationProps {
  isLiked: boolean;
  hasChanged: boolean;
}

export default function LikeAnimation({ isLiked, hasChanged }: LikeAnimationProps) {
  const [showAnimation, setShowAnimation] = useState(false);
  
  useEffect(() => {
    if (hasChanged && isLiked) {
      setShowAnimation(true);
      const timer = setTimeout(() => setShowAnimation(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isLiked, hasChanged]);
  
  return (
    <AnimatePresence>
      {showAnimation && (
        <motion.div 
          className="absolute pointer-events-none"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ 
            scale: [1, 1.5, 1.8, 1.8, 1], 
            opacity: [1, 0.8, 0.6, 0.4, 0],
            y: [0, -5, -15, -30, -50]
          }}
          transition={{ duration: 1 }}
          exit={{ opacity: 0 }}
        >
          <Heart className="fill-red-500 text-red-500" size={30} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
