import React from 'react'

function PurchaseOrderEdit({orderid, setOrderId, close}) {

  const handleUpdateValue = (e)=>{
    const {id, value} = e.target; 

    setOrderId((prev)=>({
      ...prev, header:{...prev.header, [id]: value}
    }))
  }

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center'>
      <div className='bg-white rounded p-6 w-[1000px]'>
          <div className='text-bold text-2xl text-center mb-4'>
            <h1>Purchase Order Update</h1>
          </div>
          <div className='grid grid-cols-3 gap-4'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="">PO Number: </label>
              <input type="text" value={orderid.header.ponumber} className='border rounded px-3 py-2'/>
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="">PO Date: </label>
              <input type="text" value={orderid.header.podate} className='border rounded px-3 py-2'/>
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="">Supplier Name: </label>
              <input type="text" value={orderid.header.suppliername} className='border rounded px-3 py-2'/>
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="">Contact Person: </label>
              <input type="text" value={orderid.header.contactperson} className='border rounded px-3 py-2'/>
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="">Phone: </label>
              <input type="text" name="phone" id="phone" value={orderid.header.phone} className='border rounded px-3 py-2' onChange={handleUpdateValue}/>
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="">Payment Mode: </label>
              <input type="text" value={orderid.header.paymentmode} className='border rounded px-3 py-2'/>
            </div>
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
                {orderid.detail.map((ele, idx)=>(
                  <tr key={ele.id}>
                    <td className='border border-slate-600 px-2 py-1'>{idx + 1}</td>
                    <td className='border border-slate-600 px-2 py-1'>{ele.itemcode}</td>
                    <td className='border border-slate-600 px-2 py-1'><input type="text" value={ele.itemname}/></td>
                    <td className='border border-slate-600 px-2 py-1'>{ele.gsm}</td>
                    <td className='border border-slate-600 px-2 py-1'>{ele.quantity}</td>
                    <td className='border border-slate-600 px-2 py-1'>{ele.rate}</td>
                    <td className='border border-slate-600 px-2 py-1'>{ele.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='mt-5 flex justify-center gap-5'>
            <button className='bg-blue-600 text-white px-4 py-2 rounded text-lg'>Update</button>
            <button className='bg-gray-500 text-white px-4 py-2 rounded text-lg' onClick={close}>Close</button>
          </div>
      </div>
    </div>
  )
}

export default PurchaseOrderEdit
