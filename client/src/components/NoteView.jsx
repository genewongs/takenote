import React from 'react';

const NoteView = ({ note, changeStatus, editNoteTitle }) => {
  return(
    <div className="noteView">
          <div onClick={() => {editNoteTitle(note)}} className="noteViewTitle">
            <h1>{note.title}</h1>
          </div>
          <div className="noteViewCategory">
            <h3>{note.category}</h3>
          </div>
          <div className="noteViewCategory">
            <h3>{note.tagline}</h3>
          </div>
          <div>
            {note.note}
          </div>
          <br></br>
          <button name="Hidden" onClick={(e) => {changeStatus(e,note)}}>Hidden</button>
          <button name="Starred" onClick={(e) => {changeStatus(e,note)}}>Starred</button>
    </div>
  )
};

export default NoteView;


{/* <div className="noteView">
<div className="noteViewTitle">
  <h1>My Note Title</h1>
</div>
<div className="noteViewCategory">
  <h3>Category</h3>
</div>
</div> */}