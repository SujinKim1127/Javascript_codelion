## 객체란?

원시 값: 변경 불가능한 값

객체: 변경 가능한 값

- 0개 이상의 프로퍼티로 구성된 집합
- 프로퍼티는 키(key)와 값(value)으로 구성

프로퍼티: 객체의 상태를 나타내는 값

메서드: 프로퍼티를 참조하고 조작할 수 있는 동작

## 객체 리터럴에 의한 객체 생성

다양한 객체 생성 방법

- 객체 리터럴
- Object 생성자 함수
- 생성자 함수
- Object.create 메서드
- 클래스(ES6)

```jsx
var person = {
	name: 'Lee',
	sayHello: function () {
		console.log(Hello! My name is ${this.name}.);
	}
};

console.log(typeof person); // object
console.log(person); // {name: "Lee", sayHello: }
```

객체 리터럴은 중괄호 내 0개 이상의 프로퍼티 정의

## 프로퍼티

객체는 프로퍼티의 집합이며, 프로퍼티는 키와 값으로 구성된다

식별자 네이밍 규칙을 따르지 않는 이름에는 반드시 따옴표 사용하기

→ 가급적 식별자 네이밍 규칙을 준수하는 프로퍼티 키 사용!!

```jsx
var person = {
  firstName: "Ung-mo", // 식별자 네이밍 규칙을 준수하는 프로퍼티 키
  "last-name": "Lee", // 식별자 네이밍 규칙을 준수하지 않는 프로퍼티 키
};

console.log(person); // {firstName: "Ung-mo", last-name: "Lee"}
```

## 메서드

js 함수는 일급 객체, 프로퍼티 값으로 사용 가능

프로퍼티의 값이 함수일 경우 일반 함수와 구분하기 위해 **메서드**라 부른다

## 프로퍼티 접근

마침표 표기법: 접근 연산자 . 사용

대괄호 표기법: 접근 연산자 [ … ] 사용

```jsx
var person = {
	name: 'Lee'
};

// 마침표 표기법에 의한 프로퍼티 접근
console.log(person.name); // Lee

// 대괄호 표기법에 의한 프로퍼티 접근
console.log(person['name']); // Lee

// 프로퍼티 값 갱신
[persone.name](http://persone.name) = ‘Kim’;

// 프로퍼티 동적 생성
person.age = 20;

// 프로퍼티 삭제
delete person.age;
```

## ES6에 추가된 객체 리터럴의 확장 기능

### 프로퍼티 축약 표현

```jsx
let x = 1,
  y = 2;

// 프로퍼티 축약 표현
const obj = { x, y };

console.log(obj); // {x: 1, y: 2}
```

### 메서드 축약 표현

```jsx
// ES6
const obj = {
  name: "Lee",
  // 메서드 축약 표현
  sayHi() {
    console.log("Hi! " + this.name);
  },
};

obj.sayHi(); // Hi! Lee
```
