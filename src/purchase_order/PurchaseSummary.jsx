import React from 'react'

function PurchaseSummary() {
  return (
    <div>
        <hr />
        <div className='h-48 px-5 w-full py-2 flex flex-col justify-between'>
            <div className='grid grid-cols-3 gap-4'>
                <div className='bg-red-200 text-center rounded text-white font-bold text-2xl'>
                    Total Summary 
                </div>
                <div>
                    hi
                </div>
                <div>
                    hi2
                </div>
            </div>
            <div className='flex justify-center items-center gap-6'>
                <button className='bg-blue-600 text-white px-4 py-2 rounded'>Save</button>
                <button className='bg-gray-500 text-white px-4 py-2 rounded'>Clear</button>
            </div>
        </div>
    </div>
  )
}

export default PurchaseSummary
