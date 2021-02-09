import React from 'react';
import './Body.css';

import { useHistory } from 'react-router-dom';
import NotesIcon from '@material-ui/icons/Notes';
import RateReviewIcon from '@material-ui/icons/RateReview';

function Body() {
  const history = useHistory();
  const notesHandler = () => {
    history.push('/wrapper/notes');
  };
  const discussionHandler = () => {
    history.push('/wrapper/discussion');
  };
  localStorage.getItem('token');
  return (
    <div className="body1">
      <div className="body_notes" onClick={notesHandler}>
        <h3>
          <NotesIcon className="body_icon" /> Notes
        </h3>
      </div>

      <div className="body_discussion" onClick={discussionHandler}>
        <h3>
          <RateReviewIcon className="body_icon" /> Discussion
        </h3>
      </div>
    </div>
  );
}

export default Body;
