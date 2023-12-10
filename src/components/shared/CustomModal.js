import { Spinner } from "react-bootstrap";
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
  showSpinner,
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
            <Button
              variant="secondary"
              onClick={handleClose}
              className="px-5 py-3"
            >
              Close
            </Button>
            {contentType === "MORE" ? null : showSpinner ? (
              <Button
                variant="primary"
                onClick={handleSubmit}
                className="px-5 py-3"
              >
                <Spinner
                  variant="light"
                  animation="border"
                  role="status"
                  size="sm"
                ></Spinner>
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleSubmit}
                className="px-5 py-3"
              >
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
