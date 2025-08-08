import React, { useState } from 'react'
import { Send } from 'lucide-react'
import { usePostComment, usePostEmulatorComment } from '../../hooks/useApi'

const CommentCard = ({ gameId, gameCategory, emulatorId, emulatorCategory, onCommentPosted }) => {
  // Form state
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Use appropriate hooks
  const { submitComment: submitGameComment, loading: gameLoading, error: gameError } = usePostComment();
  const { submitComment: submitEmulatorComment, loading: emulatorLoading, error: emulatorError } = usePostEmulatorComment();

  // Determine which type of comment we're handling
  const isGameComment = !!gameId;
  const isEmulatorComment = !!emulatorId;
  const loading = isGameComment ? gameLoading : emulatorLoading;
  const error = isGameComment ? gameError : emulatorError;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!content.trim() || !name.trim() || !email.trim()) {
      alert('Please fill in all fields');
      return;
    }

    try {
      if (isGameComment) {
        const commentData = {
          content: content.trim(),
          name: name.trim(),
          email: email.trim(),
          game: gameId,
          gameCategory: gameCategory,
          commentType: 'game'
        };
        
        console.log('Submitting game comment:', commentData);
        await submitGameComment(commentData);
        
      } else if (isEmulatorComment) {
        const commentData = {
          content: content.trim(),
          name: name.trim(),
          email: email.trim(),
          emulator: emulatorId,
          emulatorCategory: emulatorCategory,
          commentType: 'emulator'
        };
        
        console.log('Submitting emulator comment:', commentData);
        await submitEmulatorComment(commentData);
      }

      // Reset form after successful submission
      setContent('');
      setName('');
      setEmail('');

      // Trigger refetch of comments
      if (onCommentPosted) {
        onCommentPosted();
      }

      // Show success message
      alert('Comment posted successfully!');

    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Failed to post comment. Please try again.');
    }
  };

  return (
    <div className='border-2 border-cyan-400 m-2 mt-8 mb-4 p-4 rounded-xl'> 
      <h1 className=' pb-4 text-2xl font-bold'>Leave a Comment</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {error.message || 'Failed to post comment'}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="p-2 border border-cyan-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Write your comment here..."
          rows="4"
          required
        />
        
        <div className='flex flex-row justify-between items-center '>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-cyan-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 w-1/2 mr-4"
            placeholder="Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-cyan-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 w-1/2 ml-4"
            placeholder="Email"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded font-semibold transition-colors ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-cyan-600 hover:bg-cyan-800 cursor-pointer'
          }`}
        >
          {loading ? (
            <>
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
              POSTING...
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
  )
}

export default CommentCard
