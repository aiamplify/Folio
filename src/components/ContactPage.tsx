import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Loader2, CheckCircle, XCircle } from 'lucide-react';

declare global {
  interface Window {
    PlayAI?: {
      open: (key: string) => void;
    };
  }
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const MAX_MESSAGE_LENGTH = 500;
const MIN_MESSAGE_LENGTH = 10;

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<FormErrors>({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Initialize PlayAI when component mounts
    const initializePlayAI = () => {
      if (typeof window.PlayAI !== 'undefined') {
        try {
          window.PlayAI.open('W-bCyU3yRSAdSUAXp6zT5');
        } catch (error) {
          console.error('Error initializing PlayAI:', error);
        }
      } else {
        // If PlayAI is not available yet, try again after a short delay
        setTimeout(initializePlayAI, 1000);
      }
    };

    // Start initialization process
    initializePlayAI();

    // Cleanup function
    return () => {
      // Add any cleanup if needed
    };
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < MIN_MESSAGE_LENGTH) {
      newErrors.message = `Message must be at least ${MIN_MESSAGE_LENGTH} characters`;
    } else if (formData.message.length > MAX_MESSAGE_LENGTH) {
      newErrors.message = `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error states
    setErrorMessage('');
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      // Clear form after successful submission
      setFormData({ name: '', email: '', message: '' });
      
      // Reset form to idle state after 3 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again later.');
      
      // Reset error state after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 3000);
    }
  };

  const getInputClassName = (fieldName: keyof FormData) => {
    return `w-full p-2 bg-transparent border ${
      errors[fieldName] 
        ? 'border-red-500 focus:border-red-500' 
        : 'border-gray-600 focus:border-blue-500'
    } rounded-lg focus:outline-none transition-colors`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="min-h-screen bg-gray-900 text-white py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-gray-400">Have a question or want to work together?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold">Email</h3>
                <p className="text-gray-400">aiamplify22@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold">Phone</h3>
                <p className="text-gray-400">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <MapPin className="w-6 h-6 text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold">Location</h3>
                <p className="text-gray-400">San Francisco Bay Area</p>
              </div>
            </div>

            {/* Voice Agent */}
            <div className="mt-8 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Talk to AI Assistant</h3>
              <div id="play-ai-container" className="min-h-[300px]"></div>
            </div>

            <div className="flex space-x-4 pt-4">
              <a href="https://github.com/yourusername" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/in/yourusername" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://twitter.com/yourusername" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={getInputClassName('name')}
                disabled={status === 'submitting'}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={getInputClassName('email')}
                disabled={status === 'submitting'}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={getInputClassName('message')}
                disabled={status === 'submitting'}
              />
              <div className="flex justify-between mt-1">
                {errors.message ? (
                  <p className="text-sm text-red-500">{errors.message}</p>
                ) : (
                  <p className="text-sm text-gray-400">
                    {formData.message.length}/{MAX_MESSAGE_LENGTH} characters
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className={`w-full py-3 px-4 flex items-center justify-center rounded-lg text-white font-medium transition-colors ${
                status === 'submitting' 
                  ? 'bg-blue-700 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Sending...
                </>
              ) : status === 'success' ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Sent Successfully!
                </>
              ) : status === 'error' ? (
                <>
                  <XCircle className="w-5 h-5 mr-2" />
                  Error Sending
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </>
              )}
            </button>

            {errorMessage && (
              <p className="text-center text-red-500 mt-2">{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
}