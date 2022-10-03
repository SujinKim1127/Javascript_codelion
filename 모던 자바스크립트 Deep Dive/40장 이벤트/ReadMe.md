# 4️⃣0️⃣장 이벤트 
## 1. 이벤트 드리븐 프로그래밍

**event handler** : 이벤트가 발생했을때 호출되는 함수

**이벤트 핸들러 등록**: 이벤트가 발생했을때 브라우저에게 이벤트 핸들러의 호출을 위임하는 것

```html
<script>
	const $button = document.querySelector('button');
	// 사용자가 버튼을 클릭하면 함수를 호출하도록 요청
	$button.onclick = () => { alert('button click'); };
</script>
```

→ `$button` 의 `onclick` 프로퍼티에 함수 할당

**event-driven programming** : 프로그램의 흐름을 이벤트 중심으로 제어하는 프로그래밍 방식

<br>

## 2. 이벤트 타입

: 이벤트의 종류를 나타내는 문자열

**1. 마우스 이벤트**

| 이벤트 타입 |  이벤트 발생 시점 |
| --- | --- |
| click | 마우스 버튼을 클릭했을때 |
| dblclick | 마우스 버튼을 더블 클릭햇을때 |
| mousedown | 마우스 버튼을 눌렀을때 |
| mouseup | 누르고 있던 마우스 버튼을 놓았을때  |
| mousemove | 마우스 커서를 움직였을때 |

<br>

**2. 키보드 이벤트**

- `key down`: 모든 키를 눌렀을때 발생
- `key press`: 문자 키를 눌렀을때 연속적으로 발생
- `key up`: 누르고 있떤 키를 놓았을때 한번만 발생

<br>

**3. 포커스 이벤트**

- `focus`: html 요소가 포커스를 받았을때 (버블링 X)
- `blur`: html 요소가 포커스를 잃엇을때 (버블링 X)
- `focus in`: html 요소가 포커스를 받았을때 (버블링 O)
- `focus out`: html 요소가 포커스를 잃었을때 (버블링 O)

`focusin` , `focusout` 이벤트 핸들러는 `addEventListener` 메서드 방식을 사용해 등록해야한다.

<br>

**4. 폼 이벤트**

- `submit`
    1. `form` 요소 내의 `input(text, checkbox, radio)` , `select` 입력 필드(textarea 제외)에서 엔터 키를 눌렀을때
    2. `form` 요소 내의 `submit` 버튼(`<button>`, `<input type="submit">` )을 클릭했을때
- `reset` : `form` 요소 내의 `reset` 버튼을 클릭했을때


<br>

<br>


## 3. 이벤트 핸들러 등록

event handler: 이벤트가 발생했을때 브라우저에 호출을 위임한 함수

<br>

이벤트 핸들러를 등록하는 방법 3가지

**1. 이벤트 핸들러 어트리뷰트 방식**

```jsx
<button onclick="sayHi('Lee')>Click me!</button>
<script>
	function sayHi(name) {
		console.log('Hi! ${name}.');
	}
</script>
```

→ 함수 참조 X, 함수 호출문 등의 문을 할당

이벤트 핸들러를 등록할때 함수 참조를 등록해야 브라우저가 이벤트 핸들러를 호출 가능

<br>

**2. 이벤트 핸들러 프로퍼티 방식**

onclick과 같이 on 접두사와 이벤트의 종류를 나타내는 이벤트 타입으로 이루어져 있다

```jsx
<button>Click me!</button>
<script>
	const $button = document.querySelector('button');

	// 이벤트 핸들러 프로퍼티에 이벤트 핸들러를 바인딩
	$button.onclick = function() {
		console.log('button click');
	};
</script>
```

이벤트 핸들러를 등록하기 위해서는 이벤트를 발생시킬 객체인 **event target** 과 이벤트의 종류를 나타내는 문자열인 **event type** 그리고 **이벤트 핸들러**를 지정할 필요가 있다.

ex) 버튼요소가 클릭되면 handleClick함수를 호출하도록 이벤트 핸들러를 등록하는 경우 이벤트 타깃은 버튼 요소, 이벤트 타입은 ‘click’, 이벤트 핸들러는 handleClick 함수

<br>

**3. `addEventListener()` 방식**

```jsx
EventTarget.addEventListener('eventType', functionName [, useCapture]);
// 이벤트 타깃                이벤트타입   이벤트핸들러  
```

on 접두사 사용X

```jsx
<button>Click me!</button>
<script>
	const $button = document.querySelector('button');

	$button.addEventListener('click', function() {
		console.log('button click');
	});
</script>
```

이벤트 핸들러를 인수로 전달

<br>

<br>


## 4. 이벤트 핸들러 제거

`addEventListener` 메서드로 등록한 이벤트 핸들러를 제거하려면 `EventTarget.protoype.removeEventListener` 메서드 사용

`removeEventListener` 메서드에 전달할 인수는 `addEventListener` 메서드와 동일

일치하지 않으면 제거되지 않음

```jsx
<button>Click me!</button>
<script>
	const $button = document.querySelector('button');
	const handleClick = () => console.log('button click');

	// 이벤트 핸들러 등록
	$button.addEventListener('click', handleClick);

	// 이벤트 핸들러 제거
	// addEventListener 메서드에 전달한 인수와 removeEventListener 메서드에
	// 전달한 인수가 일치하지 않으면 이벤트 핸들러가 제거되지 않는다.
	$button.removeEventListener('click', handleClick, true); // 실패
	$button.removeEventListener('click', handleClick);   // 성공
</script>
```

<br>

<br>

## 5. 이벤트 객체

이벤트가 발생하면 이벤트에 관련한 다영한 정보를 담고 있는 이벤트 객체가 동적으로 생성됨

**생성된 이벤트 객체는 이벤트 핸들러의 첫번째 인수로 전달됨**

```jsx
<body>
	<em class="message"></em>
	<script>
		const $msg = document.querySelector('.message');
		// 클릭 이벤트에 의해 생성된 이벤트 객체는 이벤트 핸들러의 첫번째 인수로 전달됨
		function showCoords(e) {
			$msg.textContent = `clientX: ${e.clientX}, clientY: ${e.clientY}`;
		}

		document.onclick = showCoords;
	</script>
```

클릭 이벤트에 의해 생성된 이벤트 객체는 이벤트 핸들러의 첫번째 인수로 전달되어 매개변수 e에 암묵적으로 할당됨 → 브라우저가 이벤트 핸들러를 호출할 때 이벤트 객체를 인수로 전달하기 때문