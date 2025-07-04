import React from "react";
import { User } from "lucide-react";

const CommentProfileCard = ({
    username = "Anonymous",
    commentDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date = "July 3, 2025"
}) => {
  return (
    <div className="flex flex-row items-center p-2">
      <div className="flex-shrink-0 mr-4 border-2 border-cyan-400 rounded-full p-2">
        <User className="w-8 h-8" />
      </div>
      <div className="flex flex-col justify-center items-start bg-cyan-800 p-2 rounded-tl-xl rounded-br-xl">
        <h1 className="font-medium italic">{username}</h1>
        <p className="font-extralight">{commentDescription}</p>
        <p className="font-light text-sm/5">{date}</p>
      </div>
    </div>
  );
};

export default CommentProfileCard;
