async function start() {

    return await Promise.resolve('Async is working')
}
start().then(console.log);
const unused = 42;
class Util {
    static id = Date.now()
}
console.log('Util ID', Util.id);
//console.log(unused)
import('lodash').then((_) => {
    console.log('Lodash', _)
})