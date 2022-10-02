## 즉시 실행 함수

함수 정의와 동시에 즉시 호출되는 함수

단 한번만 호출되며 다시 호출 불가능

```jsx
(function () {
	var a = 3;
	var b =5;
	return a * b;
}());
```

즉시 실행 함수는 함수 이름이 없는 익명 함수를 사용하는 것이 일반적

<br>

## 콜백 함수

어떤 일을 반복 수행하는 repeat 함수

```jsx
// n만큼 어떤 일을 반복한다
function repeat(n) {
	// i를 출력한다.
	for (var i = 0; i < n; i++) console.log(i);
}

repeat(5);   // 0 1 2 3 4
```

<br>

함수의 변하지 않는 공통 로직은 미리 정의해두고, 경우에 따라 변경되는 로직은 추상화해서 함수 외부에서 함수 내부로 전달하기

```jsx
// 외부에서 전달받은 f를 n만큼 반복 호출
function repeat(n, f) {
	for (var i = 0; i < n; i++) {
		f(i);      // i를 전달하면서 f를 호출
	}
}

var logAll = function (i) {
	console.log(i);
};

// 반복 호출할 함수를 인수로 전달
repeat(5, logAll);  // 0 1 2 3 4

```

→ `logAll` 을 `function (i)` 으로 정의 하고 `repeat(n,f)` 안에서 `f(i)` 라고 했으므로 `repeat(5, logAll)` 을 하면 제대로 출력이 되는것.

```jsx
 var logOdds = function (i) {
	if(i % 2) console.log(i);
}

// 반복 호출할 함수를 인수로 전달
repeat(5, logOdds);  // 1 3
```

`repeat` 함수는 경우에 따라 변경되는 일을 함수 `f` 로 추상화했고 이를 외부에서 전달받음 → 유연한 구조

<br>


**콜백함수**: 함수의 매개변수를 통해 다른 함수의 내부로 전달되는 함수

**고차함수:** 매개변수를 통해 함수의 외부에서 콜백 함수를 전달받은 함수

콜백 함수도 고차 함수에 전달되어 헬퍼 함수의 역할을 한다.

콜백 함수는 함수 외부에서 고차 함수 내부로 주입하기 때문에 자유롭게 교체할 수 있다는 장점. → **고차함수는 콜백함수를 자신의 일부분으로 합성**

고차함수는 매개변수를 통해 전달받은 콜백함수의 호출 시점을 결정해서 호출

→ 콜백 함수는 고차함수에 의해 호출되며, 이때 고차 함수는 필요에 따라 콜백 함수에 인수를 전달할 수 있다.

고차함수에 콜백함수를 전달할 때 콜백함수를 호출하지 않고 함수 자체를 전달해야 함

<br>


```jsx
// 익명 함수 리터럴을 콜백 함수로 고차 함수에 전달
// 익명 함수 리터럴은 repeat 함수를 호출할 때마다 평가되어 함수 객체를 생성
repeat(5, function (i) {
	if (i % 2) console.log(i);
});  // 1 3
```

→ 이때 콜백함수로서 전달된 함수 리터럴은 고차함수가 호출될때마다 평가되어 함수 객체를 생성

콜백함수를 다른 곳에서도 호출할 필요가 있거나, 콜백함수를 전달받는 함수가 자주 호출되면, 함수 외부에서 콜백 함수를 정의한 후 함수 참조를 고차함수에 전달하는것이 효율적.

<br>


```jsx
// logOdds 함수는 단 한번만 생성됨
var logOdds = function (i) {
	if (i % 2) console.log(i);
};

// 고차함수에 함수 참조를 전달
repeat(5, logOdds);   // 1 3 
```

→ `logOdds` 함수는 단 한번만 생성됨

콜백함수를 익명함수 리터럴로 정의하면서 바로 고차함수에 전달하면 고차함수가 호출될때마다 콜백함수 생성.

<br>

콜백함수는 비동기 처리(이벤트 처리, Ajax 통신, 타이머 함수 등)에 활용됨

```jsx
// 콜백함수를 사용한 이벤트 처리
// myButton 버튼을 클릭하면 콜백함수를 실행한다.
document.getElementById('myButton').addEventListener('click', function () {
	console.log('button clicked!');
});

// 콜백함수를 사용한 비동기 처리
// 1초 후에 메시지 출력
setTimeout(function () {
	console.log('1초 경과');
}, 1000);
```

<br>

배열 고차함수에서 사용되는 콜백함수

```jsx
// 콜백 함수를 사용하는 고차 함수 map
var res = [1, 2, 3].map(function (item) {
	return item * 2;
});
console.log(res);  // [2, 4, 6]

// 콜백 함수를 사용하는 고차 함수 filter
res = [1, 2, 3].filter(function (item) {
	return item % 2;
});
console.log(res);  // [1, 3]

// 콜백함수를 사용하는 고차 함수 reduce
res = [1, 2, 3].reduce(function (acc, cur) {
	return acc + cur;
}, 0);
console.log(res);   // 6
```