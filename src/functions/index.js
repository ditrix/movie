import {API_KEY} from '../constants'



export const getMUrl = (page=1,par) =>  {
    return `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&year=${par.year}&with_genres=${par.genre}&language=ru-RU&sort_by=${par.sort}&include_adult=false&include_video=true&page=${page}`;
}



export const getTUrl = ( page = '1',par) => {
    return `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&first_air_date.gte=${par.year}&with_genres=${par.genre}&language=ru-RU&sort_by=${par.sort}&include_adult=false&include_video=true&page=${page}`;
}


export const getMovieDetailUrl = record  => {  
    return `https://api.themoviedb.org/3/movie/${record}?api_key=${API_KEY}&language=ru-RU`
}

export const getTvShowDetailUrl = record  => { 
    return `https://api.themoviedb.org/3/tv/${record}?api_key=${API_KEY}&language=ru-RU`
}

export const getMovieReviewsUrl = id => { 
    return  `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&page=1`
 }

export const getTVShowReviewsUrl = id =>  { 
    return `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${API_KEY}&page&page=1`
}  

export const formatDescription = str => {
    return (str.length > 400) ?  str.substr(0,400) + '...' : str
}

export const getGenresUrl = () => {
    return `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=ru-RU`;
}


export const getFormatedDate = str => {
    return (str)? str[8]+ str[9] + '.' + str[5]+str[6] + '.' + str[0]+str[1]+str[2]+str[3]: ''
}

export const getFormatYear = (str) => {
    return (str)? str[0]+str[1]+str[2]+str[3]: ''
}

export const getPagerData = (current = 1, total = 1) => {

    let items = []
    const left_limit = total - 4;
    const right_limit = 5;

    let i = 1;        
    if(current <= right_limit){
        for(i=1; i <= right_limit; i++){
            items = [...items,i]
        }
        items = [...items,'...',total]
    }
 
    if(current >=left_limit){
            items= [1,'...']    
            for(i=left_limit; i <= total; i++){
                items = [...items,i]
            }
    }
     
    if((current >= right_limit)&&(current <=left_limit)){
        const start = (current-1);
        const end = (start+2);
     
        items = [1,'...']
        for(i= start; i<= end; i++){
           items = [...items,i]
        }
        items = [...items,'...',total]
    }

    if(total < 7){
        items = []
        for(i= 1; i<= total; i++){
            items = [...items,i]
        }
    }
    return items;
}

export const getSearchUrl = (query, action, page=1 ) => {
    return `https://api.themoviedb.org/3/search/${action}?api_key=${API_KEY}&language=ru-RU&page=${page}&include_adult=false&query='${query}'`
}





export const getPersonUrl = person => {
    return `https://api.themoviedb.org/3/person/${person}?api_key=${API_KEY}`
}

export const isCyrillic = str => {
    return /[а-яёА-ЯЁ]/i.test(str);
}


export const getCastUrl = (action, movie) => {
  const url = `https://api.themoviedb.org/3/${action}/${movie}/credits?api_key=${API_KEY}&language=ru-RU`
  return url
}


export const getSimilarMovie = movie => {
    const url = `https://api.themoviedb.org/3/movie/${movie}/similar?api_key=${API_KEY}&language=ru-RU&page=1`
    return url
}

export const getSimilarTV = tv => {
    const url = `https://api.themoviedb.org/3/tv/${tv}/similar?api_key=${API_KEY}&language=ru-RU&page=1`
    return url
}

