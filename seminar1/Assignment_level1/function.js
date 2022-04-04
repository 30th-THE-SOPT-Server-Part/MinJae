/* function */
//자바스크립트에서 function은 일급객체!

//함수 선언식

function menu(dinner){
    return `오늘의 저녁 메뉴는 ${dinner}입니다.`;
}

const str1 = menu('곱도리탕');
console.log(str1);

//함수 표현식

const menu = (dinnerMenu) => {
    return `오늘의 저녁 메뉴는 ${dinnerMenu}입니다.`;
}
const str2 = menu('물갈비');
console.log(str2);

 const func = (num) =>{
     return num * num;
 }
const multiple = (func, num) =>{
    console.log(func(num));
}

multiple(func, 3);