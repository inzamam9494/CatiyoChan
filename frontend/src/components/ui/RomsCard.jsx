import React from "react";

const RomsCard = ({ title, imageUrl, onClick }) => {
  return (
    <div
      onClick={onClick}
      className=" sm:p-4 p-2 sm:m-2 m-2 sm:rounded-2xl rounded-md border-2 border-cyan-300 cursor-pointer"
    >
      <div className="flex flex-col items-center justify-center text-center px-4 w">
        <img
          className="sm:h-25 h-20 p-2 bg-cyan-50 rounded-md"
          src={imageUrl}
          alt=""
        />
        <h1 className="pt-4 sm:text-xl text-sm font-bold text-cyan-300">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default RomsCard;
