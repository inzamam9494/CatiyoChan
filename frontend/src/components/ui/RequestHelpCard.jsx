import React from "react";
import { Flag } from 'lucide-react'

const RequestHelpCard = ({
  onClick = () => {},
}) => {
  return (
    <div className="flex flex-row justify-between items-center p-2 m-2 border-cyan-400 border-2 rounded-lg">
      <p>Problems with download or installation?</p>
      <button onClick={onClick} className=" bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-800 transition-colors cursor-pointer font-semibold">
        <Flag className="inline mr-2" />
        REQUEST HELP
      </button>
    </div>
  );
};

export default RequestHelpCard;
