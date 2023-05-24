

// 리액트에서 많이 쓰이는 문법 object shorthand assignment
// 키와 값을 담은 변수 이름이 같으면 ~
// let person = { 이런 형식이 아닌
//     name : name,
//     age : age
// }

let name = 'park';
let age = 20;
console.log()
let person = { 
    name,
    age
}
console.log(person);