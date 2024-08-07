## Error 객체

Error: 일반적 에러 객체

SyntaxError: 문법 에러

ReferenceError: 참조할 수 없는 식별자 참조 에러

TypeError: 데이터 타입 유효하지 않는 에러

RangeError: 숫자 허용 범위를 벗어나는 에러

URIError: encodeURI 또는 decodeURI 함수에 부적절한 인수 전달시 발생

EvalError: eval 함수에서 발생

## 에러 전파

```jsx
const foo = () => {
  throw Error("foo에서 발생한 에러"); // 4
};

const bar = () => {
  foo(); // 3
};

const baz = () => {
  bar(); // 2
};

try {
  baz(); // 1
} catch (err) {
  console.error(err);
}
```

1 에서 baz() 호출하면 2 에서 bar() 호출, 3 에서 foo() 호출, 4 에서 에러 throw

foo 함수가 throw한 에러는 호출자에게 전파되어 전역에서 캐치

> 에러는 호출자 방향으로 전파된다
