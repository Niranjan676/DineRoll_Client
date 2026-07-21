import React, { useContext, useEffect, useState } from 'react'
import { PurchaseOrder } from '../context/PurchaseContext'
import axios from 'axios'

function PurchaseHeader() {

const {purchaseHeader, setPurchaseHeader, error} = useContext(PurchaseOrder)

const[supplier, setSupplier] = useState([])

const handleChange = (e) =>{
    setPurchaseHeader({...purchaseHeader, [e.target.id]: e.target.value})
}

const getSupplier = async()=>{
  const response = await axios.get("http://localhost:8000/suppliers")
  const activeAupplier = response.data.filter((ele)=>{
    return ele.status === "Active"
  })
    
    setSupplier(activeAupplier)
}


useEffect(()=>{
  getSupplier()
}, [])

const handleSupplier =(e)=>{
  const getinfo = supplier.find((ele)=>{
    return ele.name === e.target.value
  })

  if(!getinfo) return;

  setPurchaseHeader({...purchaseHeader,
    suppliername: getinfo.name,
    contactperson: getinfo.person,
    phone: getinfo.mobile
  })
}


  return (
    <div className='p-5'>
        <div className='grid grid-cols-4 gap-4'>
          <div className='flex flex-col'>
            <label htmlFor="ponumber">PO Number</label>
            <input type="text" name="ponumber" id="ponumber" value={purchaseHeader.ponumber} className='border rounded px-3 py-2 readOnly' onChange={handleChange}/>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="podate">PO Date</label>
            <input type="date" name="podate" id="podate" value={purchaseHeader.podate} className='border rounded px-3 py-2' onChange={handleChange}/>
            <p className='text-red-600'>{error.podate}</p>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="suppliername">Supplier Name</label>
            <select name="suppliername" id="suppliername" value={purchaseHeader.suppliername} className='border rounded px-3 py-2' onChange={handleSupplier}>
              <option value="">Select supplier name</option>
              {supplier.map((ele)=>(
                <option key={ele.id} value={ele.name}>{ele.name}</option>
              ))}
            </select>
            <p className='text-red-600'>{error.suppliername}</p>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="contactperson">Contact Person</label>
            <input type="text" name="contactperson" id="contactperson" value={purchaseHeader.contactperson} className='border rounded px-3 py-2' onChange={handleChange}/>
            <p className='text-red-600'>{error.contactperson}</p>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="phone">Phone</label>
            <input type="text" name="phone" id="phone" className='border rounded px-3 py-2' value={purchaseHeader.phone} onChange={handleChange}/>
            <p className='text-red-600'>{error.phone}</p>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="paymentmode">Payment Mode</label>
            <select name="paymentmode" id="paymentmode" value={purchaseHeader.paymentmode} className='border rounded px-3 py-2' onChange={handleChange}>
                <option value="">Select Payment Mode</option>
                <option value="cash">Cash</option>
                <option value="gpay">Gpay</option>
            </select>
            <p className='text-red-600'>{error.paymentmode}</p>
          </div>
          <div className='flex flex-col col-span-2'>
            <label htmlFor="remarks">Remarks</label>
            <textarea name="remarks" id="remarks" className='border rounded px-3 py-2' value={purchaseHeader.remarks} onChange={handleChange}></textarea>
          </div>
        </div>
      </div>
  )
}
export default PurchaseHeader
