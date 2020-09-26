import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

function MemoryDetail(props){
  const { memory, onClickingDelete } = props;

  return(
    <React.Fragment>
      <h1>Memory Detail</h1>
      <h2>{memory.title} - {memory.date}</h2>
      <p>description: {memory.description}</p>
      <p>place: {memory.place}</p>
      <p>vibe: {memory.vibe} </p>
      <p>scents: {memory.scents}</p>
      <p>timeOpen: {memory.timeOpen.toDate().toString()}</p>
      <p>keywords: {memory.keywords}</p>
      <Button className='mr-2' variant='info' onClick={ props.onClickingEdit }>Update Memory</Button>
      <Button variant='danger' onClick={()=> onClickingDelete(memory.id) }>Delete Memory</Button>
      <hr/>
    </React.Fragment>
  ) 
}

MemoryDetail.propTypes = {
  memory: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default MemoryDetail;