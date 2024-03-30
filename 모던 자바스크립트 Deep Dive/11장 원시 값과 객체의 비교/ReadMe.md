# 1️⃣1️⃣ 원시 값과 객체의 비교

| 원시 값                                         | 객체 값                                      |
| ----------------------------------------------- | -------------------------------------------- |
| 변경 불가능한 값                                | 변경 가능한 값                               |
| 원시 값을 변수에 할당하면 변수에는 실제 값 저장 | 객체를 변수에 할당하면 변수에는 참조 값 저장 |
| 값에 의한 전달                                  | 참조에 의한 전달                             |

## 원시 값

### 변경 불가능한 값

- 한번 생성된 원시 **값**은 read only 값으로 변경할 수 없다
  → 데이터 신뢰성 보장
- 불변성: 변수 값을 변경하려면 새로운 메모리 공간 확보후 재할당

### 값에 의한 전달

```jsx
var score = 80;
var copy = score;
```

변수에 원시 값을 갖는 변수(`score`)를 할당하면 할당받는 변수(`copy`)에는 할당되는 변수(`score`)의 원시 값이 복사되어 전달된다 → **값에 의한 전달**

`copy` 변수에는 `score`의 변수 값 80이 복사되어 할당된다

`score`변수와 `copy`변수의 값 80은 다른 메모리 공간에 저장된 별개의 값

이때 `score`의 값을 변경해도 `copy`의 값은 바뀌지 않는다

## 객체

### 변경 가능한 값

객체를 할당한 변수가 기억하는 메모리 주소를 통해 메모리 공간에 접근하면 **참조 값**에 접근

**참조 값**: 생성된 객체가 저장된 메모리 공간의 주소

객체를 할당한 변수는 재할당 없이 객체 직접 변경 가능

```jsx
var person = {
	name: 'Lee'
};

// 프로퍼티 값 갱신
persone.name = ‘Kim’;

// 프로퍼티 동적 생성
person.age = 20;
```

부작용: 여러 개의 식별자가 하나의 객체를 공유할 수 있다

### 참조에 의한 전달

```jsx
var person = {
  name: "Lee",
};

// 참조 값을 복사 (얕은 복사)
var copy = person;

// copy를 통해 객체를 변경한다.
copy.name = "Kim";

// person을 통해 객체를 변경한다.
person.address = "Seoul";

// copy와 person은 동일한 객체를 가리킨다.
// 따라서 어느 한쪽에서 객체를 변경하면 서로 영향을 주고받는다.
console.log(person); // {name: "Kim", address: "Seoul"}
console.log(copy); // {name: "Kim", address: "Seoul"}
```

copy에 원본(person)의 참조 값이 복사되어 전달 → **참조에 의한 전달**

```jsx
var person1 = {
  name: "Lee",
};

var person2 = {
  name: "Lee",
};

console.log(person1 === person2); // 1. false
console.log(person1.name === person2.name); // 2. true
```

1. person1 변수와 person2 변수가 가리키는 객체는 다른 메모리에 저장된 별개의 객체
2. person1.name과 person2.name의 값은 ‘Lee’ 이므로 true
