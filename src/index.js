import * as $ from 'jquery'
import bar from './bar.js'
import hello from './models/mod.js'
import json from './alert.json'
//import './styles/loader.css'
import './styles/style.css';
import img from './img/02.png'
import xml from './xml/email.xml'
import csv from './csv/addresses.csv'
//console.log(bar());
console.log(json)
console.log('img:', img);
console.log('xml', xml);
console.log('csv', csv);
console.log('models', hello());
let itemImg = document.querySelector('img').setAttribute('src', img)

$('pre').html('jamoliddindiidnnndndnndndn')
console.log($('pre'));
function() { }

/*TODO async function comp(url) {
    let object = await fetch(url);  // => сработала
    object = await object.json();
    return object
}
let hello = comp('../src/alert.json');
hello.then((data) => {
    console.log(data);
}) */

let container = document.querySelector('.container');
container.onclick = () => console.log('clak');