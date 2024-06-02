# 디스트럭처링 할당

(= 구조 분해 할당)

구조화된 배열과 같은 이터러블 또는 객체를 destructuring(비구조화, 구조 파괴)하여 1개 이상의 변수에 개별적으로 할당하는 것

→ 배열과 같은 이터러블 또는 객체 리터럴에서 필요한 값만 추출하여 변수에 할당할 때 유용

## 배열 디스트럭처링 할당

배열 디스트럭처링 할당의 대상은 이터러블

할당 기준은 배열의 인덱스 = 순서대로 할당

```jsx
const arr = [1, 2, 3];

// ES6 배열 디스트럭처링 할당
// 변수 one, two, three를 선언하고 배열 arr을 디스트럭처링하여 할당한다.
// 이때 할당 기준은 배열의 인덱스다.
const [one, two, three] = arr;

console.log(one, two, three); // 1 2 3
```

배열과 같은 이터러블에서 필요한 요소만 추출하여 변수에 할당하고 싶을 때 유용

URL을 파싱하여 protocol, host, path 프로퍼티를 가지는 객체를 생성해 반환

```jsx
// url을 파싱하여 protocol, host, path 프로퍼티를 갖는 객체를 생성해 반환한다.
function parseURL(url = '') {
	// '://' 앞의 문자열(protocol)과 '/' 이전의 '/'로 시작하지 않는 문자열(host)과
	// '/' 이후의 문자열(path)을 검색한다.
	const parsedURL = url.match(/^(w+)://([^/]+)/(.*)$/);
	console.log(parsedURL);
	/*
	[
		'https://developer.mozilla.org/ko/docs/Web/JavaScript',
		   'https',
		    'developer.mozilla.org',
		       'ko/docs/Web/JavaScript',
		       index: 0,
		       input: 'https://developer.mozilla.org/ko/docs/Web/JavaScript',
		       groups: undefined
	]
	*/
  if (!parsedURL) return {};

  // 배열 디스트럭처링 할당을 사용하여 이터러블에서 필요한 요소만 추출한다.
	const [, protocol, host, path] = parsedURL;
	return { protocol, host, path };
}

const parsedURL = parseURL('https://developer.mozilla.org/ko/docs/Web/JavaScript');

console.log(parsedURL);
/*
{
			protocol: 'https',
			host: 'developer.mozilla.org',
			path: 'ko/docs/Web/JavaScript'
}
	*/
```

## 객체 디스트럭처링 할당

- 객체의 각 프로퍼티를 객체로부터 추출하여 1개 이상의 변수에 할당
- 할당의 대상은 객체
- 할당 기준은 프로퍼티 키
- 순서 의미 X
- 선언된 변수 이름과 프로퍼티 키가 일치하면 할당됨

```jsx
const user = { firstName: "ung", lastName: "sdf" };

// ES6 객체 디스트럭처링 할당
// 변수 lastName, firstName을 선언하고 user 객체를 디스트럭처링하여 할당
// 이때 프로퍼티 키를 기준으로 디스트럭처링 할당이 이루어짐. 순서 의미 X
const { lastName, firstName } = user;

console.log(firstName, lastName); // ung sdf

const { lastName, firstName } = { firstName: "Ungmo", lastName: "Lee" };

// 프로퍼티 키를 기준으로 디스트럭처링 할당이 이루어진다
// 프로퍼티 키가 lastName인 프로퍼티 값을 ln에 할당
// 프로퍼티 키가 fisrtName인 프로퍼티 값을 fn에 할당
const { lastName: ln, firstName: fn } = user;

console.log(fn, ln); // Ungmo Lee
```

객체에서 프로퍼티 키로 필요한 프로퍼티 값만 추출하여 변수에 할당하고 싶을때 유용

```jsx
const str = "Hello";
// String 래퍼 객체로부터 length 프로퍼티만 추출한다.
const { length } = str;
console.log(length); // 5

const todo = { id: 1, content: "HTML", completed: true };
// todo 객체로부터 id 프로퍼티만 추출한다.
const { id } = todo;
console.log(id); // 1
```

중첩 객체 활용 방법

```jsx
const user = {
  name: "Lee",
  address: {
    zipCode: "03068",
    city: "Seoul",
  },
};

// address 프로퍼티 키로 객체를 추출하고 이 객체의 city 프로퍼티 키로 값을 추출한다.
const {
  address: { city },
} = user;
console.log(city); // 'Seoul'
```
