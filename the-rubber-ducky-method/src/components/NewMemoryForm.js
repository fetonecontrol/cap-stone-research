import React from 'react';
import PropTypes from 'prop-types';
import ReusableForm from './ReusableForm';
import { useFirestore } from 'react-redux-firebase';

function NewMemoryForm(props) {
	const firestore = useFirestore();

	function addMemoryToFirestore(event) {
		event.preventDefault();
		props.onNewMemoryCreation();

		return firestore.collection('memories').add({
			title: event.target.title.value,
			date: event.target.date.value,
			description: event.target.description.value,
      timeOpen: firestore.FieldValue.serverTimestamp(),
      place: event.target.place.value, 
      vibe: event.target.vibe.value,
      scents: event.target.scents.value,
      keywords: event.target.keywords.value,
		});
	}

	return (
		<React.Fragment>
			<ReusableForm
				formSubmissionHandler={addMemoryToFirestore}
				buttonText="Remember for me!"
			/>
		</React.Fragment>
	);
}

NewMemoryForm.propTypes = {
	onNewMemoryCreation: PropTypes.func,
};

export default NewMemoryForm;
