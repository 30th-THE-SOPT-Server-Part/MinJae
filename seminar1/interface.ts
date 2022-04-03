//interface
interface ServerPart {
    name: string;
    age: number;
    group: string;
    mbti?: string[];   //optional!
}

const serverPart: ServerPart = {
    name: '강민재',
    age: 24,
    group: 'YB',
    mbti: ['ENFP']
}

//interface 배열로도 활용가능!
const serverMembers: ServerPart[] = [
    {
        name: '강민재',
        age: 24,
        group: 'YB',
        mbti: ['ENFP'] // optional!
    },
    {
        name: '채정아',
        age: 18,
        group: 'OB',
    }
]
console.log(serverPart);
console.log(serverMembers);