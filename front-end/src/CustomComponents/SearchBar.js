import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      isExpanded:false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const query = e.target.value;
    console.log(query)
    this.setState({ searchQuery: query });
    this.props.onSearch(query);
  }

  render() {
    const { isExpanded, searchQuery } = this.state;
  
    return (
      <div className="container my-2" style={{ position: 'relative' }}>
        <div >
          {isExpanded ? (
            <input
              type="text"
              className="form-control"
              placeholder="Search exercises..."
              value={searchQuery}
              onChange={this.handleInputChange}
              onBlur={() => this.setState({ isExpanded: false })}
              autoFocus
              style={{
                width: '80%'
              }}
            />
          ) : (
            <svg
              onClick={() => this.setState({ isExpanded: true })}
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffff" className="bi bi-search" viewBox="0 0 16 16" style={{ cursor: 'pointer', position:'relative', marginLeft:'60vw'}}
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          )}
        </div>
      </div>
    );
  }
}  
export default SearchBar;
