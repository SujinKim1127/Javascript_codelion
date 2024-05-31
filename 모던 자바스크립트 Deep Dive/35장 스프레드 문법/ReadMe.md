# 스프레드 문법

스프레드 문법(전개 문법) … 은 하나로 뭉쳐 있는 여러 값들의 집합을 펼쳐서 개별적인 값들의 목록으로 만든다

스프레드 문법을 사용할 수 있는 대상

- Array
- String
- Map
- Set
- DOM 컬랙션(NodeList, HTMLCollection)
- arguments

⇒ for … of 문으로 순회할 수 있는 iterable 한정

- iterable
  자료를 반복할 수 있는 객체

## 배열 리터럴 내부에서 사용하는 경우

### concat

```jsx
const arr = [...[1, 2], ...[3, 4]];
console.log(arr); // [1,2,3,4]
```

### 배열 복사

```jsx
const origin = [1, 2];
const copy = [...origin];

console.log(copy); // [1, 2]
console.log(copy === origin); // false
```

원본 배열의 각 요소를 얕은 복사하여 새로운 복사본 생성

### 이터러블을 배열로 변환

```jsx
function sum() {
  // 이터러블이면서 유사 배열 객체인 arguments를 배열로 변환
  return [...arguments].reduce((pre, cur) => pre + cur, 0);
}

console.log(sum(1, 2, 3)); // 6
```

이터러블이 아닌 유사 배열 객체는 스프레드 문법 대상 X
