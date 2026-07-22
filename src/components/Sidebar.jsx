import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineDoubleArrow, MdDashboard, MdStorage, MdLogout } from "react-icons/md";
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from "react-icons/io";
import { FaExchangeAlt } from "react-icons/fa";

function Sidebar() {
  const [showMaster, setShowMaster] = useState(false)
  const [showTransaction, setShowTransaction] = useState(false)

  const masters = ()=>{
    setShowMaster(!showMaster)
  }

  const transaction = () =>{
    setShowTransaction(!showTransaction)
  }

  return (
    <div className='w-full bg-[#2A2099] flex flex-col items-center text-white gap-4 p-3'>
        <div className='mt-5 flex items-center flex-col'>
          <img src="/images/user.png" alt="avatar" className='w-28 h-28 rounded-full'/>
          <h1 className='mt-2 font-bold text-xl text-center'>Niranjan Purushothaman</h1>
        </div>
        <div>
          <ul className='list-none flex gap-3 flex-col text-lg'>
            <li className='flex items-center gap-2 hover:text-yellow-300'><span><MdDashboard /></span><Link to="/">Dashboard</Link></li>
            <li><button onClick={masters} className='flex items-center gap-2 hover:text-yellow-300'><span><MdStorage /></span>Masters <span>{showMaster ? <IoIosArrowDropupCircle /> : <IoIosArrowDropdownCircle />}</span></button>
              {showMaster && (
                <ul className='ml-4 space-y-2'>
                <li className='flex items-center gap-2 hover:text-yellow-300 transition-all duration-300'><span><MdOutlineDoubleArrow /></span><Link to="/supplier">Supplier</Link></li>
                <li className='flex items-center gap-2 hover:text-yellow-300 transition-all duration-300'><span><MdOutlineDoubleArrow /></span><Link to="/material">Material</Link></li>
                <li className='flex items-center gap-2 hover:text-yellow-300 transition-all duration-300'><span><MdOutlineDoubleArrow /></span><Link to="/customer">Customer</Link></li>
                <li className='flex items-center gap-2 hover:text-yellow-300 transition-all duration-300'><span><MdOutlineDoubleArrow /></span><Link to="/product">Products</Link></li>
                <li className='flex items-center gap-2 hover:text-yellow-300 transition-all duration-300'><span><MdOutlineDoubleArrow /></span><Link to="/expense">Expense</Link></li>
              </ul>
              )}
            </li>
            <li><button onClick={transaction} className='flex items-center gap-2 hover:text-yellow-300'><span><FaExchangeAlt /></span>Purchase <span>{showTransaction ? <IoIosArrowDropupCircle /> : <IoIosArrowDropdownCircle />}</span></button>
              {showTransaction && (
              <ul className='ml-4 space-y-2'>
                <li className='flex items-center gap-2 hover:text-yellow-300 transition-all duration-300'><span><MdOutlineDoubleArrow /></span><Link to="/purchase">Purchase Order</Link></li>
                <li className='flex items-center gap-2 hover:text-yellow-300 transition-all duration-300'><span><MdOutlineDoubleArrow /></span><Link to="/PurchaseOrderList">Purchase Order List</Link></li>
                <li className='flex items-center gap-2 hover:text-yellow-300 transition-all duration-300'><span><MdOutlineDoubleArrow /></span><Link to="/production">Production</Link></li>
                <li className='flex items-center gap-2 hover:text-yellow-300 transition-all duration-300'><span><MdOutlineDoubleArrow /></span><Link>Sales</Link></li>
                <li className='flex items-center gap-2 hover:text-yellow-300 transition-all duration-300'><span><MdOutlineDoubleArrow /></span><Link>Expense</Link></li>
              </ul>
              )}
            </li> 
          </ul>
        </div>
    </div>
  )
}

export default Sidebar
