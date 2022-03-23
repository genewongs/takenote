import React from 'react';

class AddNote extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      category: '',
      tagline: '',
      note: ''
    }
  }

  handleTyping(e) {
    let section = e.target.name;
    if(section === 'title'){
      this.setState({
        title: e.target.value
      });
    }
    if(section === 'category'){
      this.setState({
        category: e.target.value
      });
    }
    if(section === 'tagline'){
      this.setState({
        tagline: e.target.value
      });
    }
    if(section === 'note'){
      this.setState({
        note: e.target.value
      });
    }
  }

  render(){
    return(
      <div>
      <h1>New Note</h1>
      <form onSubmit={() => {
          this.props.addNote({
          category: this.state.category,
          note: this.state.note,
          status: 'None',
          tagline: this.state.tagline ,
          title: this.state.title})
        }}>
        Title:
        <br/>
        <input value={this.state.title} onChange={(e) => {this.handleTyping(e)}} name="title" className="note-label" type="text" placeholder="Title"/>
        <br/>
        Category:
        <br/>
        <input value={this.state.category} onChange={(e) => {this.handleTyping(e)}} name="category"  className="note-label" type="text" placeholder="Category"/>
        <br/>
        Tagline:
        <br/>
        <input value={this.state.tagline} onChange={(e) => {this.handleTyping(e)}} name="tagline"  className="note-label" type="text" placeholder="Tagline"/>
        <br/>
        <input value={this.state.note} onChange={(e) => {this.handleTyping(e)}} name="note"  className="note-input" height="700px" type="text" placeholder="Write your note here!"/>
        <br/>
        <button className="button">Save</button>
      </form>
    </div>
    )
  }
}

export default AddNote;
