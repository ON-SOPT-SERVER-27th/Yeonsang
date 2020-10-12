// 1. 배열 선언하기

var arr1 = [];
console.log(arr1);
console.log(typeof arr1);

var arr2 = new Array(1,2,3,4,5);
console.log(arr2);
console.log(typeof arr2);

var arr3 = ['최영훈', 1, 2, 3, null, {name: 'yh', age: 26}];
console.log(arr3);
console.log(typeof arr3);

// 2. array prototype 메서드
console.log('**** Array 기본 함수들을 알아보자 ****');
var arr = [1, 2, 3, 4];

// 2-1. length
console.log(`arr의 길이: ${arr.length}`);   // 4

// 2-2. push, pop
arr.push('new item');
console.log('arr push:', arr);  [1, 2, 3, 4, 'new item']
arr.pop();
console.log('arr pop:', arr);   [1, 2, 3, 4]

// 2-3. shift, unshift
arr.unshift('first item');
console.log('arr unshift: ', arr);  // ['first item', 1, 2, 3, 4]
arr.shift();
console.log('arr shift:', arr);     // [1, 2, 3 ,4]

// 2-4. includes
console.log('arr.includes(4):', arr.includes(4));   // true
console.log('arr.includes(1000):', arr.includes(1000)); // false

// 2-5. indexOf
console.log('arr.indexOf(4):', arr.indexOf(4)); // 3 (0부터 시작)
console.log('arr.indexOf(100):', arr.indexOf(100)); // 없으면 -1

// 2-6. concat : 배열 합치기
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
var concatArr = arr1.concat(arr2);
console.log('arr1.concat(arr2):', concatArr);   // [1, 2, 3, 4, 5, 6]

// 2-7. join
var location = ["서울", "대전", "대구", "부산"];
console.log(location.join('-> '));  // 서울 -> 대전 -> 대구 -> 부산

// 2-8. reverse
console.log(location.reverse().join('-> '));   // 부산 -> 대구 -> 대전 -> 서울

// 2-9. sort
var countries = ['Korea', 'China', 'Japan'];
console.log(countries.sort( (a,b) => a > b ? 1 : -1) ); // 정렬 안됨
console.log(countries.sort( function(a,b) { return a.localeCompare(b); })); // 정렬 안됨
console.log('오름차순 정렬:', concatArr.sort((a,b) => a-b));    // [1,2,3,4,5,6]
console.log('내림차순 정렬:', concatArr.sort(function(a,b) { return b - a; })); // [6,5,4,3,2,1]

// 2-10. filter: 배열 요소 전체를 대상으로 조건 걸어서, 조건 충족하는 결과를 새로운 배열로 반환
var number = [100, 234, -125, 1, 23, -647, -123, 99, 2, 3, 4, 5];
var minusNumber = number.filter( item => item < 0);
console.log('minusNumber: ', minusNumber);  // [-125, -647, -123]

// 2-11. map: 배열 요소 전체를 대상으로 함수 호출하고, 그 결과를 새로운 배열을 반환할 때 주로 사용
var countries = ['Korea', 'China', 'Japan'];
var countriesLengths = countries.map( item => item.length );
console.log('countriesLengths: ', countriesLengths);    // [5,5,5]

// 2-12. reduce: map은 배열 반환할 때 사용 <-> reduce는 값 하나 반환할 때 사용 (예: 1~n 더하기)
var number = [1,2,3,4,5,6,7,8,9,10];
var sum = number.reduce( (previousValue, currentValue) => {
    console.log(`previousValue: ${previousValue}, currentValue: ${currentValue}`);
    return previousValue + currentValue;
});

console.log('sum = ', sum);     // 55

// 3. 배열 순회

var serverPart = ["김현기", "석영현", "강준우", "송정우", "신지혜", "이영은", "이진호"];
let serverIndexStr = '서버파트 여러분 번호 한 번 세겠습니다." ';
let serverPartMemberNameStr = '서버파트 여러분 이름 한번씩만 불러주세요~ "'

for(let item in serverPart) {
    serverIndexStr += item + '! ';
}
console.log(serverIndexStr);    // ~ 0! 1! 2! 3! ...

for(let item of serverPart) {
    serverPartMemberNameStr += item + '! '; // ~ 김현기! 석영현! 강준우! ...
}
console.log(serverPartMemberNameStr);

serverPart.forEach( item => {
    console.log(item);  // 한 줄에 이름 하나씩 출력
})
