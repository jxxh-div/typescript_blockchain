const name = "jaehwan",
    age = 25,
    gender = "man"

const sayHi = (name, age, gender?) => { 
    //gender에 ?를 붙이면 선택적 파라미터가 된다. 
    //?가 없다면 함수 호출에서 모든 파라미터를 부르지 않아서 오류가 뜬다.
    console.log(`hello ${name}, ${age},${gender}`)
}

sayHi(name, age);

export {};