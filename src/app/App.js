import React, { Component } from 'react';

class App extends Component {

  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      _id: '',
      customers: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addCustomer = this.addCustomer.bind(this);
    this.clearData = this.clearData.bind(this);
  } 

  clearData(){
    this.setState({
      firstName : '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      _id: ''
    })
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  addCustomer(e){
    e.preventDefault();
    if(this.state._id) {
      fetch(`/api/customers/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          phoneNumber: this.state.phoneNumber
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          window.M.toast({html: 'Customer Updated'});
          this.clearData()
          this.fetchCustomers();
        });
    } else {
      fetch('/api/customers', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          window.M.toast({html: 'Customer Saved'});
          this.clearData()
          this.fetchCustomers();
        })
        .catch(err => console.error(err));
    }

  }
  
  deleteCustomer (id){
    if(confirm('Are you sure you want to delete it?')) {
      fetch(`/api/customers/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          M.toast({html: 'Customer deleted'});
          this.fetchCustomers();
        });
    }
  }

  editCustomer(id){
    fetch(`/api/customers/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber : data.phoneNumber,
          _id: data._id
        },()=>{this.clearData()});
      });
  }

  componentDidMount() {
    this.fetchCustomers();
  }

  fetchCustomers (){
    fetch('/api/customers')
      .then(res => res.json())
      .then(data => {
        this.setState({customers: data});
        console.log(this.state.customers);
      });
  }

  render() {
    return (
      <div>
        <nav className="light-blue darken-4">
          <div className="container">
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">CUSTOMER</a>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addCustomer}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="firstName" onChange={this.handleChange} value={this.state.firstName} type="text" placeholder='First Name' autoFocus/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                      <input name="lastName" onChange={this.handleChange} value={this.state.lastName} type="text" placeholder='LastName' autoFocus/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                      <input name="email" onChange={this.handleChange} value={this.state.email} type="text" placeholder='email' autoFocus/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                      <input name="phoneNumber" onChange={this.handleChange} value={this.state.phoneNumber} type="number" placeholder='Phone Number' autoFocus/>
                      </div>
                    </div>

                    <button type="submit" className="btn light-blue darken-4">
                      Send 
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  { 
                    this.state.customers.map(customer => {
                      return (
                        <tr key={customer._id}>
                          <td>{customer.firstName}</td>
                          <td>{customer.lastName}</td>
                          <td>{customer.email}</td>
                          <td>{customer.phoneNumber}</td>
                          <td>
                            <button onClick={() => this.deleteCustomer(customer._id)} className="btn light-blue darken-4">
                              <i className="material-icons">delete</i> 
                            </button>
                            <button onClick={() => this.editCustomer(customer._id)} className="btn light-blue darken-4" style={{margin: '4px'}}>
                              <i className="material-icons">edit</i>
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default App;
