# 21장 빌트인 객체

## 자바스크립트 객체의 분류

- 표준 빌트인 객체
  - ECMAScript 사양에 정의된 객체
  - ECMAScript
    : ECMA 기관이 만든 script 언어
    ES6 표준을 따른다 = ECMAScript 2015가 사용중인 ECMA 규격을 따른다 = ECMAScript 2015와 동일한 문법을 사용한다
    ES6 = ECMAScript 2015
  - 애플리케이션 전역의 공통 기능 제공
  - 자바스크립트 실행 환경과 관계없이 언제나 사용 가능
  - 전역 객체 프로퍼티로서 제공
  - 전역 변수처럼 언제나 참조 가능
- 호스트 객체
  - ECMAScript 사양에 정의 X
  - 자바스크립트 실행 환경에서 추가로 제공하는 객체
- 사용자 정의 객체
  - 사용자가 직접 정의한 객체
  - 기본 제공 객체 X

## 표준 빌트인 객체

- Object, String, Number, Boolean, Symbol, Date, Math, RegExp, Array, Map/Set, WeakMap/WeakSet, Function, Promise, Reflect, Proxy, JSON, Error 등 40여 개의 표준 빌트인 객체 제공
- Math, Reflect, JSON을 제외한 표준 빌트인 객체는 모두 인스턴스 생성 가능한 생성자 함수 객체

```jsx
const strObj = new String("Kim"); // String {"Kim"}
console.log(typeof strObj); // object

Object.getPrototypeOf(strObj) === String.prototype;
```

생성자 함수인 표준 빌트인 객체가 생성한 인스턴스의 프로토타입

= 표준 빌트인 객체의 prototype 프로퍼티에 바인딩된 객체

## 원시값과 래퍼 객체

문자열이나 숫자, 불리언 등의 원시값이 있는데도 문자열, 숫자, 불리언 객체를 생성하는 String, Number, Boolean 등의 표준 빌트인 생성자 함수가 존재하는 이유는?

```jsx
const str = "hello";

// 원시 타입인 문자열이 프로퍼티와 메서드를 갖고 있는 객체처럼 동작한다.
console.log(str.length); // 5
console.log(str.toUpperCase()); // HELLO
```

원시값을 객체처럼 사용하면 자바스크립트 엔진은 암묵적으로 연관된 객체를 생성하여 생성된 객체로 프로퍼티에 접근하거나 메서드를 호출하고 다시 원시값으로 되돌린다

이때 생성되는 임시 객체 = **래퍼 객체**

```jsx
// 1 식별자 str은 문자열을 값으로 가지고 있다.
const str = "hello";

// 2 식별자 str은 암묵적으로 생성된 래퍼 객체를 가리킨다.
// 식별자 str의 값 'hello'는 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된다.
// 래퍼 객체에 name 프로퍼티가 동적 추가된다.
str.name = "Lee";

// 3 식별자 str은 다시 원래의 문자열, 즉 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된 원시값을 갖는다.
// 이때 2 에서 생성된 래퍼 객체는 아무도 참조하지 않는 상태이므로 가비지 컬렉션의 대상이 된다.

// 4 식별자 str은 새롭게 암묵적으로 생성된(2에서 생성된 래퍼 객체와는 다른) 래퍼 객체를 가리킨다.
// 새롭게 생성된 래퍼 객체에는 name 프로퍼티가 존재하지 않는다.
console.log(str.name); // undefined

// 5 식별자 str은 다시 원래의 문자열, 즉 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된 원시값을 갖는다.
// 이때 4에서 생성된 래퍼 객체는 아무도 참조하지 않는 상태이므로 가비지 컬렉션의 대상이 된다.
console.log(typeof str, str); // string hello
```

## 전역 객체

- 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 어떤 객체보다도 **먼저 생성**되는 특수한 객체
- 어떤 객체에도 속하지 않는 (모든 빌트인 객체의) **최상위** 객체
- 개발자가 의도적으로 생성 불가능
  - 전역 객체를 생성할 수 있는 생성자 함수 제공 X
- 전역 객체의 프로퍼티를 참조할 때 window 생략 가능

```jsx
// var 키워드로 선언한 전역 변수
var foo = 1;
console.log(window.foo); // 1

// 선언하지 않은 변수에 값을 암묵적 전역.
// bar는 전역 변수가 아니라 전역 객체의 프로퍼티다.
bar = 2; // window.bar = 2
console.log(window.bar); // 2

// 전역 함수
function baz() {
  return 3;
}
console.log(window.baz()); // 3
```

let이나 const로 선언한 전역변수는 전역 객체 프로퍼티 X

### 암묵적 전역

```jsx
// 전역 변수 x는 호이스팅이 발생한다.
console.log(x); // undefined

// 전역 변수가 아니라 단지 전역 객체의 프로퍼티인 y는 호이스팅이 발생하지 않는다.
console.log(y); // ReferenceError: y is not defined

var x = 10; // 전역 변수

function foo() {
  // 선언하지 않은 식별자에 값을 할당
  y = 20; // window.y = 20;
}
foo();

// 선언하지 않은 식별자 y를 전역에서 참조할 수 있다.
console.log(x + y); // 30
```

y = 20을 window.y=20 으로 해석하여 **전역 객체에 프로퍼티**를 동적 생성

→ y는 전역 객체의 프로퍼티가 되어 전역 변수처럼 동작 = 암묵적 전역

y는 변수가 아니므로 변수 호이스팅 발생 X

y는 프로퍼티라서 delete 연산자로 삭제 가능

전역변수는 프로퍼티지만 delete로 삭제 불가능
