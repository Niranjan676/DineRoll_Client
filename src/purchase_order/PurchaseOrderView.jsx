import React from 'react'


function PurchaseOrderView({order, onclose}) {
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center'>
        <div className='bg-white rounded p-6 w-[800px]'>
          <div className='text-bold text-2xl text-center'>
            <h1>Purchase Order View</h1>
          </div>
          <div>
            <h3><span className='font-bold'>PO Number:</span> {order.header.ponumber}</h3>
            <h3><span className='font-bold'>PO Date:</span> {order.header.podate}</h3>
            <h3><span className='font-bold'>Supplier Name:</span> {order.header.suppliername}</h3>
            <h3><span className='font-bold'>Contact Person:</span> {order.header.phone}</h3>
            <h3><span className='font-bold'>Payment Mode:</span> {order.header.paymentmode}</h3>
          </div>
          <hr className='mt-3'/>
          <div className='mt-4'>
            <table className='w-full border border-collapse'>
              <thead className='bg-gray-200'>
                <tr>
                  <th className='border border-slate-600'>S.No</th>
                  <th className='border border-slate-600'>Item Code</th>
                  <th className='border border-slate-600'>Item Name</th>
                  <th className='border border-slate-600'>GSM</th>
                  <th className='border border-slate-600'>Quantity</th>
                  <th className='border border-slate-600'>Rate</th>
                  <th className='border border-slate-600'>Amount</th>
                </tr>
              </thead>
              <tbody>
                {order.detail.map((ele, idx)=>(
                  <tr key={ele.id}>
                    <td className='border border-slate-600 px-2 py-1'>{idx + 1}</td>
                    <td className='border border-slate-600 px-2 py-1'>{ele.itemcode}</td>
                    <td className='border border-slate-600 px-2 py-1'>{ele.itemname}</td>
                    <td className='border border-slate-600 px-2 py-1'>{ele.gsm}</td>
                    <td className='border border-slate-600 px-2 py-1'>{ele.quantity}</td>
                    <td className='border border-slate-600 px-2 py-1'>{ele.rate}</td>
                    <td className='border border-slate-600 px-2 py-1'>{ele.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='text-center mt-4'>
            <button className='bg-blue-600 text-white px-4 py-2 rounded text-lg' onClick={onclose}>Close</button>
          </div>
        </div>
    </div>
  )
}

export default PurchaseOrderView
