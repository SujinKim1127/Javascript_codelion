console.log([5, 10, 15].some(item => item > 10))    // true
console.log([5, 10, 15].some(item => item < 1))     // false

// 배열의 요소 중 찾는 단어가 1개 이상 존재하는지 확인
console.log(['abc', 'def', 'ghi'].some(item => item === 'abc'))     // true

// 빈 배열은 항상 false 반환
console.log([].some(item => item > 1))      // false

console.log([5,10,15].every(item => item > 3))      // true
console.log([5,10,15].every(item => item > 10))     // false

console.log([].every(item => item > 3))             // true


/*****************************************************************/

const users = [
    { id: 1, name: 'Lee'},
    { id: 2, name: 'kim'},
    { id: 4, name: 'park'},
    { id: 3, name: 'choi'},
    { id: 3, name: 'kwon'}
]

console.log(users.find(user => user.id === 2))      //     { id: 2, name: 'kim'}
console.log(users.find(user => user.id === 3))      //     { id: 3, name: 'choi'}

console.log(users.findIndex(user => user.id === 3))         // 3
console.log(users.findIndex(user => user.name === 'park'))  // 2

// 프로퍼티 키와 프로퍼티 값으로 요소의 인덱스를 구하는 경우
// 다음과 같이 콜백 함수를 추상화할 수 있다
function predicate(key, value) {
    // key와 value를 기억하는 클로저 반환
    return item => item[key] === value;
}

console.log(users.findIndex(predicate('id', 2)))            // 1 
console.log(users.findIndex(predicate('name', 'park')))     // 2

/*******************************************************************************************/

const arr = ['hello', 'world'];

// map과 flat 순차적으로 실행
console.log(arr.map(x => x.split('')).flat())
// [ 'h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd' ]

// flatMap은 map을 통해 생성된 새로운 배열을 평탄화 한다.
console.log(arr.flatMap(x => x.split('')));
// [ 'h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd' ]

// 1단계만 평탄화하는 flatMap
console.log(arr.flatMap((str, index) => [index, [str, str.length]]))
// [ 0, [ 'hello', 5 ], 1, [ 'world', 5 ] ]

// 평탄화 깊이를 지정해야하면 map과 flat 메서드 각각 호출하기
console.log(arr.map((str, index) => [index, [str, str.length]]).flat(2))
// [ 0, 'hello', 5, 1, 'world', 5 ]