import React from 'react';
import Notes from './components/Notes.jsx';
import AddNote from './components/AddNote.jsx';
import NoteView from './components/NoteView.jsx';
const axios = require('axios');

const notes = [
  {
      "note": "In chemistry, resonance, also called mesomerism, is a way of describing bonding in certain molecules or ions by the combination of several contributing structures into a resonance hybrid in valence bond theory."
  },
  {
      "note": "Danish astronomer, alchemist, and nobleman Tycho Brahe had a pet moose that died when it drank too much beer and fell down a flight of stairs."
  },
  {
      "note": "In London, in 1814, a vat containing over 610,00 liters of beer ruptured, causing other vats to burst. As a result, more than 1,470,000L of beer burst out into the streets. 8 peeps died, so sad."
  }
];

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      page: 'list',
      notes: []
    };

    this.changePage = this.changePage.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.addNote = this.addNote.bind(this);
    this.editNoteTitle = this.editNoteTitle.bind(this);
    this.handleSearchQuery = this.handleSearchQuery.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/notes')
      .then(response => {
        if(response.status === 200) {
          this.setState({
            notes: response.data,
          })
        }
      })
  }

  changePage(page){
    this.setState({
      page: page
    })
  }

  changeStatus(e, note) {
    axios.patch('http://localhost:3001/api/notes', {title: note.title, status: e.target.name})
    .then(response => {
      if(response.status === 200) {
        let newNotes = [...this.state.notes];
        newNotes.map(x => {
          if(x.title === note.title) {
            x.status = e.target.name;
          }
        });
        this.setState({
          notes: newNotes,
        });
      }
    })
    .catch(err => res.sendStatus(500));
  }

  addNote(newNote) {
    event.preventDefault();
    axios.post('http://localhost:3001/api/notes', newNote)
      .then(result => {
        if(result.status === 200) {
          let newNotes = [...this.state.notes, newNote];
          this.setState({
            notes: newNotes,
            page: 'list',
          });
        }
      })
      .catch(err => res.sendStatus(500));
  }

  editNoteTitle(note) {
    let edit = prompt('Change Title...');
    if(edit === undefined || edit === '' || edit === null) {
      return;
    } else {
      let newNotes = [...this.state.notes];
      newNotes.map(item => {
        if(item.title === note.title) {
          item.title = edit;
        }
      });
      this.setState({
        notes: newNotes,
      });
    }
  }

  handleSearchQuery(query, showHidden) {
    event.preventDefault();
    console.log(showHidden)
    let filtered = this.state.notes.filter(note => {
      if(note.category.toLowerCase().includes(query.toLowerCase())){
        //dont show hidden notes
        if(note.status === 'Hidden' && showHidden === false) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    });
    //Sort By Starred using localeCompare, comparing "S" vs "N"
    filtered.sort((a,b) => b.status.localeCompare(a.status));

    this.setState({
      notes: filtered,
    })
  }

  pageRouter(){
    if(this.state.page === 'list'){
      return <Notes handleSearchQuery={this.handleSearchQuery} changePage={this.changePage} notes={this.state.notes} />
    } else if (this.state.page === 'newNote'){
      return <AddNote addNote={this.addNote} />
    } else {
      return <NoteView editNoteTitle={this.editNoteTitle} changeStatus={this.changeStatus} note={this.state.page} />
    }
  }

  render(){
    return(
      <div>
        <div className="navbar">
          <div className="nav">
          <span className="title"
            onClick={() => this.changePage('list')}>
            Take Note!
          </span>
          <span className={this.state.page === 'list'
            ? 'nav-entry-selected button'
            : 'nav-entry-unselected button'}
            onClick={() => {this.changePage('list')}}>
            All Notes
          </span>
          <span className={this.state.page === 'newNote'
            ? 'nav-entry-selected button'
            : 'nav-entry-unselected button'}
            onClick={() => {this.changePage('newNote')}}>
            New Note
          </span>
          </div>
        </div>
        <div className="content">
          {this.pageRouter()}
        </div>

      </div>
    )
  }
}

export default App;
