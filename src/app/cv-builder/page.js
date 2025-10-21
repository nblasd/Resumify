'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { generateCVPDFs } from '../../utils/pdfGenerator';

export default function CVBuilder() {
  const [isClient, setIsClient] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ type: '', message: '' });
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    title: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    website: '',
    
    // CV Customization
    headerColor: '#581c87', // Default purple color
    
    // Professional Summary
    summary: '',
    
    // Skills
    skills: [],
    
    // Work Experience
    experience: [],
    
    // Education
    education: [],
    
    // Projects
    projects: []
  });

  const containerRef = useRef(null);
  const stepRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    gsap.fromTo(stepRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, [currentStep, isClient]);

  useEffect(() => {
    if (!isClient || !showModal || !modalRef.current) return;

    gsap.fromTo(modalRef.current,
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
    );

    // Close modal on Escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setShowModal(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showModal, isClient]);

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addArrayItem = (field, item) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], item]
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateArrayItem = (field, index, updatedItem) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? updatedItem : item)
    }));
  };

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generatePDFs = () => {
    try {
      const pdfs = generateCVPDFs(formData);
      
      // Download each PDF
      pdfs.forEach(({ doc, name }) => {
        doc.save(name);
      });
      
      // Show success modal
      setModalContent({
        type: 'success',
        message: 'Your professional ATS-friendly resume has been generated and downloaded! Check your downloads folder.'
      });
      setShowModal(true);
    } catch (error) {
      console.error('Error generating PDFs:', error);
      setModalContent({
        type: 'error',
        message: 'Sorry, there was an error generating your resume. Please try again.'
      });
      setShowModal(true);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <SummaryStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <SkillsStep formData={formData} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} updateArrayItem={updateArrayItem} />;
      case 4:
        return <ExperienceStep formData={formData} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} />;
      case 5:
        return <EducationStep formData={formData} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} />;
      case 6:
        return <ReviewStep formData={formData} generatePDFs={generatePDFs} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Build Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Perfect CV</span>
            </h1>
            <p className="text-xl text-white/80">
              Step {currentStep} of 6 - Let&apos;s create your professional resume
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3, 4, 5, 6].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step <= currentStep 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                      : 'bg-white/20 text-white/60'
                  }`}>
                    {step}
                  </div>
                  <span className="text-xs text-white/60 mt-2">
                    {step === 1 && 'Personal'}
                    {step === 2 && 'Summary'}
                    {step === 3 && 'Skills'}
                    {step === 4 && 'Experience'}
                    {step === 5 && 'Education'}
                    {step === 6 && 'Review'}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / 6) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div ref={stepRef} className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                currentStep === 1
                  ? 'bg-white/10 text-white/40 cursor-not-allowed'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              ← Previous
            </button>
            
            {currentStep < 6 ? (
              <button
                onClick={nextStep}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={generatePDFs}
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
              >
                Generate Resume 🎉
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
      
      {/* Success/Error Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div 
            ref={modalRef} 
            className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl p-8 max-w-md w-full border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              {modalContent.type === 'success' ? (
                <>
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Success! 🎉</h3>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Error</h3>
                </>
              )}
              <p className="text-white/80 text-lg mb-6">
                {modalContent.message}
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Step Components
function PersonalInfoStep({ formData, updateFormData }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white/80 mb-2">First Name *</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => updateFormData('firstName', e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500"
            placeholder="John"
            required
          />
        </div>
        <div>
          <label className="block text-white/80 mb-2">Last Name *</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => updateFormData('lastName', e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500"
            placeholder="Doe"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-white/80 mb-2">Professional Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => updateFormData('title', e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500"
            placeholder="Backend Developer, Cashier, Driver, etc."
          />
          <p className="text-white/60 text-sm mt-2">This will appear below your name on the resume</p>
        </div>
        <div>
          <label className="block text-white/80 mb-2">Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500"
            placeholder="john.doe@email.com"
            required
          />
        </div>
        <div>
          <label className="block text-white/80 mb-2">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-white/80 mb-2">Address</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => updateFormData('address', e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500"
            placeholder="123 Main St, City, State 12345"
          />
        </div>
        <div>
          <label className="block text-white/80 mb-2">LinkedIn</label>
          <input
            type="url"
            value={formData.linkedin}
            onChange={(e) => updateFormData('linkedin', e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>
        <div>
          <label className="block text-white/80 mb-2">Website</label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => updateFormData('website', e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500"
            placeholder="https://johndoe.com"
          />
        </div>
      </div>
      
      {/* CV Customization */}
      <div className="mt-8 pt-8 border-t border-white/20">
        <h3 className="text-xl font-bold text-white mb-4">CV Customization</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/80 mb-2">Header Color</label>
            <div className="flex gap-4 items-center">
              <input
                type="color"
                value={formData.headerColor}
                onChange={(e) => updateFormData('headerColor', e.target.value)}
                className="w-20 h-12 rounded-lg cursor-pointer border-2 border-white/20"
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={formData.headerColor}
                  onChange={(e) => updateFormData('headerColor', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500"
                  placeholder="#581c87"
                />
              </div>
            </div>
            <p className="text-white/60 text-sm mt-2">Choose a color for your CV header</p>
          </div>
          <div className="flex items-center">
            <div className="w-full p-4 rounded-lg" style={{ backgroundColor: formData.headerColor }}>
              <p className="text-white font-semibold text-center">Header Preview</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryStep({ formData, updateFormData }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Professional Summary</h2>
      <div>
        <label className="block text-white/80 mb-2">Tell us about yourself *</label>
        <textarea
          value={formData.summary}
          onChange={(e) => updateFormData('summary', e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500 h-32 resize-none"
          placeholder="Write a brief summary of your professional background, key skills, and career objectives..."
          required
        />
        <p className="text-white/60 text-sm mt-2">Keep it concise but impactful (2-3 sentences)</p>
      </div>
    </div>
  );
}

function SkillsStep({ formData, addArrayItem, removeArrayItem, updateArrayItem }) {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      addArrayItem('skills', { name: newSkill.trim(), level: 'Intermediate' });
      setNewSkill('');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Skills</h2>
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500"
            placeholder="Add a skill (e.g., JavaScript, Project Management)"
          />
          <button
            onClick={handleAddSkill}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
          >
            Add
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        {formData.skills.map((skill, index) => (
          <div key={index} className="flex items-center justify-between bg-white/5 p-4 rounded-lg">
            <div className="flex items-center space-x-4">
              <span className="text-white font-medium">{skill.name}</span>
              <select
                value={skill.level}
                onChange={(e) => {
                  updateArrayItem('skills', index, { ...skill, level: e.target.value });
                }}
                className="px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="Beginner" className="bg-slate-900 text-white">Beginner</option>
                <option value="Intermediate" className="bg-slate-900 text-white">Intermediate</option>
                <option value="Advanced" className="bg-slate-900 text-white">Advanced</option>
                <option value="Expert" className="bg-slate-900 text-white">Expert</option>
              </select>
            </div>
            <button
              onClick={() => removeArrayItem('skills', index)}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceStep({ formData, addArrayItem, removeArrayItem }) {
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    current: false,
    projects: []
  });
  
  const [currentProject, setCurrentProject] = useState({
    name: '',
    url: '',
    startDate: '',
    endDate: '',
    points: []
  });
  
  const [currentPoint, setCurrentPoint] = useState('');

  const handleAddExperience = () => {
    if (newExperience.company && newExperience.position) {
      addArrayItem('experience', { ...newExperience });
      setNewExperience({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        current: false,
        projects: []
      });
    }
  };
  
  const addProjectToExperience = () => {
    if (currentProject.name) {
      setNewExperience({
        ...newExperience,
        projects: [...newExperience.projects, { ...currentProject }]
      });
      setCurrentProject({
        name: '',
        url: '',
        startDate: '',
        endDate: '',
        points: []
      });
    }
  };
  
  const removeProjectFromExperience = (index) => {
    setNewExperience({
      ...newExperience,
      projects: newExperience.projects.filter((_, i) => i !== index)
    });
  };
  
  const addPointToCurrentProject = () => {
    if (currentPoint.trim()) {
      setCurrentProject({
        ...currentProject,
        points: [...currentProject.points, currentPoint.trim()]
      });
      setCurrentPoint('');
    }
  };
  
  const removePointFromCurrentProject = (index) => {
    setCurrentProject({
      ...currentProject,
      points: currentProject.points.filter((_, i) => i !== index)
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Work Experience</h2>
      
      {/* Add New Experience Form */}
      <div className="bg-white/5 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Add Work Experience</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/80 mb-2">Company *</label>
            <input
              type="text"
              value={newExperience.company}
              onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500"
              placeholder="Company Name"
            />
          </div>
          <div>
            <label className="block text-white/80 mb-2">Position *</label>
            <input
              type="text"
              value={newExperience.position}
              onChange={(e) => setNewExperience({...newExperience, position: e.target.value})}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500"
              placeholder="Job Title"
            />
          </div>
          <div>
            <label className="block text-white/80 mb-2">Start Date</label>
            <input
              type="month"
              value={newExperience.startDate}
              onChange={(e) => setNewExperience({...newExperience, startDate: e.target.value})}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-white/80 mb-2">End Date</label>
            <input
              type="month"
              value={newExperience.endDate}
              onChange={(e) => setNewExperience({...newExperience, endDate: e.target.value})}
              disabled={newExperience.current}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 disabled:opacity-50"
            />
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={newExperience.current}
                onChange={(e) => setNewExperience({...newExperience, current: e.target.checked, endDate: e.target.checked ? '' : newExperience.endDate})}
                className="rounded"
              />
              <span className="text-white/80">I currently work here</span>
            </label>
          </div>
          <div className="md:col-span-2">
            <label className="block text-white/80 mb-2">Description</label>
            <textarea
              value={newExperience.description}
              onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500 h-24 resize-none"
              placeholder="Describe your key responsibilities and achievements..."
            />
          </div>
        </div>
        
        {/* Projects within this Experience */}
        <div className="mt-6 border-t border-white/20 pt-6">
          <h4 className="text-md font-semibold text-white mb-4">Projects at this Company (Optional)</h4>
          
          {/* Current Projects List */}
          {newExperience.projects.length > 0 && (
            <div className="space-y-2 mb-4">
              {newExperience.projects.map((proj, index) => (
                <div key={index} className="bg-white/5 p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h5 className="text-white font-medium text-sm">{proj.name}</h5>
                      {proj.url && <p className="text-blue-400 text-xs">{proj.url}</p>}
                      <p className="text-white/60 text-xs">{proj.startDate} - {proj.endDate}</p>
                      {proj.points.length > 0 && (
                        <ul className="text-white/70 text-xs mt-1 space-y-0.5">
                          {proj.points.map((point, idx) => (
                            <li key={idx}>• {point}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <button
                      onClick={() => removeProjectFromExperience(index)}
                      className="text-red-400 hover:text-red-300 text-sm ml-2"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Add New Project Form */}
          <div className="bg-white/5 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-white/70 mb-1 text-sm">Project Name</label>
                <input
                  type="text"
                  value={currentProject.name}
                  onChange={(e) => setCurrentProject({...currentProject, name: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:border-purple-500"
                  placeholder="E-commerce Platform"
                />
              </div>
              <div>
                <label className="block text-white/70 mb-1 text-sm">Project URL</label>
                <input
                  type="url"
                  value={currentProject.url}
                  onChange={(e) => setCurrentProject({...currentProject, url: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:border-purple-500"
                  placeholder="https://project-url.com"
                />
              </div>
              <div>
                <label className="block text-white/70 mb-1 text-sm">Project Start Date</label>
                <input
                  type="month"
                  value={currentProject.startDate}
                  onChange={(e) => setCurrentProject({...currentProject, startDate: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-white/70 mb-1 text-sm">Project End Date</label>
                <input
                  type="month"
                  value={currentProject.endDate}
                  onChange={(e) => setCurrentProject({...currentProject, endDate: e.target.value})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-white/70 mb-1 text-sm">Project Highlights</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={currentPoint}
                    onChange={(e) => setCurrentPoint(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addPointToCurrentProject()}
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:border-purple-500"
                    placeholder="Add a key achievement..."
                  />
                  <button
                    onClick={addPointToCurrentProject}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-all duration-300"
                  >
                    Add
                  </button>
                </div>
                {currentProject.points.length > 0 && (
                  <div className="space-y-1">
                    {currentProject.points.map((point, index) => (
                      <div key={index} className="flex items-center gap-2 bg-white/5 p-2 rounded text-sm">
                        <span className="text-white/80 flex-1">• {point}</span>
                        <button
                          onClick={() => removePointFromCurrentProject(index)}
                          className="text-red-400 hover:text-red-300 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={addProjectToExperience}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all duration-300"
            >
              Add Project to Experience
            </button>
          </div>
        </div>
        
        <button
          onClick={handleAddExperience}
          className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
        >
          Add Experience
        </button>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {formData.experience.map((exp, index) => (
          <div key={index} className="bg-white/5 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="text-white font-semibold">{exp.position}</h4>
                <p className="text-purple-300">{exp.company}</p>
                <p className="text-white/60 text-sm">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </p>
                {exp.description && (
                  <p className="text-white/80 mt-2 text-sm">{exp.description}</p>
                )}
                {exp.projects && exp.projects.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-white/70 text-xs font-semibold">Projects:</p>
                    {exp.projects.map((proj, projIndex) => (
                      <div key={projIndex} className="bg-white/5 p-2 rounded">
                        <p className="text-white font-medium text-xs">{proj.name}</p>
                        {proj.url && <p className="text-blue-400 text-xs">{proj.url}</p>}
                        <p className="text-white/60 text-xs">{proj.startDate} - {proj.endDate}</p>
                        {proj.points && proj.points.length > 0 && (
                          <ul className="text-white/70 text-xs mt-1 space-y-0.5">
                            {proj.points.map((point, pointIdx) => (
                              <li key={pointIdx}>• {point}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => removeArrayItem('experience', index)}
                className="text-red-400 hover:text-red-300 transition-colors ml-2"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationStep({ formData, addArrayItem, removeArrayItem }) {
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    gpa: ''
  });

  const handleAddEducation = () => {
    if (newEducation.institution && newEducation.degree) {
      addArrayItem('education', { ...newEducation });
      setNewEducation({
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: ''
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Education</h2>
      
      {/* Add New Education Form */}
      <div className="bg-white/5 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Add Education</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/80 mb-2">Institution *</label>
            <input
              type="text"
              value={newEducation.institution}
              onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500"
              placeholder="University Name"
            />
          </div>
          <div>
            <label className="block text-white/80 mb-2">Degree *</label>
            <input
              type="text"
              value={newEducation.degree}
              onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500"
              placeholder="Bachelor's, Master's, etc."
            />
          </div>
          <div>
            <label className="block text-white/80 mb-2">Field of Study</label>
            <input
              type="text"
              value={newEducation.field}
              onChange={(e) => setNewEducation({...newEducation, field: e.target.value})}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500"
              placeholder="Computer Science, Business, etc."
            />
          </div>
          <div>
            <label className="block text-white/80 mb-2">GPA</label>
            <input
              type="text"
              value={newEducation.gpa}
              onChange={(e) => setNewEducation({...newEducation, gpa: e.target.value})}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-500"
              placeholder="3.8/4.0"
            />
          </div>
          <div>
            <label className="block text-white/80 mb-2">Start Date</label>
            <input
              type="month"
              value={newEducation.startDate}
              onChange={(e) => setNewEducation({...newEducation, startDate: e.target.value})}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-white/80 mb-2">End Date</label>
            <input
              type="month"
              value={newEducation.endDate}
              onChange={(e) => setNewEducation({...newEducation, endDate: e.target.value})}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
        <button
          onClick={handleAddEducation}
          className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
        >
          Add Education
        </button>
      </div>

      {/* Education List */}
      <div className="space-y-4">
        {formData.education.map((edu, index) => (
          <div key={index} className="bg-white/5 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-white font-semibold">{edu.degree}</h4>
                <p className="text-purple-300">{edu.institution}</p>
                {edu.field && <p className="text-white/80">{edu.field}</p>}
                <p className="text-white/60 text-sm">
                  {edu.startDate} - {edu.endDate}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </p>
              </div>
              <button
                onClick={() => removeArrayItem('education', index)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewStep({ formData, generatePDFs }) {
  // Debug logging
  console.log('ReviewStep - formData:', formData);
  console.log('ReviewStep - experience:', formData.experience);
  console.log('ReviewStep - education:', formData.education);
  console.log('ReviewStep - projects:', formData.projects);
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Review Your CV</h2>
      
      <div className="space-y-6">
        {/* Personal Info */}
        <div className="bg-white/5 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
            <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
            {formData.title && <p><strong>Title:</strong> {formData.title}</p>}
            <p><strong>Email:</strong> {formData.email}</p>
            {formData.phone && <p><strong>Phone:</strong> {formData.phone}</p>}
            {formData.address && <p><strong>Address:</strong> {formData.address}</p>}
            {formData.linkedin && <p><strong>LinkedIn:</strong> {formData.linkedin}</p>}
            {formData.website && <p><strong>Website:</strong> {formData.website}</p>}
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-white/80 mb-2"><strong>Header Color:</strong></p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg border-2 border-white/20" style={{ backgroundColor: formData.headerColor }}></div>
              <span className="text-white/60">{formData.headerColor}</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        {formData.summary && (
          <div className="bg-white/5 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Professional Summary</h3>
            <p className="text-white/80">{formData.summary}</p>
          </div>
        )}

        {/* Skills */}
        {formData.skills && formData.skills.length > 0 && (
          <div className="bg-white/5 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <span key={index} className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                  {skill.name} ({skill.level})
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {formData.experience && formData.experience.length > 0 && (
          <div className="bg-white/5 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Work Experience</h3>
            <div className="space-y-4">
              {formData.experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-purple-500 pl-4">
                  <h4 className="text-white font-semibold">{exp.position}</h4>
                  <p className="text-purple-300">{exp.company}</p>
                  <p className="text-white/60 text-sm">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                  {exp.description && (
                    <p className="text-white/80 mt-2 text-sm">{exp.description}</p>
                  )}
                  {exp.projects && exp.projects.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-white/70 text-sm font-semibold">Projects:</p>
                      {exp.projects.map((proj, projIndex) => (
                        <div key={projIndex} className="bg-white/5 p-2 rounded ml-2">
                          <p className="text-white font-medium text-sm">{proj.name}</p>
                          {proj.url && (
                            <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-xs">
                              {proj.url}
                            </a>
                          )}
                          <p className="text-white/60 text-xs">{proj.startDate} - {proj.endDate}</p>
                          {proj.points && proj.points.length > 0 && (
                            <ul className="text-white/70 text-sm mt-1 space-y-0.5">
                              {proj.points.map((point, pointIdx) => (
                                <li key={pointIdx}>• {point}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {formData.education && formData.education.length > 0 && (
          <div className="bg-white/5 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Education</h3>
            <div className="space-y-4">
              {formData.education.map((edu, index) => (
                <div key={index} className="border-l-2 border-blue-500 pl-4">
                  <h4 className="text-white font-semibold">{edu.degree}</h4>
                  <p className="text-blue-300">{edu.institution}</p>
                  {edu.field && <p className="text-white/80">{edu.field}</p>}
                  <p className="text-white/60 text-sm">
                    {edu.startDate} - {edu.endDate}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <p className="text-white/80 mb-4">
          Ready to generate your professional resume? We&apos;ll create an ATS-friendly CV optimized for applicant tracking systems!
        </p>
      </div>
    </div>
  );
}
