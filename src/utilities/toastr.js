let app = document.querySelector('body');
let toastrContainer = document.createElement('div');
app.appendChild(toastrContainer);

const myToastr = {
	error: (msg) => {
		const backgroundColor = 'linear-gradient(rgba(220,53,69, 0.55), rgba(220,53,69, 0.85), rgba(220,53,69, 0.55))';
		showToastr('ERROR', msg, backgroundColor);
	},

	success: (msg) => {
		const backgroundColor = 'linear-gradient(rgba(40,167,69, 0.55), rgba(40,167,69, 0.85), rgba(40,167,69, 0.55))';
		showToastr('SUCCESS', msg, backgroundColor);
	},

	info: (msg) => {
		const backgroundColor = 'linear-gradient(rgba(23,162,184, 0.55), rgba(23,162,184, 0.85), rgba(23,162,184, 0.55))';
		showToastr('INFO', msg, backgroundColor);
	}
}

export default myToastr;


function showToastr(type ,msg, backgroundColor) {
	let toastr = createToastr(type, msg);
	toastr.style['background'] = backgroundColor;
	toastrContainer.appendChild(toastr);
	toastr.animate([
				{ opacity: '0' },
				{ opacity: '0.5' },
				{ opacity: '1' },
				{ opacity: '1' },
				{ opacity: '1' },
				{ opacity: '1' },
				{ opacity: '1' },
				{ opacity: '1' },
				{ opacity: '1' },
				{ opacity: '0.5' },
				{ opacity: '0',
					display: 'none' }
				], {
					duration: 5000,
					easeing: "ease-out",
					delay: 300,
					fill: "forwards",
	});
	setTimeout(() => {
		toastrContainer.innerHTML = '';
	}, 6000);
}

function createToastr(type, msg, typeIcon) {
	let newToastr = createElement('div', 'c-toastr', '');
	newToastr.appendChild(createElement('h3', 'c-toastr-title', type));
	newToastr.appendChild(createElement('div', 'c-toastr-content', msg));
	newToastr.appendChild(createElement('div', 'c-toastr-footer', '', type));
	return newToastr;
}

function createElement(type, typeClass, typeContent, typeIcon) {
	let el = document.createElement(`${type}`);
	el.className = `${typeClass}`;
	el.textContent = typeContent;
	
	if(typeClass === 'c-toastr-footer') {
		if(typeIcon === 'ERROR')
			el.insertAdjacentHTML('afterbegin', '<i class="fas fa-exclamation-triangle c-toastr-footer-icon"></i>');
		else if(typeIcon === 'SUCCESS')
			el.insertAdjacentHTML('afterbegin', '<i class="far fa-check-circle c-toastr-footer-icon"></i>');
		else if(typeIcon === 'INFO')
			el.insertAdjacentHTML('afterbegin', '<i class="fas fa-info-circle c-toastr-footer-icon"></i>');
	}

	return el;
}