import React from "react";
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function ReusableForm(props) {

  const { memoryTitle } = props;

  return (
    <React.Fragment>
      <Form onSubmit={props.formSubmissionHandler}>
        <Form.Group controlId = 'memoryTitle'>
          <Form.Control
            type='text'
            name='title'
            placeholder= 'Title'
            defaultValue= {memoryTitle}
            />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type='date'
            name='date'
            placeholder='Enter the date.'
            defaultValue= {props.date} />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type='text'
            name='place'
            placeholder='Place'
            defaultValue={props.place}/>
        </Form.Group>
        <Form.Group>
          <Form.Control
            as='textarea'
            name='description'
            placeholder='Describe your memory.' 
            />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type='text'
            name='vibe'
            placeholder='What was the vibe?' />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type='text'
            name='scents'
            placeholder='Any smells associated with the memory?' />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type='text'
            name='keywords'
            placeholder='Any keywords?' />
        </Form.Group>
          <Button className='mb-2' variant="info" type='submit'>{props.buttonText}</Button>
      </Form>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string,
  memoryTitle: PropTypes.string
};

export default ReusableForm;