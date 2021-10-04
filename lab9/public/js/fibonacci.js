//I pledge my honor that I have abided by the Stevens Honor System.
let myForm = document.getElementById('form');
let index = document.getElementById('userInput');
let myUl = document.getElementById('results');
let myDiv = document.getElementById('error');

function check(num){
    if (num<0) throw 'Error: Index must be a positive number!';
}

function contains(array, term){
    for (x in array){
        if (x==term){
            return true;
        }
    }
    return false;
}

let memo={}
function fib(index){   
    if(index==0){
        return 0;
    }
    else if (index==1){
        return 1;
    }
    else if(index in memo){
        return memo[index];
    } 
    else{
        let temp=fib(index-1)+fib(index-2);
        memo[index]=temp;
        return temp;
    }
}

function isPrime(x){
    for (i=2; i<x; i++){
        if (x%i==0){
            return false;
        }
    }
    return true;
}

if (myForm) {
    myForm.addEventListener('submit', (event) => {
        event.preventDefault();
        try{
            if (index.value.trim()) {
                myDiv.focus
                let x=parseInt(index.value.trim());
                check(x);
                myDiv.hidden=true;
                let li = document.createElement('li');
                let result=fib(index.value);
                let prime=isPrime(result);
                li.innerHTML = `The Fibonacci of ${index.value} is ${result}.`;
                if(prime){
                    li.className="is-prime";
                }
                else{
                    li.className="not-prime";
                }
                myUl.appendChild(li);
                myForm.reset();
            }
            else{
                throw 'Error: Index must be not be empty!';
            }
        }
        catch(e){
            myDiv.hidden=false;
            myDiv.innerHTML = e;
        }
    });
}