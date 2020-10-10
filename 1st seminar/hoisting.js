if(true){
    var x = 'var';
}
console.log(`var: ${x}`);   // var는 function scope이라 밖에서도 접근 가능

if(true){
    let y = 'let';
}
console.log(`let: ${y}`);   // let, const는 block scope이라 밖에서 접근 불가

function hoistFunction() {
    console.log(x);
    var x = 'var';
    consolee.log(x);
}