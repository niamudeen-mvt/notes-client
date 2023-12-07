import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CustomButton = ({ text, url, onClick }) => {

  console.log("custom button is rendering")
  return (
    <Link to={url ? url : '#'}>
      <Button className="py-3 px-5 text-uppercase" onClick={onClick}>{text}</Button>
    </Link>
  )
}

export default CustomButton