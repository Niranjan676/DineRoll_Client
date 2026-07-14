import React, { createContext, useState } from 'react'

export const PurchaseOrder = createContext()

function PurchaseContext({ children }) {

const [purchaseHeader, setPurchaseHeader] = useState({ponumber: "", podate: "", suppliername: "", contactperson: "", phone: "", paymentterms: "", remarks: "", status: "open"})
const [purchaseDetail, setPurchaseDetail] = useState([{itemcode: "", itemname: "", gsm: "", quantity: "", unit: "", rate: "", amount: ""}])

  return (
    <PurchaseOrder.Provider value={{purchaseHeader, setPurchaseHeader, purchaseDetail, setPurchaseDetail }}>
        {children}
    </PurchaseOrder.Provider>
  )
}

export default PurchaseContext
