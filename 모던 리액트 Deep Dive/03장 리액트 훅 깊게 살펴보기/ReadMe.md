## 리액트의 모든 훅 파헤치기

### useState

함수 컴포넌트 내부에서 상태를 정의하고, 이 상태를 관리할 수 있게 해주는 훅

**게으른 초기화**

- useState의 초깃값이 복잡하거나 무거운 연산을 포함하고 있을때 사용하기
- 실행 비용이 많이 드는 경우에도 사용
- 예시
  - localStorage나 sessionStorage에 대한 접근
  - map, filter, find 같은 배열에 대한 접근
  - 초깃값 계산을 위해 함수 호출이 필요할 때

### useEffect

- 애플리케이션 내 컴포넌트의 여러 값들을 활용해 동기적으로 부수 효과를 만드는 메커니즘
- 렌더링할 때마다 의존성에 있는 값을 보면서 해당 의존성의 값이 이전과 다른 게 하나라도 있으면 부수 효과를 실행하는 평범한 함수
- state와 props의 변화 속에서 일어나는 렌더링 과정에서 실행되는 부수 효과 함수

클린업 함수의 목적

- 이벤트를 등록하고 지울 때 사용
  → 특정 이벤트의 핸들러가 무한히 추가되는 것을 방지
- 이전 상태를 청소해주는 개념

주의할 점

- 의존성 배열로 []가 정말 필요하다면 함수 컴포넌트가 마운트된 시점에만 콜백 함수 실행이 정말 필요한지 다시 한번 생각해보기
- useEffect의 첫번째 인수에 함수명 부여하기

```jsx
useEffect(() => {
	logging(user.id)
}, [user.id])
// 라고 적는것 보다

useEffect(() => {
	function logActiveUser() {
		logging(user.id)
	},
 [user.id],
)
// 라고 적기
```

⇒ 함수명을부여하면 useEffect의 목적을 명확히 할 수 있다

### useMemo

비용이 큰 연산에 대한 결과를 저장(메모이제이션)해 두고, 이 저장된 값을 반환하는 훅

### useCallback

- 인수로 넘겨받은 콜백 자체를 기억
- 특정 함수를 새로 만들지 않고 재사용 (=재생성하지 않는다)
- useMemo를 사용해서 구현 가능
- 함수 메모이제이션하는 용도에 사용

useCallback(fn, dependencies)

- fn
  - 캐싱할 함숫값
  - 다음 렌더링에서 dependencies 값이 이전과 같으면 react는 같은 함수 다시 반환
  - dependencies 값이 변경되면 이번 렌더링에서 전달한 함수 반환
- dependencies: fn 내에서 참조되는 모든 반응형 값의 목록

> useCallback과 useMemo는 모두 동일한 역할

### useRef

- useState와 동일하게 컴포넌트 내부에서 렌더링이 일어나도 변경 가능한 상태값을 저장
- 객체 내부 current로 값에 접근 또는 변경 가능
- 값이 변하더라도 렌더링 발생 X

### useContext

props drilling을 극복하기 위해 등장
