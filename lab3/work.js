//I pledge my honor that I have abided by the Stevens Honor System.
const axios = require('axios');

async function getWork(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json')
    const parsedData = data;
    return parsedData;
}

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

function getById(id, data){
    if (id === undefined) throw 'Error: Argument is undefined';
    else if (typeof id !== 'number') throw 'Error: Argument must be a number';
    else if (id<getMin(data) || id>getMax(data)) throw 'Error: ID out of range';
    let x={};
    data.forEach((element) => {
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


async function listEmployees(){
    let work = await getWork();
    let ppl = await getPeople();
    let res = [];
    let temp = {};
    let employees = [];
    let person = {};
    for (const element in work) {
        temp={};
        employees = [];
        let emps=work[element]["employees"];
        for (const id in emps){
            person={};
            let personTemp = await getById(emps[id], ppl);
            person.first_name=personTemp['first_name'];
            person.last_name=personTemp['last_name'];
            employees.push(person);
        }
        temp["company_name"]=work[element]["company_name"];
        temp["employees"]=employees;
        res.push(temp);
    }
    return res;
}

function format(string){
    let temp='';
    let temp2='';
    for (const x in string){
        if (!isNaN(string[x])){
            temp2='#';
        }
        else {
            temp2=string[x];
        }
        temp=temp+temp2;
    }
    return temp;
}

async function fourOneOne(phoneNumber){
    if (phoneNumber===undefined) throw 'Error: Parameter is undefined';
    else if (typeof phoneNumber !== 'string') throw 'Error: Argument is not of type string';
    else if (format(phoneNumber)!=='###-###-####') throw 'Error: Incorrect input format';
    let work = await getWork();
    let res2={};
    work.forEach((element) => {
        if (element["company_phone"] === phoneNumber){
            res2.company_name=element["company_name"];
            res2.company_address=element["company_address"];
        }
    });
    if (Object.keys(res2).length===0) throw 'Error: Phone number not found';
    else{
        return res2;
    }
}

async function whereDoTheyWork(ssn){
    if (ssn===undefined) throw 'Error: Parameter is undefined';
    else if (typeof ssn !== 'string') throw 'Error: Argument is not of type string';
    else if (format(ssn)!=='###-##-####') throw 'Error: Incorrect input format';
    let peopleData = await getPeople();
    let work = await getWork();
    let found={};
    let res3="";
    peopleData.forEach((ppl) => {
        if (ppl["ssn"] === ssn){
            found=ppl;
        }
    });
    work.forEach((item) => {
        if (item["employees"].includes(found["id"])){
            res3=`${found["first_name"]} ${found["last_name"]} works at ${item["company_name"]}.`;
            return res3;
        }
    });
    if (Object.keys(res3).length===0) throw 'Error: ID not found';
    else{
        return res3;
    }
}

module.exports = {
    listEmployees,
    fourOneOne,
    whereDoTheyWork
}