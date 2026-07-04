import React, { useState } from 'react'
import { AiFillDelete } from "react-icons/ai";

function PurchaseTable() {
    const [additems, setAdditems] = useState([{id: 1, itemCode: "", itemName: "", gsm: "", quantity: "", unit: "", rate: "", amount: ""}])

    const handleAddRow  = () =>{
        setAdditems([...additems, {id: additems.length + 1, itemCode: "", itemName: "", gsm: "", quantity: "", unit: "", rate: "", amount: ""}])
    }

  return (
    <div className='flex flex-col'>
        <hr />
        <div className='text-right mr-4 my-4'>
            <button className='bg-blue-500 text-white px-2 py-1 rounded' onClick={handleAddRow}>+ Add Row</button>
        </div>
        <div className='h-[250px] overflow-y-auto'>
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
                    <th className='border border-slate-600'></th>
                </tr>
            </thead>
            <tbody>
                {additems.map((additem, idx)=>(
                    <tr key={additem.id}>
                    <td className='border border-slate-600 px-2 py-1'>{idx + 1}</td>
                    <td className='border border-slate-600 px-2 py-1'>{additem.itemCode}</td>
                    <td className='border border-slate-600 px-2 py-1'>{additem.itemName}</td>
                    <td className='border border-slate-600 px-2 py-1'>{additem.gsm}</td>
                    <td className='border border-slate-600 px-2 py-1'>{additem.quantity}</td>
                    <td className='border border-slate-600 px-2 py-1'>{additem.unit}</td>
                    <td className='border border-slate-600 px-2 py-1'>{additem.rate}</td>
                    <td className='border border-slate-600 px-2 py-1'>{additem.amount}</td>
                    <td className='border border-slate-600 px-2 py-1'><button className='w-full flex justify-center items-center'><AiFillDelete className="text-red-500 text-xl hover:cursor-pointer" /></button></td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </div>
  )
}

export default PurchaseTable
