import React, { useContext, useState } from 'react'
import { PurchaseOrder } from '../context/PurchaseContext'

function PurchaseSummary() {
const {purchaseHeader, purchaseDetail} = useContext(PurchaseOrder)
const [savedorder, setSavedorder] = useState([])


const handleSave = () =>{
    const purchaseRequest = {header: purchaseHeader, detail: purchaseDetail}
    const orderCopy = [...savedorder]
    orderCopy.push(purchaseRequest)
    console.log(orderCopy)
}

const totalItems = purchaseDetail.filter((row)=>{
    return row.itemcode !== ""
}).length

const grossTotal = purchaseDetail.reduce((total, item)=>{
    return total + Number(item.amount || 0)
}, 0) 


  return (
    <div>
        <hr />
        <div className='h-34 px-5 w-full py-2 flex flex-col justify-between'>
            <div>
                <h1 className='font-bold text-2xl'>Total Item: {totalItems}</h1>
                <h1 className='font-bold text-2xl'>Gross Total: {grossTotal}</h1>
            </div>
            <div className='flex w-full items-center justify-center gap-6'>
                <button className='bg-blue-600 text-white rounded px-4 py-2' onClick={handleSave}>Save</button>
                <button className='bg-gray-500 text-white rounded px-4 py-2'>Clear</button>
            </div>
        </div>
    </div>
  )
}

export default PurchaseSummary
