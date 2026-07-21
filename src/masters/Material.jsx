import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { RiEditBoxFill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios"
import { useEffect } from 'react';

function Material() {

  const [materialName, setMaterialName] = useState({code: "", name: "", gsm: "", unit: "", status: "Active"})
  const [addMaterial, setAddMaterial] = useState([])
  const [editMaterial, setEditMaterial] = useState(null)
  const [searchMaterial, setSearchMaterial] = useState("")
  const [error, setError] = useState({code: "", name: "", gsm: "", unit: ""})

  // Onchange Inputs

  const handleChange = (e) =>{

    const {id, value} = e.target

    setMaterialName({...materialName, [id]: value})

    setError({...error, [id]: ""})
  }

  const getMaterial = async()=>{
    try{
      const response = await axios.get("http://localhost:8000/material")
      setAddMaterial(response.data)
    }catch(err){
      console.log("Error: ", err)
    }
  }

  useEffect(()=>{
    getMaterial()
  }, [])
  //Form validation

  const validateForm = () =>{
    let newError = {code: "", name: "", gsm: "", unit: ""}
    let isValid = true
    
    if(!materialName.code.trim()){
      newError.code = "Item code is required"
      isValid = false
    }
    if(!materialName.name.trim()){
      newError.name = "Item name is required"
      isValid = false
    }
    
    if(!materialName.unit.trim()){
      newError.unit = "Material Unit required"
      isValid = false
    }
    setError(newError)
    return isValid
  }

  //Adding Materials to the list

  const handleSave = async () =>{
    if(!validateForm()){
      return
    }

    if(editMaterial){
      // let updateMaterial = addMaterial.map((item)=>(
      //     item.id === editMaterial ? {...materialName, id: editMaterial} : item
      // ))
      // setAddMaterial(updateMaterial)
      // setEditMaterial(null)
      try{
         await axios.put(`http://localhost:8000/material/material/${editMaterial}`, materialName)
          getMaterial();
          setEditMaterial(null)
      }catch(err){
        console.log("Error", err)
      }
    }else{
      // let materialId = {id: Date.now(), ...materialName}
      // const materialCopy = [...addMaterial]
      // materialCopy.push(materialId)
      // setAddMaterial(materialCopy)
      try{
        await axios.post("http://localhost:8000/material/material",  materialName)
        getMaterial()
      }catch(err){
        console.log("Error: ", err)
      }
    }
    setMaterialName({code: "", name: "", gsm: "", unit: "", status: "Active"})
  }

  //Clearing the header form

  const handleClear = () =>{
    setMaterialName({code: "", name: "", gsm: "", unit: "", status: "Active"})
    setError({code: "", name: "", gsm: "", unit: ""})
  }

  const handleEdit = (id)=>{
    const editMaterialId = addMaterial.find((item)=>{
      return item.id === id
    })
    setMaterialName({
      code: editMaterialId.code ?? "",
      name: editMaterialId.name ?? "",
      gsm: editMaterialId.gsm ?? "",
      unit: editMaterialId.unit ?? "",
      status: editMaterialId.status ?? "Active"
    })
    setEditMaterial(id)
  }

  //Deleting the Materials fro list
  const handleDelete = async (id) =>{
    try{
      await axios.patch(`http://localhost:8000/material/material/${id}/inactive`)
      getMaterial()
    }catch(err){
      console.log(err)
    }
    // const deleteMaterial = addMaterial.filter((item)=>{
    //   return item.id !== id
    // })
    // setAddMaterial(deleteMaterial)
  }
  
  const handleSearch = (e)=>{
    setSearchMaterial(e.target.value)
  }

  const filteredMaterial = addMaterial.filter((item)=>{
   return (item.status === "Active" &&
            item.name.toLowerCase().includes(searchMaterial.toLowerCase()))
  })

  return (
    <div>
      <div className='bg-gray-100 text-center py-3 text-xl font-bold'>
        <h1>Material Master</h1>
      </div>
      <div className='p-5 grid grid-cols-3 gap-4'>
        <div className='flex flex-col'>
          <label htmlFor="code" className='mb-1'>Item Code</label>
          <input type="text" className='border rounded px-3 py-2' id='code' value={materialName.code} onChange={handleChange}/>
          <p className='text-red-500'>{error.code}</p>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="name" className='mb-1'>Item Name</label>
          <input type="text" className='border rounded px-3 py-2' id='name' value={materialName.name} onChange={handleChange}/>
          <p className='text-red-500'>{error.name}</p>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="gsm" className='mb-1'>GSM</label>
          <input type="text" className='border rounded px-3 py-2' id='gsm' value={materialName.gsm} onChange={handleChange}/>
          <p className='text-red-500'>{error.gsm}</p>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="unit" className='mb-1'>Unit</label>
          <input type="text" className='border rounded px-3 py-2' id='unit' value={materialName.unit} onChange={handleChange}/>
          <p className='text-red-500'>{error.unit}</p>
        </div>
        <div className='mt-6 flex gap-5'>
        <button className='bg-blue-600 text-white px-4 py-2 rounded' onClick={handleSave}>{!editMaterial ? "Save" : "Update"}</button>
        <button className='bg-gray-500 text-white px-4 py-2 rounded' onClick={handleClear}>Clear</button>
      </div>
      </div>
      <hr />
      <div className='relative mx-2 my-3'>
        <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'/>
        <input type="search" placeholder='search' className='border rounded pl-10 pr-2 py-2' value={searchMaterial} onChange={handleSearch}/>
      </div>
      <div>
        <table className='border-collapse border w-full'>
          <thead className='bg-slate-200'>
            <tr>
              <th className='border border-slate-600'>S. No</th>
              <th className='border border-slate-600'>Item Code</th>
              <th className='border border-slate-600'>Item Name</th>
              <th className='border border-slate-600'>GSM</th>
              <th className='border border-slate-600'>Unit</th>
              <th className='border border-slate-600'>Edit</th>
              <th className='border border-slate-600'>Delete</th>
            </tr>
          </thead>  
          <tbody>
            {filteredMaterial.map((material, idx)=>(
              <tr key={material.id}>
              <td className='border border-slate-700 px-2 py-1'>{idx + 1}</td>
              <td className='border border-slate-700 px-2 py-1'>{material.code}</td>
              <td className='border border-slate-700 px-2 py-1'>{material.name}</td>
              <td className='border border-slate-700 px-2 py-1'>{material.gsm}</td>
              <td className='border border-slate-700 px-2 py-1'>{material.unit}</td>
              <td className='border border-slate-700 text-center'><button className='w-full flex items-center justify-center'><RiEditBoxFill className='text-yellow-500 text-xl hover:cursor-pointer' onClick={()=>handleEdit(material.id)}/></button></td>
              <td className='border border-slate-700 text-center'><button className='w-full flex items-center justify-center'><AiFillDelete className='text-red-500 text-xl hover:cursor-pointer' onClick={()=>handleDelete(material.id)}/></button></td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Material
