
function dateConvert(date) {
	return new Date(date)
		.toLocaleString('en-GB', { timeZone: 'UTC' })
		.replace(/[/]/g, '.');
}

export default dateConvert;