import React, { useState, useEffect } from 'react';
import { Modal, Button, Form,Spinner } from 'react-bootstrap';

import './UploadForm.css';
import axios from 'axios';

function UploadForm(props) {
  console.log(props.show)
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(['']);

  const [fileId, setFileId] = useState(['']);
  const [data, setData] = useState({
    file: '',
    title: '',
    description: '',
    category: '',
  });
  useEffect(() => {
    axios({
      method: 'get',
      url: `/resource/categories`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setCategories(response.data);
    });
  }, []);
  const { file, title, description, category } = data;

  // making a controlled component
  const onChange = (e) =>
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  const uploadPhoto = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.files[0],
    });
  };

  const uploadFile = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append('asset', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('data', JSON.stringify(formData));
    await axios({
      method: 'post',
      url: '/resource',
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setFileId(response.data.id);
        
        // // setUploaded(true);
        // console.log(response)
      })
      .catch((error) => {
        alert(error);
      });
    console.log(fileId);
    setData({});
    props.AllCategories();
  };

  const categoryHandler = () => {
    if (fileId) {
      axios({
        method: 'post',
        url: `/resource/${fileId}/category`,
        data: {
          category: category,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    categoryHandler();
  }, [fileId]);
  return (
    <div className="uploadForm">
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="uploadForm_modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Upload File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                value={title}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={description}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.File
                id="custom-file-translate-scss"
                label="File"
                lang="en"
                custom
                name="file"
                onChange={(e) => {
                  uploadPhoto(e);
                }}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Select Category</Form.Label>
              <Form.Control as="select" name="category" onChange={onChange}>
                <option hidden> Select Category </option>
                {categories.map((category) => (
                  <option key={category.id}>{category.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="uploadForm_footer">
          <Button onClick={props.onHide}>Cancel</Button>
          <Button onClick={(e) => uploadFile(e)}>
            {loading && (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            )}{' '}
            Upload File
          </Button>
        </Modal.Footer>
      </Modal>
   
    </div>
  );
}

export default UploadForm;
