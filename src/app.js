import * as _ from 'partial-js';

window._debug ;
$on(document, 'DOMContentLoaded', () => {
  console.log('dom loaded')
  $on(qs('.new-todo'), 'keyup', (e) => {
    if(e.which == 13)
      _.go(
        e.target,
        inputClear,
        addItem,
      );
  });
})

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

window._debug = appendElement;
const makeItem = (val) => {
  return _.go(
    document.createElement.call(document, 'li'),
    appendElement({class: 'toggle', type: 'checkbox'}, 'input'),
    appendElement({txt: val}, 'label'),
    appendElement({class: "destroy"}, 'button')
  )
}

window._debug = curry;

function appendList(el) {
  qs('.todo-list').append(el);
}

const addItem =  _.pipe(
    // txt => element
    makeItem,
    // append element to dom
    appendList
  )
