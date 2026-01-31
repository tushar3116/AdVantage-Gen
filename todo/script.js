let arr=[1,2,3,4,5,6,3];
let num=3;
//for(let i=0;i<arr.length;i++){
    //if(arr[i]==num){
       // arr.splice(i,1);
   // }
//}
console.log(arr);
let number=123456;
let count=0;
let copy=number;
//while(number>0){
    //count++;
   // copy=Math.floor(copy/10);
//}
console.log(count);
const post={
    username:"kavita@123",
    password:"12345plk",
    likes:123,
    content:"this is my #firstpost",
    repost:3

};
let max=prompt("enter the max number");
let random=Math.floor(Math.random()*max)+1;
let guessing=prompt("guess the number");
while(true){
    if(guessing=="quit"){
        console.log("your quiting");
        break;
    }
    if(guessing==random){
        console.log("congrats you guess right!"+ random);
        break;
        //let p2=prompt("want to play again");
        //if(p2==yes){
           // let max=prompt("enter the max number");

       // }

    }else if(random<guessing){
        guessing=prompt("your guess is larg than the random value!!");
    }else if(random>guessing){
        guessing=prompt("your guess is smaller than the random value!!");
    }
    else{
        guess=prompt("your guess is wrong try again!!!");
    }
}
const car={
    name:"thar",
    model:"awe34",
    color:"purple"
};


