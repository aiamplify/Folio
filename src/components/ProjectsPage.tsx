import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Search, Brain, Bot, Palette, MessageSquare, Code } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  category: string[];
  image: string;
  github?: string;
  demo?: string;
  year: number;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Autonomous Research Assistant",
    description: "AI agent that conducts comprehensive research and generates detailed reports.",
    longDescription: "Developed an autonomous AI agent capable of conducting in-depth research across multiple sources, synthesizing information, and generating comprehensive reports. The agent uses advanced NLP techniques and can maintain context across multiple research sessions.",
    tech: ["LangChain", "OpenAI", "Python", "Vector DB", "FastAPI"],
    category: ["A.I. Agents", "Automations"],
    image: "/image1.png",
    github: "https://github.com",
    demo: "https://demo.com",
    year: 2024
  },
  {
    id: 2,
    title: "AI Art Generation Platform",
    description: "Custom fine-tuned Stable Diffusion model for generating artistic images.",
    longDescription: "Built a specialized platform using a fine-tuned Stable Diffusion model for creating unique artistic styles. The system includes custom LoRA adaptations and an intuitive UI for style mixing.",
    tech: ["Stable Diffusion", "PyTorch", "React", "TensorFlow", "AWS"],
    category: ["A.I. Art"],
    image: "/image2.png",
    year: 2024
  },
  {
    id: 3,
    title: "Intelligent Task Automation",
    description: "AI-powered system for automating repetitive business processes.",
    longDescription: "Created an intelligent automation system that learns from user behavior to automate complex business workflows. The system uses ML to adapt to changing patterns and optimize process efficiency.",
    tech: ["Python", "TensorFlow", "RPA", "Node.js", "MongoDB"],
    category: ["Automations", "A.I. Agents"],
    image: "https://images.unsplash.com/photo-1676277791608-ac54525aa94d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    github: "https://github.com",
    year: 2023
  },
  {
    id: 4,
    title: "Multilingual Voice Assistant",
    description: "Advanced voice agent supporting real-time translation and natural conversations.",
    longDescription: "Developed a sophisticated voice assistant capable of natural conversations in multiple languages with real-time translation. Features include context awareness, emotion detection, and personalized responses.",
    tech: ["Whisper", "FastAPI", "Redis", "React", "WebRTC"],
    category: ["Chat/Voice Agents"],
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    demo: "https://demo.com",
    year: 2024
  },
  {
    id: 5,
    title: "AI-Powered Portfolio Generator",
    description: "Dynamic website generator using AI for content and design optimization.",
    longDescription: "Built an innovative platform that generates personalized portfolio websites using AI for content creation, design decisions, and SEO optimization. The system adapts to user preferences and industry standards.",
    tech: ["Next.js", "OpenAI", "TailwindCSS", "Vercel", "TypeScript"],
    category: ["Website Development", "A.I. Agents"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    github: "https://github.com",
    demo: "https://demo.com",
    year: 2024
  },
  {
    id: 6,
    title: "Creative AI Art Director",
    description: "AI system that generates and iterates on design concepts based on feedback.",
    longDescription: "Developed an AI art director that can generate, refine, and iterate on design concepts based on user feedback. The system understands design principles and can explain its creative decisions.",
    tech: ["Stable Diffusion", "DALL-E", "Python", "React", "FastAPI"],
    category: ["A.I. Art", "A.I. Agents"],
    image: "https://images.unsplash.com/photo-1706465621048-e164d6a20c01?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    year: 2024
  }
];

const categories = ["All", "A.I. Agents", "Automations", "A.I. Art", "Chat/Voice Agents", "Website Development"];

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case "A.I. Agents":
      return <Brain className="w-4 h-4" />;
    case "Automations":
      return <Bot className="w-4 h-4" />;
    case "A.I. Art":
      return <Palette className="w-4 h-4" />;
    case "Chat/Voice Agents":
      return <MessageSquare className="w-4 h-4" />;
    case "Website Development":
      return <Code className="w-4 h-4" />;
    default:
      return null;
  }
};

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === "All" || project.category.includes(selectedCategory);
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors flex items-center gap-2 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <CategoryIcon category={category} />
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                className="bg-gray-800 rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    {project.category.map((cat) => (
                      <span key={cat} className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white flex items-center gap-1">
                        <CategoryIcon category={cat} />
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
                  <span className="text-gray-400">{selectedProject.year}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.category.map((cat) => (
                    <span key={cat} className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm flex items-center gap-2">
                      <CategoryIcon category={cat} />
                      {cat}
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 mb-6">{selectedProject.longDescription}</p>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      <span>View Code</span>
                    </a>
                  )}
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}