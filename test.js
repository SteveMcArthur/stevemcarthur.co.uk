
function saysomething(){
    console.log(this.msg);
}

let myObj = {
    msg: "My Object",
    say: saysomething
}


myObj.say();