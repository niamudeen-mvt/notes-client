import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ImagePreviewModal = ({ showImgModal, setShowImgModal, imgUrl }) => {
  const handleClose = () => setShowImgModal(false);
  return (
    <>
      <Modal show={showImgModal} onHide={handleClose} size="lg">
        <Modal.Body>
          <div className="max-vh-100">
            <div style={{ height: "450px" }}>
              <img
                src={imgUrl}
                alt="note-img"
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImagePreviewModal;
