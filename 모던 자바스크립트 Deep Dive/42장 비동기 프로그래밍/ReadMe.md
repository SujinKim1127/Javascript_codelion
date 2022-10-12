# 비동기 프로그래밍

자바스크립트 엔진은 단 하나의 실행 컨텍스트 스택을 가진다

→ 함수를 실행할 수 있는 창구가 단 하나이며, 동시에 2개 이상의 함수를 동시에 실행할 수 없다

- 한번에 하나의 태스크만 실행 할 수 있는 **싱글 스레드** 방식으로 동작

```jsx
// sleep 함수는 일정 시간(delay)이 경과한 이후에 콜백 함수(func)를 호출
function sleep(func, delay) {
    // Date.now() 는 현재 시간을 숫자(ms)로 반환
    const delayUntil = Date.now() + delay;

    // 현재 시간(Date.now())에 delay를 더한 delayUntil이 현재 시간보다 작으면 계속 반복
    while (Date.now() < delayUntil);
    // 일정 시간(delay)이 경과한 이후에 콜백함수(func)를 호출
    func();
}

function foo() {
    console.log('foo');
}

function bar() {
    console.log('bar');
}

// sleep 함수는 3초 이상 실행됨
sleep(foo, 3 * 1000);

// bar 함수는 sleep 함수의 실행이 종료된 이후에 호출되므로 3초 이상 블로킹
bar();
// (3초 경과 후) foo 호출 -> bar 호출
```

→ bar 함수는 sleep 함수의 실행이 종료된 이후에 호출되므로 3초 이상(foo 함수의 실행시간 +3초) 호출되지 못하고 **블로킹** 됨

현재 실행 중인 태스크가 종료할때까지 다음에 실행될 태스크가 대기하는 방식: **동기 처리**

```jsx
function foo() {
    console.log('foo');
}

function bar() {
    console.log('bar');
}

// 타이머 함수 setTimeout은 일정 시간이 경과한 이후에 콜백 함수 foo를 호출
// 타이머 함수 setTimeout은 bar 함수 블로킹X
setTimeout(foo, 3 * 1000);
bar();
// bar 호출 -> (3초 경과 후) foo 호출
```

`setTimeout` 함수는 sleep함수와 비슷하게 일정 시간이 경과한 이후에 콜백함수를 호출하지만

`setTimeout` 함수 이후의 태스크를 블로킹하지 않고 곧바로 실행

→ **비동기 처리** : 현재 실행 중인 태스크가 종료되지 않은 상태라 해도 다음 태스크를 곧바로 실행하는 방식

|  | 동기 처리 방식 | 비동기 처리 방식 |
| --- | --- | --- |
| 장점 | 태스크를 순서대로 하나씩 처리하므로 실행 순서가 보장됨 | 현재 실행 중인 태스크가 종료되지 않은 상태라 해도 다음 태스크를 곧바로 실행하므로 블로킹 발생X |
| 단점 | 앞선 태스크가 종료할 때까지 이후 태스크들이 블로킹 됨 | 태스크의 실행 순서 보장X |