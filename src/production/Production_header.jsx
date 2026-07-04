import React from 'react'

function ProductionHeader() {
  return (
    <div className='grid grid-cols-3 gap-4'>
        <div className='flex flex-col'>
          <label htmlFor="">Production Code</label>
          <input type="text" name="" id="" className='border rounded py-2 px-3 text-xl'/>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="">Production Date</label>
          <input type="date" name="" id="" className='border rounded py-2 px-3 text-xl'/>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="">Product Name</label>
          <select className='border rounded py-2 px-3 text-xl'>
            <option>Hi</option>
          </select>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="">Raw Material</label>
          <select className='border rounded py-2 px-3 text-xl'>
            <option>Hi</option>
          </select>
        </div>
        <div>
          <label htmlFor="">Material Weight</label>
          <input type="text" />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="">Machine number</label>
          <select className='border rounded py-2 px-3 text-xl'>
            <option>Hi</option>
          </select>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="">Operator Name</label>
          <input type="text" className='border rounded py-2 px-3 text-xl'/>
        </div>
        <div className='flex  items-center'>
          <p>Status: </p>
        </div>
    </div>
  )
}

export default ProductionHeader
