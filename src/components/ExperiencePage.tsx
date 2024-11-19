import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Award, GraduationCap } from 'lucide-react';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
  type: 'work' | 'education';
}

const experiences: Experience[] = [
  {
    title: "Senior AI Engineer",
    company: "TechCorp AI",
    period: "2021 - Present",
    description: [
      "Led development of computer vision systems for autonomous vehicles",
      "Architected and deployed large-scale ML infrastructure on AWS",
      "Reduced model inference time by 40% through optimization"
    ],
    skills: ["PyTorch", "TensorFlow", "Computer Vision", "MLOps", "AWS"],
    type: "work"
  },
  {
    title: "Machine Learning Engineer",
    company: "DataDrive Solutions",
    period: "2019 - 2021",
    description: [
      "Developed NLP models for sentiment analysis and text classification",
      "Built real-time recommendation systems serving 1M+ users",
      "Implemented CI/CD pipelines for ML models"
    ],
    skills: ["NLP", "Python", "Docker", "Kubernetes", "PostgreSQL"],
    type: "work"
  },
  {
    title: "M.S. in Computer Science",
    company: "Stanford University",
    period: "2017 - 2019",
    description: [
      "Specialized in Machine Learning and Artificial Intelligence",
      "Research focus on reinforcement learning and neural networks",
      "Published 2 papers in top-tier conferences"
    ],
    skills: ["Machine Learning", "Deep Learning", "Research", "Algorithms"],
    type: "education"
  }
];

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Experience & Education
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 h-full w-0.5 bg-blue-600/30" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className={`relative mb-12 ${
                index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className={`flex items-center ${
                index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
              } mb-4`}>
                <div className="flex items-center gap-2">
                  {exp.type === 'work' ? (
                    <Briefcase className="w-5 h-5 text-blue-500" />
                  ) : (
                    <GraduationCap className="w-5 h-5 text-purple-500" />
                  )}
                  <span className="text-sm text-gray-400 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </span>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-2">{exp.title}</h3>
                <p className="text-blue-400 mb-4">{exp.company}</p>
                <ul className="text-gray-300 mb-4 space-y-2">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Award className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}