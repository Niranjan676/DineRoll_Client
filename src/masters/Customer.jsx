import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { RiEditBoxFill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import axios from 'axios';

function Customer() {

  const [customerDtls, setCustomerDtls] = useState({name: "", phone: "", address: "", gst: ""})
  const [addCustomer, setAddCustomer] = useState([])
  const [updateCustomer, setUpdateCustomer] = useState(null)
  const [searchCustomer, setSearchCustomer] = useState("")
  const [error, setError] = useState({name: "", phone: "", address: ""})

  useEffect(()=>{
    getCustomer()
  }, [])

  const handleChange = (e)=>{
    setCustomerDtls({...customerDtls, [e.target.id]: e.target.value})
  }

  //Clearing the form inputs

  const handleClear = () =>{
    setCustomerDtls({name: "", phone: "", address: "", gst: ""})
  }

  //Adding data to the form list

  const getCustomer = async()=>{
    try{
      const response = await axios.get("http://localhost:8000/customer");
      setAddCustomer(response.data)
    }catch(err){
      console.log(err)
    }
  }

  const handleSave = async () =>{
      if(!validateForm()){
        return
      }
      
      if(updateCustomer){   
        const updatedId = addCustomer.map((customer)=>(
          customer.id === updateCustomer ? {...customerDtls, id: updateCustomer} : customer
        ))
        setAddCustomer(updatedId)
        setUpdateCustomer(null)
      }else{
        // const customerId = {id: Date.now(), ...customerDtls}
        // let customerCopy = [...addCustomer]
        // customerCopy.push(customerId)
        // setAddCustomer(customerCopy)

        try{
          await axios.post("http://localhost:8000/customer", customerDtls)
          alert("Customer added auccessfully")
          getCustomer()
        }catch(err){
          console.log(err)
        }
      }
        setCustomerDtls({name: "", phone: "", address: "", gst: ""})
  }

  //Editing the customer information

  const handleEdit = (id) =>{
    const editCustomer = addCustomer.find((ele)=>{
      return ele.id === id
    })
    setCustomerDtls(editCustomer)
    setUpdateCustomer(id)
  }

  const handleDelete = (id)=>{
    const deleteCustomer = addCustomer.filter((customer)=>{
      return customer.id !== id
    })
    setAddCustomer(deleteCustomer)
  }

  const handleSearch = (e)=>{
    setSearchCustomer(e.target.value)
  }

  console.log(searchCustomer)

  //Search Filter

  const filterCustomer = addCustomer.filter((item)=>{
    return item.name.toLowerCase().includes(searchCustomer.toLowerCase())
  })

  //Error Inputs

  const validateForm = () =>{
    let newError = {name: "", phone: "", address: ""}
    let isValid = true

    if(!customerDtls.name.trim()){
      newError.name = "Customer name is required"
      isValid = false
    }
    if(!customerDtls.phone.trim()){
      newError.phone = "Customer contact is required"
      isValid = false
    }
    if(!customerDtls.address.trim()){
      newError.address = "Customer Address is required"
      isValid = false
    }
    setError(newError)
    return isValid
  }
  


  return (
    <div>
      <div className='bg-gray-100 text-center py-3 text-xl font-bold'>
        <h1>Customer Master</h1>
      </div>
      <div className='p-5'>
        <div className='grid grid-cols-3 gap-4'>
          <div className='flex flex-col'>
            <label htmlFor="name" className='mb-1'>Customer Name</label>
            <input type="text" className='border rounded px-3 py-2' id="name" value={customerDtls.name} onChange={handleChange}/>
            <p>{error.name}</p>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="phone" className='mb-1'>Phone</label>
            <input type="text" className='border rounded px-3 py-2' id="phone" value={customerDtls.phone} onChange={handleChange}/>
            <p>{error.phone}</p>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="gst" className='mb-1'>GST</label>
            <input type="text" className='border rounded px-3 py-2' id="gst" value={customerDtls.gst} onChange={handleChange}/>
          </div>
          <div className='col-span-2 flex flex-col'>
            <label htmlFor="address" className='mb-1'>Address</label>
            <textarea type="text"  className='border rounded px-3 py-2' id="address" value={customerDtls.address} onChange={handleChange}/>
            <p>{error.address}</p>
          </div>
        </div>
        <div className='mt-6 flex gap-3'>
          <button className='bg-blue-600 text-white rounded px-4 py-2' onClick={handleSave}>{!updateCustomer ? "Save" : "Update"}</button>
          <button className='bg-gray-500 text-white rounded px-4 py-2' onClick={handleClear}>Clear</button>
        </div>
      </div>
      <hr />
      <div className='relative mx-2 my-3'>
        <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'/>
        <input type="search" placeholder='search' className='border rounded pl-10 pr-2 py-2' value={searchCustomer} onChange={handleSearch}/>
      </div>
      <div >
        <table className='border-collapse border w-full'>
          <thead>
            <tr className='bg-slate-200'>
              <th className='border border-slate-600'>S.No</th>
              <th className='border border-slate-600'>Customer Name</th>
              <th className='border border-slate-600'>Phone</th>
              <th className='border border-slate-600'>Address</th>
              <th className='border border-slate-600'>GST</th>
              <th className='border border-slate-600'>Edit</th>
              <th className='border border-slate-600'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filterCustomer.map((customer, idx)=>(
              <tr key={customer.id}>
              <td className='border border-slate-700 px-2 py-1'>{idx + 1}</td>
              <td className='border border-slate-700 px-2 py-1'>{customer.name}</td>
              <td className='border border-slate-700 px-2 py-1'>{customer.phone}</td>
              <td className='border border-slate-700 px-2 py-1'>{customer.address}</td>
              <td className='border border-slate-700 px-2 py-1'>{customer.gst}</td>
              <td className='border border-slate-700 text-center'><button className='w-full flex items-center justify-center'><RiEditBoxFill className='text-yellow-500 text-xl hover:cursor-pointer' onClick={()=>{handleEdit(customer.id)}}/></button></td>
              <td className='border border-slate-700 text-center'><button className='w-full flex items-center justify-center'><AiFillDelete className='text-red-500 text-xl hover:cursor-pointer' onClick={()=>{handleDelete(customer.id)}}/></button></td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Customer
