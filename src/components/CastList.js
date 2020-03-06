import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Person from './Person'



class CastList extends Component {
	constructor(props){
		super(props)
		this._isMounted = false;
	}

	componentDidMount(){
		this._isMounted = true
	}


	componentWillUnmount(){
		this._isMounted = false
	}

	render(){
		//console.log('crew ',this.props.person.crew)
		const crew = this.props.person.crew
		const cast = this.props.person.cast
		return(
				<>		
					<div className="crew-wrapp">	
					
						{
						(crew)&&
					 	<ul>
					 	{
					 		crew.map((crew,key) => 
				 				
					 			(crew.job === 'Director' && key < 2)&&
						 			 <li key={key}>
						 			 	режиссер:&nbsp;<Person person={crew} department='crew' />
						 			 </li>
						 		
					 		)	
					 	}	
					 	</ul>
					 	}
					</div>
					
					
						
					{
						(cast)&&
						<div className="cast-list-wrapper">
						<span>в ролях:&nbsp;</span>
						<ul>
					 	{
					 		cast.map((cast,key) =>
				 			
					 			(key < 5 )&& 
						 			 <li key={key}>
						 				
						 				{/*{cast.name}*/}
						 				<Person person={cast} department='cast' />
						 			 </li>

					 				
					 		
					 		)
					 	}	
					 	</ul>
					 	</div>
					 }
					 	
				</>
		)
	}
}

CastList.propTypes = {
	person: PropTypes.object
}

export default CastList;
