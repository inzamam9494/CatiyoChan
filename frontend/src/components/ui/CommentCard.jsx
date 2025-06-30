import React from 'react'
import { Send } from 'lucide-react'

const CommentCard = () => {
  return (
    <div className='border-2 border-cyan-400 m-2 mt-8 mb-4 p-4 rounded-xl'>
      <h1 className=' pb-4 text-2xl font-bold'>Leave a Comment</h1>
        <form className="flex flex-col gap-4">
            <textarea
            className="p-2 border border-cyan-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Write your comment here..."
            rows="4"
            ></textarea>
            <div className='flex flex-row justify-between items-center '>
            <input
            type="text"
            className="p-2 border border-cyan-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 w-1/2 mr-4"
            placeholder="Name"
            />
            <input
            type="text"
            className="p-2 border border-cyan-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 w-1/2 ml-4"
            placeholder="Email"
            />
            </div>
            <button
            type="submit"
            className="bg-cyan-600  px-4 py-2 rounded hover:bg-cyan-800 transition-colors cursor-pointer font-semibold  "
            >
            <Send className="inline mr-2" />
            SEND COMMENT
            </button>
        </form>
    </div>
  )
}

export default CommentCard
