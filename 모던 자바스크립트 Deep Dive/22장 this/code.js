// this는 어디서든지 참조 가능
// 전역에서의 this는 전역 객체 window
console.log(this);   // window

function square(number) {
  // 일반 함수 내부에서 this는 전역 객체 window를 가리킴
  console.log(this);   // window
  return number * number;
}
square(2);

const person = {
    name: 'LEE',
    getName() {
        // 메서드 내부에서 this는 메서드를 호출한 객체
        console.log(this);   // {name: "LEE", getName: f}
        return this.name;
    }
};
console.log(person.getName());  // LEE

function Person(name) {
    this.name = name;
    // 생성자 함수 내부에서 this는 생성자 함수가 생성할 인스턴스를 가리킴
    console.log(this);  // Person {name: "Lee"}
}

const me = new Person("LEE");