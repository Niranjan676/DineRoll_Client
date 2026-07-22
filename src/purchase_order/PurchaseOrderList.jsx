import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaSearch, FaEye, FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
// import { useNavigate } from 'react-router-dom';
import PurchaseOrderView from './PurchaseOrderView'

function PurchaseOrderList() {

const [orderlist, setOrderlist] = useState([])
const [search, setSearch] = useState("")
const [selectedorder, setSelectedorder] = useState(null)
const [selectedorderdetail, setSelectedorderdetail] = useState(null)
const [orderView, setOrderView] = useState(false)

// const navigate = useNavigate();

const getList = async()=>{
  try{
    const response = await axios.get(`http://localhost:8000/purchaseorder/po-order-list`)
    console.log(response.data.result)
    setOrderlist(response.data.result)
  }catch(err){
    console.log(err)
  }
}

useEffect(()=>{
  getList()
}, [])

const searchvalue = (e)=>{
  setSearch(e.target.value)
}

const filteredOrder = orderlist.filter((ele)=>{
  const searchText = search.toLowerCase()
  return (
    ele.ponumber.toLowerCase().includes(searchText) ||
    ele.suppliername.toLowerCase().includes(searchText)
  )
})

const purchaseOrderView = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/purchaseorder/orderview/${id}`
    );
    console.log(response.data.result)
    setSelectedorder(response.data.result);
    setOrderView(true);
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className='h-screen flex flex-col'>
      <div className='text-center bg-gray-100 text-xl font-bold py-3'>
        <h1>Purchase Order List</h1>
      </div>
      <div className='mt-4 ml-4 relative'>
        <FaSearch className='absolute text-gray-500 left-3 top-1/2 -translate-y-1/2'></FaSearch>
        <input type="search" value={search} className='border pl-10 pr-2 py-2 rounded' placeholder='search' onChange={searchvalue}/>
      </div>
      <div className='mt-5'>
        <table className='w-full border border-collapse border-slate-500'>
            <thead>
                <tr className='border bg-slate-200'>
                    <th className='border border-slate-600'>S.No</th>
                    <th className='border border-slate-600'>PO Number</th>
                    <th className='border border-slate-600'>Supplier Name</th>
                    <th className='border border-slate-600'>Order Date</th>
                    <th className='border border-slate-600'>View</th>
                    <th className='border border-slate-600'>Edit</th>
                    <th className='border border-slate-600'>Delete</th>
                </tr>
            </thead>
            <tbody>
                {filteredOrder.map((ele, idx)=>(
                  <tr className='pl-2 border' key={ele.id}>
                    <td className='border border-slate-700 px-2 py-1'>{idx + 1}</td>
                    <td className='border border-slate-700 px-2 py-1'>{ele.ponumber}</td>
                    <td className='border border-slate-700 px-2 py-1'>{ele.suppliername}</td>
                    <td className='border border-slate-700 px-2 py-1'>{ele.podate}</td>
                    <td className='border border-slate-700 px-2 py-1 text-center'><button className='w-8 h-8 bg-[#2596be] inline-flex items-center justify-center rounded hover:cursor-pointer' onClick={()=>purchaseOrderView(ele.id)}><FaEye className='text-white text-xl'/></button></td>
                    <td className='border border-slate-700 px-2 py-1 text-center'><button className='w-8 h-8 bg-[#F0CC41] inline-flex items-center justify-center rounded hover:cursor-pointer'><FaEdit className='text-white text-xl'/></button></td>
                    <td className='border border-slate-700 px-2 py-1 text-center'><button className='w-8 h-8 bg-[#F03737] inline-flex items-center justify-center rounded hover:cursor-pointer'><FaDeleteLeft className='text-white text-xl'/></button></td>
                </tr>
                ))}
            </tbody>
        </table>
        {orderView && <PurchaseOrderView order= {selectedorder} onclose={()=>setOrderView(false)}/>}
      </div>
    </div>
  )
}

export default PurchaseOrderList
