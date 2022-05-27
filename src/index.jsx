//import * as $ from 'jquery';
import bar from './bar.js';
import hello from './models/mod.js';
import json from './alert.json';

// Импортироват CSS файли
import './styles/loader.css';
import './styles/style.css';
import './styles/lessfile.less';
import './styles/scssfile.scss'

//? Импортироват JS файли
import './models/babel.js';
import React from 'react';
import { render } from 'react-dom'

import img from './img/02.png';
import xml from './xml/email.xml';
import csv from './csv/addresses.csv';

//console.log(bar());
console.log(json)
console.log('img:', img);
//console.log('css', css)
console.log('xml', xml);
console.log('csv', csv);
console.log('models', hello());


const App = () => (<h1>I am from React Hello!</h1>)
render(<App />, document.getElementById('app'))

/*TODO async function comp(url) {
    let object = await fetch(url);  // => сработала
    object = await object.json();
    return object
}
let hello = comp('../src/alert.json');
hello.then((data) => {
    console.log(data);
}) */

