import React from 'react'
import { Spinner } from 'react-bootstrap'

const CustomLoader = () => {
  return (

    <div className='common_container flex_center' style={{
      flexDirection: 'column'
    }}>
      <Spinner animation="border" role="status" className='mb-3'>
      </Spinner>
      <span >Loading.............</span>
    </div>
  )
}

export default CustomLoader