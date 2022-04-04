// 과제 조건
// 1. Member, Dinner interface 만들고 타입 지정하기
// 2. organize 내부 로직 채우기

export{};

//Member interface
interface Member{
    name: string;
    group: string;
}

//Dinner interface
interface Dinner {
    member: Member[];
    shuffle: (array: Member[]) => Member[];
    organize: (array: Member[] ) => void;
}


const dinner : Dinner = {
    member: [
        {
            name: '채정아',
            group: 'ob'
        },
        {
            name: '김동재',
            group: 'yb'
        },
        {
            name: '강민재',
            group: 'yb'
        },
        {
            name: '김루희',
            group: 'ob'
        },
        {
            name: '박진수',
            group: 'ob'
        }
    ],

    shuffle(array: Member[]) {
        array.sort(() => Math.random() - 0.5);
        return array;
    },

    organize(array: Member[]) {
        let dinnerMember = this.shuffle(array);
        console.log(`오늘의 저녁 식사 멤버는 ${dinnerMember[0].name}, ${dinnerMember[1].name}`);
    }
};

dinner.organize(dinner.member);