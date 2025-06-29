import React from 'react'

const RomsCard = ({
    title,
    imageUrl
}) => {
  return (
    <div className=' sm:p-4 p-2 sm:m-4 m-2 rounded-2xl border-2 border-cyan-300'>
      <div className='flex flex-col items-center justify-center text-center px-4 w'>
        <img className='sm:h-25 h-16 p-2 bg-white rounded-xl' src={imageUrl} alt="" />
        <h1 className='pt-4 sm:text-xl text-sm font-bold text-cyan-300'>{title}</h1>
      </div>
    </div>
  )
}

export default RomsCard
