import React from 'react';
import { Button } from 'react-bootstrap';
import UploadForm from '../UploadForm.js';
import Spinner from '../../Spinner/Spinner';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SentimentDissatisfiedRoundedIcon from '@material-ui/icons/SentimentDissatisfiedRounded';
import File from '../File.js';
import './NotesMain.css';

function NotesMain({ data, loading, title, AllCategories }) {
  const [modalShow, setModalShow] = React.useState(false);
  return loading ? (
    <Spinner />
  ) : (
    <div className="notes_main">
      <Button onClick={() => setModalShow(true)}>
        <CloudUploadIcon />
      </Button>{' '}
      <span>Upload File</span>
      <h4>{title}</h4>
      <div className="notes_main_grid">
        {data.length === 0 ? (
          <h3 className="nofile">
            Sorry, No Files Under this Category <SentimentDissatisfiedRoundedIcon />{' '}
          </h3>
        ) : (
          data.map((file) => (
            <File file={file} key={file.id} views={file.views} id={file.id}category={file.Categories} />
          ))
        )}
        <UploadForm
          show={modalShow}
          onHide={() => setModalShow(false)}
          AllCategories={AllCategories}
        />
      </div>
    </div>
  );
}

export default NotesMain;
