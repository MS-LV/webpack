import * as $ from 'jquery'

function click() {
    console.log('click on')
}
function clak() {
    console.log('clak off')
}
$(document).on('click', click);
$('h1').on('click', clak);

function layer() {
    let counter = 0;
    let listener = (): number => counter++;
    return listener()
}