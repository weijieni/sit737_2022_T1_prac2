console.log("Hello World")

var async = function(){
    setTimeout(function(){log("I am coming out later although I have been called before the next one.")},2000)
}

var log=function(msg){
    console.log("[Log] : ",msg)
}
var adder=function(first,second){
    var sum=first+second
    return sum
}

log("The sum is "+adder(5,6))
async();
log("This is going to come out before the previous one")
log("hello world")
log("welcome to SIT737")