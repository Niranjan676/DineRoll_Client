import React from 'react'
import axios from "axios";

function PurchaseOrderView({order, onclose}) {

  // const orderView = async(order)=>{
  //   try{
  //     const response = await axios.get(`http://localhost:8000/purchaseorder/orderview/${id}`)
  //     console.log(response.data.result)
  //     setSelectedorder(response.data.result);
  //     setOrderView(true);
  //   }catch(err){
  //     console.log(err)
  //   }
  // }
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center'>
        <div className='bg-white rounded p-6 w-[700px]'>
          <div className='text-bold text-2xl text-center'>
            <h1>Purchase Order View</h1>
          </div>
          <div>
            <h3><span className='font-bold'>PO Number:</span> {order.header.ponumber}</h3>
            <h3><span className='font-bold'>PO Date:</span> {order.podate}</h3>
            <h3><span className='font-bold'>Supplier Name:</span> {order.suppliername}</h3>
            <h3><span className='font-bold'>Contact Person:</span> {order.phone}</h3>
            <h3><span className='font-bold'>Payment Mode:</span> {order.paymentmode}</h3>
          </div>
          <hr />
          <div></div>
          <div className='text-center'>
            <button className='bg-blue-600 text-white px-4 py-2 rounded text-lg' onClick={onclose}>Close</button>
          </div>
        </div>
    </div>
  )
}

export default PurchaseOrderView
