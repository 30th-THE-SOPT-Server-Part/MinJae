export{};

/* type */
let name: string = '강민재';
console.log(name);

let grade: number = 4;

let isDeleted: boolean = false;

// function 
// 함수의 반환 값을 명시해줄 수 있다.
// 반환 값이 없을 때는 void 타입
const sum = (x: number, y: number): number =>{
    return x + y;
}


const div = (x: number, y: number): number =>{
    return x / y;
}

/* Array */

//const ages: number[] = [1, 2, 3, 4, 5];
const ages: Array<number> = [1, 2, 3, 4];

//const strArray: string[] = ["hello", "world"];
const strArray: Array<string> = ["hello", "world"];

/* Object vs object */
// Object: 모든 타입 할당, object는 원시타입을 제외한 나머지 할당

const f1 = (obj: object): void =>{
    console.log(obj);
}

const f2 = (obj: Object): void =>{
    console.log(obj);
}

f2([1, 2, 3, 4]);
f2('hihi');

f1([1, 2, 3, 4]);
//f1('hihi');  -> 원시타입은 할당할 수 없다!



// null, undefined 
let p: null = null;
let u: undefined = undefined;


// 타입 단언 
// angle-bracket 타입 단언

let name3: any = '강민재'; // ant 마법(아무 타입이나 가능)
let name3Length: number = (<string>name3).length;   // 형 변환 느낌!
console.log(name3Length);

// as
let name4: any = 'm1njae';
let name4Length: number = (name4 as string).length;
console.log(name4Length);

