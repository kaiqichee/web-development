//I pledge my honor that I have abided by the Stevens Honor System.
const axios = require('axios');

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json');
    const parsedData = data; 
    return parsedData; 
}

function getMax(ppl){
    let max=0;
    ppl.forEach((element) => {
        if (element.id>max){
            max=element.id;
        }
    });
    return max;
}

function getMin(ppl){
    let min=getMax(ppl);
    ppl.forEach((element) => {
        if (element.id<min){
            min=element.id;
        }
    });
    return min;
}
async function getPersonById(id){
    let people = await getPeople();
    if (id === undefined) throw 'Error: Argument is undefined';
    else if (typeof id !== 'number') throw 'Error: Argument must be a number';
    else if (id<getMin(people) || id>getMax(people)) throw 'Error: ID out of range';
    let x={};
    people.forEach((element) => {
        if (element['id'] === id){
            x=element;
            return x;
        }
    });
    if (Object.keys(x).length===0) throw 'Error: ID not found';
    else {
        return x;
    }
}

async function howManyPerState(stateAbbrv){
    if (stateAbbrv===undefined) throw 'Error: Parameter is undefined';
    else if (typeof stateAbbrv !== 'string') throw 'Error: Argument is not of type string';
    let count=0;
    let people = await getPeople();
    people.forEach((element) => {
        if (element['address']['state'] === stateAbbrv.toUpperCase()){
            count++;
        }
    });
    if (count === 0) throw `Error: No people live in ${stateAbbrv}`;
    else{
        return count;
    }
}

function findAge(x){
    let dob=new Date(x);
    let today=new Date();
    let age = Math.abs(today-dob);
    return Math.floor(age/31536000000);
}

async function personByAge(index){
    let people = await getPeople();
    if (index===undefined) throw 'Error: Parameter is undefined';
    else if (typeof index !== 'number') throw 'Error: Argument is not of type number';
    else if (index<0 || index>=people.length) throw 'Error: Index out of range';
    people=people.sort((x,y) => new Date(x.date_of_birth)-new Date(y.date_of_birth));
    let person={}
    person.first_name=people[index]["first_name"];
    person.last_name=people[index]["last_name"];
    person.date_of_birth=people[index]["date_of_birth"];
    person.age=findAge(people[index]["date_of_birth"]);
    return person;
}

function vowelCount(x){
    let vow=["a","e","i","o","u"];
    let count=0;
    for (i=0; i<x.length; i++){
        if (vow.includes(x[i].toLowerCase())){
            count++;
        }
    }
    return count;
}

function consCount(y){
    let cons= ["b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z"];
    ;
    let count=0;
    for (i=0; i<y.length; i++){
        if (cons.includes(y[i].toLowerCase())){
            count++;
        }
    }
    return count;
}

function cities(data){
    let s = {};
    let k=[];
    for (const element in data){
        let city=data[element]["address"]["city"];
        k=Object.keys(s);
        if(k.includes(city)){
            s[city]++;
        }
        else{
            s[city]=1;
        }
    }
    return s;
}

async function peopleMetrics(){
    let result={};
    let longestName=""
    let lengthLN=0;
    let shortestName="";
    let lengthSN=0;
    let age=0;
    let vowels=0;
    let consonants=0;
    let city="";
    let count=0;
    let people = await getPeople();
    people.forEach((element) => {
        count++;
        age=age+findAge(element['date_of_birth']);
        vowels=vowels+vowelCount(element['first_name'])+vowelCount(element['last_name']);
        consonants=consonants+consCount(element['first_name'])+consCount(element['last_name']);

        if ((element['first_name'].length+element['last_name'].length) > lengthLN){
            lengthLN = element['first_name'].length+element['last_name'].length;
            longestName = element['first_name']+" "+element['last_name'];
            lengthSN=lengthLN;
        }
        else if ((element['first_name'].length+element['last_name'].length) < lengthSN){
            lengthSN = element['first_name'].length+element['last_name'].length;
            shortestName = element['first_name']+" "+element['last_name'];
        }
    });
    let cityCount=0;
    let cityList=cities(people);
    for(const c in cityList){
        if (cityList[c] > cityCount){
            cityCount=cityList[c];
            city=c;
        }
    }
    result.totalLetters=consonants+vowels;
    result.totalVowels=vowels;
    result.totalConsonants=consonants;
    result.longestName=longestName;
    result.shortestName=shortestName;
    result.mostRepeatingCity=city;
    result.averageAge=(Math.round((age/count)*100))/100;
    return result;
}

module.exports = {
    getPersonById,
    howManyPerState,
    personByAge,
    peopleMetrics
}