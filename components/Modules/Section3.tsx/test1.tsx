import React from 'react';

function test1() {
  const a = [1, 3, 5, 2, 4];
  const arr2 = [];

  for (let i = 0; i < a.length; i += 2) {
    let newVar = 0;
    newVar = a[i];
    arr2.push(newVar);
  }

  console.log(arr2);
  return <div>test1</div>;
}

export default test1;
