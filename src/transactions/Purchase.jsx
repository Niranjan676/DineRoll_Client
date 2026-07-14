import React from 'react'
import PurchaseHeader from '../purchase_order/PurchaseHeader'
import PurchaseDetail from '../purchase_order/PurchaseDetail'
import PurchaseSummary from '../purchase_order/PurchaseSummary'
import PurchaseContext from "../context/PurchaseContext"
function Purchase() {
  return (
    <div className='h-screen flex flex-col'>
      <div className='bg-gray-100 text-center text-xl font-bold py-3'>
        <h1>Purchase Order</h1>
      </div>
      <div>
        <PurchaseContext>
          <PurchaseHeader />
          <PurchaseDetail />
          <PurchaseSummary/>
        </PurchaseContext>
      </div>
    </div>
  )
}

export default Purchase
