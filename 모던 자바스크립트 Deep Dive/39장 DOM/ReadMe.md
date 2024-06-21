# DOM

Document Object Model

- HTML 문서의 계층적 구조와 정보를 표현하며 이를 제어할 수 있는 API
- 프로퍼티와 메서드를 제공하는 트리 자료구조
- 노드 객체들로 구성된 트리 자료 구조
- 노드 타입에 따라 필요한 기능을 프로퍼티와 메서드의 집합인 DOM API로 제공

## 노드

```html
<div class="greeting">Hello</div>
```

`div` : 요소 노드

`class="greeting"` : 어트리뷰트 노드

`Hello` : 텍스트 노드

→ HTML 요소 간 중첩 관계에 의해 계층적인 부자 관계 형성

→ HTML 요소를 객체화한 모든 노드 객체들을 **트리 자료 구조**로 구성

### 노드 객체의 타입

- 문서 노드(document node)
  - DOM 트리 최상위에 존재하는 루트 노드로서 document 객체를 가리킴 → 진입점 역할
  - `window.document` or `document` 로 참조 가능
  - HTML 문서당 `document` 객체는 유일
- 요소 노드(element node)
  - 문서의 구조를 표현
- 어트리뷰트 노드(attribute node)
  - HTML 요소의 어트리뷰트를 가리키는 객체
- 텍스트 노드(text node)
  - HTML 요소의 텍스트를 가리키는 객체
  - DOM 트리의 최종단

### 노드 객체의 상속 구조

노드 객체에 담긴 기능

- 노드 타입에 상관없이 모든 노드 객체가 공통으로 가지는 기능
- 노드 타입에 따른 고유한 기능

노드 객체는 공통된 기능일수록 프로토타입 체인의 상위에

개별적인 고유 기능일수록 프로토타입 체인의 하위에 프로토타입 체인을 구축

## 요소 노드 취득

HTML의 구조나 내용 또는 스타일 등을 동적으로 조작하려면 먼저 요소 노드 취득하기

- id를 이용한 요소 노드 취득
  - `document.getElementById()`
  - 언제나 단 하나의 요소 노드를 반환
- 태그 이름을 이용한 요소 노드 취득
  - `document.getElementsByTagName()`
  - 여러 개의 요소 노드 객체를 가지는 DOM 컬렉션 객체 HTMLCollection 객체 반환
  - document를 통해 호출하여 DOM 전체에서 요소 노드를 탐색하여 반환
- class를 이용한 요소 노드 취득
  - document.getElementsByClassName()
  - 여러 개의 요소 노드 객체를 가지는 DOM 컬렉션 객체 HTMLCollection 객체 반환
- css 선택자를 이용한 요소 노드 취득
  - 스타일을 적용하고자 하는 HTML 요소를 특정할 때 사용하는 문법
  - document.querySelector()
  - 문법에 맞지 않는 경우 DOMException 에러 발생

### HTMLCollection과 NodeList

- DOM API가 여러 개의 결과값을 반환하기 위한 DOM 컬렉션 객체
- 유사 배열 객체이면서 이터러블
- 스프레드 문법을 사용하여 간단히 배열로 변환 가능

HTMLCollection

- 노드 객체의 상태 변화를 실시간으로 반영
- 살아 있는 DOM 컬렉션 객체

NodeList

- HTMLCollection 객체의 부작용을 해결하기 위해 querySelectorAll 메서드 사용
- 실시간으로 노드 객체의 상태 변경을 반영 X

> 노드 객체의 상태 변경과 상관없이 안전하게 DOM 컬렉션을 사용하려면 HTMLCollection이나 NodeList 객체를 배열로 변환하여 사용하기

## 어트리뷰트

### HTML 어트리뷰트 vs DOM 프로퍼티

- DOM 프로퍼티
  - HTML 어트리뷰트 값을 초기값으로 가진다
  - setter와 getter 모두 존재하는 접근자 프로퍼티
  - 참조와 변경 가능
  - 사용자의 입력에 의한 상태 변화에 반응
  - 언제나 최신 상태 유지
- HTML 어트리뷰트
  - HTML 요소의 초기 상태 지정 및 관리
  - HTML 어트리뷰트 값은 HTML 요소의 초기 상태를 의미
