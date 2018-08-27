import * as _ from 'partial-js';
import { BehaviorSubject } from 'rxjs';
import { appendToSubject} from './codeSnippet';

const $ = document.addEventListener;
const qs = document.querySelector.bind(document);

$("DOMContentLoaded", e => {
  console.log("DOMLoaded");
  // 상태정의
  const hash = new BehaviorSubject("");
  const things = new BehaviorSubject([]);

  $("hashchange", e => {
    const hashPath = location.hash.replace("#/", "");

    hash.next(hashPath);
  });

  qs(".new-todo").addEventListener("keyup", e => {
    if (e.key === "Enter") {
        const val = e.target.value;

        e.target.value = "";
        appendToSubject(things, {
          thing: val,
          checked: false,
        });
    }
  });
});