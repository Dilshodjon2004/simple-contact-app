import {Component} from "react";

import {Button, Form} from "react-bootstrap";

export class ContactForm extends Component {
  render() {
    const {
      contact,
      firstnameRef,
      lastnameRef,
      phoneNumberRef,
      handleContact,
      selected,
      submit,
    } = this.props;
    return (
      <Form noValidate className='w-50 m-auto' onSubmit={submit}>
        <Form.Group className='mb-3' controlId='firstname'>
          <Form.Label>Firstname</Form.Label>
          <Form.Control
            ref={firstnameRef}
            onChange={handleContact}
            value={contact.firstname}
            required
            type='text'
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3' controlId='lastname'>
          <Form.Label>Lastname</Form.Label>
          <Form.Control
            ref={lastnameRef}
            onChange={handleContact}
            value={contact.lastname}
            required
            type='text'
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3' controlId='phoneNumber'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            ref={phoneNumberRef}
            onChange={handleContact}
            value={contact.phoneNumber}
            required
            type='text'
           
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3' controlId='category'>
          <Form.Label>Category</Form.Label>
          <Form.Select onChange={handleContact} value={contact.category}>
            <option value='family'>Family</option>
            <option value='friends'>Friends</option>
            <option value='relatives'>Relatives</option>
            <option value='other'>Other</option>
          </Form.Select>
        </Form.Group>
        <Button type='submit' className='w-100'>
          {selected === null ? "Add" : "Save"} contact
        </Button>
      </Form>
    );
  }
}

export default ContactForm;
