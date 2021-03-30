//I pledge my honor that I have abided by the Stevens Honor System.
const questionOne = function questionOne(arr) {
    let res={};
    if(arr=="" || arr==undefined){
        return res;
    }
    else{
        arr.forEach((num)=>{
            let prime=true;
            if(num<=1){
                res[num]=false;
            }
            else{
            for(let i=2; i<num; i++){
                if(num%i===0){
                    prime=false;
                }
            }
                res[num]=prime;
            }
        });
        return res;
    }
}

const questionTwo = function questionTwo(arr) { 
    let res2=0;
    if(arr==undefined){
        return res2;
    }
    arr.forEach((num)=>{res2=res2+(num*num)});
    res2=Math.pow(res2,5);
    res2=Math.sqrt(res2);
    if(res2===0){
        return res2;
    }
    else{
        return (Math.round((res2*100)))/100;
    }
}

const questionThree = function questionThree(text) {
    let alph=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    let vowA=["a","e","i","o","u"];
    let numA=["1","2","3","4","5","6","7","8","9","0"];
    let puncA=[".", ",", "?", "!", ":", ";", "-", "[", "]", "{", "}", "(", ")", "'"];
    let con=0;
    let vow=0;
    let num=0;
    let spaces=0;
    let punc=0;
    let sc=0;
    let res3={};
    if(text==undefined){
        res3.consonants=con;
        res3.vowels=vow;
        res3.numbers=num;
        res3.spaces=spaces;
        res3.punctuation=punc;
        res3.specialCharacters=sc;
    }
    else{
        for(let item in text){
            if(alph.includes(text[item].toLowerCase())){
                if(vowA.includes(text[item].toLowerCase())){
                    vow++;
                }
                else{
                    con++;
                }
            }
            else if(numA.includes(text[item])){
                num++;
            }
            else if(text[item]===" "){
                spaces++;
            }
            else if( puncA.includes(text[item])){
                punc++;
            }
            else{
                sc++;
            }
        }
        res3.consonants=con;
        res3.vowels=vow;
        res3.numbers=num;
        res3.spaces=spaces;
        res3.punctuation=punc;
        res3.specialCharacters=sc;
    }
    return res3;
}

const questionFour = function questionFour(num1, num2,num3) {
    let n=12*num3;
    let r=(num2/100)/12;
    let d=((Math.pow((1+r),n))-1)/(r*(Math.pow((1+r),n)));
    let p=num1/d;
    return (Math.round((p*100)))/100
}

module.exports = {
    firstName: "Kaiqi", 
    lastName: "Chee", 
    studentId: "10451613",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};











