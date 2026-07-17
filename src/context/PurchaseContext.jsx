import axios from 'axios'
import React, { createContext, useState } from 'react'

export const PurchaseOrder = createContext()

function PurchaseContext({ children }) {

const [purchaseHeader, setPurchaseHeader] = useState({ponumber: "", podate: "", suppliername: "", contactperson: "", phone: "", paymentmode: "", remarks: "", status: "open"})
const [purchaseDetail, setPurchaseDetail] = useState([{itemcode: "", itemname: "", gsm: "", quantity: "", unit: "", rate: "", amount: ""}])
const [error, setError] = useState({podate: "", suppliername: "", contactperson: "", phone: "", paymentmode: "", remarks: ""})

const getPoNumber = async () => {
    console.log("get ponumber called")
    try {
      const response = await axios.get("http://localhost:8000/purchaseorder/purchaseorder/next-ponumber");
        setPurchaseHeader({...purchaseHeader, ponumber: response.data.poNumber});
    } catch (err) {
        console.log(err);
    }
};


//Purchase header validation
const validation = () =>{
  let isValid = true;
  
  const selectedDate = new Date(purchaseHeader.podate);
  //Removing time
  selectedDate.setHours(0, 0, 0, 0)
  
  const today = new Date()
  //Removing time
  today.setHours(0, 0, 0, 0);

  //Clears the error if current or previous date selected
  setError({podate: ""})

  if(purchaseHeader.podate === ""){
    setError({...error, podate: "Please select PO date"})
    isValid = false
  } else if(selectedDate > today){
    setError({...error, podate: "Future date is not allowed"})
    isValid = false
  }
  if(purchaseHeader.suppliername.trim() === ""){
    setError({...error, suppliername:"Please select the supplier name"})
    isValid = false
  }
  return isValid
}

  return (
    <PurchaseOrder.Provider value={{purchaseHeader, setPurchaseHeader, purchaseDetail, setPurchaseDetail, getPoNumber, validation, error }}>
        {children}
    </PurchaseOrder.Provider>
  )
}

export default PurchaseContext
