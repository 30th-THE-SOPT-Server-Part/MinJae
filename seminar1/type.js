//typeof
const name = '강민재';
console.log(typeof name); // typeof -> sting

let age = 24;
console.log(typeof age);

let server = true;
console.log(typeof server);

//안녕하세요 제 이름은 강민재입니다. 제 나이는 24살입니다.

// 구현1
console.log('안녕하세요 제 이름은 ' + name + '입니다. 제 나이는 ' + age + ' 살입니다.');

// 구현2 template literal
console.log(`안녕하세요 제 이름은 ${name}입니다. 제 나이는 ${age} 살입니다.`);

// null, undefined
console.log(typeof null);
console.log(typeof undefined);

//Array
let array = ['안녕', 2, '나는', 4, true];

// map
let num = [1, 2, 3, 4];
const newNumArr = num.map(x => x * 2);
console.log(newNumArr);

newNumArr.map(x => {
    console.log(x);
});

for (const x of newNumArr) {
    console.log(x);
}

