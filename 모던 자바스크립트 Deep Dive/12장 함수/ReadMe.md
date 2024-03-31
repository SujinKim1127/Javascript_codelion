# 함수

- 일련의 과정을 statement로 구현하고 코드 블록으로 감싸서 하나의 실행 단위로 정의한 것
- 매개변수: 함수 내부로 입력을 전달 받는 변수
- 인수: 입력
- 반환값: 출력

## 함수를 사용하는 이유

코드 재사용 측면에서 매우 유용하다

**코드의 중복을 억제하고 재사용성을 높이는 함수**

- 유지보수 편의성 ⬆️
- 코드의 신뢰성 ⬆️

적절한 함수 이름을 사용하여 **코드의 가독성**을 향상시키자

## 함수 리터럴

함수 이름

- 식별자이므로 네이밍 규칙 준수
- 함수 몸체 내에서만 참조할 수 있는 식별자
- 생략 가능
- 가명 함수(이름 O)
- 무명/익명 함수(이름 X)

매개변수 목록

- 함수 호출 시 지정한 인수가 순서대로 할당
- 함수 몸체 내에서 변수와 동일하게 취급
- 식별자 네이밍 규칙 준수

함수 몸체

- 함수 호출에 의해 실행

> 자바스크립트 함수는 **일급 객체**다

### 함수 표현식

기명함수 표현식

```jsx
var add = function foo(x, y) {
  return x + y;
};

// 함수 객체를 가리키는 식별자로 호출
console.log(add(2, 5)); // 7

// 함수 이름으로 호출하면 ReferenceError가 발생한다.
// 함수 이름은 함수 몸체 내부에서만 유효한 식별자다.
console.log(foo(2, 5)); // ReferenceError: foo is not defined
```

함수를 호출할 때는 함수 이름이 아니라 함수 객체를 가리키는 식별자를 호출하기

→ 함수 이름은 함수 몸체 내부에서만 유효한 식별자

### 함수 생성 시점과 함수 호이스팅

```jsx
// 함수 참조
console.dir(add); //  add(x, y)
console.dir(sub); // undefined

// 함수 호출
console.log(add(2, 5)); // 7
console.log(sub(2, 5)); // TypeError: sub is not a function

// 함수 선언문
function add(x, y) {
  return x + y;
}

// 함수 표현식
var sub = function (x, y) {
  return x - y;
};
```

→ 함수 선언문으로 정의한 함수는 함수 선언문 이전에 호출 가능

→ 함수 **표현식**으로 정의한 함수는 함수 표현식 이전에 호출 불가능

> 함수 선언문으로 정의한 함수와 함수 표현식으로 정의한 함수 생성 시점이 다르기 때문

**함수 호이스팅**

: 함수 선언문이 코드의 선두로 끌어 올려진 것처럼 동작하는 자바스크립트 고유의 특징

> 함수 표현식으로 함수를 정의하면 변수 호이스팅 발생 (함수 호이스팅 x)

표현식으로 정의할 경우에는 반드시 표현식 이후에 함수 참조 및 호출

## 함수 호출

### 매개변수의 최대 개수

- 매개변수는 최대 3개 이상을 넘지 않는 것을 권장
- 3개 이상 필요할경우 하나의 매개변수를 선언하고 객체를 인수로 전달하는 것이 좋다

### 반환문

- 함수의 실행을 중단하고 함수 몸체를 빠져나간다
  - 반환문 이후의 statement는 실행되지 않고 무시된다
- return 키워드 뒤에 오는 표현식을 평가해 반환한다
  - 반환값으로 사용할 표현식을 명확하게 지정하지 않으면 undefined 반환

## 참조에 의한 전달과 외부 상태의 변경

타입에 따라 값에 의한 전달, 참조에 의한 전달 방식을 그대로 따른다

```jsx
// 매개변수 primitive는 원시 값을 전달받고, 매개변수 obj는 객체를 전달받는다.
function changeVal(primitive, obj) {
  primitive += 100;
  obj.name = "Kim";
}

// 외부 상태
var num = 100;
var person = { name: "Lee" };

console.log(num); // 100
console.log(person); // {name: "Lee"}

// 원시 값은 값 자체가 복사되어 전달되고 객체는 참조 값이 복사되어 전달된다.
changeVal(num, person);

// 원시 값은 원본이 훼손되지 않는다.
console.log(num); // 100

// 객체는 원본이 훼손된다.
console.log(person); // {name: "Kim"}
```

원시값에는 값 자체가 복사되어 전달 → 원본 훼손 X

객체 타입 인수에는 참조 값 복사 → 원본 훼손 O

⇒ 함수가 외부 상태를 변경하면 상태 변화를 추적하기 어렵다

## 즉시 실행 함수

함수 정의와 동시에 즉시 호출되는 함수

단 한번만 호출되며 다시 호출 불가능

```jsx
(function () {
  var a = 3;
  var b = 5;
  return a * b;
})();
```

즉시 실행 함수는 함수 이름이 없는 익명 함수를 사용하는 것이 일반적

<br>

## 콜백 함수

어떤 일을 반복 수행하는 repeat 함수

```jsx
// n만큼 어떤 일을 반복한다
function repeat(n) {
  // i를 출력한다.
  for (var i = 0; i < n; i++) console.log(i);
}

repeat(5); // 0 1 2 3 4
```

<br>

함수의 변하지 않는 공통 로직은 미리 정의해두고, 경우에 따라 변경되는 로직은 추상화해서 함수 외부에서 함수 내부로 전달하기

```jsx
// 외부에서 전달받은 f를 n만큼 반복 호출
function repeat(n, f) {
  for (var i = 0; i < n; i++) {
    f(i); // i를 전달하면서 f를 호출
  }
}

var logAll = function (i) {
  console.log(i);
};

// 반복 호출할 함수를 인수로 전달
repeat(5, logAll); // 0 1 2 3 4
```

→ `logAll` 을 `function (i)` 으로 정의 하고 `repeat(n,f)` 안에서 `f(i)` 라고 했으므로 `repeat(5, logAll)` 을 하면 제대로 출력이 되는것.

```jsx
var logOdds = function (i) {
  if (i % 2) console.log(i);
};

// 반복 호출할 함수를 인수로 전달
repeat(5, logOdds); // 1 3
```

`repeat` 함수는 경우에 따라 변경되는 일을 함수 `f` 로 추상화했고 이를 외부에서 전달받음 → 유연한 구조

<br>

**콜백함수**: 함수의 매개변수를 통해 다른 함수의 내부로 전달되는 함수

**고차함수:** 매개변수를 통해 함수의 외부에서 콜백 함수를 전달받은 함수

콜백 함수도 고차 함수에 전달되어 헬퍼 함수의 역할을 한다.

콜백 함수는 함수 외부에서 고차 함수 내부로 주입하기 때문에 자유롭게 교체할 수 있다는 장점. → **고차함수는 콜백함수를 자신의 일부분으로 합성**

고차함수는 매개변수를 통해 전달받은 콜백함수의 호출 시점을 결정해서 호출

→ 콜백 함수는 고차함수에 의해 호출되며, 이때 고차 함수는 필요에 따라 콜백 함수에 인수를 전달할 수 있다.

고차함수에 콜백함수를 전달할 때 콜백함수를 호출하지 않고 함수 자체를 전달해야 함

<br>

```jsx
// 익명 함수 리터럴을 콜백 함수로 고차 함수에 전달
// 익명 함수 리터럴은 repeat 함수를 호출할 때마다 평가되어 함수 객체를 생성
repeat(5, function (i) {
  if (i % 2) console.log(i);
}); // 1 3
```

→ 이때 콜백함수로서 전달된 함수 리터럴은 고차함수가 호출될때마다 평가되어 함수 객체를 생성

콜백함수를 다른 곳에서도 호출할 필요가 있거나, 콜백함수를 전달받는 함수가 자주 호출되면, 함수 외부에서 콜백 함수를 정의한 후 함수 참조를 고차함수에 전달하는것이 효율적.

<br>

```jsx
// logOdds 함수는 단 한번만 생성됨
var logOdds = function (i) {
  if (i % 2) console.log(i);
};

// 고차함수에 함수 참조를 전달
repeat(5, logOdds); // 1 3
```

→ `logOdds` 함수는 단 한번만 생성됨

콜백함수를 익명함수 리터럴로 정의하면서 바로 고차함수에 전달하면 고차함수가 호출될때마다 콜백함수 생성.

<br>

콜백함수는 비동기 처리(이벤트 처리, Ajax 통신, 타이머 함수 등)에 활용됨

```jsx
// 콜백함수를 사용한 이벤트 처리
// myButton 버튼을 클릭하면 콜백함수를 실행한다.
document.getElementById("myButton").addEventListener("click", function () {
  console.log("button clicked!");
});

// 콜백함수를 사용한 비동기 처리
// 1초 후에 메시지 출력
setTimeout(function () {
  console.log("1초 경과");
}, 1000);
```

<br>

배열 고차함수에서 사용되는 콜백함수

```jsx
// 콜백 함수를 사용하는 고차 함수 map
var res = [1, 2, 3].map(function (item) {
  return item * 2;
});
console.log(res); // [2, 4, 6]

// 콜백 함수를 사용하는 고차 함수 filter
res = [1, 2, 3].filter(function (item) {
  return item % 2;
});
console.log(res); // [1, 3]

// 콜백함수를 사용하는 고차 함수 reduce
res = [1, 2, 3].reduce(function (acc, cur) {
  return acc + cur;
}, 0);
console.log(res); // 6
```

### 순수 함수와 비순수 함수

|                | 순수 함수 | 비순수 함수 |
| -------------- | --------- | ----------- |
| 외부 상태 의존 | X         | O           |
| 외부 상태 변경 | X         | O           |
| 부수효과       | X         | O           |

**순수 함수**

- 동일한 인수가 전달되면 동일한 값을 반환
- 오직 매개변수를 통해 함수 내부로 전달된 인수에게만 의존해 값을 생성해 반환
- 인수의 불변성 유지

```jsx
var count = 0; // 현재 카운트를 나타내는 상태

// 순수 함수 increase는 동일한 인수가 전달되면 언제나 동일한 값을 반환한다.
function increase(n) {
  return ++n;
}

// 순수 함수가 반환한 결과값을 변수에 재할당해서 상태를 변경
count = increase(count);
console.log(count); // 1

count = increase(count);
console.log(count); // 2
```

**비순수 함수**

```jsx
var count = 0; // 현재 카운트를 나타내는 상태: increase 함수에 의해 변화한다.

// 비순수 함수
function increase() {
  return ++count; // 외부 상태에 의존하며 외부 상태를 변경한다.
}

// 비순수 함수는 외부 상태(count)를 변경하므로 상태 변화를 추적하기 어려워진다.
increase();
console.log(count); // 1

increase();
console.log(count); // 2
```

인수를 전달받지 않고 함수 내부에서 외부 상태를 직접 참조 → 외부 상태 의존

상태 변화를 추적하기 어려우므로 순수 함수 사용하기
