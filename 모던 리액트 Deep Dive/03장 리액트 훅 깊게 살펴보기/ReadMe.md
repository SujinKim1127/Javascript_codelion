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

### useReducer

useState의 심화 버전

- return 값은 길이가 2인 배열
  - state: 현재 useReducer가 가지고 있는 값
  - dispatcher
    - state 업데이트하는 함수
    - setState는 값을 넘겨주면 여기서는 action을 넘겨줌
    - action = state 변경
- 2 ~ 3개의 인수 필요
  - reducer: useReducer의 기본 action 정의
  - initialState: useReducer의 초깃값
  - init
    - 초깃값을 지연해서 생성시키고 싶을 때 사용
    - 필수 X

목적

- 복잡한 형태의 state를 사전에 정의된 dispatcher로만 수정 가능하게 제작
- state 값에 대한 접근은 컴포넌트에서만 가능
- state 업데이트 상세 정의는 컴포넌트 밖에서
- state의 업데이트를 미리 정의해 둔 dispatcher로만 제한

> state 값을 변경하는 시나리오를 제한적으로 두고 이에 대한 변경을 빠르게 확인할 수 있도록

### useImperativeHandle

부모에게서 넘겨받은 ref를 원하는 대로 수정할 수 있는 훅

### useLayoutEffect

useEffect와 동일하나, 모든 DOM의 변경 후에 useLayoutEffect의 콜백 함수 실행이 동기적으로 발생

1. 리액트가 DOM 업데이트
2. useLayoutEffect 실행 (브라우저 변경사항 반영 전에 실행)
3. 브라우저에 변경 사항 반영
4. useEffect 실행 (브라우저 변경 사항 반영된 이후에 실행)

DOM은 계산됐지만 이것이 **화면에 반영되기 전에 하고 싶은 작업이 있을때**만!! 사용

ex) DOM요소 기반 애니메이션, 스크롤 위치 제어

### 훅 규칙 : rules-of-hooks

1. 최상위에서만 훅 호출
   - 반복문이나 조건문, 중천된 함수 내에서 훅 실행X
   - 이렇게 해야 컴포넌트 렌더링시 항상 동일한 순서로 훅 호출 보장 가능
2. 훅을 호출할 수 있는 것은 리액트 함수 컴포넌트, 사용자 정의 훅
   - 일반 자바스크립트 함수에서는 훅 사용 불가능

## 사용자 정의 훅 vs 고차 컴포넌트

react에서 재사용할 수 로직을 관리할 수 있는 2가지 방법

- 사용자 정의 훅 (custom hook)
- 고차 컴포넌트 (higher order component)

### 사용자 정의 훅

- 서로 다른 컴포넌트 내부에서 같은 로직을 공유하고자 할 때 주로 사용
- react에서만 사용할 수 있는 방식
- 개발자가 필요한 훅을 만드는 기법
- use로 시작 (react-hooks/rules-of-hooks 의 도움을 받으려면)
- 훅에서 필요한 useState와 useEffect 로직을 사용자 정의 훅 내부에 두면 손쉽게 중복되는 로직 관리 가능

사용자 정의 훅 예시

- use-Hooks: https://github.com/uidotdev/usehooks9
- react-use: https://github.com/streamich/react-use10
- ahooks: https://github.com/alibaba/hooks

### 고차 컴포넌트

- 컴포넌트 자체 로직을 재사용하기 위한 방법
- 고차 함수의 일종
- react에서 고차 컴포넌트로 다양한 최적화나 중복 로직 관리 가능
- ex) React.memo

React.memo

- props의 변화가 없음에도 렌더링을 방지하기 위해 만들어진 react의 고차 컴포넌트
- useMemo는 값을 반환받음 → JSX 함수 방식이 아닌 {}을 사용한 할당식 사용

고차 함수를 활용한 리액트 고차 컴포넌트 만들기

- 사용자 인증 정보에 따라 인증된 사용자에게는 개인화된 컴포넌트, 그렇지 않은 사용자에게는 별도로 정의된 공통 컴포넌트를 보여주는 시나리오

```jsx
interface LoginProps {
	loginRequired?: boolean
}

function withLoginComponent<T>(Component: ComponentType<T>) {
	return function (props: T & LoginProps) {
		const { loginRequired, ...restProps } = props

		if (loginRequired) {
			return <>로그인이 필요합니다.</>
		}

		return <Component {...(restProps as T)} />
	}
}
```

```jsx
// 원래 구현하고자 하는 컴포넌트를 만들고, withLoginComponent로 감싸기만 하면 끝이다.
// 로그인 여부, 로그인이 안 되면 다른 컴포넌트를 렌더링하는 책임은 모두
// 고차 컴포넌트인 withLoginComponent에 맡길 수 있어 매우 편리하다.

const Component = withLoginComponent((props: { value: string }) => {
  return <h3>{props.value}</h3>;
});

export default function App() {
  // 로그인 관련 정보를 가져온다.
  const isLogin = true;
  return <Component value="text" loginRequired={isLogin} />;
  // return <Component value="text" />;
}
```

### 사용자 정의 훅이 필요한 경우

- 리액트에서 제공하는 훅으로만 공통 로직을 격리할 수 있는 경우
- 컴포넌트 내부에 미치는 영향을 최소화 가능
- 개발자가 훅을 원하는 방향으로만 사용 가능
- 동일한 로직으로 값을 제공
- 특정한 훅의 작동을 취하고 싶을때

### 고차 컴포넌트를 사용해야 하는 경우

특정 에러가 발생했을 때 현재 컴포넌트 대신 에러가 발생했음을 알리는 컴포넌트 노출

```jsx
function HookComponent() {
  const { loggedIn } = useLogin();

  if (!loggedIn) {
    return <LoginComponent />;
  }

  return <>안녕하세요.</>;
}

const HOCComponent = withLoginComponent(() => {
  // loggedIn state의 값을 신경 쓰지 않고 그냥 컴포넌트에 필요한 로직만
  // 추가해서 간단해짐. loggedIn state에 따른 제어는 고차 컴포넌트에서
  return <>안녕하세요.</>;
});
```

렌더링의 결과물에도 영향을 미치는 공통 로직 → 고차 컴포넌트 사용하기
