function appendToSubject(subject, val) {
    const prevVal = subject.getValue();

    prevVal.push(val);
    subject.next(prevVal);
    return;
}

export {
    appendToSubject
};