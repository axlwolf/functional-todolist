# 함수형 프로그래밍 연습용 TodoList 만들기

## SPEC

**함수형프로그래밍을 하고, 더불어 반응형 프로그래밍**

* partial-js
* rxjs


## FLOW

* init: function = 초기화, 로컬에 저장 된 데이터도 가져와서 항시 유지되거나, 초기화 시켜주는 함수
* addedTodoThing: BehaviorSubject = 추가 된 모든 데이터를 기록, 모든 todoThing은 여기로 업데이트 되도록 한다.


**현재생각** init -> addedTodoThing (이부분에서 갈래로 퍼져나가서 상태관리를 하도록)




* 이하 todo mvc의 README
-----------

# Vanilla ES6 (ES2015) • [TodoMVC](http://todomvc.com)

> A port of the [Vanilla JS Example](http://todomvc.com/examples/vanillajs/), but translated into ES6, also known as ES2015.

## Learning ES6

- [ES6 Features](https://github.com/lukehoban/es6features)
- [Learning Resources](https://github.com/ericdouglas/ES6-Learning)
- [Babel's ES6 Guide](https://babeljs.io/docs/learn-es2015/)
- [Babel Compiler](https://babeljs.io/)

## Installation

To get started with this example, navigate into the example folder and install the NPM modules.
```bash
cd todomvc/examples/vanilla-es6
npm install
```

## Compiling ES6 to ES5

After NPM modules have been installed, use the pre-defined Babel script to convert the `src` files. Browserify is also used so that `module.exports` and `require()` can be run in your browser.

```bash
npm run compile
```

## Support

- [Twitter](http://twitter.com/lukeed05)

*Let us [know](https://github.com/tastejs/todomvc/issues) if you discover anything worth sharing.*


## Implementation

Uses [Google Closure Compiler](https://developers.google.com/closure/compiler/) to compile ES6 code to ES5, which is then readable by all browsers.


## Credit

Created by [Luke Edwards](http://www.lukeed.com)
Refactored by [Aaron Muir Hamilton](https://github.com/xorgy)
