/* object */
const sopt = {
    season: 30,
    group : ['YB','OB'],
    part : ['서버', '기획', '디자인', '안드로이드', '웹', 'iOS'],
    president : '김규민',
    introduce: function (){
        this.part.map(name => {
            console.log(`솝트 내 파트는 ${name} 파트가 있어요!`);
        });
    }
}

console.log(sopt.group);
sopt.introduce();

console.log(sopt.season);

/* Array */

let array = [1, true, "string"];
console.log(array);

let array2 = [
    {
        name: '강민재',
        age: 24
    },
    {
        name: '민재',
        age: 18
    }
]
console.log(array2);
console.log(typeof array);  // object



