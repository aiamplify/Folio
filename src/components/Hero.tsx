import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Network, Code } from 'lucide-react';

declare global {
  interface Window {
    PlayAI: {
      open: (key: string) => void;
    };
  }
}

export default function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] opacity-10" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/40" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8"
      >
        <motion.h1 
          className="text-5xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Mike Eckmeier
        </motion.h1>
        <motion.h2 
          className="text-2xl sm:text-3xl mb-8 text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          AI Engineer & Machine Learning Specialist
        </motion.h2>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center space-x-2 bg-blue-500/10 px-4 py-2 rounded-full">
            <Brain className="w-5 h-5 text-blue-500" />
            <span>Deep Learning</span>
          </div>
          <div className="flex items-center space-x-2 bg-purple-500/10 px-4 py-2 rounded-full">
            <Cpu className="w-5 h-5 text-purple-500" />
            <span>Neural Networks</span>
          </div>
          <div className="flex items-center space-x-2 bg-pink-500/10 px-4 py-2 rounded-full">
            <Network className="w-5 h-5 text-pink-500" />
            <span>MLOps</span>
          </div>
          <div className="flex items-center space-x-2 bg-green-500/10 px-4 py-2 rounded-full">
            <Code className="w-5 h-5 text-green-500" />
            <span>Full Stack AI</span>
          </div>
        </motion.div>

        <motion.button
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-semibold transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = '#projects'}
        >
          View My Work
        </motion.button>
      </motion.div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  );
}