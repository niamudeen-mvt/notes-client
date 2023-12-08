import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../../config';
import { useState } from 'react';

const ImagePreviewModal = ({ showImgModal, setShowImgModal, noteImgList }) => {

  const [imgIndex, setImgIndex] = useState(0)

  const handleClose = () => setShowImgModal(false);

  const LOCALHOST = BASE_URL.replace("/api/v1", "")
  return (
    <>
      <Modal show={showImgModal} onHide={handleClose} size="lg">
        <Modal.Body>
          <div className='max-vh-100'>
            <div className='border ' style={{ height: '450px' }}>
              <img src={`${LOCALHOST}/${noteImgList[imgIndex].image}`} alt='note-img' />
            </div>

            {
              noteImgList?.length > 1 ?
                <div className='d-flex gap-3'>
                  {noteImgList?.length ?
                    noteImgList?.map((note, index) => {
                      return (
                        <div style={{ height: '200px' }}>
                          <img src={`${LOCALHOST}/${note.image}`} alt='note-img' className='w-full box_shadow cursor' onClick={() => setImgIndex(index)} />
                        </div>
                      )
                    })
                    : null}
                </div> : null}
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
}

export default ImagePreviewModal;