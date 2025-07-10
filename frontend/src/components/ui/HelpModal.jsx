import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { useReportIssue } from '../../hooks/useApi';

const HelpModal = ({ showModal, closeModal, gameName, category }) => {
  const [formData, setFormData] = useState({
    name: gameName || '',
    url: '',
    email: '',
    issue: '',
    feedback: ''
  });
  
  const { submitReport, loading, error, success } = useReportIssue();
  
  // Update form data when gameName changes
  React.useEffect(() => {
    if (gameName) {
      setFormData(prev => ({
        ...prev,
        name: gameName
      }));
    }
  }, [gameName]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitReport(formData);
      // Reset form on success
      setFormData({
        name: gameName || '',
        url: '',
        email: '',
        issue: '',
        feedback: ''
      });
      
      // Close modal after a delay to show success message
      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch (err) {
      console.error('Failed to submit report:', err);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-cyan-200/50  flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full sm:max-w-4xl max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className='text-2xl font-bold'>Help Center</h1>
          <button onClick={closeModal} className="text-cyan-400 hover:text-red-500  cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Content */}
        <form onSubmit={handleSubmit}>
          <p className='text-cyan-400 text-xl mt-2 mb-2'>{category} : {gameName}</p>
          
          {/* Success/Error Messages */}
          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              Report submitted successfully! Thank you for your feedback.
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              Error submitting report. Please try again.
            </div>
          )}
          
          <div>
            <p className='font-mono pt-2 text-lg'>{category} Name</p>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder='Game name will be auto-filled'
              readOnly
              className='p-2 border border-cyan-300 rounded-md bg-gray-100 text-gray-600 w-full cursor-not-allowed' 
            />

            <p className='font-mono pt-4 text-lg'>Report URL</p>
            <input 
              type="url" 
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              placeholder='Enter the URL where the issue occurred'
              required
              className='p-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full' 
            />

            <p className='font-mono pt-4 text-lg'>Your Email</p>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder='Enter your email'
              required
              className='p-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full' 
            />

            <p className='font-mono pt-4 text-lg'>Issue</p>
            <input 
              type="text" 
              name="issue"
              value={formData.issue}
              onChange={handleInputChange}
              placeholder='Briefly describe the issue'
              required
              className='p-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full' 
            />

            <p className='font-mono pt-4 text-lg'>Feedback - Please describe the problem</p>
            <textarea 
              name="feedback"
              value={formData.feedback}
              onChange={handleInputChange}
              placeholder='Provide detailed feedback about the problem'
              className='p-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full h-25'
              rows="4"
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className={`mt-2 px-4 py-2 rounded font-semibold transition-colors ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-cyan-600 hover:bg-cyan-800 cursor-pointer'
              }`}
            >
              <Send className="inline mr-2" />
              {loading ? 'SENDING...' : 'SEND REPORT'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HelpModal
