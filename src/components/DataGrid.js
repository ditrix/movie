import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {formatDescription} from '../functions' 

class DataGrid extends Component {
    constructor(props){
        super(props)
        this.state = {
          loaded: false,
          data: null,
          url: this.props.url,
        }
        this.loadData = this.loadData.bind(this)
        this.handleMoreInfoClicked = this.handleMoreInfoClicked.bind(this)
        this.refClick = this.refClick.bind(this)
    }

 
    componentDidUpdate =() => {

        if(this.state.url !== this.props.url){
            this.loadData()
        }
    }

    loadData = () =>  {
        //this.setState({loaded: false})
       fetch(this.props.url)
            .then(resp => resp.json()) // Transform the data into json
            .then(data => {
                this.setState({loaded: true, data: data, url: this.props.url})
                   this.props.pages(this.state.data.total_pages)
                   console.log('data',data.results[2])
               })
            .catch(error => console.log('error',error) )   
    }
    
    componentDidMount = () => this.loadData(this.props.url)
    componentWillUnmount = () => this.setState({data: null, loaded: false, url: null})
    handleMoreInfoClicked = e => this.props.getDetail(e.target.value)
    refClick = value =>  this.props.getDetail(value)
    

    render(){
        console.log(this.state.data)
        return(
        
            (this.state.loaded) ? 
            <div className="film-list">
                { this.state.data.results.map( film =>
                         (film)?
                        <div key={film.id} className="film-grid">
                            <div className="film-grid-wrapper">
                                    <div className="film-grid-title">
                                        

                                         {film.title} 
                                        <button type='button' className="link-button"  onClick={(e) => { e.preventDefault(); this.refClick(film.id);} }><i className="material-icons">description</i></button>
                                    </div>
                                    
                                    <div className="film-grid-poster">
                                        {<img src={'https://image.tmdb.org/t/p/w300/'+film.poster_path} alt={film.title} />}
                                    </div>
                                    
                                       
                                    <div className="film-grid-description">
                                        <p>
                                            {film.film_desc}
                                        </p>        
                                    </div>
                                    
                                    
                                    <div className="film-grid-more"> 
                                        <button type='button' className="link-button"  onClick={(e) => { e.preventDefault(); this.refClick(film.id);} }><i className="material-icons">description</i></button>
                                    </div>
                            </div>
                        </div>:<></>
                    )    
                 }   
                 </div>      
            :<span>loaded...</span>
            
        )

    }
}


DataGrid.propTypes = {
    url: PropTypes.string.isRequired,
    getDetail: PropTypes.func.isRequired,
    pages: PropTypes.func,    
}


export default DataGrid;