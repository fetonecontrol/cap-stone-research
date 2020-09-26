import React from 'react';
import PropTypes from 'prop-types';
import Memory from './Memory';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';

function MemoryList(props) {
	// const { onSearchQuery } = props;

		// if (onSearchQuery == null){
		// 	onSearchQuery.forEach(doc => {
		// 		console.log(doc.data());
		// });
		// }

		// if (onSearchQuery != null){
		// 	let output = onSearchQuery.forEach(doc => {console.log(doc.data())});
		// 	// (doc.id, '=>', doc.data());
		
		// }
	
	useFirestoreConnect([{ collection: 'memories' }]);

	const memories = useSelector((state) => state.firestore.ordered.memories);

	console.log(memories)
	if (isLoaded(memories)) {
		return (
			<React.Fragment>
				<h1 style={{textAlign: 'center'}}>Memory Lane</h1>
				<hr />
					{memories.map((memory) => {
						return (

							<Memory
								whenMemoryClicked={props.onMemorySelection}
								title={memory.title}
								date={memory.date}
								description={memory.description}
								timeOpen={memory.timeOpen}
								place={memory.place}    
								vibe={memory.vibe}
								scents={memory.scents}
								keywords={memory.keywords}
								id={memory.id}
								key={memory.id}
							/>
						);
					})}
			</React.Fragment>
		);
	} else {
		return (
			<React.Fragment>
				<h3>Loading...</h3>
			</React.Fragment>
		);
	}
}

MemoryList.propTypes = {
	onMemorySelection: PropTypes.func,
	onSearchQuery: PropTypes.object
};

export default MemoryList;
