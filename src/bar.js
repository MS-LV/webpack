export default function bar() {
    let a = +window.prompt("write your number"),
        b = 1;
    while (a > 1) {
        b += --a;
    }
    return b
}