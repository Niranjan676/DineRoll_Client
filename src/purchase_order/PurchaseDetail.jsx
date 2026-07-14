import React, { useContext, useEffect, useState } from 'react'
import { AiFillDelete } from "react-icons/ai";
import {PurchaseOrder} from "../context/PurchaseContext"
import axios from 'axios'

function PurchaseDetail() {

const {purchaseDetail, setPurchaseDetail} = useContext(PurchaseOrder)

const [rawmaterial, setRawmaterial] = useState([])

const handleAddRow = () =>{
    setPurchaseDetail([...purchaseDetail, {itemcode: "", itemname: "", gsm: "", quantity: "", unit: "", rate: "", amount: ""}])
}

const getRawMaterial = async()=>{
    try{
        const result = await axios.get("http://localhost:8000/material")
        setRawmaterial(result.data)
    }catch(err){
        console.log("Error:", err)
    }
}

useEffect(()=>{
    getRawMaterial()
}, [])

const handleSelectItem = (itemId, selectedItem)=>{
    const selectedmaterial = rawmaterial.find((ele)=>{
        return ele.itemcode === selectedItem
    })
    if(!selectedmaterial) return;

    const updatedMaterial = [...purchaseDetail]
    updatedMaterial[itemId] = {...updatedMaterial[itemId], itemcode: selectedmaterial.itemcode, itemname: selectedmaterial.name, gsm: selectedmaterial.gsm, unit: selectedmaterial.unit}
    setPurchaseDetail(updatedMaterial)
}

const handleDelete = (idx)=>{
    const deleteItem = purchaseDetail.filter((_, index)=>{
        return index !== idx
    })
    setPurchaseDetail(deleteItem)
}

const handleInputChange = (idx, e)=>{
    const {name, value} = e.target

    const updatedRow = [...purchaseDetail]
    updatedRow[idx][name] = value

    const quantity = Number(updatedRow[idx].quantity) || 0
    const rate = Number(updatedRow[idx].rate) || 0

    updatedRow[idx].amount = quantity * rate

    setPurchaseDetail(updatedRow)
}


  return (
      <div className='flex flex-col'>
          <hr />
          <div className='text-right mr-4 my-4'>
              <button className='bg-blue-500 text-white px-2 py-1 rounded' onClick={handleAddRow}>+ Add Row</button>
          </div>
          <div className='h-[300px] overflow-y-auto'>
              <table className='w-full border border-collapse border-slate-500 mt-2'>
                  <thead className='bg-slate-200'>
                      <tr>
                          <th className='border border-slate-600'>#</th>
                          <th className='border border-slate-600'>Item code</th>
                          <th className='border border-slate-600'>item name</th>
                          <th className='border border-slate-600'>GSM</th>
                          <th className='border border-slate-600'>Quantity</th>
                          <th className='border border-slate-600'>Unit</th>
                          <th className='border border-slate-600'>Rate</th>
                          <th className='border border-slate-600'>Amount</th>
                          <th className='border border-slate-600'>Delete</th>
                      </tr>
                  </thead>
              <tbody>
                {purchaseDetail.map((material, idx)=>(
                    <tr key={idx}>
                    <td className='border border-slate-600 px-2 py-1'>{idx + 1}</td>
                    <td className='border border-slate-600 px-2 py-1'>
                        <select name="itemcode" id="itemcode" className="w-full border rounded" value={material.itemcode} onChange={(e)=>handleSelectItem(idx, e.target.value)}>
                            <option value="">select item</option>
                            {rawmaterial.map((ele)=>(
                                <option key={ele.id} value={ele.itemcode}>{ele.itemcode}-{ele.name}</option>
                            ))}
                        </select>
                    </td>
                    <td className='border border-slate-600 px-2 py-1'>{material.itemname}</td>
                    <td className='border border-slate-600 px-2 py-1'>{material.gsm}</td>
                    <td className='border border-slate-600 px-2 py-1'><input type="number" name="quantity" id="quantity" value={material.quantity} className='w-full outline-none' onChange={(e)=>handleInputChange(idx, e)}/></td>
                    <td className='border border-slate-600 px-2 py-1'>{material.unit}</td>
                    <td className='border border-slate-600 px-2 py-1'><input type="number" name="rate" id="rate" value={material.rate} className='w-full outline-none' onChange={(e)=>handleInputChange(idx, e)}/></td>
                    <td className='border border-slate-600 px-2 py-1'>{material.amount}</td>
                    <td className='border border-slate-600 px-2 py-1'><button className='w-full flex justify-center items-center' onClick={()=>handleDelete(idx)}><AiFillDelete className="text-red-500 text-xl hover:cursor-pointer" /></button></td>
                  </tr>
                ))}
              </tbody>
              </table>
          </div>
      </div>
    )
  }

export default PurchaseDetail
