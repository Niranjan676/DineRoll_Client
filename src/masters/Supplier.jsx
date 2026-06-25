import React, { useEffect, useState } from 'react'
import { RiEditBoxFill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
//import { ToastContainer, toast } from 'react-toastify';
import axios from "axios"

function Supplier() {

  const [supplierForm, setSupplierForm] = useState({name: "", mobile:"", email: "", gst: "", person: "", address: "", status: "Active"})
  const [addSupplier, setAddSupplier] = useState([])
  const [editedId, setEditedId] = useState(null)
  const [search, setSearch] = useState("")
  const [error, setError] = useState({name: "", mobile:"", address: ""})

  const handleChange = (e)=>{
    const {id, value} = e.target
    setSupplierForm({...supplierForm, [id]: value})

    setError({...error, [id]: ""})
  }

  console.log(supplierForm)

  const getSuppliers = async() =>{
      try{
        const response  = await axios.get("http://localhost:8000/suppliers")
        setAddSupplier(response.data)
      }catch(err){
        console.log("error", err)
      }
  }

  useEffect(()=>{
    getSuppliers()
  }, [])


  const supplierValidation = () =>{
    let newError = {name: "", mobile:"", email: "", gst: "", person: "", address: ""}
    let isValid = true
    const regexMobile = /^\d{10}$/
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if(supplierForm.name.trim() === ""){
      newError.name = "Supplier name is required"
      isValid = false
    }
    
    if(supplierForm.mobile.trim() === ""){
      newError.mobile = "Mobile number is required"
      isValid = false
    }

    if(!regexMobile.test(supplierForm.mobile)){
      newError.mobile = "Enter a valid 10-digit mobile number";
      isValid = false
    }

    if(!regexEmail.test(supplierForm.email)){
      newError.email = "Enter valid email address"
      isValid = false
    }
    
    if(supplierForm.address.trim() === ""){
      newError.address = "Supplier address is required"
      isValid = false
    }
    setError(newError)
    return isValid
  }

    //const notify = () => toast("Supplier added successfully!");

  //Adding Supplier details in the Table
  const handleSave = async ()=>{

  if (!supplierValidation()) {
    return;
  }

    if(editedId){
      // let updatedId = addSupplier.map((item)=>(
      //   item.id === editedId ? {...supplierForm, id: editedId} : item
      // ))  
      // setAddSupplier(updatedId)
      // setEditedId(null)
      try{
        await axios.put(`http://localhost:8000/suppliers/supplier/${editedId}`, supplierForm)
        getSuppliers()
        setEditedId(null)
      }
      catch(err){
        console.log("Error: ", err)
      }
    }else{
        // let supplierKey = {id: Date.now(), ...supplierForm}
        // let supplierCopy = [...addSupplier]
        // notify()
        // supplierCopy.push(supplierKey) 
        // setAddSupplier(supplierCopy)
      try{
        await axios.post("http://localhost:8000/suppliers/supplier", supplierForm)
        getSuppliers()
      }
      catch(err){
        console.log("Error: ", err)
      }
    }
    // console.log(supplierForm)
    setSupplierForm({name: "", mobile:"", email: "", gst: "", person: "", address: "", status:"Active"})
  }

  //Clearing the Supplier Information in Header
  const handleClear = ()=>{
    setSupplierForm({name: "", mobile:"", email: "", gst: "", person: "", address: "", status: "Active"})
    setError({name: "", mobile:"", address: ""})
  }

  //Edit the Supplier details
  const handleEdit = (id)=>{
    let editSupplier = addSupplier.find((editSupplier)=>{
      return editSupplier.id === id
    })
    setSupplierForm({...editSupplier, status: editSupplier.status || "Active"})
    setEditedId(id)
  }


  //Deleting the supplier from list
  const handleDelete = async (id) =>{
    // let deleteSupplier = addSupplier.filter((supplier)=>{
    //   return supplier.id !== id
    // })
    // setAddSupplier(deleteSupplier)
    try{
      await axios.patch(`http://localhost:8000/suppliers/supplier/${id}/inactive`)
      getSuppliers()
    }catch(err){
      console.log("Error", err)
    }
  }

  //Search the supplier from list

  const searchValue = (e)=>{
    setSearch(e.target.value)
  }

  const filteredSuppliers = addSupplier.filter((item)=>{
       return (
        item.status === "Active" && 
        item.name.toLowerCase().includes(search.toLowerCase())
       )
    })

  return (
    <div>
      <div className='bg-gray-100 text-center py-3 text-xl font-bold'>
        <h1>Supplier Master</h1>
      </div>

      <div className='p-5'>
        <div className='grid grid-cols-4 gap-4'>

          <div className='flex flex-col'>
            <label htmlFor="name" className='mb-1'>Supplier Name</label>
            <input
              type='text'
              id='name'
              value={supplierForm.name}
              className='border rounded px-3 py-2' onChange={handleChange}
            />
            <p className='text-red-500'>{error.name}</p>
          </div>

          <div className='flex flex-col'>
            <label className='mb-1' htmlFor="mobile">Mobile</label>
            <input
              type='text'
              id='mobile'
              value={supplierForm.mobile}
              className='border rounded px-3 py-2' onChange={handleChange}
            />
            <p className='text-red-500'>{error.mobile}</p>
          </div>

          <div className='flex flex-col'>
            <label className='mb-1' htmlFor="email">Email</label>
            <input
              type='email'
              id='email'
              value={supplierForm.email}
              className='border rounded px-3 py-2' onChange={handleChange}
            />
            <p className='text-red-500'>{error.email}</p>
          </div>

          <div className='flex flex-col'>
            <label className='mb-1' htmlFor="gst">GST Number</label>
            <input
              type='text'
              id='gst'
              value={supplierForm.gst}
              className='border rounded px-3 py-2' onChange={handleChange}
            />
          </div>

          <div className='flex flex-col'>
            <label className='mb-1' htmlFor="person">Contact Person</label>
            <input
              type='text'
              id='person'
              value={supplierForm.person}
              className='border rounded px-3 py-2' onChange={handleChange}
            />
          </div>

          <div className='flex flex-col col-span-2'>
            <label className='mb-1' htmlFor="address">Address</label>
            <textarea
              type='text'
              id='address'
              value={supplierForm.address}
              className='border rounded px-3 py-2' onChange={handleChange}
            />
            <p className='text-red-500'>{error.address}</p>
          </div>
          <div className='flex items-center'>
            <p>Status: <span className='text-green-500 font-bold'>{supplierForm.status}</span></p>
          </div>

        </div>

        <div className='mt-6 flex gap-3'>
          <button className='bg-blue-600 text-white px-4 py-2 rounded' onClick={handleSave}>
            {!editedId ? "Save" : "Update"}
          </button>

          <button className='bg-gray-500 text-white px-4 py-2 rounded' onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>
      <hr/>
      <div className='relative mx-2 my-3'>
        <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'/>
        <input type="search" value={search} className='border rounded pl-10 pr-2 py-2' 
                placeholder="search" 
                onChange={searchValue} />
      </div>
      <div>
        <table className='border-collapse border border-slate-500 w-full mt-5'>
          <thead className='bg-slate-200'>
            <tr>
              <th className='border border-slate-600'>S.No</th>
              <th className='border border-slate-600'>Supplier Name</th>
              <th className='border border-slate-600'>Mobile</th>
              <th className='border border-slate-600'>Email</th>
              <th className='border border-slate-600'>GST</th>
              <th className='border border-slate-600'>Contact Person</th>
              <th className='border border-slate-600'>Address</th>
              <th className='border border-slate-600'>Edit</th>
              <th className='border border-slate-600'>Delete</th>
            </tr>
          </thead>
          <tbody className='pl-2 border'>
            {filteredSuppliers.map((supplierdtl, idx)=>(
              <tr key={supplierdtl.id}>
                <td className='border border-slate-700 px-2 py-1'>{idx + 1}</td>
                <td className='border border-slate-700 px-2 py-1'>{supplierdtl.name}</td>
                <td className='border border-slate-700 px-2 py-1'>{supplierdtl.mobile}</td>
                <td className='border border-slate-700 px-2 py-1'>{supplierdtl.email}</td>
                <td className='border border-slate-700 px-2 py-1'>{supplierdtl.gst}</td>
                <td className='border border-slate-700 px-2 py-1'>{supplierdtl.person}</td>
                <td className='border border-slate-700 px-2 py-1'>{supplierdtl.address}</td>

                <td className='border border-slate-700'>
                  <button className='w-full flex justify-center items-center' onClick={()=>{handleEdit(supplierdtl.id)}}>
                    <RiEditBoxFill className="text-yellow-500 text-xl hover:cursor-pointer"/>
                  </button>
                </td>

                <td className='border border-slate-700'>
                  <button className='w-full flex justify-center items-center' onClick={()=>handleDelete(supplierdtl.id)}>
                    <AiFillDelete className="text-red-500 text-xl hover:cursor-pointer"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    </div>
  )
}

export default Supplier