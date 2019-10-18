
import React, { Component } from "react";
import {
Button,
Modal,
ModalHeader,
ModalBody,
ModalFooter,
Form,
FormGroup,
Input,
Label
} from "reactstrap";

export default class CustomModal extends Component {
constructor(props) {
  super(props);
  this.state = {
    activeItem: this.props.activeItem
  };
}
handleChange = e => {
  let { name, value } = e.target;
  const activeItem = { ...this.state.activeItem, [name]: value };
  this.setState({ activeItem });
};
handleAvatarChange = e => {
  const activeItem = { ...this.state.activeItem, avatar: e.target.files[0] };
  this.setState({ activeItem })
};
handleCvChange = e => {
  const activeItem = { ...this.state.activeItem, cv: e.target.files[0] };
  this.setState({ activeItem })
};
render() {
  const { toggle, onSave } = this.props;
  return (
    <Modal isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}> Employees </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="first_name">First Name</Label>
            <Input
              type="text"
              name="first_name"
              value={this.state.activeItem.first_name}
              onChange={this.handleChange}
              placeholder="First Name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="last_name">Last Name</Label>
            <Input
              type="text"
              name="last_name"
              value={this.state.activeItem.last_name}
              onChange={this.handleChange}
              placeholder="Last Name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="about">About me</Label>
            <Input
              type="text"
              name="about"
              value={this.state.activeItem.about}
              onChange={this.handleChange}
              placeholder="About me"
            />
          </FormGroup>
          <FormGroup>
            <Label for="avatar">Avatar</Label>
            <Input
              type="file"
              name="avatar"
              accept="image/png, image/jpeg"
              onChange={this.handleAvatarChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="cv">Cv</Label>
            <Input
              type="file"
              name="cv"
              accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
              text/plain, application/pdf"
              onChange={this.handleCvChange}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => onSave(this.state.activeItem)}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
}
}