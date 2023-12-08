import React from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'

const CustomTooltip = ({ children, placement = "bottom", msg = "Tooltip on" }) => {
  return (
    <OverlayTrigger
      key={placement}
      placement={placement}
      overlay={
        <Tooltip id={`tooltip-${placement}`}>
          {msg}
        </Tooltip>
      }
    >
      <Button variant="secondary" className="p-0 bg-light border-0">
        {children}
      </Button>
    </OverlayTrigger>
  )
}

export default CustomTooltip