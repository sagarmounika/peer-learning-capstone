import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import EmailIcon from '@material-ui/icons/Email';
import DateRangeIcon from '@material-ui/icons/DateRange';
import axios from 'axios';
import './Profile.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import SchoolIcon from '@material-ui/icons/School';
import Spinner2 from '../Spinner/Spinner2';


function Profiles() {
  const history = useHistory();
  const [user, setUser] = useState('');
  const [resources, setResources] = useState('');
  const token = localStorage.getItem('token');
  const[loaded,setLoaded]=useState(false);
  console.log(history.location.pathname);
  const url = history.location.pathname;
  const getLastItem = (thePath) => thePath.substring(thePath.lastIndexOf('/') + 1);
  const userProfile = getLastItem(url);


  useEffect(() => {
      setLoaded(true);
    axios({
      method: 'get',
      url: `/user/${userProfile}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      console.log(response);
      setUser(response.data);
      setResources(response.data.resources);
      setLoaded(false);
    });
  }, []);
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
  return loaded ? (
    <Spinner2 />
  ) :(
    <div className="profile">
      <Button className="profile_btn">
        <Link to="/wrapper/notes">
          {' '}
          <ArrowBackIcon />
          Back
        </Link>
      </Button>
      {user && (
        <Container className="profile_card">
          {/* <Row style={{ width: '100%' }}> */}
            <h3>
              {user.firstname} {user.lastname}
            </h3>
            <p>
              <LocationOnIcon /> {user.country}
            </p>
          {/* </Row> */}
       
            <h5>Contact Details</h5>
            <hr style={{ width: '100%' }} />

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
            <hr style={{ width: '100%' }} />

            <Row>
              <Col sm={6}>
                <p>
                  {' '}
                  <SchoolIcon /> Institute
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
                <hr style={{ width: '100%' }} />

                <Row>
                  <Col sm={12}>
                    {resources.map((file) => (
                      <span key={file.id}>{file.title} || </span>
                    ))}
                  </Col>
                </Row>
              </>
            )}
            
            {user.MemberGroups.length !== 0 && (
              <>
                <h5>Groups </h5>
                <hr style={{ width: '100%' }} />

                <Row>
                  <Col sm={12}>
                    {user.MemberGroups.map((group) => (
                      <span key={group.id}>{group.name} || </span>
                    ))}
                  </Col>
                </Row>
              </>
            )}
      
        </Container>
      )}
    </div>
  );
}

export default Profiles;
