import * as _ from 'partial-js';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { appendToSubject, createChild, FILTER_BASE } from './codeSnippet';

const $ = document.addEventListener;
const qs = document.querySelector.bind(document);

$("DOMContentLoaded", e => {
  console.log("DOMLoaded");
  // 상태정의, CELL 개념
  const hash = new BehaviorSubject("");
  const things = new BehaviorSubject([]);
  const viewList = new BehaviorSubject([]);
  // 자주쓰는 Element
  const list = qs(".todo-list");
  const execThingsSubscribe = () => { things.next(things.getValue()) };

  viewList.subscribe(_.each(item => list.appendChild(item.el)));
  things.subscribe(
    _.pipe(
      val => {
        list.innerHTML = "";
        return val;
      },
      _.filter(item => (hash.getValue() === "") ?
        true : item.checked === FILTER_BASE[hash.getValue()]),
        viewList.next.bind(viewList)
    )
  );
  hash.subscribe(execThingsSubscribe);

  const sChangeHash = fromEvent(window, "hashchange").subscribe(
    () => {
      const hashPath = location.hash.replace("#/", "");

      hash.next(hashPath);
    }
  );
  const sInput = fromEvent(qs(".new-todo"), "keyup")
    .pipe(filter(e => e.key === "Enter" && e.target.value !== ""))
    .subscribe(e => {
      const val = e.target.value;
      const item = {
        thing: val,
        checked: false,
        el: createChild(val)
      };

      item.el.addEventListener("click", event => {
        item.checked = event.target.checked;
        execThingsSubscribe();
      });
      e.target.value = "";
      appendToSubject(things, item);
    });

  qs(".clear-completed").addEventListener("click", e => {
    things.next([]);
  });
});