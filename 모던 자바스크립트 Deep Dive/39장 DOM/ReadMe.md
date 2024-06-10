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
