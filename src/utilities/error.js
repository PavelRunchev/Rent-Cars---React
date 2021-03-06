import myToastr from './toastr';


const Error = (err) => {
	console.log('error utilities');
	console.log(err);
	if(err.status === 500) {
		//internal server error component!
		return myToastr.error('Internal server Error!');
	}

	if(err.statusText !== undefined)
		return myToastr.error(`${err.statusText}`);
					
	if(err.response.data.message !== undefined)
		return myToastr.error(`${err.response.data.message}`);

	return console.log('other error');
}

export default Error;