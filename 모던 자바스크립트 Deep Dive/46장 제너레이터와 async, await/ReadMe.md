# 4️⃣6️⃣ 제너레이터와 async/await

## 제너레이터란?

코드 블록의 실행을 일시 중지했다가 필요한 시점에 재개할 수 있는 특수한 함수

| 제너레이터                                          | 일반 함수                                                              |
| --------------------------------------------------- | ---------------------------------------------------------------------- |
| 함수 호출자에게 함수 실행의 제어권 양도(yield) 가능 | 함수를 호출한 이후 함수 실행 제어 불가능                               |
| 함수 호출자와 함수 상태 주고받기 가능               | 실행되는 동안 함수 외부에서 내부로 값을 전달하여 함수 상태 변경 불가능 |
| 제너레이터 함수를 호출하면 제너레이터 객체 반환     | 함수 코드를 일괄 실행하고 값 반환                                      |

## async/await

ES8에서는 제너레이터보다 간단하고 가독성 좋게 비동기 처리를 동기 처리처럼 동작하도록 구현할 수 있는 async/await가 도입됨

- 프로미스를 기반으로 동작
- 프로미스의 후속 처리 메서드 없이 마치 동기 처럼 프로미스가 처리 결과를 반환하도록 구현 가능

```jsx
const fetch = require("node-fetch");

async function fetchTodo() {
  const url = "https://jsonplaceholder.typicode.com/todos/1";

  const response = await fetch(url);
  const todo = await response.json();
  console.log(todo);
  // {userId: 1, id: 1, title: 'delectus aut autem', completed: false}
}

fetchTodo();
```

<br />

### async 함수

- await 키워드는 반드시 async 함수 내에서 사용
- async 함수는 async 키워드를 사용해 정의하며 언제나 프로미스를 반환
- async 함수가 명시적으로 프로미스를 반환하지 않더라도 asynce 함수는 암묵적으로 반환값을 resolve하는 프로미스 반환

```jsx
// async 함수 선언문
async function foo(n) {
  return n;
}
foo(1).then((v) => console.log(v)); // 1

// async 함수 표현식
const bar = async function (n) {
  return n;
};
bar(2).then((v) => console.log(v)); // 2

// async 화살표 함수
const baz = async (n) => n;
baz(3).then((v) => console.log(v)); // 3

// async 메서드
const obj = {
  async foo(n) {
    return n;
  },
};
obj.foo(4).then((v) => console.log(v)); // 4

// async 클래스 메서드
class MyClass {
  async bar(n) {
    return n;
  }
}
const myClass = new MyClass();
myClass.bar(5).then((v) => console.log(v)); // 5
```

클래스의 constructor 메서드는 async 메서드가 될 수 없다.

async 함수는 언제나 프로미스를 반환해야 한다

<br />

### await 키워드

await 키워드는 프로미스가 `settled` 상태(비동기 처리가 수행된 상태)가 될때까지 대기하다가 `settled` 상태가 되면 프로미스가 `resolve`한 처리 결과를 반환한다.

await 키워드는 반드시 프로미스 앞에서 사용해야한다

<br />

```jsx
const fetch = require("node-fetch");

const getGithubUserName = async (id) => {
  const res = await fetch(`https://api.github.com/users/${id}`); // (1)
  const { name } = await res.json(); // (2)
  console.log(name); //  Ungmo Lee
};

getGithubUserName("ungmo2");
```

(1)의 `fetch` 함수가 수행한 HTTP 요청에 대한 서버의 응답이 도착해서 `fetch` 함수가 반환한 프로미스가 `settled` 상태가 될때까지 (1)은 대기 하는 중

이후 프로미스가 `settled` 상태가 되면 프로미스가 `resolve`한 처리 결과가 `res` 변수에 할당된다.

<br />

`await` 키워드는 다음 실행을 일시 중지시켰다가 프로미스가 `settled` 상태가 되면 다시 재개

```jsx
async function foo() {
  const a = await new Promise((resolve) => setTimeout(() => resolve(1), 3000));
  const b = await new Promise((resolve) => setTimeout(() => resolve(2), 2000));
  const c = await new Promise((resolve) => setTimeout(() => resolve(3), 1000));

  console.log([a, b, c]); // [1, 2, 3]
}

foo(); // 6초 뒤 console창에 [1, 2, 3] 출력
```

모든 프로미스에 `await` 키워드 사용하는것 주의하기!!

첫번째 프로미스는 `settled` 상태가 될때까지 3초, 두번째는 2초, 세번째는 1초 소요

<br />

`foo`함수가 수행하는 3개의 비동기 처리는 서로 연관 없이 개별적으로 수행되는 비동기 처리이므로 앞에 있는 비동기 처리가 완료될때까지 대기해서 순차적으로 처리할 필요가 있다.

```jsx
async function foo() {
  const res = await Promise.all([
    new Promise((resolve) => setTimeout(() => resolve(1), 3000)),
    new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
    new Promise((resolve) => setTimeout(() => resolve(3), 1000)),
  ]);

  console.log(res); // [1, 2, 3]
}

foo(); // 3초 뒤 console창에 [1, 2, 3] 출력
```

<br />

`bar` 함수는 앞선 비동기 처리의 결과를 가지고 다음 비동기 처리를 수행

→ 비동기 처리의 **처리 순서가 보장되어야 하므**로 모든 프로미스에 `await` 키워드를 사용하여 순차적으로 처리

```jsx
async function bar(n) {
  const a = await new Promise((resolve) => setTimeout(() => resolve(n), 3000));
  // 두 번째 비동기 처리를 수행하려면 첫 번째 비동기 처리 결과가 필요
  const b = await new Promise((resolve) =>
    setTimeout(() => resolve(a + 1), 2000)
  );
  // 세 번째 비동기 처리를 수행하려면 두 번째 비동기 처리 결과가 필요
  const c = await new Promise((resolve) =>
    setTimeout(() => resolve(b + 1), 1000)
  );

  console.log([a, b, c]); // [1, 2, 3]
}

bar(1); // 6초 뒤 console창에 [1, 2, 3] 출력
```

### 에러 처리

프로미스를 반환하는 비동기 함수는 명시적으로 호출 가능 → 호출자 명확

```jsx
const fetch = require("node-fetch");

const foo = async () => {
  try {
    const wrongUrl = "https://wrong.url";
    const response = await fetch(wrongUrl);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err); // TypeError: Failed to fetch
  }
};

foo();
```

위 catch문에서는 HTTP 통신에서 발생한 네트워크 에러, try 코드 블록 내 일반적인 에러까지 모두 캐치 가능
