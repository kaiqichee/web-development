//I pledge my honor that I have abided by the Stevens Honor System.
const lab1 = require("./lab1");

//questionOne
console.log(lab1.questionOne([-4, 5, 6, 1, 0, -232])); 
//returns and outputs: {'-4': false, '5': true, '6': false, '1': false, '0': false, '-232': false} 

console.log(lab1.questionOne([244, 20, 9, 51])); 
//returns and outputs: {'244': false, '20': false, '9': false, '51': false} 

console.log(lab1.questionOne([7, 13, 23, 27, 31, 43]));
//returns and outputs: {'7': true, '13': true, '23': true, '27': false, '31': true, '43': true} 

console.log(lab1.questionOne([9, 4, 8, 20004, 2021, 3]));
//returns and outputs: {'4': false, '8': false, '20004': false, '2021': false, '3': true} 
 
console.log(lab1.questionOne([]));
//returns and outputs: {}

console.log(lab1.questionOne());
//returns and outputs: {}


//questionTwo
console.log(lab1.questionTwo([1,5,9]));
//returns and outputs: 118429.38

console.log(lab1.questionTwo([10,20,30]));
//returns and outputs: 73336484.78

console.log(lab1.questionTwo([17,103,41]));
//returns and outputs: 17746605401.59

console.log(lab1.questionTwo([21,100,36]));
//returns and outputs: 14924258455.25
 
console.log(lab1.questionTwo([23,23,23]));
//returns and outputs: 100332657.82 

console.log(lab1.questionTwo([]));
//returns and outputs: 0

console.log(lab1.questionTwo());
//returns and outputs: 0 


//questionThree
console.log(lab1.questionThree("beEpb0pbOop!")); 
// returns and outputs: {consonants: 6, vowels: 4, numbers: 1, spaces: 0, punctuation: 1, specialCharacters: 0}

console.log(lab1.questionThree("Hello th3r3, h0w a*r*e y#2? GOOd{}byE?!"));
// returns and outputs: {consonants: 14, vowels: 7, numbers: 4, spaces: 5, punctuation: 6, specialCharacters: 3}

console.log(lab1.questionThree("2021 Has to b bE!@#$^^&tter th@n 2;0',2[0]."));
// returns and outputs: {consonants: 11, vowels: 4, numbers: 8, spaces: 6, punctuation: 7, specialCharacters: 7}

console.log(lab1.questionThree(""));
// returns and outputs: {consonants: 0, vowels: 0, numbers: 0, spaces: 0, punctuation: 0, specialCharacters: 0}

console.log(lab1.questionThree("00000 ..... ***** qqqqq AAAAA "));
// returns and outputs: {consonants: 5, vowels: 5, numbers: 5, spaces: 5, punctuation: 5, specialCharacters: 5}

console.log(lab1.questionThree());
// returns and outputs: {consonants: 0, vowels: 0, numbers: 0, spaces: 0, punctuation: 0, specialCharacters: 0}

//questionFour
console.log(lab1.questionFour(100, 2.5, 20));
//returns and outputs: 0.53

console.log(lab1.questionFour(350000, 4.32, 4));
//returns and outputs: 7952.89
 
console.log(lab1.questionFour(12345, 6.78, 9));
//returns and outputs: 153.02

console.log(lab1.questionFour(40500, 3.21, 7));
//returns and outputs: 538.98

console.log(lab1.questionFour(75000, 5.2, 12));
//returns and outputs: 701.22

