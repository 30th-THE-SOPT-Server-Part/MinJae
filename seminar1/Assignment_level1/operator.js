/* operator */

// 증감 연산자
// let a = 2;
// let b = a++; -> b = a + 1
let B = ++a;  // -> B = a + 1

console.log(B);

// 비교 연산자

let a = 2 + 3;
let x = 5;
let b = 2 * 3;
let c = 3 - 2;
let d = 4 / 2;

console.log(a,b,c,d);

if ( a === x) {
    console.log('a === x');
}

let y = '5';

if ( a == y){
    console.log('a === y');
}

if ( a !== c) {
    console.log('a !== c');
}

if ( a !== y) {
    console.log('a !== y');
}

// 나머지 연산
// 6 / 2 나머지

if (b % d === 0) {
    console.log(b % d);
    console.log('나머지 0');
}

// and : && / or : ||

if(a === 5 && d ===2 ){
    console.log('and');
}

if(a === 4 || d === 2){
    console.log('or');
}

console.log(typeof (typeof a)); // string
console.log(typeof a ); // number

// string으로 비교할 것!
if (typeof a == 'number'){   
    console.log(a);
}