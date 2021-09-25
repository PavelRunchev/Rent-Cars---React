
window.onscroll = function() {
	navScrollEffect();
}

let media = window.matchMedia('(min-width: 900px)');

export default function navScrollEffect() {
		let navigation = document.querySelector('.navigation');
		let logo = document.querySelector('.navigation-logo');

		if(media.matches) {
			if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
				logo.style.top = "25px";
				navigation.style.height = "65px";
			} else {
				logo.style.top = "40px";
				navigation.style.height = "85px";
			}
		} else {
			if(navigation !== null) 
				navigation.style.height = "auto";
		}
}

media.addListener(navScrollEffect);