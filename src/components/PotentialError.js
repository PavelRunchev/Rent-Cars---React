import React from  'react';

//worked correclty obly in production mode
class PotentialError extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			error: false,
			info: false,
			errorArr: []
		}
	}

	componentDidCatch(error, info) {
		this.setState({ error, info });
	}

	render () {
		if(this.state.error) {
			return (
				<div className="primary-container">
					<img src="https://www.headnorthdigital.com/wp-content/uploads/2019/12/How-to-fix-500-Internal-Server-Error.jpg" alt="error-logo-500"/>
				</div>
			)	
		}

		return this.props.children;
	}
}

export default PotentialError;