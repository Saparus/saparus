import React from 'react'
import { Contacts } from '../footer'
import Map from '../../assets/map'
function about() {
  return (
    <div className='about_us'>
      <div className="parts first">
        <Map/>
        <Contacts /></div>
      <div className="parts second"></div>
      <div className="parts third"></div>

    </div>
  )
}

export default about