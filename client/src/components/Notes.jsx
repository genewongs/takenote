import React from 'react';
import NoteView from './NoteView.jsx';

class Notes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      featured: '',
      query: '',
      showHidden: false,
    }

    this.showInfo = this.showInfo.bind(this);
  }

  showInfo(note) {
    if(this.state.featured.title === note.title){
      this.setState({
        featured: null,
      });
    } else {
      this.setState({
        featured: note.title,
      });
    }
  }

  clearInput() {
    this.setState({
      query: '',
    })
  }

  handleTyping(e) {
    this.setState({
      query: e.target.value
    });
  }

  toggleHidden(e) {
    this.setState({
      showHidden: e.target.checked,
    })
  }

  render(){
    return(
      <>
        <h1>My Notes</h1>

        <form onSubmit={() => {
          this.props.handleSearchQuery(this.state.query, this.state.showHidden);
          this.clearInput();
          }}>
        <input value={this.state.query} onChange={(e) => this.handleTyping(e)} type="text" placeholder="Search for a category.."></input>
        <button>Search</button>
        <input onChange={(e) => {this.toggleHidden(e)}} type="checkbox" id="showHidden" name="showHidden" value="Show Hidden"></input>
        <label htmlFor="showHidden">Show Hidden</label>
        </form>

        <div className="notes-list">
          {this.props.notes.map((note,index) => {
            return (
              <div key={index} className="note">
                <div className="note-desc" onClick={() => {
                  this.props.changePage(note)
                }}>{note.title}</div>
                {/* {this.state.featured === note.title ? <NoteView note={note} /> : <></>} */}
              </div>
            )
          })}
        </div>
      </>
    )
  }
}


export default Notes;

{/* <div className="notes-list">
          <div className="note">
            <div className="note-title"><h3>Defenestrations of Prague</h3></div>
            <div className="note-category"><h4>History</h4></div>
            <div className="note-desc">Three major incidents in the history of Bohemia in which people were defenestrated (thrown out of a window).</div>
          </div>
          <div className="note">
            <div className="note-title"><h3>Hedgehog signaling pathway</h3></div>
            <div className="note-category"><h4>Biology</h4></div>
            <div className="note-desc">A signaling pathway that transmits information to embryonic cells required for proper cell differentiation.</div>
          </div>
          <div className="note">
            <div className="note-title"><h3>Funcitonal Groups</h3></div>
            <div className="note-category"><h4>Biology</h4></div>
            <div className="note-desc">Specific groupings of atoms within molecules that have their own characteristic properties, regardless of the other atoms present in a molecule.</div>
          </div>
          <div className="note">
            <div className="note-title"><h3>Giant Rabbit Attack on US President Jimmy Carter</h3></div>
            <div className="note-category"><h4>History</h4></div>
            <div className="note-desc">A 1979 incident in which US President Jimmy Carter was attacked by a giant swamp rabbit.</div>
          </div>
        </div>
    </div> */}