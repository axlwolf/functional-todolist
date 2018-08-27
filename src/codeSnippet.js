function appendToSubject(subject, val) {
    const prevVal = subject.getValue();

    prevVal.push(val);
    subject.next(prevVal);
    return;
}

function createChild(thing) {
    const el = document.createElement("li");
    el.innerHTML =`
        <input class="toggle" type="checkbox">
        <label>${thing}</label>
        <button class="destroy"></button>
    `;
    return el;
}

const FILTER_BASE = {
    "active": false,
    "completed": true
}

export {
    appendToSubject,
    createChild,
    FILTER_BASE
};