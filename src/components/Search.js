import React, { Component } from 'react';


class Search extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            query: '',
        }
        this.handleSearch = this.handleSearch.bind(this)
        this.setQuery = this.setQuery.bind(this)
        this.handleClear = this.handleClear.bind(this)
    }

    componentWillMount(){
        this.setState({query: this.props.query})
    }

    // componentWillUpdate(){
    //     this.setState({query: this.props.query})   
    // }

    setQuery = event => this.setState({query: event.target.value})         
    handleSearch = () => {
        this.props.searchData(this.state.query)
    }

    handleClear= () => {
        this.setState({query:''})
        this.props.searchData(null)
    }
  
    render(){
        return(
            <div className="search-form">
                <input type="text" className="search-input" onChange={this.setQuery} onClick={this.handleClear} value={this.state.query} />
                <i className="material-icons search-button" onClick={this.handleSearch}>search</i>
            </div>
        )
    }
}

export default Search