var vv = '123';
var vv = '321';
console.log(vv);
// var는 재선언, 재할당 가능

let variableLet = '123';
// let variableLet = '321';
console.log(`variableLet: ${variableLet}`);
// let은 재선언 불가, 재할당 가능

const variableConst = "123";
// variableConst = "321";
console.log(`variableConst: ${variableConst}`);
// const는 재선언, 재할당 불가

const objectConst = {name: '신연상'};
objectConst.name = '김정재';    // 이거는 됨
console.log(objectConst);   