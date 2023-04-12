window.addEventListener("keydown", ({keyCode})=>{
    console.log(keyCode);
    switch (keyCode){
        case 87:
            if(player.velocity.y ===0 ) player.velocity.y = -15
            break;
        case 68:
            if(!isRoomOpen){
                keys.right.pressed = true
            }
            break;
        case 65:
            if(!isRoomOpen){
                keys.left.pressed = true
            }
            break;
    }
})

window.addEventListener("keyup", ({keyCode})=>{
    switch (keyCode){
        case 68:
            keys.right.pressed = false
            break;
        case 65:
            keys.left.pressed = false
            break;
        case 27:
            if(isRoomOpen){
                for (let key in roomOpen) {
                    roomOpen[key] = false;
                  }
                isRoomOpen = false
            }
    }
})

canvas.addEventListener('mousemove', (e)=>{
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    
    interactions.forEach(interaction=>{
        if(!isRoomOpen && x >= interaction.position.x && x <= interaction.position.x + interaction.width && y>=interaction.position.y && y<=interaction.position.y + interaction.height){
            canvas.style.cursor = "pointer"
        }else{
            canvas.style.cursor = "default"
        }
        
        if(interaction.name === 'occupy' && isRoomOpen){
            occupys.forEach(occupy=>{
                if(x >= occupy.position.x && x<=occupy.position.x+occupy.width && y>=occupy.position.y && y<=occupy.position.y + occupy.height){
                    canvas.style.cursor = "pointer"
                    occupy.width = occupy.bigWidth
                    occupy.height = occupy.bigHeight
                }else{
                    canvas.style.cursor = "default"
                    occupy.width = occupy.oldWidth
                    occupy.height = occupy.oldHeight
                }
            })
        }
    })
    
})

canvas.addEventListener('click', (e)=>{
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    interactions.forEach(interaction=>{
        let bool = x >= interaction.position.x && x <= interaction.position.x + interaction.width && y>=interaction.position.y && y<=interaction.position.y + interaction.height
        if(!bool) return
        if(interaction.name === 'supermarket'){
            roomOpen.supermarket = true
            isRoomOpen = true
        }else if(interaction.name === 'occupy'){
            roomOpen.occupy = true
            isRoomOpen = true
            
        }
    })
})