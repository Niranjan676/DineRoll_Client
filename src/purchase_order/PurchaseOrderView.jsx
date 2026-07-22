import React from 'react'

function PurchaseOrderView({order, onclose}) {
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center'>
        <div className='bg-white rounded p-6 w-[700px]'>
          <div className='text-bold text-2xl text-center'>
            <h1>Purchase Order View</h1>
          </div>
          <div>
            <button onClick={onclose}>Close</button>
          </div>
        </div>
    </div>
  )
}

export default PurchaseOrderView
