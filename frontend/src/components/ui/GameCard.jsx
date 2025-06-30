import React from 'react'

const GameCard = ({
    imgUrl,
    title,
    size,
    onClick
}) => {
  return (
    <div onClick={onClick} className='flex flex-col items-center justify-center p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-2 border-cyan-400 cursor-pointer'>
        <img src={imgUrl} alt="" />
        <h2 className='mt-2 text-lg font-semibold'>{title}</h2>
        <p className='text-sm'>{`Game Size : ${size}`}</p>
    </div>
  )
}

export default GameCard
