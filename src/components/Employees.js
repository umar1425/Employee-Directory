import React from 'react';
import Employee from './Employee';
import axios from 'axios';

class Employees extends React.Component {
  state = {
    employees: [],
    ascending: false,
    filterdEmployees: [],
  };
  componentDidMount() {
    axios
      .get('https://randomuser.me/api/?page=3&results=80')
      .then((res) => {
        this.setState({
          employees: res.data.results,
          filterdEmployees: res.data.results,
        });
      })
      .catch((err) => console.log(err));
  }

  getCountriesList(employees) {
    const set = new Set(employees.map((employee) => employee.location.country));
    return [...set];
  }

  handleFiltering = (e) => {
    if (e.target.value === 'All') {
      this.setState({ filterdEmployees: this.state.employees });
    } else {
      this.setState({
        filterdEmployees: this.state.employees.filter(
          (employee) => employee.location.country === e.target.value
        ),
      });
    }
  };
  handleSorting = () => {
    this.setState((state) => ({ ascending: !state.ascending }));
    this.setState((state) => ({
      filterdEmployees: state.filterdEmployees.sort((a, b) =>
        state.ascending ? a.dob.age - b.dob.age : b.dob.age - a.dob.age
      ),
    }));
  };

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Profile</th>
            <th>Name</th>
            <th>
              Age <i className="fas fa-sort" onClick={this.handleSorting}></i>
            </th>
            <th>Email</th>
            <th>
              Country <i className="fas fa-filter"></i>
              <select onChange={this.handleFiltering}>
                <option value="All">All</option>
                {this.getCountriesList(this.state.employees).map(
                  (country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  )
                )}
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          {this.state.filterdEmployees.map((employee) => (
            <Employee employee={employee} key={employee.login.uuid} />
          ))}
        </tbody>
      </table>
    );
  }
}

export default Employees;
