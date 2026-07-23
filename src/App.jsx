import React from 'react'
import Layout from './components/Layout'
import { Routes, Route } from 'react-router-dom'
import Supplier from './masters/Supplier'
import Material from './masters/Material'
import Customer from './masters/Customer'
import Product from './masters/Product'
import Expense from './masters/Expense'
import Purchase from './transactions/Purchase'
import Production from './transactions/Production'
import PurchaseOrderList from './purchase_order/PurchaseOrderList'
import PurchaseOrderView from './purchase_order/PurchaseOrderView'
import PurchaseOrderEdit from './purchase_order/PurchaseOrderEdit'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/supplier' element={<Supplier />}/>
        <Route path='/material' element={<Material />}/>
        <Route path='/customer' element={<Customer />}/>
        <Route path='/product' element={<Product />}/>
        <Route path='/expense' element={<Expense />}/>
        <Route path='/purchase' element={<Purchase />}/>
        <Route path='/production' element={<Production />}/>
        <Route path='/PurchaseOrderList' element={<PurchaseOrderList />}/>
        <Route path='/PurchaseOrderView/:id' element={<PurchaseOrderView />}></Route>
        <Route path='/PurchaseOrderEdit/:id' element={<PurchaseOrderEdit />}></Route>
      </Route>
    </Routes>
  )
}

export default App