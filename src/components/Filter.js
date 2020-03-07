import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {getGenresUrl} from '../functions'
class Filter extends Component {
    constructor(props){
        super(props)
        this.state = {
            years:[],
            genres: [],
            options: {
                year: '',
                genre: '',
                sort: 'popularity.desc'
            }    
        }
        this.handleYearChange = this.handleYearChange.bind(this)
 
    
        this.setFilter = this.setFilter.bind(this)
    } 


    handleYearChange = event => {
        const options = this.state.options;
        options.year = event.target.value
        this.setState({options: options})
        this.props.getFilter(this.state.options)
    }

    handleSortOptionChange = event => {
        const options = this.state.options;
        options.sort = event.target.value
        this.setState({options: options})
        this.props.getFilter(this.state.options)
    }

    handleGenreOptionChange = event => {
        const options = this.state.options;
        options.genre = event.target.value        
        this.setState({options: options})
        this.props.getFilter(this.state.options)
    }


    componentDidMount = () => {
        const setRes = (res) => {
            this.setState({genres: res.genres})
        }
        fetch(getGenresUrl())
        .then(resp => resp.json())
        .then(res => setRes(res))
        .catch(err => console.log('error')) 

        let years=[]
       for(var year = 2019; year >= 1900; year--){
            years.push(''+year)
           
        }
        this.setState({years:years})
        
    }

    setFilter(){
        this.props.getFilter(this.state.options)   
    }

    render(){
        return(
          <div className="filter-form">

            <div className="input-form-item">
            
            <select id='get-sort-by' onChange={this.handleSortOptionChange.bind(this)} className="filter-item">
                    <option value=''>сортировка...</option>
                    <option value='popularity.desc'>популярность по убыванию</option>
                    <option value='popularity.asc'>популярность по возрастанию</option>
                    <option value='vote_count.desc'>рейтинг по убыванию</option>
                    <option value='vote_count.asc'>рейтинг по возрастанию</option>
                    <option value='release_date.desc'>дата выхода по убыванию</option>
                    <option value='release_date.asc'>дата выхода по возрастанию</option>
                    <option value='original_title.asc'>название А..Я</option>
                    <option value='original_title.desc'>название Я..А</option>
                    <option></option>
            </select>
            </div>

            <div className="input-form-item">
            
            <select  id='get-genre' onChange={this.handleGenreOptionChange.bind(this)}> 
                <option value="">все жанры</option>
                { this.state.genres.map((genre, key) => 
                        <option key={key} value={genre.id} >{genre.name}</option>
                )}
                <option></option>
            </select>
            </div>
           
          </div>
       ) 

    }
}

Filter.propTypes = {
    getFilter: PropTypes.func,
}



export default Filter