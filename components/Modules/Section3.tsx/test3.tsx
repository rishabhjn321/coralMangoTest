import React from 'react';

function test3() {
  const a = [1, 3, 5, 2, 4];
  const arr2 = [];

  for (let i = 0; i < a.length; i += 2) {
    let newVar = 0;
    newVar = a[i] * a[i];
    arr2.push(newVar);
  }

  console.log(arr2);
  return <div>test3</div>;
}

export default test3;
