//I pledge my honor that I have abided by the Stevens Honor System.
function checkS(string){
    if (string===undefined) throw 'Error: Parameter is undefined';
    else if (string.length === 0) throw 'Error: String length must be greater than 0';
    else if (typeof string !== 'string') throw 'Error: Argument is not of type string';
    let l=string.length;
    let count=0;
    for (const x in string){
        if (string[x]===" "){
            count++;
        }
    }
    if (count===l) throw 'Error: String must not be all spaces';
}

function checkS2(string){
    if (string==undefined) throw 'Error: Parameter is undefined';
    else if (string.length < 2) throw 'Error: String length must be at least 2';
    else if (typeof string !== 'string') throw 'Error: Argument is not of type string';
    let l=string.length;
    let count=0;
    for (const x in string){
        if (string[x]===" "){
            count++;
        }
    }
    if (count===l) throw 'Error: String must not be all spaces';
}

function camelCase(string){
    checkS(string);
    string=string.trim();
    let temp=string.split(" ");
    let resS1="";
    for (i=0; i<temp.length; i++){
        temp[i]=temp[i].toLowerCase();
        if (i!=0){
            temp[i]=temp[i].substr(0,1).toUpperCase()+temp[i].substr(1,temp[i].length);
        }
        resS1=resS1+temp[i];
    }
    return resS1;
}

function replaceChar(string){
    checkS(string);
    string=string.trim();
    let start=string[0].toLowerCase();
    let holder=true;
    let temp="";
    let resS2=string.substr(0,1);
    for (i=1; i<string.length; i++){
        if (string[i].toLowerCase()===start){
            if(holder==true){
                temp="*";
            }
            else{
                temp="$";
            }
            holder=!holder;
        }
        else{
            temp=string[i];
        }
        resS2=resS2+temp;

    }
    return resS2;
}

function mashUp(string1, string2){
    checkS2(string1);
    checkS2(string2);
    string1=string1.trim();
    string2=string2.trim();
    let resS3=`${string2.substr(0,2)}${string1.substr(2,string1.length)} ${string1.substr(0,2)}${string2.substr(2,string2.length)}`;
return resS3;
}

module.exports = {
    description: "These are string utilities",
    camelCase,
    replaceChar,
    mashUp
}



