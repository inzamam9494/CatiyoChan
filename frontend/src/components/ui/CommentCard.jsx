import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { usePostComment } from '../../hooks/useApi';

const CommentCard = ({ gameId, onCommentPosted }) => {
  const [formData, setFormData] = useState({
    content: '',
    name: '',
    email: ''
  });
  
  const { submitComment, loading, error, success } = usePostComment();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.content || !formData.name || !formData.email) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const commentData = {
        content: formData.content,
        name: formData.name,
        email: formData.email,
        game: gameId,
        commentType: 'game'
      };

      await submitComment(commentData);
      
      // Clear form on success
      setFormData({
        content: '',
        name: '',
        email: ''
      });

      // Notify parent component to refresh comments
      if (onCommentPosted) {
        onCommentPosted();
      }
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };
  
  return (
    <div className='border-2 border-cyan-400 m-2 mt-8 mb-4 p-4 rounded-xl'>
      <h1 className=' pb-4 text-2xl font-bold'>Leave a Comment</h1>
      
      {/* Success Message */}
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          Comment posted successfully!
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          Failed to post comment. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          className="p-2 border border-cyan-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Write your comment here..."
          rows="4"
          required
        />
        
        <div className='flex flex-row justify-between items-center '>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="p-2 border border-cyan-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 w-1/2 mr-4"
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="p-2 border border-cyan-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 w-1/2 ml-4"
            placeholder="Email"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded transition-colors cursor-pointer font-semibold flex items-center justify-center ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-cyan-600 hover:bg-cyan-800'
          } text-white`}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Posting...
            </>
          ) : (
            <>
              <Send className="inline mr-2" />
              SEND COMMENT
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default CommentCard;
