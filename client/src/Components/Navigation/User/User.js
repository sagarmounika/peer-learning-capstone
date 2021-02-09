import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Spinner2 from '../../Spinner/Spinner2';
import EmailIcon from '@material-ui/icons/Email';
import DateRangeIcon from '@material-ui/icons/DateRange';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import './User.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SchoolIcon from '@material-ui/icons/School';

function User() {
  const history = useHistory();
  const lname = localStorage.getItem('lname');
  const fname = localStorage.getItem('fname');
  const name = `${fname} ${lname}`;
  const [user, setUser] = useState('');
  const [resources, setResources] = useState('');
const[loaded,setLoaded] = useState(false);
  const id = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const calculate_age = (dob1) => {
    var today = new Date();
    var birthDate = new Date(dob1); // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    return age_now;
  };

  const getInitials = (name, delimeter) => {
    if (name) {
      const array = name.split(delimeter);
      switch (array.length) {
        case 1:
          return array[0].charAt(0).toUpperCase();

        default:
          return array[0].charAt(0).toUpperCase() + array[array.length - 1].charAt(0).toUpperCase();
      }
    }
    return false;
  };
  const deleteHandler = async () => {
    if (window.confirm('Are you sure you want to delete your account? This cannot be undone!!')) {
      const res = await axios
        .delete('/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          localStorage.clear();
          history.push('/');
        })
        .then((err) => console.log(err));
    }
  };
  useEffect(() => {
    setLoaded(true);
    axios({
      method: 'get',
      url: `/user/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setUser(response.data);
      setResources(response.data.resources);
      setLoaded(false);
    });
  }, []);

  return loaded ? (
      <Spinner2 />
    ) :(
    <>
      <div className="user">
        <div className="user_btns">
          <Button className="btn_back">
            <Link to="/wrapper">
              {' '}
              <ArrowBackIcon />
              Back
            </Link>
          </Button>
          <Button className="btn_delete" onClick={deleteHandler}>
            {/* <Link to="/wrapper"> */} <DeleteForeverIcon />
            Delete Account
            {/* </Link> */}
          </Button>
        </div>

        {user && (
          <Container className="user_card">
            <Row style={{ width: '100%' }}>
              <Col sm={4} className="user_left">
                <Avatar className="user_left_icon">{getInitials(name, ' ')}</Avatar>
                <h3>
                  {user.firstname} {user.lastname}
                </h3>
                <p>
                  <LocationOnIcon /> {user.country}
                </p>
              </Col>
              <Col sm={8} className="user_right">
                <h5>Contact Details</h5>
                <hr style={{ width: '90%' }} />
                <Row>
                  <Col sm={6}>
                    <p>
                      {' '}
                      <EmailIcon /> Email
                    </p>
                    <p> {user.email}</p>
                  </Col>
                  <Col sm={6}>
                    <p>
                      {' '}
                      <PhoneAndroidIcon />
                      Mobile Number
                    </p>
                    <p>{user.mobile}</p>
                  </Col>
                </Row>
                <h5>Personal Details</h5>
                <hr style={{ width: '90%' }} />
                <Row>
                  <Col sm={6}>
                    <p>
                      {' '}
                      <SchoolIcon /> Institue
                    </p>
                    <p>{user.insti_name}</p>
                  </Col>
                  <Col sm={6}>
                    <p>
                      {' '}
                      <DateRangeIcon />
                      Age
                    </p>
                    <p>{calculate_age(user.dob)}</p>
                  </Col>
                </Row>
                {resources.length !== 0 && (
                  <>
                    <h5>Resources</h5>
                    <hr style={{ width: '90%' }} />

                    <Row>
                      <Col sm={10}>
                        {resources.map((file) => (
                          <span key={file.id}>{file.title} || </span>
                        ))}
                      </Col>
                    </Row>
                  </>
                )}
                {user.MemberGroups.length !== 0 && (
                  <>
                    <h5>Groups : </h5>
                    <hr style={{ width: '90%' }} />

                    <Row>
                      <Col sm={10}>
                        {user.MemberGroups.map((group) => (
                          <span key={group.id}>{group.name} || </span>
                        ))}
                      </Col>
                    </Row>
                  </>
                )}
              </Col>
            </Row>
          </Container>
        )}
      </div>
    </>
  );
}

export default User;
