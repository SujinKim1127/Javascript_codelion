프로미스: 전통적인 콜백 패턴이 가진 단점을 보완하며 비동기 처리 시점을 명확하게 표현 가능

Promise 생성자 함수는 비동기 처리를 수행할 콜백 함수를 인수로 전달받는데 이 콜백 함수는 resolve와 reject 함수를 인수로 전달받는다

```jsx
const promise = new Promise((resolve, reject) => {
	// Promise 함수의 콜백 함수 내부에서 비동기 처리를 수행한다.
	if (/* 비동기 처리 성공 */) {
		resolve('result');
	} else { /* 비동기 처리 실패 */
		reject('failure reason');
	}
});
```

→ 프로미스는 비동기 처리 상태와 처리 결과를 관리하는 객체

## fetch

- HTTP 요청 전송 기능을 제공하는 클라이언트 사이드 Web API
- 프로미스 지원 → 비동기 처리를 위한 콜백 패턴의 단점에서 자유로움
- Response 객체를 래핑한 Promise 객체를 반환

```jsx
fetch("http:~~~").then((response) => console.log(response));
```

후속 처리 메서드 `then`을 통해 프로미스가 `resolve`한 Response 객체 전달받기 가능
