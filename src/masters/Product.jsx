import React, { useState } from 'react'
import { RiEditBoxFill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import axios from "axios"
import { useEffect } from 'react';

function Product() {
  const [product, setProduct] = useState({productCode: "", productName: "", productCategory: "", productType: "", productMaterial: "", gsm: "", weight: "", length: "", unit: "", hsnCode: "", status: "Active"})
  const [addProduct, setAddProduct] = useState([])
  const [editProduct, setEditProduct] = useState(null)
  const [error, setError] = useState({productCode: "", productName: "", productCategory: "", productType: "", productMaterial: "", gsm: "", weight: "", length: "", unit: "", hsnCode: ""})
  const [searchProduct, setSearchProduct] = useState("")

  
  const handleChange = (e)=>{
    setProduct({...product, [e.target.id]: e.target.value})
  }

  const productSearch = (e)=>{
    setSearchProduct(e.target.value)
  }

  const validation = ()=>{
    const newError = {productCode: "", productName: "", productCategory: "", productType: "", productMaterial: "", gsm: "", weight: "", length: "", unit: "", hsnCode: ""}
    let isValid = true;

    if(product.productCode.trim() === ""){
      newError.productCode = "Please enter product code"
      isValid = false
    }

    if(product.productName.trim() === ""){
      newError.productName = "Please enter product name";
      isValid = false
    }

    if(product.productCategory.trim() === ""){
      newError.productCategory = "Please enter product category";
      isValid = false
    }

    if(product.productType.trim() === ""){
      newError.productType = "Please enter the product type"
      isValid = false
    }

    if(product.productMaterial.trim() === ""){
      newError.productMaterial = "Please enter the material of the product"
      isValid = false
    }

    if(product.gsm === ""){
      newError.gsm = "Please enter the GSM of the product"
      isValid = false
    }else if(!/^\d+$/.test(product.gsm)){
      newError.gsm = "Please enter the valid number of GSM"
      isValid = false
    }

    if(product.weight === ""){
      newError.weight = "Please enter product weight"
      isValid = false
    }else if(!/^\d+(\.\d+)?$/.test(product.weight)){
      newError.weight = "Product weight should be a valid number"
      isValid = false
    }

    if(product.length === ""){
      newError.length = "Please enter the product length in meter"
      isValid = false
    }else if(!/^\d+(\.\d+)?$/.test(product.length)){
      newError.length = "Length should be a valid number"
      isValid = false
    }  

    if(product.unit.trim() === ""){
      newError.unit = "Please enter the Unit"
      isValid = false
    }
    
    if(product.hsnCode.trim() === ""){
      newError.hsnCode = "Please enter the HSN Code"
      isValid = false
    }else if(!/^\d{4,8}$/.test(product.hsnCode)){
      newError.hsnCode = "HSN Code must contain 4 to 8 digits"
      isValid = false
    }
    
    setError(newError)
    return isValid
  }

  const getProduct = async () =>{
    try{
      const check = await axios.get("http://localhost:8000/product")
      setAddProduct(check.data.data)
    }catch(err){
      console.log("Error", err)
    }
  }

  useEffect(()=>{
    getProduct()
  }, [])

  //Adding the products
  const handleSave = async ()=>{
    if(!validation()){
      return
    }

    if(editProduct){
      // let updateId = addProduct.map((item)=>(
      //   item.id === editProduct ? {...product, id: editProduct} : item
      // ))
      // setAddProduct(updateId)
      // setEditProduct(null)
      try{
        await axios.put(`http://localhost:8000/product/updateproduct/${editProduct}`, product)
        getProduct()
        setEditProduct(null)
      }catch(err){
        if(err.response.status === 409){
          alert(err.response.data.message)
        }
      }

    }else{
      // const productId = {id: Date.now(), ...product}
      // const productCopy = [...addProduct]
      // productCopy.push(productId)
      // setAddProduct(productCopy)

      try{
        const response = await axios.post("http://localhost:8000/product/product", product)
        alert(response.data.message)
        getProduct()
      }catch(err){
        console.log("Error: ", err)
      }
    }
    setProduct({productCode: "", productName: "", productCategory: "", productType: "", productMaterial: "", gsm: "", weight: "", length: "", unit: "", hsnCode: "", status: "Active"})
  }


  //Clearing the form data
  const handleClear = ()=>{
    setProduct({productCode: "", productName: "", productCategory: "", productType: "", productMaterial: "", gsm: "", weight: "", length: "", unit: "", hsnCode: "", status: "Active"})
    setError({productCode: "", productName: "", productCategory: "", productType: "", productMaterial: "", gsm: "", weight: "", length: "", unit: "", hsnCode: ""})
  }

  //Updating the data
  const updateProduct =(id)=>{
    const editedProduct = addProduct.find((item)=>{
      return item.id === id
    })
    setProduct(editedProduct)
    setEditProduct(id)
  }


 //Deleting the data
  const handleDelete = async (id)=>{
    // const deleteItem = addProduct.filter((item)=>{
    //   return item.id !== id
    // })
    // setAddProduct(deleteItem)
    try{
      const deleteProduct = await axios.patch(`http://localhost:8000/product/deleteproduct/${id}`, addProduct)
      alert(deleteProduct.data.message)
      getProduct()
    }catch(err){
      if(err.response.status === 500){
        alert("Unable to delete data")
      }else if(err.response.status === 404){
        alert("Not Found")
      }
    }
  }

  //Search content using product name
  const searchFilter = addProduct.filter((item)=>{
    return (
      item.status === "Active" &&
      item.productName.toLowerCase().includes(searchProduct.toLowerCase())
    )
  })

  return (
    <div>
      <div className='bg-gray-100 text-center py-3 text-xl font-bold'>
        <h1>Product Master</h1>
      </div>
      <div className='p-5'>
        <div className='grid grid-cols-4 gap-4'>
        <div className='flex flex-col gap-1'>
          <label htmlFor="productCode">Product Code</label>
          <input type="text" name="productCode" id="productCode"  value={product.productCode} className='border rounded px-3 py-2' onChange={handleChange}/>
          <p className='text-red-500'>{error.productCode}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="productName">Product Name</label>
          <input type="text" name="productName" id="productName" value={product.productName} className='border rounded px-3 py-2' onChange={handleChange}/>
          <p className='text-red-500'>{error.productName}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="productCategory">Product Category</label>
          <input type="text" name="productCategory" id="productCategory" value={product.productCategory} className='border rounded px-3 py-2' onChange={handleChange}/>
          <p className='text-red-500'>{error.productCategory}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="productType">Product Type</label>
          <input type="text" name="productType" id="productType" value={product.productType} className='border rounded px-3 py-2' onChange={handleChange}/>
          <p className='text-red-500'>{error.productType}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="productMaterial">Product Material</label>
          <input type="text" name="productMaterial" id="productMaterial" value={product.productMaterial} className='border rounded px-3 py-2' onChange={handleChange}/>
          <p className='text-red-500'>{error.productMaterial}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="gsm">GSM</label>
          <input type="text" name="gsm" id="gsm" value={product.gsm} className='border rounded px-3 py-2' onChange={handleChange}/>
          <p className='text-red-500'>{error.gsm}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="weight">Weight</label>
          <input type="text" name="weight" id="weight" value={product.weight} className='border rounded px-3 py-2' onChange={handleChange}/>
          <p className='text-red-500'>{error.weight}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="length">Length</label>
          <input type="text" name="length" id="length" value={product.length} className='border rounded px-3 py-2' onChange={handleChange}/>
          <p className='text-red-500'>{error.length}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="unit">Unit</label>
          <input type="text" name="unit" id="unit" value={product.unit} className='border rounded px-3 py-2' onChange={handleChange}/>
          <p className='text-red-500'>{error.unit}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="hsnCode">HSN Code</label>
          <input type="text" name="hsnCode" id="hsnCode" value={product.hsnCode} className='border rounded px-3 py-2' onChange={handleChange}/>
          <p className='text-red-500'>{error.hsnCode}</p>
        </div>
        <div className='flex items-center'>
          <p>Status: <span className='text-green-500 font-bold'>{product.status}</span></p>
        </div>
      </div>
      <div className='mt-6 flex gap-3'>
          <button className='bg-blue-600 text-white rounded px-4 py-2' onClick={handleSave}>{!editProduct ? "Save" : "Update"}</button>
          <button className='bg-gray-500 text-white rounded px-4 py-2' onClick={handleClear}>Clear</button>
      </div>
      </div>
      <hr />
      <div className='relative mx-2 my-3'>
          <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'/>
          <input type="search" placeholder='search' onChange={productSearch} className='border rounded pl-10 pr-2 py-2'/>
      </div>
      <div className='mt-5'>
        <table className='border border-collapse w-full border-slate-500'>
          <thead>
            <tr className='bg-slate-200'>
            <th className='border border-slate-600'>S.No</th>
            <th className='border border-slate-600'>Product code</th>
            <th className='border border-slate-600'>Product name</th>
            <th className='border border-slate-600'>Product category</th>
            <th className='border border-slate-600'>Product type</th>
            <th className='border border-slate-600'>Product material</th>
            <th className='border border-slate-600'>GSM</th>
            <th className='border border-slate-600'>Weight</th>
            <th className='border border-slate-600'>Length</th>
            <th className='border border-slate-600'>Unit</th>
            <th className='border border-slate-600'>HSN Code</th>
            <th className='border border-slate-600'>Edit</th>
            <th className='border border-slate-600'>Delete</th>
          </tr>
          </thead>
          <tbody>
            {searchFilter.map((productItem, idx)=>(
              <tr key={productItem.id}>
              <td className='border border-slate-700 px-2 py-1'>{idx+1}</td>
              <td className='border border-slate-700 px-2 py-1'>{productItem.productCode}</td>
              <td className='border border-slate-700 px-2 py-1'>{productItem.productName}</td>
              <td className='border border-slate-700 px-2 py-1'>{productItem.productCategory}</td>
              <td className='border border-slate-700 px-2 py-1'>{productItem.productType}</td>
              <td className='border border-slate-700 px-2 py-1'>{productItem.productMaterial}</td>
              <td className='border border-slate-700 px-2 py-1'>{productItem.gsm}</td>
              <td className='border border-slate-700 px-2 py-1'>{productItem.weight}</td>
              <td className='border border-slate-700 px-2 py-1'>{productItem.length}</td>
              <td className='border border-slate-700 px-2 py-1'>{productItem.unit}</td>
              <td className='border border-slate-700 px-2 py-1'>{productItem.hsnCode}</td>
              <td className='border border-slate-700 text-center'><button className='w-full flex items-center justify-center'><RiEditBoxFill className='text-yellow-500 text-xl hover:cursor-pointer' onClick={()=>updateProduct(productItem.id)}/></button></td>
              <td className='border border-slate-700 text-center'><button className='w-full flex items-center justify-center'><AiFillDelete className='text-red-500 text-xl hover:cursor-pointer' onClick={()=>handleDelete(productItem.id)}/></button></td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Product
