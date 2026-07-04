import React from 'react'

function PurchaseHeader() {
  return (
    <div className='p-5'>
        <div className='grid grid-cols-4 gap-4'>
          <div className='flex flex-col'>
            <label htmlFor="">PO Number</label>
            <input type="text" name="" id="" className='border rounded px-3 py-2'/>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="">PO Date</label>
            <input type="date" name="" id="" className='border rounded px-3 py-2'/>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="">Supplier Name</label>
            <input type="text" name="" id="" className='border rounded px-3 py-2'/>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="">Contact Person</label>
            <input type="text" name="" id="" className='border rounded px-3 py-2'/>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="">Phone</label>
            <input type="text" className='border rounded px-3 py-2'/>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="">Payment Terms</label>
            <input type="text" name="" id="" className='border rounded px-3 py-2'/>
          </div>
          <div className='flex flex-col col-span-2'>
            <label htmlFor="">Remarks</label>
            <textarea name="" id="" className='border rounded px-3 py-2'></textarea>
          </div>
        </div>
      </div>
  )
}

export default PurchaseHeader
