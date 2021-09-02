import express from 'express';
import fs from  'fs';
import path from 'path';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../src/App';

const PORT = 8000;
const app = express();
app.use('^/$', (req, res, next) => {
	const app = ReactDOMServer.renderToNodeStream(<App />);
	//the path to react build folder!
	fs.readFile(path.resolve('../build/index.html'), 'utf-8', (err, data) => {
		if(err) {
			console.log(err);
			return res.status(500).send('Some error happend');
		}

		return res
			.status(200)
			.send(data.replace('<div id="root"></div>', 
			`<div id="root">${app}</div>`));
	});
});

app.use('^/home', (req, res, next) => {
	const app = ReactDOMServer.renderToNodeStream(<App />);
	//the path to react build folder!
	fs.readFile(path.resolve('../build/index.html'), 'utf-8', (err, data) => {
		if(err) {
			console.log(err);
			return res.status(500).send('Some error happend');
		}

		return res
			.status(200)
			.send(data.replace('<div id="root"></div>', 
			`<div id="root">${app}</div>`));
	});
});

app.use('^/contacts', (req, res, next) => {
	const app = ReactDOMServer.renderToNodeStream(<App />);
	//the path to react build folder!
	fs.readFile(path.resolve('../build/index.html'), 'utf-8', (err, data) => {
		if(err) {
			console.log(err);
			return res.status(500).send('Some error happend');
		}

		return res
			.status(200)
			.send(data.replace('<div id="root"></div>', 
			`<div id="root">${app}</div>`));
	});
});

app.use('^/about', (req, res, next) => {
	const app = ReactDOMServer.renderToNodeStream(<App />);
	//the path to react build folder!
	fs.readFile(path.resolve('../build/index.html'), 'utf-8', (err, data) => {
		if(err) {
			console.log(err);
			return res.status(500).send('Some error happend');
		}

		return res
			.status(200)
			.send(data.replace('<div id="root"></div>', 
			`<div id="root">${app}</div>`));
	});
});

app.use('^/services', (req, res, next) => {
	const app = ReactDOMServer.renderToNodeStream(<App />);
	//the path to react build folder!
	fs.readFile(path.resolve('../build/index.html'), 'utf-8', (err, data) => {
		if(err) {
			console.log(err);
			return res.status(500).send('Some error happend');
		}

		return res
			.status(200)
			.send(data.replace('<div id="root"></div>', 
			`<div id="root">${app}</div>`));
	});
});

app.use('^/my-room', (req, res, next) => {
	const app = ReactDOMServer.renderToNodeStream(<App />);
	//the path to react build folder!
	fs.readFile(path.resolve('../build/index.html'), 'utf-8', (err, data) => {
		if(err) {
			console.log(err);
			return res.status(500).send('Some error happend');
		}

		return res
			.status(200)
			.send(data.replace('<div id="root"></div>', 
			`<div id="root">${app}</div>`));
	});
});

//the path to react build folder!
app.use(express.static('../build'));

app.listen(PORT, () => {
	console.log(`Express server started at http://localhost:${PORT}`);
});