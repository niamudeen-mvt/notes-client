import React from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'

const CustomTooltipBox = ({ children }) => {
  return (
    <OverlayTrigger
      key={"Top"}
      placement={"bottom"}
      overlay={
        <Tooltip id={`tooltip-${"bottom"}`}>
          Tooltip on <strong>{"bottom"}</strong>.
        </Tooltip>
      }
    >
      {children}
    </OverlayTrigger>
  )
}

export default CustomTooltipBox