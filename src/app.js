import * as _ from 'partial-js';
import { BehaviorSubject } from 'rxjs';

window._debug;

const addedTodoThing = new BehaviorSubject;

window._debug = curry;
window._ = _;

$on(document, 'DOMContentLoaded', () => {
  console.log('dom loaded');
  init();
  addedTodoThing.subscribe((arr) => {
      _.each(arr, _.pipe(
        curry_get('thingBody'),
        addItem
      ))
    }
  );

  $on(qs('.new-todo'), 'keyup', (e) => {
    console.log(`entered ${e.which}`);
    if(e.which == 13 && checkBlank(e.target.value)) {
      listClear(qs('.todo-list'));
      pushSubjectValues(genId(), e.target.value);
      inputClear(e.target);
    }
  });
})

function checkBlank(str) {
  return str.length > 0;
}

function listClear(el) {
  console.log('caall listClear', Array.from(el.children));
  _.each(Array.from(el.children), el.removeChild.bind(el));
}

const curry_get = curry(_get);

function _get(key, list) {
  return (list[key])? list[key] : undefined;
}

// uuid 따로 안쓰고 날짜로 단순하게
function genId() {
  return (new Date).toISOString().slice(0,23).replace(/-|:|\./g,"");
}

function loadSavedData() {
  return [];
}

function init() {
  addedTodoThing.next(loadSavedData());
}


/**
* TODO: subject에 값을 추가하는 함수
*
*
*/
function pushSubjectValues(id, thingBody) {
  let val = addedTodoThing.getValue();
  val.push({id, thingBody})
  addedTodoThing.next(val);
}


function curry(fn) {
  return (...xs) => {
    if (xs.length === 0) {
      throw Error('EMPTY INVOCATION');
    }
    if (xs.length >= fn.length) {
      return fn(...xs);
    }
    return curry(fn.bind(null, ...xs));
  };
}

/**
 * querySelector wrapper
 *
 * @param {string} selector Selector to query
 * @param {Element} [scope] Optional scope element for the selector
 */
function qs(selector, scope) {
	return (scope || document).querySelector(selector);
}

/**
 * addEventListener wrapper
 *
 * @param {Element|Window} target Target Element
 * @param {string} type Event name to bind to
 * @param {Function} callback Event callback
 * @param {boolean} [capture] Capture the event
 */
function $on(target, type, callback, capture) {
	target.addEventListener(type, callback, !!capture);
}

/**
 * Attach a handler to an event for all elements matching a selector.
 *
 * @param {Element} target Element which the event must bubble to
 * @param {string} selector Selector to match
 * @param {string} type Event name
 * @param {Function} handler Function called when the event bubbles to target
 *                           from an element matching selector
 * @param {boolean} [capture] Capture the event
 */
function $delegate(target, selector, type, handler, capture) {
	const dispatchEvent = event => {
		const targetElement = event.target;
		const potentialElements = target.querySelectorAll(selector);
		let i = potentialElements.length;

		while (i--) {
			if (potentialElements[i] === targetElement) {
				handler.call(targetElement, event);
				break;
			}
		}
	};

	$on(target, type, dispatchEvent, !!capture);
}

function inputClear(el) {
  let ret = el.value;
  el.value = '';
  return ret;
}

const appendElement = curry((attr, tag, el) => {
  let ret = document.createElement(tag);
  _.each(_.pairs(attr), (val) => {
    if(val[0] === 'txt') {
      ret.innerText = val[1];
    } else {
      ret.setAttribute(val[0], val[1]);
    }
  });
  el.append(ret);
  return el;
})

const makeItem = (val) => {
  return _.go(
    document.createElement.call(document, 'li'),
    appendElement({class: 'toggle', type: 'checkbox'}, 'input'),
    appendElement({txt: val}, 'label'),
    appendElement({class: "destroy"}, 'button')
  )
}

function appendList(el) {
  qs('.todo-list').append(el);
  return el;
}

const addItem =  _.pipe(
  // txt => element
  makeItem,
  // append element to dom
  appendList
)
