import React from 'react'

const GameCard = ({
    imgUrl,
    title,
    size = "Unknown",
    onClick,
    categorySlug = "Game"
}) => {
  return (
    <div onClick={onClick} className='flex flex-col items-center sm:justify-between sm:p-0 p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-2 border-cyan-400 cursor-pointer'>
        <img className='sm:m-2 m-2 sm:h-50 border-cyan-400 border-2 rounded-xl' src={imgUrl} alt="" />
        <h2 className='mt-2 text-md font-semibold text-center'>{title}</h2>
        <p className='text-sm mb-2'>{`${categorySlug} Size : ${size}`}</p>
    </div>
  )
}

export default GameCard
