import React from 'react';
import './DogDetails.css';
const API_INVOKE_URL        = 'https://9rgspzxdwa.execute-api.us-east-1.amazonaws.com/prod';

class DogDetails extends React.Component { 
    constructor(props) {
        super(props);
        this.state = { dog: [], loading: true };
        if (this.props.auth.isAuth) {
          fetch(API_INVOKE_URL+'/dogs/id?id=' + props.match.params.id)
            .then(response => response.json())
            .then(data => {
                this.setState({dog: data.body,  loading: false});
            });
        }
        
    }

    renderDog(dog){
      return (          
        <div className="dog-wrapper">
          <h1>{dog.name}</h1>
          <img src={dog.url} alt={dog.name}></img>
          <h2>Breed: {dog.breed}</h2>
          <h2>Age: {dog.age} year(s) old</h2>
          <h2>Gender: {dog.gender}</h2>
        </div>
      );
    }
      
    render() {
      let contents = !this.props.auth.isAuth
      ? <h1 className="auth-message">You are not authorized to view this page. Please log in.</h1>
      : this.state.loading
      ? <p><em>Loading...</em></p>
        : this.renderDog(this.state.dog);
        return (
          <div>
            {contents}
          </div>
        );
    }
}
export default DogDetails;

