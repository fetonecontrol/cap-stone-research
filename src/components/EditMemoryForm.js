import React from 'react';
import ReusableForm from './ReusableForm';
import PropTypes from 'prop-types';
import { useFirestore } from 'react-redux-firebase';

function EditMemoryForm(props) {
	const firestore = useFirestore();
	const { memory, title } = props;

	function handleEditMemoryFormSubmission(event) {
		event.preventDefault();
		props.onEditMemory();
		const propertiesToUpdate = {
			title: event.target.memoryTitle.value,
			date: event.target.date.value,
			description: event.target.description.value,
      place: event.target.place.value, 
      vibe: event.target.vibe.value,
      scents: event.target.scents.value,
      keywords: event.target.keywords.value,
		};
		return firestore.update(
			{ collection: 'memories', doc: memory.id },
			propertiesToUpdate
		);
	}

	return (
		<React.Fragment>
			<ReusableForm
				formSubmissionHandler={handleEditMemoryFormSubmission}
				buttonText="Update Memory"
				memoryTitle = {title}
			/>
		</React.Fragment>
	);
}

EditMemoryForm.propTypes = {
	onEditMemory: PropTypes.func,
	memory: PropTypes.object
};

export default EditMemoryForm;
