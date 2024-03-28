# 09장 타입 변환과 단축 평가

## 암묵적 타입 변환

(= 타입 강제 변환)

표현식을 평가하는 도중에 자바스크립트 엔진에 의해 암묵적으로 타입이 자동 변환되는 것

```jsx
// 피연산자가 모두 문자열 타입이어야 하는 문맥
"10" + 2; //  '102'

// 피연산자가 모두 숫자 타입이어야 하는 문맥
5 * "10"; //  50

// 피연산자 또는 표현식이 불리언 타입이어야 하는 문맥
!0; //  true
if (1) {
}
```

`false`로 평가되는 Falsy 값

: false, undefined, null, 0.-0, NaN, ‘’ (빈 문자열)

## 명시적 타입 변환

(= 타입 캐스팅)

개발자가 의도적으로 값의 타입을 변환하는 것

### 문자열 타입으로 변환

1. String 생성자 함수를 new 연산자 없이 호출: `String( ~~~ )`
2. Object.prototype.toString 메서드를 사용하는 방법: `( ~~ ).toString()`
3. 문자열 연결 연산자를 이용하는 방법: `~~ + ‘ ‘`

### 숫자 타입으로 변환

1. Number 생성자 함수 new 연산자 없이 호출: `Number( ~~ )`
2. parseInt, parseFloat 함수를 사용하는 방법 (문자열만 숫자 타입으로 변환 가능)
   - `parseInt(’ ~ ‘)`
   - `parseFloat(’ ~ ‘)`
3. ‘ + ‘ 단항 산술 연산자를 사용하는 방법
   - `+ ‘0’` → 0
   - `+true` → 1
4. ‘ \* ‘ 단항 산술 연산자를 사용하는 방법
   - `‘0’ * 1` → 0
   - `true * 1` → 1

### 불리언 타입으로 변환

1. Boolean 생성자 함수를 new 연산자 없이 호출하는 방법: `Boolean( ~~~ )`
2. ! 부정 논리 연산자를 두 번 사용하는 방법: `!!~~~`

## 단축 평가

### 논리 연산자를 사용한 단축 평가

```jsx
"Cat" && "Dog"; // -> "Dog"
```

논리곱(`&&`) 연산자는 좌항에서 우항으로 평가 진행

→ 좌,우항 둘다 true 일 경우 논리 연산의 결과를 결정하는 두번째 피 연산자 값 반환

```jsx
"Cat" || "Dog"; // -> "Cat"
```

논리합(`||`) 연산자도 좌항에서 우항으로 평가 진행

→ 논리 연산의 결과를 결정하는 첫번째 피연산자 cat을 그대로 반환

| 표현식            | 평가 결과 |
| ----------------- | --------- | -------- | -------- |
| true              |           | anything | true     |
| false             |           | anything | anything |
| true && anything  | anything  |
| false && anything | false     |

> 단축 평가를 사용하면 if 문을 대체할 수 있다

```jsx
// 주어진 조건이 true일 때
if (done) message = "완료";

// if 문은 단축 평가로 대체 가능하다.
// done이 true라면 message에 '완료'를 할당
message = done && "완료";
```

```jsx
// 주어진 조건이 false일 때
if (!done) message = "미완료";

// if 문은 단축 평가로 대체 가능하다.
// done이 false라면 message에 '미완료'를 할당
message = done || "미완료";
```

삼항 조건 연산자로 if...else 문을 대체할 수 있다.

```jsx
if (done) message = "완료";
else message = "미완료";

// if...else 문은 삼항 조건 연산자로 대체 가능하다.

message = done ? "완료" : "미완료";
console.log(message); // 완료
```

### 변수가 `null` 또는 `undefined`가 아닌지 확인하고 프로퍼티를 참조할 때

변수에 `null` 또는 `undefined`인 경우 객체의 프로퍼티를 참조하면 TypeError 발생

```jsx
var elem = null;
var value = elem.value; // TypeError: Cannot read property 'value' of null

// 단축 평가 사용
var elem = null;
// elem이 null이나 undefined와 같은 Falsy 값이면 elem으로 평가되고
// elem이 Truthy 값이면 elem.value로 평가된다.
var value = elem && elem.value; //  null
```

### 옵셔널 체이닝 연산자 `?.`

좌항의 피연산자가 null 또는 undefined인 경우 undefined를 반환하고, 그렇지 않으면 우항의 프로퍼티 참조

```jsx
var elem = null;

// elem이 null 또는 undefined이면 undefined를 반환하고,
// 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.
var value = elem?.value;
console.log(value); // undefined
```

### null 병합 연산자 `??`

좌항의 피연산자가 `null` 또는 `undefined` 인 경우 **우항**의 피연산자를 반환,

그렇지 않으면 좌항의 피연산자를 반환

→ 변수의 기본값을 설정할 때 유용

```jsx
var foo = null ?? "default string";
console.log(foo); // "default string
```

좌항의 피연산자가 Falsy 값이라도 `null` 또는 `undefined`가 아니면 **좌항**의 피연산자를 반환한다.

```jsx
var foo = "" ?? "default string";
console.log(foo); // ""
```
