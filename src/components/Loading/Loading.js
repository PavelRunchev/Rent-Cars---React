import gif from '../../public/loading.gif';

const Loading = () => {
	return (
		<div className="loading-container">
			<img className="loading" src={gif} alt="gif"/>
		</div>
	)
}

export default Loading;