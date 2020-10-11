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

import * as CryptoJS from "crypto-js";

class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    static calculateBlockHash = (
        index:number, 
        previousHash: string, 
        timestamp: number,
        data: string
        ):string => 
        CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

    static validateStructure = (aBlock : Block) : boolean => 
        typeof aBlock.index === "number" && 
        typeof aBlock.hash === "string" && 
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.timestamp === "number" &&
        typeof aBlock.data === "string";

    constructor(
            index: number,
            hash: string,
            previousHash: string,
            data: string,
            timestamp: number
        )
        {
            this.index = index;
            this.hash = hash;
            this.previousHash = previousHash;
            this.data = data;
            this.timestamp = timestamp;
        }
}


//:type
//public으로 타입을 지정해준 부분을 선언하는 것.
const genisisBlock:Block = new Block(0, "02020202", "", "Hi!!", 123456);

let blockchain: Block[] = [genisisBlock];

//blockchain.push("woghks"); //타입이 블럭이 아니라서 불가능하다는것.

const getBlockchain = () : Block[] => blockchain;

const getLatestBlock = () : Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000) ;

const createNewBlock = (data:string): Block => {
    const previousBlock : Block = getLatestBlock();
    const newIndex : number = previousBlock.index + 1;
    const newTimeStamp : number = getNewTimeStamp();
    const nextHash : string = Block.calculateBlockHash(
        newIndex, 
        previousBlock.hash,
        newTimeStamp,
        data);
    const newBlock : Block = new Block(
        newIndex, 
        nextHash, 
        previousBlock.hash, 
        data,
        newTimeStamp
    );
    addBlock(newBlock);
    return newBlock;
}

const getHashforBlock = (aBlock: Block) :string => 
    Block.calculateBlockHash(
        aBlock.index, 
        aBlock.previousHash,
        aBlock.timestamp,
        aBlock.data
        );

const isBlockValid = (candidateBlock : Block, previousBlock : Block) : boolean => {
    if(!Block.validateStructure(candidateBlock)){
        return false;
    } else if(previousBlock.index + 1 !== candidateBlock.index){
        return false;
    } else if(previousBlock.hash !== candidateBlock.previousHash){
        return false;
    } else if(getHashforBlock(candidateBlock) !== candidateBlock.hash){
        return false;
    } else {
        return true;
    }
};
//아무것도 리턴하지 않을때 void
const addBlock = (candidateBlock : Block) : void => {
    if(isBlockValid(candidateBlock, getLatestBlock())){
        blockchain.push(candidateBlock);
    }
}

createNewBlock("block1");
createNewBlock("block22");
createNewBlock("block333");

console.log(blockchain);


export {};