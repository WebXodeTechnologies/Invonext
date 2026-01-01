import React from 'react'
import ClientHeader from './components/clientHeader'
import ClientsTable from './components/ClientsTable'

const page = () => {
  return (
    <section>
      <ClientHeader/>
      <ClientsTable/>
    </section>
  )
}

export default page