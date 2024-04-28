# 클래스

새로운 객체 생성 메커니즘

- new 연산자 없이 호출하면 에러 발생
- 호이스팅이 발생하지 않는 것처럼 동작
- 클래스 내의 모든 코드에는 암묵적으로 strict mode가 지정되어 실행됨. 해제 불가능

## 메서드

### 정적 메서드

```jsx
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name;
  }

  // 정적 메서드
  static sayHi() {
    console.log("hi!");
  }
}
```

- 정적 메서드는 클래스로 호출
- 정적 메서드는 인스턴스 없이도 호출 가능
- 인스턴스로는 정적 메서드 호출 불가능

```jsx
Person.sayHi(); // hi

const me = new Person("Lee");
me.sayHi(); // TypeError: me.sayHi is not a function
```

### 정적 메서드와 프로토타입 메서드의 차이

자신이 속해 있는 프로토타입 체인이 다름

| 정적메서드                    | 프로토타입 메서드           |
| ----------------------------- | --------------------------- |
| 클래스로 호출                 | 인스턴스로 호출             |
| 인스턴스 프로퍼티 참조 불가능 | 인스턴스 프로퍼티 참조 가능 |

**정적메서드**

```jsx
class Square {
  // 정적메서드 - 인스턴스 프로퍼티 참조 X
  static area(width, height) {
    return width * height;
  }
}
```

**프로토타입 메서드**

```jsx
class Square {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  // 프로토타입 메서드 - 인스턴스 프로퍼티 참조
  area() {
    return this.width * this.height;
  }
}
```

## 클래스의 인스턴스 생성 과정

1. 인스턴스 생성과 this 바인딩
2. 인스턴스 초기화
3. 인스턴스 반환

```jsx
class Person {
  // 생성자
  constructor(name) {
    // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.
    console.log(this); // Person {}
    console.log(Object.getPrototypeOf(this) === Person.prototype); // true

    // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
    this.name = name;

    // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
  }
}
```
