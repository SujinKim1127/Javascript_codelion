# 22장 `this`

```jsx
function Circle(radius) {
	// 이 시점에는 생성자 함수 자신이 생성할 인스턴스를 가리키는 식별자 알 수 X
	????.radius = radius;
}

Circle.protype.getDiameter = function() {
	// 이 시점에는 생성자 함수 자신이 생성할 인스턴스를 가리키는 식별자를 알 수 X
	return 2 * ????.radius;
};

// 생성자 함수로 인스턴스를 생성하려면 먼저 생성자 함수 정의 필요
const circle = new Circle(5);
```

→ 생성자 함수로 인스턴스를 생성하려면 먼저 생성자 함수가 존재해야 한다.

생성자 함수를 정의하는 시점에는 아직 인스턴스를 생성하기 이전이므로 생성자 함수가 생성할 인스턴스를 가리키는 식별자를 알 수 없으므로 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 `this` 식별자 필요

 **`this`는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수(self-referencing variable)다. `this`를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.** 

`this`는 JS엔진에 의해 암묵적으로 생성됨

```jsx
// 객체 리터럴
const circle = {
	radius: 5,
	getDiameter() {
		// this는 메서드를 호출한 객체(circle)를 가리킴
		return 2 * this.radius;
	}
};

console.log(circle.getDiameter());   // 10
```

```jsx
// 생성자 함수
function Circle(radius) {
	// this는 생성자 함수가 생성할 인스턴스를 가리킴
	this.radius = radius;
}

Circle.protype.getDiameter = function() {
	// this는 생성자 함수가 생성할 인스턴스를 가리킴
	return 2 * this.radius;
};

// 인스턴스 생성
const circle = new Circle(5);
console.log(circle.getDiameter()); // 10
```

```jsx
// this는 어디서든지 참조 가능
// 전역에서의 this는 전역 객체 window
console.log(this);   // window

function square(number) {
  // 일반 함수 내부에서 this는 전역 객체 window를 가리킴
  console.log(this);   // window
  return number * number;
}
square(2);

const person = {
    name: 'LEE',
    getName() {
        // 메서드 내부에서 this는 메서드를 호출한 객체
        console.log(this);   // {name: "LEE", getName: f}
        return this.name;
    }
};
console.log(person.getName());  // LEE

function Person(name) {
    this.name = name;
    // 생성자 함수 내부에서 this는 생성자 함수가 생성할 인스턴스를 가리킴
    console.log(this);  // Person {name: "Lee"}
}

const me = new Person("LEE");
```

<br>


## 함수 호출 방식

this 바인딩(this에 바인딩될 값)은 함수 호출 방식, 즉 함수가 어떻게 호출되었는지에 따라 동적으로 결정됨

함수 호출 방식

1. 일반 함수 호출
2. 메서드 호출
3. 생성자 함수 호출
4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출

```jsx
// this 바인딩은 함수 호출 방식에 따라 동적으로 결정됨
const foo = function () {
    console.dir(this);
};

// 동일한 함수도 다양한 방식으로 호출 가능

/**
 * 1. 일반 함수 호출
 * foo 함수를 일반적인 방식으로 호출
 * foo 함수 내부의 this는 전역 객체 window를 가리킴
 */
foo();      // window

/**
 * 2. 메서드 호출
 * foo 함수를 프로퍼티 값으로 할당하여 호출
 * foo 함수 내부의 this는 메서드를 호출한 객체 obj를 가리킴
 */
const obj = { foo };
obj.foo();  // obj

/**
 * 3. 생성자 함수 호출
 * foo 함수를 new 연산자와 함께 생성자 함수로 호출
 * foo 함수 내부의 this는 생성자 하무가 생성한 인스턴스를 가리킴
 */
new foo();  // foo {}

/**
 * 4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출
 * foo 함수 내부의 this는 인수에 의해 결정됨
 */
const bar = { name: 'bar' };

foo.call(bar);      // bar
foo.apply(bar);     // bar
foo.bind(bar)();    // bar
```

<br>


## 1. 일반 함수 호출

기본적으로 this에는 전역 객체(global object)가 바인딩됨

```tsx
function foo() {
	console.log("foo's this: ", this);    // window
	function bar() {
		console.log("bar's this:", this);   // window
	}
	bar();
}
foo();
```

중첩 함수를 **일반 함수로 호출하면 함수 내부의 this에는 전역 객체가 바인딩** 됨

하지만 객체를 생성하지 않는 일반 함수에서 this는 의미X

<br>



strict mode가 적용되면 this에는 `undefined`가 바인딩된다. ⬇️

```tsx
function foo() {
	'use strict';
	
	console.log("foo's this: ", this);   // undefined
	
```

<br>

메서드 내에서 정의한 중첩 함수도 일반 함수로 호출되면 

중첩 함수 내부의 this에는 전역객체가 바인딩됨 ⬇️

```tsx
// var 키워드로 선언한 전역변수 value는 전역 객체의 프로퍼티
var value = 1;
// const 키워드로 선언한 전역 변수 value는 전역 객체의 프로퍼티X

const obj = {
	value: 100,
	foo() {
		console.log("foo's this: ", this);   // {value: 100, foo: f}
		console.log("foo's this.value: ", this);  // 100

		// 메서드 내에서 정의한 중첩 함수
		function bar() {
			console.log("bar's this: ", this);  // window
			console.log("bar's this.value: ", this.value); // 1
		}

		// 메서드 내에서 정의한 중첩 함수도 일반 함수로 호출되면 
		// 중첩 함수 내부의 this에는 전역객체가 바인딩
		bar();
	}
};

obj.foo();
```

<br>


콜백 함수가 일반함수로 호출되면 콜백 함수 내부의 this에도 전역객체가 바인딩

어떠한 함수라도 일반 함수로 호출되면 this에 전역 객체 바인딩 ⬇️

```tsx
var value = 1;

const obj = {
	value: 100,
	foo() {
		console.log("foo's this: ", this);   // {value: 100, foo: f}
			// 콜백 함수 내부의 this에는 전역 객체가 바인딩 됨
		setTimeout(function () {
			console.log("callback's this: ", this);  // window
			console.log("callback's this.value: ", this.value);  // 1
		}, 100);
	}
};

obj.foo();
```

→ 일반 함수로 호출된 모든 함수(중첩 함수, 콜백 함수 포함) 내부의 this에는 전역 객체 바인딩

메서드 내부에서 `setTimeout` 함수에 전달된 콜백 함수의 this에는 전역객체 바인딩

따라서 `this.value`는 obj 객체의 value 프로퍼티가 아닌 전역 객체의 value(= `window.value` )

`var` 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 되므로

<br>


메서드 내부의 중첩 함수나 콜백 함수의 this 바인딩을 메서드의 this 바인딩과 일치시키기 위한 방법 ⬇️

```jsx
var value = 1;

const obj = {
	value: 100,
	foo() {
			// this 바인딩(obj)을 변수 that에 할당
		const that = this;

			// 콜백 함수 내부에서 this 대신 that을 참조
		setTimeout(function () {
			console.log(that.value);  // 100
		}, 100);
	}
};

obj.foo();
```

<br>

`this` 를 명시적으로 바인딩할 수 있는 `apply` `call` `bind` 메서드 제공

```jsx
var value = 1;

const obj = {
	value: 100,
	foo() {
			// 콜백 함수에 명시적으로 this를 바인딩
		setTimeout(function () {
			console.log(this.value);  // 100
		}.bind(this), 100);
	}
};

obj.foo();
```

<br>

화살표 함수 사용해서 `this` 바인딩 일치시키기

```jsx
var value = 1;

const obj = {
	value: 100,
	foo() {
			// 화살표 함수 내부의 this는 상위 스코프의 this를 가리킨다
		setTimeout(() => console.log(this.value), 100);  // 100
	}
};

obj.foo();
```