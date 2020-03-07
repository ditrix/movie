import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBookOpen } from '@fortawesome/free-solid-svg-icons'

class Search extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            query: '',
        }
   
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
            <form className='search-form'>
            <table border="0" cellSpacing="0" cellPadding="0">
                <tbody>
                    <tr>
                        <td>
                            <input type="text" 
                                onClick={this.handleClear.bind(this)} 
                                value={this.state.city} 
                                placeholder="Search..." 
                                onChange={this.setQuery.bind(this)}  />
                        </td>
                        <td>
                            <div className="search-button">
                            <FontAwesomeIcon icon={faSearch} onClick={this.handleSearch.bind(this)} />
                        </div>
                            
                        </td>
                    </tr>
                </tbody>
            </table>    
      </form>
            // <div className="search-form">
            //     <input type="text" className="search-input" onChange={this.setQuery} onClick={this.handleClear} value={this.state.query} />
            //     <i className="material-icons search-button" onClick={this.handleSearch}>search</i>
            // </div>
        )
    }
}

export default Search