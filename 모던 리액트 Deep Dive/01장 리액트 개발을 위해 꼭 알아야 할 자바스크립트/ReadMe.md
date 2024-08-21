## 1.1 자바스크립트의 동등 비교

### Object.is

- 두 개의 인수를 받으며, 이 인수 2개가 동일한지 확인하고 반환하는 메서드

```jsx
-0 === +0; // true
Object.is(-0, +0); // false

Number.NaN === NaN; // false
Object.is(Number.NaN, NaN); //true

NaN === 0 / 0; // false
Object.is(NaN, 0 / 0); //true
```

## 1.2 함수

### 함수 정의 4가지 방법

- 함수 선언문: 호이스팅O

```jsx
function add(a, b) {
  return a + b;
}
```

- 함수 표현식: 호이스팅X

```jsx
const sum = function (a, b) {
  return a + b;
};
```

- Function 생성자

```jsx
const add = new Function("a", "b", "return a + b");
```

- 화살표 함수
  - constructor 사용 불가능

```jsx
const add = (a, b) => {
  return a + b;
};

const add = (a, b) => a + b;
```

### 함수 만들때 주의 사항

- 함수의 부수 효과 최대한 억제하기
- 가능한 한 함수를 작게 만들기
- 누구나 이해할 수 있는 이름 붙이기

## 1.3 클래스

특정한 객체를 마들기 위한 일종의 템플릿과 같은 개념

## 1.4 클로저

함수와 함수가 선언된 어휘적 환경의 조합

### 스코프

변수의 유효 범위

- 전역 스코프
  - 전역 레벨에서 선언하는것
  - 해당 스코프에서 변수 선언시 어디에서든 호출 가능

### 리액트에서의 클로저

클로저의 원리를 사용하고 있는 대표적인 것 중 하나가 useState

```jsx
function Component() {
  const [state, setState] = useState();

  function handleClick() {
    // useState 호출은 위에서 끝났지만,
    // setState는 계속 내부의 최신값(prev)을 알고 있다.
    // 이는 클로저를 활용했기 때문에 가능하다.
    setState((prev) => prev + 1);
  }
}
```

## 1.5 이벤트 루프와 비동기 통신의 이해

### 싱글 스레드 자바스크립트

프로세스: 프로그램을 구동해 프로그램의 상태가 메모리상에서 실행되는 작업 단위

→ 하나의 프로그램 실행 = 하나의 프로세스 보유

스레드

- 프로세스보다 작은 실행 단위
- 하나의 프로세스에 여러 개의 스레드 생성 가능
- 스레드끼리는 메모리 공유 가능

싱글 스레드

- 자바스크립트 코드 실행이 하나의 스레드에서 순차적으로 이루어진다
- 하나의 작업이 끝나기 전까지 뒤이은 작업 실행 X
- → Run-to-completion 특징 = 동기식

### 이벤트 루프

- 호출 스택이 비어 있는지 여부를 확인
- 코드 실행, 호출 스택 empty 여부 확인 → 모두 단일 스레드에서 발생
- **태스크 큐**: 실행해야할 태스크의 집합 (한 개 이상 보유)
  - 실행해야할 태스크 = 비동기 함수의 콜백 함수, 이벤트 핸들러
- 태스크 큐에 대기 중인 함수가 있는지 반복해서 확인

비동기식 작업은 태스크 큐가 할당되는 별도의 스레드에서 수행

## 1.6 리액트에서 자주 사용하는 자바스크립트 문법

리액트 특징

- JSX 구문 내부에서 객체를 조작
- 객체 분해 할당 (객체의 얕은 동등 비교 문제 피하기 위해)

### 구조 분해 할당

- 배열 또는 객체의 값을 분해해 개별 변수에 즉시 할당하는 것
- 어떠한 객체나 배열에서 선언문 없이 즉시 분해해 변수를 선언하고 할당하고 싶을 때 사용

**배열 구조 분해 할당**

- `useState` 함수: 2개 짜리 배열을 반환하는 함수
- 자유롭게 이름 선언 가능
- `…` 전개 연산자를 사용하면 나머지 값 가져오기 가능

**객체 구조 분해 할당**

- 객체에서 값을 꺼내온 뒤 할당
- 객체 내부 이름으로 꺼내오기
- props에서 값을 바로 꺼내올 때 자주 쓰는 방식

```jsx
function SampleComponent({ a, b }) {
  return a + b;
}

SampleComponent({ a: 3, b: 5 }); // 8
```

- … 전개 연산자를 사용하면 나머지 값 가져오기 가능

## 1.7 선택이 아닌 필수, 타입스크립트

기존 자바스크립트 문법에 타입을 가미한 것

### 리액트 코드를 효과적으로 작성하기 위한 타입스크립트 활용법

- `any` 대신 **`unknown`** 사용하기
  - any는 정말로 불가피할 때만 사용하기
  - 불가피하게 타입을 단정할 수 없는 경우에 `unknown` 사용하기
  ```jsx
  function doSomething(callback: unknown) {
    callback(); // 'callback' is of type 'unknown'

    // type narrowing : 타입 좁히기 과정
    if (typeof callback === "function") {
      callback();
      return;
    }

    throw new Error("callback은 함수여야 합니다.");
  }
  ```
  - never는 어떠한 타입도 들어올 수 없을때 사용
- 타입 가드를 적극 활용하자
  - instanceof와 typeof
    - `instanceof`: 지정한 인스턴스가 특정 클래스의 인스턴스인지 확인할 수 있는 연산자
    - `typeof`: 특정 요소에 대해 자료형을 확인하는데 사용
  - in
    - property in object로 사용
    - 어떤 객체에 키가 존재하는 확인하는 용도
    - 타입에 여러가지 객체가 존재할 수 있는 경우에 유용
- 제네릭(generic)
  - 함수나 클래스 내부에서 다양한 타입에 대응할 수 있도록 도와주는 도구
  - 타입만 다른 비슷한 작업을 하는 컴포넌트를 단일 제네릭 컴포넌트로 선언해 간결하게 작성 가능
- 인덱스 시그니처
  - 객체의 키를 정의하는 방식
  ```tsx
  type Hello = {
    [key: string]: string;
  };

  const hello: Hello = {
    hello: "hello",
    hi: "hi",
  };

  hello["hi"]; // hi
  hello["안녕"]; // undefined
  ```
  - [key: string] 이 인덱스 시그니처
  - 키에 원하는 타입 부여 가능
  - string은 범위가 넓음 → 객체의 키 좁히기
    - record 사용하기
    ```tsx
    type Hello = Record<"hello" | "hi", string>;

    const hello: Hello = {
      hello: "hello",
      hi: "hi",
    };
    ```
    → 객체의 타입에 각각 원하는 키와 값 넣기 가능
    - 타입 사용하기
    ```tsx
    type Hello = { [key in "hello" | "hi"]: string };

    const hello: Hello = {
      hello: "hello",
      hi: "hi",
    };
    ```
    → 객체를 원하는 형태로 좁히기 가능
  - 타입 가드 함수 만들기
    ```tsx
    function keysOf<T extends Object>(obj: T): Array<keyof T> {
      return Array.from(Object.keys(obj)) as Array<keyof T>;
    }

    keysOf(hello).map((key) => {
      const value = hello[key];
      return value;
    });
    ```
