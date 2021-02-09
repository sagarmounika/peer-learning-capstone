import React, { useState, useEffect } from 'react';
import { Modal, Button, Form,Spinner } from 'react-bootstrap';
import axios from 'axios';
import './Discussion.css';
function Discussion() {
  // const [formData, setFormData] = useState({
  //   name: '',
  //   description: '',
  // });
  // const { name, description } = formData;


  // useEffect(() => {
  //   axios({
  //     method: 'get',
  //     url: `/group`,
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //   .then((response) => {console.log(response)})
  // },[])
  // const onChange = (e) =>{
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // }
    

  // const token = localStorage.getItem('token');

  // const uploadFile = async (e) => {
  //   e.preventDefault();
  //   const data = {
  //     name: name,
  //     description: description,
  //   };

   
  //   await axios({
  //     method: 'post',
  //     url: '/group',
  //     data: data,
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => console.log(error));
  //   console.log(formData);
  // };
 
   
  return (
    <div className="discussion">
      {/* <Form>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Title"
            name="name"
            value={name}
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
        <Button onClick={(e) => uploadFile(e)}>Upload File</Button>
      </Form> */}
    </div>
  );
}

export default Discussion;
