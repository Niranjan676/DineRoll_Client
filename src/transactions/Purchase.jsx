import React from 'react'
import PurchaseHeader from '../purchase_order/PurchaseHeader'
import PurchaseTable from '../purchase_order/PurchaseTable'
import PurchaseSummary from '../purchase_order/PurchaseSummary'

function Purchase() {
  return (
    <div className='h-screen flex flex-col'>
      <div className='bg-gray-100 text-center text-xl font-bold py-3'>
        <h1>Purchase Order</h1>
      </div>
      <div>
        <PurchaseHeader />
        <PurchaseTable />
        <PurchaseSummary/>
      </div>
    </div>
  )
}

export default Purchase
