import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Rocket, Users, Cpu, TrendingUp } from 'lucide-react';

interface MissionCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const missionCards: MissionCard[] = [
  {
    icon: <Target className="w-8 h-8 text-blue-500" />,
    title: "Strategic AI Integration",
    description: "Helping businesses seamlessly integrate AI solutions that align with their core objectives and enhance operational efficiency."
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-purple-500" />,
    title: "Innovation Catalyst",
    description: "Transforming traditional business processes through cutting-edge AI technologies while maintaining human-centric approaches."
  },
  {
    icon: <Users className="w-8 h-8 text-pink-500" />,
    title: "Empowering Teams",
    description: "Training and empowering teams to leverage AI tools effectively, fostering a culture of innovation and continuous learning."
  }
];

const impactMetrics = [
  {
    icon: <Cpu className="w-6 h-6 text-blue-500" />,
    value: "50+",
    label: "AI Solutions Deployed"
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-purple-500" />,
    value: "40%",
    label: "Average Efficiency Increase"
  },
  {
    icon: <Rocket className="w-6 h-6 text-pink-500" />,
    value: "100+",
    label: "Businesses Transformed"
  }
];

export default function MissionPage() {
  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      {/* Hero Section */}
      <motion.div 
        className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900/40" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Empowering Business Evolution Through AI
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            My mission is to bridge the gap between cutting-edge AI technology and practical business applications, 
            helping companies thrive in the age of artificial intelligence.
          </motion.p>
        </div>
      </motion.div>

      {/* Mission Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {missionCards.map((card, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 rounded-xl p-6 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mb-6">
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{card.title}</h3>
              <p className="text-gray-400">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="bg-gray-800/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactMetrics.map((metric, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  {metric.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                <div className="text-gray-400">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
          <p className="text-gray-400 mb-8">
            Let's explore how AI can revolutionize your operations and drive growth.
          </p>
          <motion.button
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}