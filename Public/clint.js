const socket=io(); 

let name;
let textarea=document.querySelector("#textarea")
let messagearea=document.querySelector(".messagearea")

do {

     name=prompt(`please enter your name:${name}`)
    
} while (!name); 



textarea.addEventListener("keyup",(e)=>{
if(e.key==="Enter"){
    sendMessage(e.target.value) 
}

})


function sendMessage(message){
    let msg={
        user:name,
        message:message.trim()

    }
// console.log(msg);
    // append 
     
    appendMessage(msg,"outgoing")
  textarea.value=""
  scrolltobottom()
    // send to server
    socket.emit("message",msg)


}
function appendMessage(msg,type){
     let mainDiv=document.createElement("div")
     let className=type
     mainDiv.classList.add(className,"message")

     let markup=`<h4>${msg.user}</h4>
     <p>${msg.message}</p>`
     mainDiv.innerHTML=markup
     messagearea.appendChild(mainDiv)

}


// recieve message
socket.on("message",(msg)=>{
// console.log(msg);
appendMessage(msg,"incoming")
scrolltobottom()
})


function scrolltobottom(){
    messagearea.scrollTop=messagearea.scrollHeight
}

