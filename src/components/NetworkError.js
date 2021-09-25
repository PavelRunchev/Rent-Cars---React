import serverNetworkError from '../public/server-network-error.jpg';
const NetworkError = () => {
	return (
		<div className="network-error">
			<h1>No Connect to Server!</h1>
			<h4>Please wait few minutes!</h4>
			<div className="network-error-logo-container">
				<img src={serverNetworkError} className="network-error-logo-img" alt="error-logo-500"/>
			</div>
		</div>
	)
}

export default NetworkError;