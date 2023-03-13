import React from 'react'

function test2() {

    const a = [1, 3, 5, 2, 4];
    const arr2=[];

    for (let i=0; i<a.length; i++)
{
    let newVar=0;
     newVar = a[i]*a[i];
     arr2.push(newVar);
}

  return (
    <div>
            console.log(arr2);
    </div>
  )
}

export default test2

