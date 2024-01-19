import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Main from './Main'

const Dashboard = () => {
  return (
      <>
      
      <div className="relative bg-yellow-50 overflow-hidden max-h-screen">

    <Header/>

    <Sidebar/>

    <Main/>

</div>


      </>
  )
}

export default Dashboard
