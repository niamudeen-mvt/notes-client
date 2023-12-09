import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const CustomModal = ({
  showModal,
  modalHeading,
  children,
  handleSubmit,
  contentType,
  handleClose,
  showFooter,
}) => {
  return (
    <>
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        {showFooter ? (
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {contentType === "MORE" ? null : (
              <Button variant="primary" onClick={handleSubmit}>
                Save Changes
              </Button>
            )}
          </Modal.Footer>
        ) : null}
      </Modal>
    </>
  );
};

export default CustomModal;
