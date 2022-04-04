/* var,let, const */

// var 재선언, 재할당 가능
var name = '강민재';
var name = '강민재2';

console.log(name);

// let 재선언 불가, 재할당 가능

let name2 = '강민재입니다';
//let name2 = '강민재라구요';
console.log(name2); 

let name3 = '민재입니다';
name3 = '민재라니까?';
console.log(name3);

// const 재선언, 재할당 불가능

const name4 = '안녕하세요';
//const name4 = '강민재입니다';
console.log(name4);

/* scope */

if (true) {
    var x = 'var variable';
}
console.log(x);    

 if (true) {
     const y = 'const variable';
 }
// console.log(y);    ReferenceError: y is not defined

function foo () {
    if (true){
        var name ='강민재';
        console.log('if-block', name);
    }
    console.log('function-block-', name);
}
// console.log('global', name);    ReferenceError: name is not defined