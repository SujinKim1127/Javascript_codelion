# 배열 고차 함수

**고차 함수**: 함수를 인수로 전달받거나 함수를 반환하는 함수

## `arr.sort();`

- 배열의 요소 정렬. 기본적으로 오름차순
- 기본 정렬 순서는 유니코드 코드 포인트를 따름

→  숫자 정렬시 **정렬 순서를 정의하는 비교 함수를 인수로 전달**해야함

- 오름차순 정렬: `arr.sort((a, b) => a - b);`
- 내림차순 정렬: `arr.sort((a, b) => b - a);`

<br>

<br>

## `arr.forEach();`

- for문을 대체할 수 있는 고차 함수
- 자신의 내부에서 반복문 실행
- 반복문을 추상화한 고차함수
- 내부에서 반복문을 통해 자신을 호출한 배열을 순회하면서 수행해야할 처리를 콜백 함수로 전달받아 반복 호출
- 반환값은 언제나 `undefined`
- 반복문을 대체하기 위한 고차함수

```jsx
for (let i = 0; i < arr.length; i++) {
	newarr.push(arr[i]**2);
}

⬇⬇ forEach 문으로 작성하면 ⬇⬇

arr.forEach(item => newarr.push(item**2));
```

<br>

forEach 메서드의 콜백 함수는 forEach 메서드를 호출한 배열의 요소값과 인덱스, forEach 메서드를 호출한 배열 자체, 즉 this를 순차적으로 전달 받을 수 있다.

```jsx
// forEach 메서드는 콜백함수를 호출하면서 3개(요소값, 인덱스, this)의 인수를 전달
[1,2,3].forEach((item, index, arr) => {
	console.log(`요소값: ${item}, 인덱스: ${index}, this: ${JSON.stringify(arr)}`);
});

/*
요소값: 1, 인덱스: 0, this: [1, 2, 3]
요소값: 2, 인덱스: 1, this: [1, 2, 3]
요소값: 3, 인덱스: 2, this: [1, 2, 3]
*/
```

<br>
<br>


## `arr.map();`

- 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출
- **콜백 함수의 반환값들로 구성된 새로운 배열 반환**
- 원본 배열 변경X

```jsx
const numbers= [1, 4, 9];

// map 메서드는 numbers 배열의 모든 요소를 순회하면서 콜백함수를 반복 호출
// 콜백함수의 반환값들로 구성된 새로운 배열 반환
const roots = numbers.map(item => Math.sqrt(item));
// = const roots = numbers.map(Math.sqrt);

// map 메서드는 원본 배열 배경X
console.log(numbers);   // [1, 4, 9]
// map 메서드는 새로운 배열 반환
console.log(roots);   // [1, 2, 3]
```

<br>

- map 메서드는 콜백함수를 호출할때 3개의 인수(요소값, 인덱스, map 메서드를 호출한 배열(this)) 전달

```jsx
// map 메서드는 콜백함수를 호출하면서 3개(요소값, 인덱스, this)의 인수를 전달
[1, 2, 3].map((item, index, arr) => {
	console.log(`요소값: ${item}, 인덱스: ${index}, this: ${JSON.stringify(arr)}`);
	return item;
});

/*
요소값: 1, 인덱스: 0, this: [1, 2, 3]
요소값: 2, 인덱스: 1, this: [1, 2, 3]
요소값: 3, 인덱스: 2, this: [1, 2, 3]
*/
```

<br>

map 메서드의 두번째 인수로 map 메서드의 콜백 함수 내부에서 this로 사용할 객체를 전달 가능

```jsx
class Prefixer {
    constructor(prefix) {
        this.prefix = prefix;
    }

    add(arr) {
        return arr.map(function (item) {
						// 외부에서 this를 전달하지 않으면 this는 undefined
            return this.prefix + item;
        }, this);   // map 메서드의 콜백함수 내부에서 this로 사용할 객체 전달
    }
}

const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user']));
// ['-webkit-transition', '-webkit-user']
```

화살표 함수를 사용하면

```jsx
		add(arr) {
			// 화살표함수 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조
			return arr.map(item => this.prefix + item);
		}
```

<br>

<br>

## `arr.filter();`

- 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백함수를 반복 호출
- 콜백함수의 반환값이 `true` 인 요소로만 구성된 새로운 배열 반환
- 원본 배열 변경X

```jsx
const numbers = [1, 2, 3, 4, 5];

// filter 메서드는 numbers 배열의 모든 요소를 순회하면서 콜백함수 반복 호출
// 콜백함수의 반환값이 true인 요소로만 구성된 새로운 배열 반환
// numbers 배열에서 홀수인 요소만 필터링 (1은 true)
const odds = numbers.filter(item => item % 2);
console.log(odds); // [1, 3, 5]
```

- 자신을 호출한 배열에서 필터링 조건을 만족하는 특정 요소만 추출하여 새로운 배열을 만들고 싶을때 사용
- filter 메서드가 생성하여 반환한 새로운 배열의 length 프로퍼티 값은 filter 메서드를 호출한 배열의 length 프로퍼티 값과 같거나 작다

<br>


```jsx
// filter 메서드는 콜백함수를 호출하면서 3개(요소값, 인덱스, this)의 인수를 전달
[1, 2, 3].filter((item, index, arr) => {
	console.log(`요소값: ${item}, 인덱스: ${index}, this: ${JSON.stringify(arr)}`);
	return item;
});

/*
요소값: 1, 인덱스: 0, this: [1, 2, 3]
요소값: 2, 인덱스: 1, this: [1, 2, 3]
요소값: 3, 인덱스: 2, this: [1, 2, 3]
*/
```

<br>

- filter 메서드는 자신을 호출한 배열에서 특정요소를 제거하기 위해 사용 가능

```jsx
class Users {
	constructor() {
		this.users = [
			{ id: 1, name: 'Lee' },
			{ id: 2, name: 'kim' }
		];
	}

	// 요소 추출
	findById(id) {
		// id가 일치하는 사용자만 반환
		return this.users.filter(user => user.id === id);
	}
	
	// 요소 제거
	remove(id) {
		// id가 일치하지 않는 사용자를 제거
		this.users = this.users.filter(user => user.id !== id);
		}
}

const users = new Users();

let user = users.findById(1);
console.log(user);    // [{id: 1, name: 'Lee'}]

// id가 1인 사용자를 제거
users.remove(1);

user = users.findById(1);
console.log(user);   // []
```

<br>

<br>

## `arr.reduce();`

- 자신을 호출한 배열을 모든 요소를 순회하며 인수로 전달받은 콜백함수를 반복 호출
- 콜백함수의 반환값을 다음 순회 시에 콜백 함수의 첫번째 인수로 전달하면서 콜백함수 호출하여 **하나의 결과값을 만들어 반환**
- 원본 배열 변경X
- 첫번째 인수로 콜백함수, 두번째 인수로 초기값 전달 받음
- 총 4개의 인수
    
    1) 초기값 or 콜백함수의 이전 반환값
    
    2) reduce 메서드를 호출한 배열의 요소값
    
    3) 인덱스
    
    3) reduce 메서드를 호출한 배열 자체 = this
    

<br>

```jsx
// 1부터 4까지 누적 구하기
const sum = [1, 2, 3, 4].reduce((accumulator, currentValue, index, array) => accumulator + currentValue, 0);

console.log(sum);   // 10
```

reduce 메서드의 콜백함수는 4개의 인수를 전달받아 배열의 length만큼 총 4회 호출

![Untitled](reduce%EC%BD%9C%EB%B0%B1%ED%95%A8%EC%88%98%EC%9D%B8%EC%88%98.PNG)

reduce 메서드는 초기값과 배열의 첫번째 요소값을 콜백함수에게 인수로 전달하면서 호출하고 

다음 순회에는 콜백함수의 반환값과 두번째 요소값을 콜백함수의 인수로 전달하면서 호출

→ 이 과정을 계속 반복하여 **reduce 메서드는 하나의 결과값 반환**

<br>

reduce 메서드는 자신을 호출한 배열의 모든 요소를 순회하며 하나의 결과값을 구해야하는 경우에 사용

<br>

### 평균 구하기

```jsx
const values = [1, 2, 3, 4, 5, 6];

const average = values.reduce((acc, cur, i, {length}) => {
	// 마지막 순회가 아니면 누적값을 반환
	// 마지막 순회면 누적값으로 평균을 구해 반환
	return i === length - 1 ? (acc + cur) / length : acc + cur;
}, 0);

console.log(average);  // 3.5
```

<br>

### 최대값 구하기

```jsx
const values = [1, 2, 3, 4, 5];

const max = values.reduce((acc, cur) => (acc > cur ? acc : cur), 0);
console.log(max);  // 5
```

사실 최대값을 구할때에는 reduce 메서드보다 Math.max 메서드를 사용하는것이 더 좋다.

<br>

### 요소의 중복 횟수 구하기

```jsx
const fruits = ['banana', 'apple', 'orange', 'orange', 'apple'];

const count = fruits.reduce((acc, cur) => {
	// 첫번째 순회시 acc는 초기값인 {}, cur은 첫번째 요소인 'banana'
	// 초기값으로 전달받은 빈 객체에 요소값인 cur을 프로퍼티 키로,
	// 요소의 개수를 프로퍼티 값으로 할당
	// 만약 프로퍼티 값이 undefined(처음 등장하는 요소)이면 프로퍼티 값을 1로 초기화
	acc[cur] = (acc[cur] || 0) + 1;
	return acc;
}, {});

// 콜백함수는 총 5번 호출되고 다음과 같은 결과값 반환
/*
{banana: 1}
{banana: 1, apple: 1}
{banana: 1, apple: 1, orange: 1}
{banana: 1, apple: 1, orange: 2}
{banana: 1, apple: 2, orange: 1}
*/
```

<br>

### 중첩 배열 평탄화

```jsx
const values = [1, [2,3], 4, [5,6]];

const flatten = values.reduce((acc, cur) => acc.concat(cur), []);
/*
[1]
[1, 2, 3]
[1, 2, 3, 4]
[1, 2, 3, 4, 5, 6]
*/
```

중첩배열을 평탄화할때는 `Array.prototype.flat` 메서드를 사용하는것이 더 좋다

<br>

### 중복 요소 제거

```jsx
const values = [1,2,1,3,5,4,5,3,4,4];

const result = values.reduce(
	(unique, val, i, _values) =>
	// 현재 순회 중인 요소가 인덱스 i가 val의 인덱스와 같다면 val은 처음 순회하는 요소
	// 현재 순회 중인 요소의 인덱스 i가 val의 인덱스와 다르다면 val은 중복된 요소
	// 처음 순회하는 요소만 초기값 []가 전달된 unique 배열에 담아 반환하면 중복된 요소는 제거됨
	_values.indexOf(val) === i ? [...unique, val] : unique,
	[]
);

console.log(result);   // [1,2,3,5,4]
```

중복 제거시에는 reduce 보다는 filter가 더 적합

<br>

!!!! **항상 reduce 메서드를 호출할때는 초기값을 전달하는 것이 안전** !!!!

<br>
<br>

## `arr.some();`

- 자신을 호출한 배열의 요소를 순회하면서 인수로 전달된 콜백함수 호출
- 콜백 함수의 반환값이 단 한번이라도 참이면 true, 모두 거짓이면 false 반환
- some 메서드의 콜백 함수는 some 메서드를 호출한 요소값과 인덱스, some 메서드를 호출한 배열 자체, this를 순차적으로 전달받을 수 있다.
- 두번째 인수로 some 메서드의 콜백 함수 내부에서 this로 사용할 객체를 전달할 수 있다
- 화살표 함수를 사용하는것이 더 좋다.

```jsx
console.log([5, 10, 15].some(item => item > 10))    // true
console.log([5, 10, 15].some(item => item < 1))     // false

// 배열의 요소 중 찾는 단어가 1개 이상 존재하는지 확인
console.log(['abc', 'def', 'ghi'].some(item => item === 'abc'))     // true

// 빈 배열은 항상 false 반환
console.log([].some(item => item > 1))      // false
```

<br>

<br>



## `arr.every`

- 자신을 호출한 배열의 요소를 순회하면서 인수로 전달된 콜백 함수를 호출
- 콜백 함수의 반환값이 모두 참이면 true, 단 한번이라도 거짓이면 false 반환
- 배열의 모든 요소가 콜백 함수를 통해 정의한 조건을 모두 만족하는지 확인하여 그 결과를 불리언 타입으로 반환
- every 메서드를 호출한 배열이 빈 배열인 경우 항상 true 반환
- every 메서드의 콜백함수는 every 메서드를 호출한 요소값과 인덱스, every 메서드를 호출한 배열 자체 this를 순차적으로 전달받을 수 있다
- 두번째 인수로 every 메서드의 콜백 함수 내부에서 this로 사용할 객체를 전달할 수 있다
- 화살표 함수를 사용하는 것이 더 좋다

```jsx
console.log([5,10,15].every(item => item > 3))      // true
console.log([5,10,15].every(item => item > 10))     // false

console.log([].every(item => item > 3))             // true
```

<br>

<br>

## `arr.find`

- 자신을 호출한 배열의 요소를 순회하면서 인수로 전달된 콜백함수를 호출하여 반환값이 true인 첫번째 요소를 반환
- 콜백 함수의 반환값이 true인 요소가 존재하지 않는다면 undefined 반환
- find메서드를 호출한 요소값과 인덱스, find 메서드를 호출한 배열 자체 this를 순차적으로 전달받는다.
- 두번째 인수로 find 메서드의 콜백함수 내부에서 this로 사용할 객체 전달
- 화살표 함수 사용하는것이 더 좋다

```jsx
const users = [
    { id: 1, name: 'Lee'},
    { id: 2, name: 'kim'},
    { id: 4, name: 'park'},
    { id: 3, name: 'choi'},
    { id: 3, name: 'kwon'}
]

console.log(users.find(user => user.id === 2))      //     { id: 2, name: 'kim'}
console.log(users.find(user => user.id === 3))      //     { id: 3, name: 'choi'}
```

콜백 함수의 반환값이 true인 첫번째 요소를 반환하므로 결과값이 해당 요소값이다.

<br>

<br>

## `arr.findIndex`

- 자신을 호출한 배열의 요소를 순회하면서 인수로 전달된 콜백 함수를 호출하여 반환값이 true인 첫번째 요소의 인덱스를 반환
- 콜백 함수의 반환값이 true 인 요소가 존재하지 않으면 -1 반환
- findIndex 메서드를 호출한 요소값과 인덱스, findIndex 메서드를 호출한 배열 자체 this를 순차적으로 전달받는다
- 두번째 인수로 findIndex 메서드의 콜백함수 내부에서 this로 사용할 객체를 전달 가능
- 화산표 함수 사용하는 것이 더 좋다.

```jsx
const users = [
    { id: 1, name: 'Lee'},
    { id: 2, name: 'kim'},
    { id: 4, name: 'park'},
    { id: 3, name: 'choi'},
    { id: 3, name: 'kwon'}
]

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
```

<br>

<br>

## `arr.flatMap`

- map 메서드를 통해 생성된 새로운 배열을 평탄화
- map 메서드와 flat 메서드를 순차적으로 실행하는 효과가 있다.

```jsx
const arr = ['hello', 'world'];

// map과 flat 순차적으로 실행
console.log(arr.map(x => x.split('')).flat())
// [ 'h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd' ]

// flatMap은 map을 통해 생성된 새로운 배열을 평탄화 한다.
console.log(arr.flatMap(x => x.split('')));
// [ 'h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd' ]
```

- flat 메서드처럼 인수를 전달하여 평탄화 깊이를 지정할 수는 없고 1단계만 평탄화한다
- map 메서드를 통해 생성된 중첩 배열의 평탄화 깊이를 지정해야 한다면 flatMap 메서드를 사용하지 않고 map과 flat을 각각 호출한다.

```jsx
// 1단계만 평탄화하는 flatMap
console.log(arr.flatMap((str, index) => [index, [str, str.length]]))
// [ 0, [ 'hello', 5 ], 1, [ 'world', 5 ] ]

// 평탄화 깊이를 지정해야하면 map과 flat 메서드 각각 호출하기
console.log(arr.map((str, index) => [index, [str, str.length]]).flat(2))
// [ 0, 'hello', 5, 1, 'world', 5 ]
```