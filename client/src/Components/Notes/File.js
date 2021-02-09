import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Card, Overlay, Tooltip } from 'react-bootstrap';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ShareIcon from '@material-ui/icons/Share';
import './File.css';

function File({ file, id, category }) {
  const history = useHistory();
  const [value, setValue] = useState('');
  const [copied, setCopied] = useState(false);
  const token = localStorage.getItem('token');
  const [like, setLike] = useState(null);

  const addLike = async (id) => {
    axios({
      method: 'post',
      url: `/resource/${id}/like`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return axios({
          method: 'get',
          url: `/resource/${id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then((response) => {
        setLike(response.data.likeCount);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    axios({
      method: 'get',
      url: `/resource/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      setLike(response.data.likeCount);
    });
  }, [addLike, like]);
  const profilesHandler = (user) => {
    history.push(`/wrapper/notes/${user}`);
  };
  // 36
  const [show, setShow] = useState(false);
  const target = useRef(null);
  return (
    <Card className="file">
      <Card.Header>
        <div className="file_top">
          <h4> {file.title} </h4>
          <ShareIcon
            ref={target}
            onClick={() => {
              setShow(!show);
              setCopied(false);
              setValue(file.file.webViewLink);
            }}
          />
        </div>
        <blockquote className="blockquote mb-0 mr-0">
          <p>
            Uploaded By <span className="file_user"onClick={()=>{profilesHandler(file.user.username)}}>{file.user.firstname} </span>{' '}
          </p>
        </blockquote>
      </Card.Header>

      <Card.Body>
        <div>
          {' '}
          <h5>Description:</h5> <p>{file.file.description}</p>
        </div>
        <div className="category">{category && category.map((x) => <h6> {x.name} </h6>)}</div>
      </Card.Body>

      <Card.Footer className="card-footer">
        <button
          onClick={(e) => {
            e.preventDefault();
            addLike(file.id);
          }}
        >
          {' '}
          <ThumbUpAltIcon className="like-icon" /> {like!== 0 && like}
        </button>

        <button>
          <VisibilityIcon /> {file.views}
        </button>
        <button>
          <a href={file.file.webViewLink} target="_blank" without rel="noopener noreferrer">
            View
          </a>
        </button>

        <button>
          <a
            href={file.file.webContentLink}
            download
            target="_blank"
            without
            rel="noopener noreferrer"
          >
            Download <CloudDownloadIcon />
          </a>
        </button>
      </Card.Footer>

      <Overlay target={target.current} show={show} placement="top">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            <div className="copy-form">
              <input type="text" value={value} />
              <CopyToClipboard
                text={value}
                onCopy={() => {
                  setCopied(true);
                }}
              >
                <button>
                  <FileCopyIcon />
                </button>
              </CopyToClipboard>
            </div>
            {copied ? <span style={{ color: 'white' }}>Copied.</span> : null}
          </Tooltip>
        )}
      </Overlay>
    </Card>
  );
}

export default File;
