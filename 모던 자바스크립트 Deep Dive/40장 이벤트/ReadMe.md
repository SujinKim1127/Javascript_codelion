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

<br>

<br>


## 6. 이벤트 전파

: DOM 트리 상에 존재하는 DOM 요소 노드에서 발생한 이벤트는 DOM 트리를 통해 전파됨 

```html
<body>
	<ul id="fruits">
		<li id="apple">Apple</li>
		<li id="banana">Banana</li>
		<li id="oranage">Orange</li>
	</ul>
</body>
```

`<ul>` 요소의 두 번째 자식 요소인 `<li>` 요소를 클릭하면 클릭 이벤트 발생

이때 **생성된 이벤트 객체는 이벤트를 발생시킨 DOM 요소인 이벤트 타겟을 중심으로 DOM 트리를 통해 전파됨**

### 3단계로 구분되는 이벤트 전파

![Untitled](%EC%9D%B4%EB%B2%A4%ED%8A%B8%20%EC%A0%84%ED%8C%8C.PNG)

(1) **캡처링 단계(Capturing phase)**: 이벤트가 상위 요소에서 하위 요소 방향으로 전파

(2) **타겟 단계(Target phase)**: 이벤트가 이벤트 타겟에 도달

(3) **버블링 단계(Bubbling phase)**: 이벤트가 하위 요소에서 상위 요소 방향으로 전파

```html
<!DOCTYPE html>
<html>
<body>
	<ul id="fruits">
		<li id="apple">Apple</li>
		<li id="banana">Banana</li>
		<li id="oranage">Orange</li>
	</ul>
	<script>
		// 이벤트 요소에 핸들러 바인딩
		const $fruits = document.getElementById('fruits');

		// fruits 요소의 하위 요소인 li 요소를 클릭한 경우 (이벤트 발생시키기)
		$fruits.addEventListener('click', e => {
			console.log(`이벤트 단계: ${e.eventPhase}`);    //3: 버블링 단계
			console.log(`이벤트 타겟: ${e.target}`);       // [object HTML li Element]
			console.log(`커런트 타겟: ${e.currentTarget}`);   // [object HTML ul Element]
		});
	</script>
</body>
</html>
```

→ event.target은 `<li>` 요소 event.currentTarget은 `<ul>` 요소

**캡처링 단계** : `li` 요소를 클릭하면 클릭 이벤트가 발생하여 클릭 이벤트 객체가 생성 → 클릭된 `li` 요소가 이벤트 타겟이 된다. 이때 클릭 이벤트 객체는 window에서 시작해서 이벤트 타깃 방향으로 전파 

**타겟 단계**: 이후 이벤트 객체는 이벤트를 발생시킨 이벤트 타겟에 도달

**버블링 단계** : 이후 이벤트 객체는 이벤트 타겟에서 시작해서 window 방향으로 전파

<br>

`addEventListener` 방식으로 등록한 이벤트 핸들러는 타겟, 버블링, 캡처링 단계의 이벤트도 선별적으로 캐치 가능. 캡처링 단계의 이벤트를 캐치하려면 `addEventListener` 메서드의 3번째 인수로 `true` 전달. 3번째 인수를 생략하거나 `false`를 전달하면 타겟과 버블링 단계의 이벤트만 캐치 가능

```html
<!DOCTYPE html>
<html>
<body>
	<ul id="fruits">
		<li id="apple">Apple</li>
		<li id="banana">Banana</li>
		<li id="oranage">Orange</li>
	</ul>
	<script>
		// 이벤트 요소에 핸들러 바인딩
		const $fruits = document.getElementById('fruits');
		const $banana = document.getElementById('banana');

		// #fruits 요소의 하위 요소인 li 요소를 클릭한 경우 캡처링 단계의 이벤트 캐치
		$fruits.addEventListener('click', e => {
			console.log(`이벤트 단계: ${e.eventPhase}`);    // 1: 캡처링 단계
			console.log(`이벤트 타겟: ${e.target}`);       // [object HTML li Element]
			console.log(`커런트 타겟: ${e.currentTarget}`);   // [object HTML ul Element]
		}, true);

		// 타겟 단계의 이벤트를 캐치
		$banana.addEventListener('click', e => {
			console.log(`이벤트 단계: ${e.eventPhase}`);    // 2: 타겟 단계
			console.log(`이벤트 타겟: ${e.target}`);       // [object HTML li Element]
			console.log(`커런트 타겟: ${e.currentTarget}`);   // [object HTML ul Element]
		});

		// 버블링 단계의 이벤트 캐치
		$fruits.addEventListener('click', e => {
			console.log(`이벤트 단계: ${e.eventPhase}`);    // 3: 버블링 단계
			console.log(`이벤트 타겟: ${e.target}`);       // [object HTML li Element]
			console.log(`커런트 타겟: ${e.currentTarget}`);   // [object HTML ul Element]
		});
	</script>
</body>
</html>
```

→ 이벤트는 이벤트를 발생시킨 이벤트 타겟과 상위 DOM 요소에서도 캐치 가능

트리를 통해 전파되는 이벤트는 이벤트 패스(이벤트가 통과하는 DOM 트리 상의 경로. `Event.protoyple.composedPath` 메서드로 확인 가능)에 위치한 모든 DOM 요소에서 캐치 가능

<br>

버블링을 통해 이벤트 전파 여부를 나타내는 이벤트 객체의 공통 프로퍼티 `event.bubbles` 값이 모두 false

- 포커스 이벤트: focus/blur
- 리소스 이벤트: load/unload/abort/error
- 마우스 이벤트: mouseenter/mouseleave

→ 버블링이 되지 않음 → 이벤트를 캐치하려면 캡처링 단계의 이벤트를 캐치해야함

<br>

⬇ 캡처링과 버블링 단계의 이벤트를 캐치하는 이벤트 핸들러가 혼용되는 경우 ⬇

```html
<!DOCTYPE html>
<html>
<head>
	<style>
		html, body {hegith: 100%; }
	</style>
<body>
	<p> 버블링과 캡처링 이벤트 <button>버튼</button></p>
	<script>
		// 버블링 단계의 이벤트 캐치
		document.body.addEventListener('click', () => {
			console.log('Handler for body.');
		});

		// 캡처링 단계의 이벤트를 캐치
		document.querySelector('p').addEventListener('click', () => {
			console.log('Handler for paragraph.');
		}, true);

		// 타겟 단계의 이벤트를 캐치
		document.querySelector('button').addEventListener('click', () => {
			console.log('Handler for button.');
		});
	</script>
</body>
</html>
```

→ `body` 요소는 버블링 단계의 이벤트만 캐치

→ `p` 요소는 캡처링 단계의 이벤트만 캐치

이벤트 캡처링 -타겟- 버블링 단계로 전파되므로 만약 `button` 요소에서 클릭 이벤트가 발생하면 먼저 캡처링 단계를 캐치하는 `p` 요소의 이벤트 핸들러가 호출 → 버블링 단계의 이벤트를 캐치하는 `body` 요소의 이벤트 핸들러가 순차적으로 호출

```html
Handler for paragraph
Handler for button
Handler for body
```

만약 `p` 요소에서 클릭 이벤트가 발생하면 캡처링 단계를 캐치하는 `p` 요소의 이벤트 핸들러가 호출되고 버블링 단계를 캐치하는 `body` 요소의 이벤트 핸들러가 순차적으로 호출

```html
Handler for paragraph
Handler for body
```