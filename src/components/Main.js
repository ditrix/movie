import React, { Component } from 'react';


import Filter from './Filter'
import DataGrid from './DataGrid'
import Record from './Record'
import Pager from './Pager'
import Search from './Search'
import Lang from './Lang'
import {_I18N} from '../lib/i18n'
import {MSG} from '../lib/messages'

import { MOVIE_LIST, MOVIE_REC, TVSHOW_LIST, TVSHOW_REC } from '../actions'


import {getMUrl, getTUrl, getSearchUrl } from '../functions'

class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            loaded: false,
            data: null,
            page: 1,
            url: null,
            action: MOVIE_LIST,
            currentId: null,
            total: null,
            query: '',
            filter: { 
              year: '', 
              genre: '', 
              sort: 'popularity.desc'
            },
            chapter: _I18N(MSG.MOVIES,'en'),
            lang: 'en',
            langPar: 'en-US',
        }
        this.getFilter = this.getFilter.bind(this)
        this.getDetailId = this.getDetailId.bind(this)
        this.backToList = this.backToList.bind(this)
        this.handlerClickedMovies = this.handlerClickedMovies.bind(this)
        this.handlerClickedTVShows = this.handlerClickedTVShows.bind(this)
        
      
        this.getTotalPages = this.getTotalPages.bind(this)
        this.getCurrentPage = this.getCurrentPage.bind(this)

        this.searchData = this.searchData.bind(this)

        this.getSimilarRecord = this.getSimilarRecord.bind(this)
  
  }


  setLang(value){
    this.setState({lang: value})
    const chapter = (this.state.action === MOVIE_LIST)?_I18N(MSG.MOVIES,value):_I18N(MSG.TVSHOWS,value) 
    this.setState({chapter:chapter})
    const langPar = (value === 'en')?'en-US':'ru-RU'
  }

  getCurrentPage = value =>
     (this.state.action === MOVIE_LIST)? 
        this.setState({page: value,  url : getMUrl(value,this.state.filter)})
        :this.setState({page: value,  url : getTUrl(value,this.state.filter)})   
 
  searchData = value =>
      (value)?
      (this.state.action === MOVIE_LIST)?
          this.setState({query: value, url: getSearchUrl(value,'movie')})
          :this.setState({query: value, url: getSearchUrl(value,'tv')})   
      : this.getCurrentPage(1)

 
  componentWillMount = () => this.setState({url: getMUrl(this.state.page,this.state.filter)})
  
 

  getFilter = value =>
      (this.state.action ===MOVIE_LIST)?
        this.setState({page: 1, filter: value, url : getMUrl(1,value)})
       : this.setState({page: 1,  filter: value, url : getTUrl(1,value)})   
  
 

   handlerClickedMovies = () => 
      this.setState({chapter: _I18N(MSG.MOVIES,this.state.lang), action: MOVIE_LIST, query: '', filter: {year: '', genre: '', sort: ''}, url: getMUrl(this.state.page,this.state.filter)})
   

   handlerClickedTVShows = () => 
     this.setState({chapter: _I18N(MSG.TVSHOWS,this.state.lang), action: TVSHOW_LIST, query: '', filter: {year: '', genre: '', sort: ''}, url: getTUrl(this.state.page,this.state.filter)})
   

    getDetailId = value => {
      (this.state.action === MOVIE_LIST)?
          this.setState({action: MOVIE_REC, currentId: value}):
          this.setState({action: TVSHOW_REC, currentId: value})
    }

    backToList = value => {      
        (value)? 
          //  url: getMUrl(this.state.page,{year:null,genre:null,sort:null})
          (value === MOVIE_REC)? 
            this.setState({action: MOVIE_LIST, currentId: ''})
            :this.setState({action: TVSHOW_LIST, currentId: ''})
        :this.setState({action: MOVIE_LIST, currentId: ''})
      }  

    getTotalPages = value => this.setState({total:value})

    getSimilarRecord(value){
      // const currentId = value;
       //this.setState({currentId: value})
       //console.log('geSimilar', this.state)
     (this.state.action === MOVIE_REC)? 
            this.setState({action: MOVIE_REC, currentId: value})
            :this.setState({action: TVSHOW_REC, currentId: value})       
     }

    
    render(){
  
        return(
          <div className="container_">
          <header>
          <h1>{this.state.chapter}</h1>
          <Lang setLang={this.setLang.bind(this)} />

          </header>
          <nav>
                <ul>
                    <li><button className={(this.state.action === MOVIE_LIST)? "nav-button-active":"nav-button"
                  } onClick={this.handlerClickedMovies}>{_I18N(MSG.MOVIES,this.state.lang)}</button></li>
                    <li><button className={(this.state.action === TVSHOW_LIST)? "nav-button-active":"nav-button"
                  } onClick={this.handlerClickedTVShows}>{_I18N(MSG.TVSHOWS,this.state.lang)}</button></li>                    
                    <li><Search query={this.state.query} searchData={this.searchData} lang={this.state.lang} /></li>
                </ul>
                
           </nav>
           
          <main>


          
           {  

              ((this.state.action === MOVIE_LIST)|(this.state.action === TVSHOW_LIST))?
              <React.Fragment>
                  
                  <Filter getFilter={this.getFilter} lang={this.state.lang} />  
                  
                  
                  <DataGrid url={this.state.url} getDetail={this.getDetailId} pages={this.getTotalPages} />
                  <Pager total={this.state.total} current={this.getCurrentPage} />
              </React.Fragment> 

              :<Record  
                backToList={this.backToList} 
                getSimilarRecord={this.getSimilarRecord}  
                recordId={this.state.currentId} 
                action={this.state.action} /> 
            }  
          
          </main>    
          <footer>
            <a href="https://www.themoviedb.org/" target="_blank">DBMovie</a>&nbsp;  
            
            
            dmvoloshin@gmail.com &copy; 2019 </footer>
          </div>
        )
    }
}



export default Main