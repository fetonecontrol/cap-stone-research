import React from 'react';
import PropTypes from 'prop-types';
import Memory from './Memory';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';

function SearchList(props) {
	const { onSearchQuery } = props;

	useFirestoreConnect([{ collection: 'memories' }]);
	
	console.log(onSearchQuery[0].documentId)
	
	// onMemorySelection(id);

	if (isLoaded(onSearchQuery)) {
		return (
			<React.Fragment>
				<h1 style={{textAlign: 'center'}}>Search List</h1>
				<hr />
					{onSearchQuery.map((memory) => {
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
								id={memory.documentId}
								key={memory.documentId}
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

SearchList.propTypes = {
	onMemorySelection: PropTypes.func,
	onSearchQuery: PropTypes.object,
	id: PropTypes.string
};

export default SearchList;
