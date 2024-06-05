## Set

중복되지 않는 유일한 값들의 집합

- 동일한 값 중복 포함 X
- 요순 순서에 의미 X
- 인덱스로 요소 접근 X

중복을 허용하지 않는 Set 객체의 특성을 활용하면 배열에서 중복된 요소 제거 가능

```jsx
// Set을 사용한 배열의 중복 요소 제거
const uniq = (array) => [...new Set(array)];
console.log(uniq([2, 1, 2, 3, 4, 3, 4])); // [2, 1, 3, 4]
```

### 요소 개수 확인

`Set.prototype.size` 프로퍼티 사용

```jsx
const { size } = new Set([1, 2, 3, 3]);
console.log(size); // 3
```

### 요소 추가

- `Set.prototype.add` 메서드 사용
- 연속적으로 호출 가능
- 중복 요소 추가 허용 X

```jsx
const set = new Set();

set.add(1).add(2).add(2);
console.log(set); // Set(2) {1, 2}
```

### 요소 존재 여부 확인

- `Set.prototype.has`
- 특정 요소의 존재 여부를 나타내는 불리언값 반환

```jsx
const set = new Set([1, 2, 3]);

console.log(set.has(2)); // true
console.log(set.has(4)); // false
```

### 요소 삭제

- `Set.prototype.delete`
- 삭제 성공 여부를 나타내는 불리언값 반환
- 삭제하려는 요소값을 인수로 전달하기
- 존재하지 않는 set 객체 요소 삭제시 에러 없이 무시

```jsx
const set = new Set([1, 2, 3]);

set.delete(2);
console.log(set); // Set(2) {1, 3}

set.delete(0);
console.log(set); // Set(2) {1, 3}
```

### 요소 일괄 삭제

- `Set.prototype.clear`
- 언제나 undefined 반환

### 요소 순회

- `Set.prototype.forEach`

전달받는 3개 인수

- 첫번째 인수: 현재 순회 중인 요소 값
- 두번째 인수: 현재 순회 중인 요소 값
- 세번째 인수: 현재 순회 중인 Set 객체 자체

# Map

- 키와 값의 쌍으로 이루어진 컬렉션
- Map 생성자 함수는 이터러블을 인수로 전달받아 Map 객체를 생성
- 인수로 전달되는 이터러블은 키와 값의 쌍으로 이루어진 요소

```jsx
const map1 = new Map([
  ["key1", "value1"],
  ["key2", "value2"],
]);
console.log(map1); // Map(2) {"key1" => "value1", "key2" => "value2"}

const map2 = new Map([1, 2]);
// TypeError: Iterator value 1 is not an entry object
```

- 인수로 전달한 이터러블에 중복된 키를 갖는 요소가 존재하면 값을 덮어쓴다 → 에러 발생 X
- 중복된 키를 갖는 요소 없음
