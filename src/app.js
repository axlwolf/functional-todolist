import * as _ from 'partial-js';
import { BehaviorSubject } from 'rxjs';

const $ = document.addEventListener;

$("DOMContentLoaded", e => {
  console.log("DOMLoaded");
  // 상태정의
  const hash = new BehaviorSubject("");
  const things = new BehaviorSubject([]);

  $("hashchange", e => {
    const hashPath = location.hash.replace("#/", "");

    hash.next(hashPath);
  });
});