import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class CityForm extends React.Component {

  handelSubmit = (e) => {
    e.preventDefault();
   
    this.props.handelSubmit(e)
  }
  render() {
    return (

      <Form onSubmit={this.handelSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>City name :</Form.Label>
          <Form.Control type="text" onChange={(e) => { this.props.handelLocationNameChange(e) }} placeholder="Enter City Name" />

          <Form.Text name='city' className="text-muted">. please inter the desiered City name</Form.Text>
        </Form.Group>
        {/* <Button variant="primary" type="submit"> */}
        <Button variant="secondary" type="submit" value="Explorer!">
          Search
        </Button>
      </Form>

    );
  }
}
export default CityForm;