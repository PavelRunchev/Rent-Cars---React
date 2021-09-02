import React from 'react';

function withRemoveMessageWrapper(Component) {
	
	return class extends React.Component {

		render () {
			return <Component {...this.props}/>
		}
		
	}
}

export default withRemoveMessageWrapper;