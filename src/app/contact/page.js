'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const formRef = useRef(null);
  const contactCardsRef = useRef([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    // Hero section animation
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    // Title animation
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out" }
    );

    // Subtitle animation
    gsap.fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power2.out" }
    );

    // Form animation
    gsap.fromTo(formRef.current,
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        delay: 0.6,
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Contact cards animation
    gsap.fromTo(contactCardsRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: contactCardsRef.current[0],
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email Us",
      description: "Send us an email and we'll respond within 24 hours",
      contact: "hello@resumify.com",
      action: "mailto:hello@resumify.com"
    },
    {
      icon: "💬",
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      contact: "Available 24/7",
      action: "#"
    },
    {
      icon: "🐛",
      title: "Report Bug",
      description: "Found a bug? Let us know so we can fix it",
      contact: "bugs@resumify.com",
      action: "mailto:bugs@resumify.com"
    },
    {
      icon: "💡",
      title: "Feature Request",
      description: "Have an idea? We'd love to hear it",
      contact: "ideas@resumify.com",
      action: "mailto:ideas@resumify.com"
    }
  ];

  const faqs = [
    {
      question: "Is Resumify really free forever?",
      answer: "Yes! Resumify is completely free with no hidden costs, no premium features, and no time limits. We believe everyone should have access to professional resume-building tools."
    },
    {
      question: "Do I need to create an account?",
      answer: "No account required! You can start building your resume immediately without any registration. Your data stays private and local to your device."
    },
    {
      question: "Can I download my resume as PDF?",
      answer: "Absolutely! You can download your resume as a high-quality PDF instantly, with no watermarks or limitations."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we prioritize your privacy. Your resume data is processed locally and we don't store your personal information on our servers."
    },
    {
      question: "Do the templates pass ATS systems?",
      answer: "Yes! All our templates are designed to be ATS-friendly with clean formatting, proper keyword optimization, and industry-standard layouts."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold text-white mb-6">
            Get in
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Touch</span>
          </h1>
          <p ref={subtitleRef} className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed">
            Have questions, feedback, or need help? We're here to help you succeed in your job search.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                ref={el => contactCardsRef.current[index] = el}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group"
                onClick={() => window.open(method.action, '_blank')}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {method.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                  {method.title}
                </h3>
                <p className="text-white/70 mb-4 text-sm">
                  {method.description}
                </p>
                <p className="text-purple-300 font-medium">
                  {method.contact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section ref={formRef} className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">Send us a Message</h3>
            <p className="text-xl text-white/80">We'd love to hear from you</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-white font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 focus:bg-white/20 transition-all duration-300 resize-vertical"
                  placeholder="Tell us how we can help you..."
                />
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h3>
            <p className="text-xl text-white/80">Quick answers to common questions</p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-purple-500/50 transition-all duration-300"
              >
                <h4 className="text-xl font-semibold text-white mb-3">{faq.question}</h4>
                <p className="text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
