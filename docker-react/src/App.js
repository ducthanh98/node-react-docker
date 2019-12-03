import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Form, Button, Table } from 'react-bootstrap'

class App extends Component {
  constructor() {
    super();
    this.state = {
      body: {
        username: '',
        password: ''
      },
      list: []
    }
    this.baseUrl = 'http://localhost:3001';
  }

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    axios.get(`${this.baseUrl}/getAll`)
      .then(
        (response) => {
          this.setState({ list: response.data.data });
        }
      )
      .catch(e => {
        console.log(e)
      })
  }
  onSubmit = (event$) => {
    event$.preventDefault();
    axios.post(`${this.baseUrl}/create`, { ...this.state.body })
      .then(
        (response) => {
          console.log(response)
          if (response.data.code === 0) {
            let list = this.state.list;
            list.push(response.data.data);
            this.setState({ list: list });
          }
        }
      )
      .catch(e => {
        console.log(e)
      })
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control onChange={(event$) => { this.setState({ body: { ...this.state.body, username: event$.target.value } }) }} type="text" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={(event$) => { this.setState({ body: { ...this.state.body, password: event$.target.value } }) }} type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
      </Button>
        </Form >
        <br></br>
        <br></br>
        <Table striped bordered hover className="text-center">
          <thead >
            <tr >
              <th>#</th>
              <th>Username</th>
              <th>Password</th>
            </tr >
          </thead >
          <tbody >
            {this.state.list.map((info, i) => {
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>{info.username}</td>
                  <td>{info.password}</td>
                </tr>
              )
            })}

          </tbody>
        </Table >
      </div >
    );
  }
}

export default App;
