//I pledge my honor that I have abided by the Stevens Honor System.
const people = require("./people");
const work = require("./work");

async function main(){
    // try{
    //     const peopledata = await people.getPeople();
    //     console.log (peopledata);
    // }catch(e){
    //     console.log (e);
    // }
    // try{
    //     const workdata = await work.getWork();
    //     console.log (workdata);
    // }catch(e){
    //     console.log (e);
    // }

    //getPersonById tests
    try{
        const person = await people.getPersonById(33);
        console.log(person);
    }
    catch(e){
        console.log(e);
    }
    try{
        const person = await people.getPersonById(-1);
        console.log(person);
    }
    catch(e){
        console.log(e);
    }

    //howManyPerState tests
    try{
        const state = await people.howManyPerState("NY");
        console.log(state);
    }
    catch(e){
        console.log(e);
    }
    try{
        const state = await people.howManyPerState("WY");
    }
    catch(e){
        console.log(e);
    }

    //personByAge tests
    try{
        const person = await people.personByAge(999);
        console.log(person);
    }
    catch(e){
        console.log(e);
    }
    try{
        const person = await people.personByAge(-2);
    }
    catch(e){
        console.log(e);
    }

    //peopleMetrics test
    try{
        const metrics = await people.peopleMetrics();
        console.log(metrics);
    }
    catch(e){
        console.log(e);
    }

    //listEmployees test
    try{
        const employees = await work.listEmployees();
        console.log("Listed Employees");
        //console.log(employees[0]);
        //console.log(employees);
    }
    catch(e){
        console.log(e);
    }

    //fourOneOne tests
    try{
        const company = await work.fourOneOne('240-144-7553');
        console.log(company);
    }
    catch(e){
        console.log(e);
    }
    try{
        const company = await work.fourOneOne('240-1447-553');
    }
    catch(e){
        console.log(e);
    }

    //whereDoTheyWork tests
    try{
        const person = await work.whereDoTheyWork('299-63-8866');
        console.log(person);
    }
    catch(e){
        console.log(e);
    }
    try{
        const person = await work.whereDoTheyWork();
    }
    catch(e){
        console.log(e);
    }
}

//call main
main();

