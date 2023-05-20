

let socket = io();

let username="";
document.getElementById("join-btn").addEventListener('click',(event)=>{
    event.preventDefault();
    username=document.getElementById("username-input").value.trim();
    if(username!=''){
        document.querySelector(".form-username").style.display="none";
        document.querySelector(".chatroom-container").style.display="block"
        document.querySelector('.chatroom-header').innerText = "chatroom "+username;
    }
})

document.getElementById("send-btn").addEventListener('click',(event)=>{
    event.preventDefault();
    let data ={
        username:username,
        message:document.getElementById("input-message").value
    }
    socket.emit("message",data)
    addMessage(data,true);
})

socket.on("message",(data)=>{
    if(data.username!=username){
        addMessage(data,false)
    }
})
function addMessage(data,check){
    let msgDiv = document.createElement("div");
    msgDiv.innerText= `${data.username}: ${data.message}`
    if(check){
       msgDiv.setAttribute('class','message sent')
    }
    else{
        msgDiv.setAttribute('class','message recieved')
    }
    document.getElementById("message-container").appendChild(msgDiv);
    document.getElementById("input-message").value=''
}