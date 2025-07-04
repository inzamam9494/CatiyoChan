import React from 'react';
import { MessageCircle, User, Calendar } from 'lucide-react';
import CommentProfileCard from '../ui/CommentProfileCard.jsx';
import { useGameComments } from '../../hooks/useApi';



const CommentsSection = () => {

  const { comments, commentsLoading, commentsError } = useGameComments();

  return (
    <div className="flex flex-col justify-center items-start p-2 border-2 border-cyan-400 rounded-lg mt-12">
      <h1 className="font-bold text-2xl m-2">Comments</h1>
      {commentsLoading && (
        <div className="text-center p-4">
          <p>Loading comments...</p>
        </div>
      )}
      {commentsError && (
        <div className="text-center p-4 text-red-500">
          <p>Failed to load comments.</p>
        </div>
      )}
      {!commentsLoading && !commentsError && comments.length === 0 && (
        <div className="text-center p-4 text-gray-500">
          <p>No comments yet. Be the first to comment!</p>
        </div>
      )}
      {!commentsLoading && !commentsError && comments.length > 0 && (
        <div className="w-full">
          {comments.map((comment) => (
            <CommentProfileCard
              key={comment._id || comment.id}
              username={comment.username || comment.user?.username || "Anonymous"}
              commentDescription={comment.comment || comment.description || comment.text}
              date={comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : comment.date}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CommentsSection


