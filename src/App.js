import React, {Component} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Card from 'react-bootstrap/Card'


export class App extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      locationName: '',
      locationData: {}
    }
  }

  handelLocationNameChange = (e) => { this.setState({ locationName: e.target.value }) }

  handelSubmit = async (e) => {
    e.preventDefault();
  
    const url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.locationName}&format=json`;

    console.log(url);

    const response = await axios.get(url);

    console.log(response.data[0]);
    this.setState({
      locationData: response.data[0]
    });
  }
  
  
  
  render(){
        return (
            <div>

<Form onSubmit={this.handelSubmit}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>City name :</Form.Label>
    <Form.Control type="text" onChange={this.handelLocationNameChange} placeholder="Enter City Name" />
    
    <Form.Text className="text-muted">. please inter the desiered City name</Form.Text>
  </Form.Group>
  {/* <Button variant="primary" type="submit"> */}
  <Button variant="secondary" type="submit" value="Explorer!">
    Search
  </Button>
</Form>


   <div>
     <h2>Location Info</h2>
     <p>{this.state.locationData.display_name}</p>
     <p>lat: {this.state.locationData.lat}</p>
     <p>lon: {this.state.locationData.lon}</p>
     <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&center=${this.state.locationData.lat},${this.state.locationData.lon}&zoom=15&size=600x600`} alt=""/>
   </div>


        </div>


        )

    }
}

export default App
