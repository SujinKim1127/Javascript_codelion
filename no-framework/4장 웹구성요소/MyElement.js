customElements.define("my-element", MyElement);

class MyElement extends HTMLElement {
  constructor() {
    super();
    const myAttribute = this.getAttribute("my-attribute");
    this.innerHTML = `Hello, world! ${myAttribute}`;
  }
  // <my-element></my-element>가 DOM tree에 포함될때 동작
  connectedCallback() {
    // 해당 엘리먼트가 삽입될때 동작
    console.log("하이");
  }
  // <my-element></my-element>가 DOM tree에서 제거될때 동작
  disconnectedCallback() {
    // 해당 엘리먼트가 사라질때 동작
    console.log("bye");
  }

  // 어떤 속성을 감시하고 싶은지 배열로 등록
  static get observedAttributes() {
    return ["my-attribute"];
  }

  // 다음에 어떤 동작을 할지 정의
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name}is changed from ${oldValue} to ${newValue}`);
  }
}

// export default MyElement;
