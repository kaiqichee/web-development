//I pledge my honor that I have abided by the Stevens Honor System.
function checkIsObj(obj){
    if (typeof obj === 'object' && obj !== null && Array.isArray(obj) === false){
        return true;
    }
    else {
        return false;
    }
}

function makeArrays(array){
    if (array === undefined) throw 'Error: Argument is undefined';
    else if (Array.isArray(array) === false) throw 'Error: Arugment must be an array';
    else if (array.length < 2) throw 'Error: Array must contain at least 2 elements';
    array.forEach((a) => {
        if (checkIsObj(a) === false){
            throw 'Error: Array contains non-object item';
        }
        else{
            if (Object.keys(a).length === 0){
                throw 'Error: Array contains empty object';
            }
        }
    });
    let resO1=[];
    let temp=[];
    let k=[];
    array.forEach((obj) => {
        k=Object.keys(obj);
        for (i=0; i<k.length; i++){
            temp.push(k[i]);
            temp.push(obj[k[i]]);
            resO1.push(temp);
            temp=[];
         }
    });
    return resO1;
}

function isDeepEqual(obj1, obj2){
    if (obj1 == undefined) throw 'Error: Argument not provided';
    else if (obj2 == undefined) throw 'Error: Argument not provided';
    else if(checkIsObj(obj1) === false) throw 'Error: First argument must be an object';
    else if(checkIsObj(obj2) === false) throw 'Error: Second argument must be an object';

    let len1=Object.keys(obj1).length;
    let len2=Object.keys(obj2).length;
    if (len1 !== len2){
        return false;
    }
    else if (len1 === 0) {
        return true;
    }
    else{
        for (const i in obj1){
            let temp1=obj1[i];
            let temp2=obj2[i];
            delete obj1[i];
            delete obj2[i];
            if ((typeof temp1=="object") && (typeof temp2=="object")){
                return isDeepEqual(temp1, temp2) && isDeepEqual(obj1, obj2);
            }
            else{
                return (temp1===temp2) && isDeepEqual(obj1, obj2);
            }
        }
    }
}

function computeObject(object, func){
    if (checkIsObj(object) === false) throw 'Error: First argument must be an object';
    else if (Object.keys(object).length<1) throw 'Error: Object must contain at least 1 key/value';
    else if (typeof func !== 'function') throw 'Error: Second argument must be a function';
    for (const x in object) {
        if (typeof object[x] !== 'number'){
            throw 'Error: Object contains non-number value';
        }
    }
    let k=Object.keys(object);
    let resO3={};

    for (i=0; i<k.length; i++){
        resO3[k[i]]=func(object[k[i]]);
    }
    return resO3;

}

module.exports = {
    description: "These are object utilities",
    makeArrays,
    isDeepEqual,
    computeObject
}



