import React from 'react'
import ProductionHeader from '../production/Production_header'
import ProductionTable from '../production/Production_table'

function Production() {
  return (
    <div className='h-screen flex flex-col'>
      <div className='bg-gray-100 text-xl font-bold text-center py-3'>
        <h1>Production</h1>
      </div>
      <div className='grid grid-rows-3 px-3 py-2'>
          <ProductionHeader />
          <ProductionTable />
      </div>
    </div>
  )
}

export default Production
