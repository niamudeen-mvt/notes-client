import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CustomModal = ({ showModal, setShowModal, modalHeading, children, handleSubmit, contentType }) => {

  const handleClose = () => setShowModal(false);

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {
            contentType === "MORE" ?
              null :
              <Button variant="primary" onClick={handleSubmit}>
                Save Changes
              </Button>

          }
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomModal;