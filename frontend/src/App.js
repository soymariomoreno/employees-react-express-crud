import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import { Table } from "reactstrap";
import { faPlus, faEdit, faTrash, faEye, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: {
        first_name: "",
        last_name: "",
        about: "",
        avatar: "",
        cv: ""
      },
      employees: []
    };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    axios
      .get("http://127.0.0.1:9000/api/v1/employees/")
      .then(res => this.setState({ employees: res.data }))
      .catch(err => console.log(err));
  };
  renderItems = () => {
    const newItems = this.state.employees;
    return newItems.map(item => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.first_name} {item.last_name}</td>
        <td >{item.about}</td>
        <td>
          <a href={item.avatar} target="blank" className="btn btn-outline-primary m-1">
            <FontAwesomeIcon icon={faEye} />
          </a>
          <a href={item.cv} target="blank" className="btn btn-outline-primary">
            <FontAwesomeIcon icon={faDownload} />
          </a>
        </td>
        <td>
          <button onClick={() => this.editItem(item)} className="btn btn-success m-1">
            {" "}
            <FontAwesomeIcon icon={faEdit} />{" "}
          </button>
          <button onClick={() => this.deleteItem(item)} className="btn btn-danger">
            <FontAwesomeIcon icon={faTrash} />{" "}
          </button>
        </td>
      </tr>
    ));
  };
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmit = item => {
    this.toggle();

    let form_data = new FormData();
    form_data.append('first_name', item.first_name);
    form_data.append('last_name', item.last_name);
    form_data.append('about', item.about);
    form_data.append('avatar', item.avatar, item.avatar.name);
    form_data.append('cv', item.cv, item.cv.name);

    if (item.id) {
      axios
        .put(`http://127.0.0.1:9000/api/v1/employees/${item._id}/`, form_data, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => this.refreshList());
      return;
    }

    axios
      .post("http://127.0.0.1:9000/api/v1/employees/", form_data, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
      .then(res => this.refreshList());
  };
  deleteItem = item => {
    axios
      .delete(`http://127.0.0.1:9000/api/v1/employees/${item._id}/`)
      .then(res => this.refreshList());
  };
  createItem = () => {
    const item = { first_name: "", last_name: "", about: "", avatar: null, cv: null };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Todo App</h1>
        <div className="row ">
          <div className="col-md-10 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="text-right mb-2">
                <button onClick={this.createItem} className="btn btn-primary">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <Table responsive className="text-center">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>NAME</th>
                    <th>ABOUT ME</th>
                    <th>FILES</th>
                    <th>OPTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderItems()}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
export default App;