"use strict";
// class Human {
//     //private를 쓰면 Human 클래스 내부에서만 호출이 가능하다.
//     public name: string;
//     public age: number;
//     public gender: string;
//     constructor(name:string, age:number, gender:string){
//         this.name = name
//         this.age = age
//         this.gender = gender
//     }
// }
// // interface Human {
// //     name:string,
// //     age:number,
// //     gender:string
// // }
Object.defineProperty(exports, "__esModule", { value: true });
// // const person ={
// //     name : "jaehwan",
// //     age : 25,
// //     gender : "man"
// // }
// const jaehwan = new Human("JaeHwan2",25,"man");
// const sayHi = (person:Human):string => { 
//     //gender에 ?를 붙이면 선택적 파라미터가 된다. 
//     //?가 없다면 함수 호출에서 모든 파라미터를 부르지 않아서 오류가 뜬다.
//    return `hello ${person.name}, ${person.age},${person.gender}`;
// }
// console.log(sayHi(jaehwan));
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calculateBlockHash = (index, previousHash, timestamp, data) => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
Block.validateStructure = (aBlock) => typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";
//:type
//public으로 타입을 지정해준 부분을 선언하는 것.
const genisisBlock = new Block(0, "02020202", "", "Hi!!", 123456);
let blockchain = [genisisBlock];
//blockchain.push("woghks"); //타입이 블럭이 아니라서 불가능하다는것.
const getBlockchain = () => blockchain;
const getLatestBlock = () => blockchain[blockchain.length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const newTimeStamp = getNewTimeStamp();
    const nextHash = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimeStamp, data);
    const newBlock = new Block(newIndex, nextHash, previousBlock.hash, data, newTimeStamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashforBlock = (aBlock) => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
const isBlockValid = (candidateBlock, previousBlock) => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
//아무것도 리턴하지 않을때 void
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
};
createNewBlock("block1");
createNewBlock("block22");
createNewBlock("block333");
console.log(blockchain);
//# sourceMappingURL=index.js.map