// null, undefined
let nothing = null;
console.log(`nothing : ${nothing}, type: ${typeof nothing}`);
// 원래는 object이 아니라 null이 나와야 함 (ES 설계 오류)
let x;
console.log(`x: ${x}, type ${typeof x}`);

// null vs undefined
console.log('null vs undefined');
console.log('null === undefined: ', null === undefined);    // 타입까지 비교
console.log('null == undefined: ', null == undefined);      // 값 만 비교