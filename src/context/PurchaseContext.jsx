import axios from 'axios'
import React, { createContext, useState } from 'react'

export const PurchaseOrder = createContext()

function PurchaseContext({ children }) {

const [purchaseHeader, setPurchaseHeader] = useState({ponumber: "", podate: "", suppliername: "", contactperson: "", phone: "", paymentmode: "", remarks: "", status: "open"})
const [purchaseDetail, setPurchaseDetail] = useState([{itemcode: "", itemname: "", gsm: "", quantity: "", unit: "", rate: "", amount: ""}])
const [error, setError] = useState({podate: "", suppliername: "", contactperson: "", phone: "", paymentmode: "", remarks: ""})

const getPoNumber = async () => {
    try {
      const response = await axios.get("http://localhost:8000/purchaseorder/purchaseorder/next-ponumber");
        setPurchaseHeader((prev)=>({...prev, ponumber: response.data.poNumber}));
    } catch (err) {
        console.log(err);
    }
};


//Purchase header validation
const headervalidation = () =>{
 let isValid = true
 let newError = {podate: "", suppliername: "", contactperson: "", phone: "", paymentmode: "", remarks: ""}

 if(!purchaseHeader.podate){
    newError.podate = "Please select a date"
    isValid = false
 }else {
  const selectedDate = new Date(purchaseHeader.podate);
  selectedDate.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison

  if(selectedDate > currentDate){
    newError.podate = "Date cannot be in the future"
    isValid = false
  }
 }
 if(!purchaseHeader.suppliername.trim()){
  newError.suppliername = "Please select supplier name"
  isValid = false
 }
 if(!purchaseHeader.contactperson.trim()){
  newError.contactperson = "Please enter contact person"
  isValid = false
 }
 if(!purchaseHeader.phone.trim()){
  newError.phone = "Please enter phone number"
  isValid = false
 }
 if(!purchaseHeader.paymentmode.trim()){
  newError.paymentmode = "Please select payment mode"
  isValid = false
 }
 setError(newError)
 return isValid;
}

const detailvalidation = () =>{
  let isValid = true

  if(purchaseDetail[0].itemcode === ""){
  alert("Please select at least one item in the purchase detail")
  isValid = false
 }
 return isValid
}

  return (
    <PurchaseOrder.Provider value={{purchaseHeader, setPurchaseHeader, purchaseDetail, setPurchaseDetail, getPoNumber, headervalidation, detailvalidation, error }}>
        {children}
    </PurchaseOrder.Provider>
  )
}

export default PurchaseContext
