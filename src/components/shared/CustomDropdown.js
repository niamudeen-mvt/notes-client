import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiEye } from 'react-icons/fi';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';

const CustomDropdown = ({
    handleSeeNoteDetails,
    handleEdit,
    handleDelteNote,
}) => {
    const iconStyles = {
        color: 'black',
        cursor: 'pointer',
        fontSize: '18px',
    };
    return (
        <Dropdown>
            <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
                style={{ backgroundColor: 'transparent', border: 'none' }}
            >
                <BsThreeDotsVertical />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item className="d-flex align-items-center  gap-2 fs-6">
                    <FiEye style={iconStyles} onClick={handleSeeNoteDetails} />
                    <span>View</span>
                </Dropdown.Item>
                <Dropdown.Item className="d-flex align-items-center  gap-2 fs-6">
                    <FiEdit
                        style={iconStyles}
                        className="cursor d-block"
                        onClick={handleEdit}
                    />
                    <span>Edit</span>
                </Dropdown.Item>
                <Dropdown.Item className="d-flex align-items-center  gap-2 fs-6">
                    <AiOutlineDelete
                        style={iconStyles}
                        onClick={handleDelteNote}
                    />
                    <span>Delete</span>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default CustomDropdown;
