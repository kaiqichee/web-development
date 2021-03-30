//I pledge my honor that I have abided by the Stevens Honor System.
function checkA(x){
    if (x===undefined) throw 'Error: Parameter is undefined';
    else if (x.length===0) throw 'Error: Parameter is empty';
    else if (Array.isArray(x) === false) throw 'Error: Parameter is not of the proper type';
    else{
        x.forEach((num) => {
            if (typeof num !== 'number') throw 'Error: Non-number argument provided';
        });
    }
}

function checkA2(x){
    if (x===undefined) throw 'Error: Parameter is undefined';
    else if (Array.isArray(x) === false) throw 'Error: Parameter is not of the proper type';
    else{
        x.forEach((num) => {
            if ((typeof num !== 'number') && (typeof num !== 'string')) throw 'Error: Non-valid argument provided';
        });
    }
}

function checkI(y){
    if (typeof y !== 'number') throw 'Error: Parameter is of the wrong type';
    else if (y<=0) throw 'Error: End value must be greater than 0';
}

function checkA3(x){
    if (x === undefined) throw 'Error: Parameter is undefined';
    else if (Array.isArray(x) === false) throw 'Error: Parameter is of the wrong type';
}

function mean(array){
    checkA(array);
    let res1=0;
    let count=0;
    array.forEach((num) => {
        res1=res1+num;
        count++;
    });
    return (Math.round((res1/count)*100))/100;
}

function medianSquared(array){
    checkA(array);
    array=array.sort((x,y) => x-y);
    let ind=0;
    let res2=0;
    if(array.length%2==0){
        ind=(Math.round(array.length/2));
        res2=Math.pow(((array[ind]+array[ind-1])/2), 2);
    }
    else{
        ind=(Math.round(array.length/2))-1;
        res2=Math.pow(array[ind], 2);
    }
    return (Math.round(res2*100))/100;
}

function maxElement(array){
    checkA(array);
    let res3={};
    let value=0;
    let ind=0;
    let count=0;
    array.forEach((num) => {
        if (num>value){
            value=num;
            ind=count;
        }
        count++;
    });
    res3[value]=ind;
    return res3;
}

function fill(end, value){
    if (end==undefined && value==undefined) throw 'Error: Parameter is undefined';
    checkI(end);
    let res4=[];
    if (value==undefined){
        for (i=0; i<end; i++){
            res4.push(i);
        }
    }
    else{
        for (i=0; i<end; i++){
            res4.push(value);
        }
    }
    return res4;
}

function countRepeating(array){
    checkA2(array);
   let size=array.length;
   let count=1;
   let res5={};
   for (i=0; i<size-1; i++){
       for (j=i+1; j<size; j++){
        if (array[i]==array[j])
            count++;
       }
       if(!(array[i] in res5) && count>1){
        res5[array[i]]=count;
       }
       count=1;
   }
   return res5;
}

function isEqual(arrayOne, arrayTwo){
    checkA3(arrayOne);
    checkA3(arrayTwo);
    if (arrayOne.length !== arrayTwo.length){
        return false;
    }
    else if (arrayOne.length === 0) {
        return true;
    }
    else{
        arrayOne=arrayOne.sort();
        arrayTwo=arrayTwo.sort();
        if ((Array.isArray(arrayOne[0])==true) && (Array.isArray(arrayTwo[0])==true)){
            return isEqual(arrayOne[0], arrayTwo[0]) && isEqual(arrayOne.slice(1, arrayOne.length), arrayTwo.slice(1, arrayTwo.length));
        }
        else{
            return (arrayOne[0]===arrayTwo[0]) && isEqual(arrayOne.slice(1, arrayOne.length), arrayTwo.slice(1, arrayTwo.length));
        }
    }
}

module.exports = {
    description: "These are array utilities",
    mean,
    medianSquared,
    maxElement,
    fill,
    countRepeating,
    isEqual 
}

