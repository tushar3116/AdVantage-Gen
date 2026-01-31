
let arr=[1,2,3,4,5];
function gretest(arr){
    let maxNum=0;
    for(let i=0;i<arr.length;i++){
        if(arr[i]>arr[i-1]){
            maxNum=arr[i];
        }else{
            maxNum;
        }
    }
    return maxNum;
}
//let str="abch";
function uniqueCharacter(str){
    let ans="";
    for(let i=0;i<str.length;i++){
        let ch=str[i];
        if(ans.indexOf(ch)==-1){
            ans+=ch;
        }
    }
    return ans;
}
let array=["delhi","chhatisgarh","odisha","kolkata"];
function maxSize(array){
    let ansIdx=0;
    for(let i=0;i<array.length;i++){
         let ansLen=array[ansIdx].length;
         let currLength=array[i].length;
         if(ansLen<currLength){
            ansIdx=i;
         }
    }
    return array[ansIdx];
}
let str="abc";
function countVowels(str){
    let count =0;
    for(let i=0;i<str.length;i++){
        if(str.charAt(i)=="a"||
           str.charAt(i)=="e"||
           str.charAt(i)=="o"||
           str.charAt(i)=="i"||
           str.charAt(i)=="u"){
            count++;
        }
    }
    return count;
}
let start=10;
let end=20;
function randomNum(start,end){
    let diff=end-start;
    return Math.floor(Math.random()*diff)+start;
}
let number=2;
let squareNum=(number) => {
    return number*number;
};
let id=setInterval(() => {
    console.log("hello world")
}, 2000);
setTimeout(() => {
    clearInterval(id);
}, 10000);
//dont why error occured......
let avgOfArray=(arr)=>{
    let sumOfArray=0;
    for(let i=0;i<arr.length;i++){
        let sumOfArray=sumOfArray+arr[i];
    }
    let avgNum=sumOfArray/arr.length;
    return avgNum;
}
let isEven=(number)=>{
    if(number%2==0){
        console.log("the number is even");
    }else{
        console.log("the number is odd");
    }
}
//Assignment question...part 7.
let sq=arr.map(el=>el*el);
console.log(sq);
let sum=arr.reduce((res,el)=>res+el,0);
console.log(sum);
let avg=sum/arr.length;
console.log(avg);
let plus=arr.map(el=>el+5);
console.log(plus);
let uperr=array.map(el=>el.toUpperCase);
console.log(uperr);
   