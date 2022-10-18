메모리: 데이터를 저장할 수 있는 메모리 셀의 집합체
* 메모리 주소: 메모리 공간의 위치.

<br>

**변수**: 하나의 값을 저장하기 위해 확보한 메모리 공간 자체 또는 그 메모리 공간을 식별하기 위해 붙인 이름
* 값의 위치를 가리키는 상징적인 이름

변수에 여러 개의 값을 저장하는 방법
```javascript
var user = { id:1, name:'Kim'};
var users = [
  { id:1, name:'Kim' },
  { id:2, name:'Lee' }
  ];
```
* 할당(대입, 저장): 변수에 값을 저장하는 것
* 참조(reference): 변수에 저장된 값을 읽는것

<br>

**식별자**: 변수 이름
* 어떤 값을 구별해서 식별할 수 있는 고유한 이름
* 값이 아닌 메모리 주소를 기억
* 메모리 주소에 붙인 이름

<br>

**변수 선언**: 변수를 생성하는 것
* 변수 선언시 확보된 메모리 공간은 `undefined`를 기본값으로 초기화한다.
* 선언 -> 초기화
   * 변수 이름을 등록해서 엔진에 변수의 존재를 알린 후, 값을 저장하기 위해 메모리 공간을 확보하고 암묵적으로 `undefined`을 할당해 초기화
* `var` : `undefined`로 초기화 자동 수행
   * 쓰레기값으로부터 안전함
   
**예약어**

| await | break | case | catch | class | const |
| --- | --- | --- | --- |---|---|
|continue|debugger|default|delete|do|else|
|enum|export|extends|false|finally|for|
|function|if|implements|import|in|instanceof|
|interface|let|new|null|package|private|
|protected|public|return|super|static|switch|
|this|throw|true|try|typeof|var
|void|while|with|yield




```javascript
var first-name;
var 1st;
var this;
```
위에 작성한 코드는 명명 규칙에 위배되므로 사용X