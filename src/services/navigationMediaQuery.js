let m = window.matchMedia('(min-width: 900px)');

export default function navigationMediaQuery() {
	let navigation = document.querySelector('.navigation-second-container');
	let userNav = document.querySelector('.navigation-profile-list');
	let loggedNav = document.querySelector('.navigation-profile');
	let bars = document.querySelector('.navigation-bars-btn');
	let downMenu = document.querySelector('.navigation-down-menu');

	if(downMenu !== null)
		downMenu.style.top = '-400px';

	if(m.matches) {
		navigation.style.display = 'block';
		if(userNav !== null)
			userNav.style.display = 'flex';
		if(loggedNav !== null)
			loggedNav.style.display = 'inline-block';
		bars.removeEventListener('click', showHideNavigation);
	} else {
		navigation.style.display = 'none';
		if(userNav !== null)
			userNav.style.display = 'none';
		if(loggedNav !== null)
			loggedNav.style.display = 'none';
		bars.addEventListener('click', showHideNavigation);
	}
}

m.addListener(navigationMediaQuery);

//Bars btn - show / hide main navigation.
function showHideNavigation(e) {
	e.preventDefault();
	let navigation = document.querySelector('.navigation-second-container');
	let userNav = document.querySelector('.navigation-profile-list');
	let loggedNav = document.querySelector('.navigation-profile');
	let downMenu = document.querySelector('.navigation-down-menu');
	
	console.log(downMenu)
	if(navigation.style.display === 'block') {
		navigation.style.display = 'none';
		if(userNav !== null)
			userNav.style.display = 'none';
		if(loggedNav !== null)
			loggedNav.style.display = 'none';

		if(downMenu !== null)
			downMenu.style.top = '-102px';

		console.log('none')
	} else { 
		navigation.style.display = 'block';
		
		if(userNav !== null)
			userNav.style.display = 'flex';
		if(loggedNav !== null)
			loggedNav.style.display = 'block';

		if(downMenu !== null)
			downMenu.style.top = '100px';

			console.log('block')
	}
}