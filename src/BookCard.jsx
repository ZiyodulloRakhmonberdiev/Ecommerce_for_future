import React, { useState } from 'react';
import {Card, CardTitle, CardImg, Button, Modal} from 'reactstrap'

function BookCard({
  thumbnail,
  title, 
  pageCount,
  language, 
  description,
  authors,
  publisher,
  infoLink,
  categories
}) {
  //States 
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal)
  return (
    <div>
      <Card  className=" p-4 mb-2 border-0 rounded-0 card" style={{backgroundColor: '#D3D3D3', height:'auto'}} onDoubleClick={toggle}>
        <CardImg top style={{width: '100%', height: '283px'}} src={thumbnail} alt={title} className="mb-3 p-4"/>
        <u className='mb-1 lead fs-6'> 
          { categories ? categories : 'Categories not detected'}
        </u>
        <CardTitle className='card-title'>{title.substring(0, 18)}...</CardTitle>
        <p className='text-nowrap overflow-hidden'>  
          { authors ? authors : 'Authors not detected'} 
        </p>
        <div className='d-flex justify-content-center align-items-center'>
          <Button onClick={toggle}>Read More</Button>
        </div>

        {/* Modal Content for complete info */}
        <Modal isOpen={modal} toggle={toggle} className='d-flex position-relative' >
          <div className="modal-header d-flex flex-column" >
          <button aria-label='close' className='close btn position-absolute top-0 end-0' type='button' onClick={toggle}>
            <span aria-hidden={true} className='fa fa-close'></span>
          </button>
            <p className='mb-1 lead fs-6 w-100'> 
              { categories ? categories : 'Categories not detected'}
            </p>
            <h5 className='modal-title ' id="exampleModalLabel">{title}</h5>
          </div>
          <div className="modal-body">
            <div className="d-flex justify-content-between">
              <img src={thumbnail} alt={title} />
              <div>
                <p>Page Count: {pageCount}</p>
                <p>Language: {language}</p>
                <p>Authors: {authors}</p>
                <p>Publisher: {publisher}</p>
              </div>
            </div>
            <p className='mt-3'>{description}</p>
          </div>
          <div className="modal-footer d-flex align-items-center justify-content-between">
            <div className="divider"></div>
            <div className="left-slide">
              <a href={infoLink} 
                className="btn-link" 
                type='button' 
                color='default'
                target='_blank'  
                rel='noopener noreferrer'>
                Official channel Link
              </a>
            </div>
            <div className="right-slide">
              <btn 
                className="btn btn-secondary" 
                type='button' 
                aria-label='close'
                onClick={toggle}
              >
                Back
              </btn>
            </div>
          </div>
        </Modal>
      </Card>
    </div>
  );
}

export default BookCard;