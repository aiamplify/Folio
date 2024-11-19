import React from 'react';
import { Brain, Github, Linkedin, Mail } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full bg-black/10 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <Brain className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Mike Eckmeier
            </span>
          </div>
          <div className="flex space-x-6">
            <button 
              onClick={() => onNavigate('projects')}
              className="text-gray-300 hover:text-blue-500 transition-colors"
            >
              Projects
            </button>
            <button 
              onClick={() => onNavigate('mission')}
              className="text-gray-300 hover:text-blue-500 transition-colors"
            >
              Mission
            </button>
            <button 
              onClick={() => onNavigate('contact')}
              className="text-gray-300 hover:text-blue-500 transition-colors"
            >
              Contact
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
               className="text-gray-300 hover:text-blue-500 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
               className="text-gray-300 hover:text-blue-500 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:contact@mikeeckmeier.com"
               className="text-gray-300 hover:text-blue-500 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}