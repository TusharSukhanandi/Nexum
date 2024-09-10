let isThereError = 0

function sendMail(callback){
callback(errorThrower())
}

function errorThrower(){
    return "there is an error"
}

let isError ;


sendMail((err) => {
if(err){
    isError = true
   return 
}
isError = false
return 
    
})


console.log(isError);
