# 18장 함수와 일급 객체

다음의 조건을 만족하는 객체를 **일급 객체**라 한다

1. 무명의 리터럴로 생성할 수 있다. 즉, 런타임에 생성이 가능하다
2. 변수나 자료구조(객체, 배열)에 저장할 수 있다
3. 함수의 매개변수에 전달할 수 있다
4. 함수의 반환값으로 사용할 수 있다.

```tsx
// 1. 함수는 무명의 리터럴로 생성할 수 있다.
// 2. 함수는 변수에 저장할 수 있다.
// 런타임(할당 단계)에 함수 리터럴이 평가되어 함수 객체가 생성되고 변수에 할당된다.
const increase = function (num) {
  return ++num;
};

const decrease = function (num) {
  return --num;
};

// 2. 함수는 객체에 저장할 수 있다.
const auxs = { increase, decrease };

// 3. 함수의 매개변수에 전달할 수 있다.
// 4. 함수의 반환값으로 사용할 수 있다.
function makeCounter(aux) {
  let num = 0;
  return function () {
    num = aux(num);
    return num;
  };
}

// 3. 함수는 매개변수에게 함수를 전달할 수 있다.
const increaser = makeCounter(auxs.increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

// 3. 함수는 매개변수에게 함수를 전달할 수 있다.
const decreaser = makeCounter(auxs.decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

함수가 일급객체다. = 함수를 객체와 동일하게 사용할 수 있다

함수 객체는 일반 객체에는 없는 함수 고유의 프로퍼티를 소유

→ 렌더링될때마다 함수의 값이 바뀐다 → 최적화 필요

> 참고: https://g4daclom.tistory.com/203
