import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

const CustomTooltip = ({
    children,
    placement = 'right',
    msg = 'Tooltip on',
}) => {
    return (
        <OverlayTrigger
            key={placement}
            placement={placement}
            overlay={<Tooltip id={`tooltip-${placement}`}>{msg}</Tooltip>}
        >
            <Button
                className="p-0 border-0"
                style={{ background: 'transparent' }}
            >
                {children}
            </Button>
        </OverlayTrigger>
    );
};

export default CustomTooltip;
