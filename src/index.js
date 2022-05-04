import bar from './bar.js'
import json from './alert.json'
import './styles/loader.css'
import './styles/style.css';
import img from './img/01.jpg'
let a = 12,
    b = 13;
//console.log(bar());
console.log(json)
console.log('img:', img);

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