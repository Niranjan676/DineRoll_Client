import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='grid grid-cols-[240px_1fr] w-full min-h-screen'>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
