window.addEventListener("keydown", ({keyCode})=>{
    if(!isStart) return
    switch (keyCode){
        case 87:
            if(player.velocity.y ===0 ) player.velocity.y = -20
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
    if(!isStart) return
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
    if(!isStart) return
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    
    interactions.some(interaction=>{
        if(!isRoomOpen && x > interaction.position.x && x < (interaction.position.x + interaction.width) && y > interaction.position.y && y < (interaction.position.y + interaction.height)){
            return canvas.style.cursor = "pointer"
        }else{
            canvas.style.cursor = "default"
        }
    })

    if(roomOpen.occupy && isRoomOpen){
        occupys.some(occupy=>{
            if(x >= occupy.position.x && x<=occupy.position.x+occupy.width && y>=occupy.position.y && y<=occupy.position.y + occupy.height){
                occupy.width = occupy.bigWidth
                occupy.height = occupy.bigHeight
                return canvas.style.cursor = "pointer"
                
            }
            occupy.width = occupy.oldWidth
            occupy.height = occupy.oldHeight
            canvas.style.cursor = "default"
        })
    }
})

canvas.addEventListener('click', (e)=>{
    if(!isStart) return
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    interactions.forEach(interaction=>{
        let bool = x >= interaction.position.x && x <= interaction.position.x + interaction.width && y>=interaction.position.y && y<=interaction.position.y + interaction.height
        if(!bool) return
        if(interaction.name === 'supermarket'){
            if(isRoomOpen) return
            roomOpen.supermarket = true
            isRoomOpen = true
        }else if(interaction.name === 'occupy'){
            if(isRoomOpen) return
            roomOpen.occupy = true
            isRoomOpen = true
        }
    })
})