import React from 'react';
import { Link } from 'react-router-dom';
import './Dogs.css';
const API_INVOKE_URL = 'https://9rgspzxdwa.execute-api.us-east-1.amazonaws.com/prod';

class Dogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dogs: [], loading: true };
    if (this.props.auth.isAuth) {
      fetch(API_INVOKE_URL + '/dogs')
        .then(response => response.json())
        .then(data => {
          this.setState({ dogs: data.body, loading: false });
        });
    }

  }

  renderDogs(dogs) {
    return (
      <div className="dog-container">
        {this.state.dogs.map(dog =>
          <div className="dog" key={dog.id}>
            <Link to={`/dogdetails/${dog.id}`}>
              <h1>{dog.name}</h1>
              <img src={dog.url} alt={dog.name} />
            </Link>
          </div>
        )}
      </div>
    );
  }

  render() {
    let contents = !this.props.auth.isAuth
      ? <h1 className="auth-message">You are not authorized to view this page. Please log in.</h1>
      : this.state.loading
        ? <p><em>Loading...</em></p>
        : this.renderDogs(this.state.dogs);
    return (
      <div>
        {!this.props.auth.isAuth
          ? null
          : <h1 className="page-header">Dogs for Adoption</h1>}
        {contents}
      </div>
    );
  }
}
export default Dogs;

