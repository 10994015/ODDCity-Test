
let mousedownIdx = null
let isDragging = false
let differX = null
let differY = null

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
            if(!occupy.enlarge) return
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
    
    if(isDragging && roomOpen.occupy && isRoomOpen){
        occupys[mousedownIdx].position.x = e.offsetX + differX
        occupys[mousedownIdx].position.y = e.offsetY + differY
    }
})

//霸位
let sitdown = occupys.filter(occupy=> occupy.name === 'sitdown')[0]
let sitdownChk = false
let people = occupys.filter(occupy=>occupy.name === 'people')[0]
let talk1 = occupys.filter(occupy=>occupy.name == '1')[0]
let talk1Chk = true
let response2 = occupys.filter(occupy=>occupy.name == '2')[0]
let talk3A = occupys.filter(occupy=>occupy.name == '3A')[0]
let talk3B = occupys.filter(occupy=>occupy.name == '3B')[0]
let talk3Chk = true
let response4 = occupys.filter(occupy=>occupy.name == '4')[0] 

let talk5A = occupys.filter(occupy=>occupy.name == '5A')[0]
let talk5B = occupys.filter(occupy=>occupy.name == '5B')[0]
let talk5Chk = true
let response6A = occupys.filter(occupy=>occupy.name == '6A')[0] 
let response6B = occupys.filter(occupy=>occupy.name == '6B')[0] 

let talk7 = occupys.filter(occupy=>occupy.name == '7')[0]
let talk7Chk = true
let response8 = occupys.filter(occupy=>occupy.name == '8')[0] 

let response9 = occupys.filter(occupy=>occupy.name == '9')[0] 

let talk10A = occupys.filter(occupy=>occupy.name == '10A')[0]
let talk10B = occupys.filter(occupy=>occupy.name == '10B')[0]
let talk10C = occupys.filter(occupy=>occupy.name == '10C')[0]
let talk10Chk = false

canvas.addEventListener('click', (e)=>{
    if(!isStart) return
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    
    if(roomOpen.occupy && isRoomOpen){
        if(sitdown.show){
            if(x>=sitdown.position.x && x<=sitdown.position.x + sitdown.oldWidth && y>=sitdown.position.y && y<=sitdown.position.y + sitdown.oldHeight){
                sitdown.show = false
                sitdown.enlarge = false
                
                sitdownChk = false

                people.show = true
                talk1.show = true
                talk1.enlarge = true
            }
        }
        if(talk1.show && talk1Chk){
            if(!talk1Chk) return
            if(x>=talk1.position.x && x<=talk1.position.x + talk1.oldWidth && y>=talk1.position.y && y<=talk1.position.y + talk1.oldHeight){
                response2.show = true
                talk1Chk = false
                talk1.enlarge = false
                setTimeout(()=>{
                    talk1.show = false

                    talk3A.show = true
                    talk3A.enlarge = true
                    talk3B.show = true
                    talk3B.enlarge = true
                }, response2.text.split('').length*10 + 1000)
                
            }
        }

        if((talk3A.show && talk3B.show && talk3Chk)){
            if(!talk3Chk) return
            if(x>=talk3A.position.x && x<=talk3A.position.x + talk3A.oldWidth && y>=talk3A.position.y && y<=talk3A.position.y + talk3A.oldHeight){
                response4.show = true
                response2.show = false
                talk3Chk = false
                talk3A.enlarge = false
                talk3B.enlarge = false
                if(people.image.src.includes('people2')){
                    people.image.src = people.image.src.replace('people2', 'people1')
                }
                
            }

            if(x>=talk3B.position.x && x<=talk3B.position.x + talk3B.oldWidth && y>=talk3B.position.y && y<=talk3B.position.y + talk3B.oldHeight){
                response4.show = true
                response2.show = false
                talk3Chk = false
                talk3A.enlarge = false
                talk3B.enlarge = false
                CG.occupy.isPeace = false
                if(people.image.src.includes('people1')){
                    people.image.src = people.image.src.replace('people1', 'people2')
                }
            }

            setTimeout(()=>{
                talk3A.show = false
                talk3B.show = false

                talk5A.show = true
                talk5A.enlarge = true
                talk5B.show = true
                talk5B.enlarge = true

                
            }, response4.text.split('').length*10 + 1000)
        }
      

        if((talk5A.show && talk5B.show && talk5Chk)){
            if(!talk5Chk) return
            if(x>=talk5A.position.x && x<=talk5A.position.x + talk5A.oldWidth && y>=talk5A.position.y && y<=talk5A.position.y + talk5A.oldHeight){
                response6A.show = true
                response4.show = false
                talk5Chk = false
                talk5A.enlarge = false
                talk5B.enlarge = false
                if(people.image.src.includes('people2')){
                    people.image.src = people.image.src.replace('people2', 'people1')
                }

                setTimeout(()=>{
                    talk5A.show = false
                    talk5B.show = false

                    talk7.show = true
                    talk7.enlarge = true

                }, response6A.text.split('').length*10 + 1000)

            }
            if(x>=talk5B.position.x && x<=talk5B.position.x + talk5B.oldWidth && y>=talk5B.position.y && y<=talk5B.position.y + talk5B.oldHeight){
                response6B.show = true
                response4.show = false
                talk5Chk = false
                talk5A.enlarge = false
                talk5B.enlarge = false
                CG.occupy.isPeace = false
                if(people.image.src.includes('people1')){
                    people.image.src = people.image.src.replace('people1', 'people2')
                }
                setTimeout(()=>{
                    talk5A.show = false
                    talk5B.show = false

                    talk7.show = true
                    talk7.enlarge = true

                }, response6B.text.split('').length*10 + 1000)

            }

            
        }

        if(talk7.show && talk7Chk){
            if(!talk7Chk) return
            if(x>=talk7.position.x && x<=talk7.position.x + talk7.oldWidth && y>=talk7.position.y && y<=talk7.position.y + talk7.oldHeight){
                response8.show = true
                response6A.show = false
                response6B.show = false
                talk7Chk = false
                talk7.enlarge = false

                setTimeout(()=>{
                    response9.show = true
                    response9.enlarge = true
                }, response8.text.split('').length*10 + 1000)
            }
        }

        if(response9.show){
            if(x>=response9.position.x && x<=response9.position.x + response9.oldWidth && y>=response9.position.y && y<=response9.position.y + response9.oldHeight){
                talk7.show = false
                response8.show = false
                response9.show = false
                response9.enlarge = false
                people.show = false

                occupys.forEach(occupy=>{
                    if(occupy.name === null){
                        occupy.dragging = true
                        occupy.enlarge = true
                    }
                })
            }
        }   

        if(talk10A.show && talk10B.show && talk10C.show && talk10Chk){
            if(!talk10Chk) return
            if(x>=talk10A.position.x && x<=talk10A.position.x + talk10A.oldWidth && y>=talk10A.position.y && y<=talk10A.position.y + talk10A.oldHeight){
                talk10Chk = false
                talk10A.enlarge = false
                talk10B.enlarge = false
                talk10C.enlarge = false
                if(people.image.src.includes('people2')){
                    people.image.src = people.image.src.replace('people2', 'people1')
                }
            }
            if(x>=talk10B.position.x && x<=talk10B.position.x + talk10B.oldWidth && y>=talk10B.position.y && y<=talk10B.position.y + talk10B.oldHeight){
                talk10Chk = false
                talk10A.enlarge = false
                talk10B.enlarge = false
                talk10C.enlarge = false
                if(people.image.src.includes('people2')){
                    people.image.src = people.image.src.replace('people2', 'people1')
                }
            }
            if(x>=talk10C.position.x && x<=talk10C.position.x + talk10C.oldWidth && y>=talk10C.position.y && y<=talk10C.position.y + talk10C.oldHeight){
                talk10Chk = false
                talk10A.enlarge = false
                talk10B.enlarge = false
                talk10C.enlarge = false
                if(people.image.src.includes('people1')){
                    people.image.src = people.image.src.replace('people1', 'people2')
                }
            }

            setTimeout(()=>{
                // talk10A.show = false
                // talk10B.show = false
                // talk10C.show = false

                // people.show = false

                
                roomOpen.occupy =false
                isRoomOpen = false
            }, 1500)
        }
        
    }
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

canvas.addEventListener('mousedown', (e)=>{
    e.preventDefault();
    let x = parseInt(e.offsetX)
    let y = parseInt(e.offsetY)
    occupys.forEach((occupy,key)=>{
        if(!occupy.dragging) return
        if(x > occupy.position.x && x < occupy.position.x + occupy.width && y > occupy.position.y && y < occupy.position.y + occupy.height){
            console.log(occupy.image);
            if(!occupy.image.src.includes('1-1.png')){
                occupy.image.src = occupy.image.src.replace('1.png', '1-1.png')
            }
            mousedownIdx = key
            isDragging = true
            differX = occupy.position.x - x
            differY = occupy.position.y - y
        }
    })
})
let occupyMoveNum = 0
canvas.addEventListener('mouseup', ()=>{
    if(isDragging && roomOpen.occupy && isRoomOpen){
        let bool = occupys[mousedownIdx].position.x >= 1093 && occupys[mousedownIdx].position.x + occupys[mousedownIdx].oldWidth <= 1309 && occupys[mousedownIdx].position.y + occupys[mousedownIdx].oldHeight >= 251 && occupys[mousedownIdx].position.y + occupys[mousedownIdx].oldHeight <= 435
        if(!bool){;
            occupys[mousedownIdx].position.x = occupys[mousedownIdx].oldPosX
            occupys[mousedownIdx].position.y = occupys[mousedownIdx].oldPosY
            if(occupys[mousedownIdx].image.src.includes('1-1.png')){
                occupys[mousedownIdx].image.src = occupys[mousedownIdx].image.src.replace('1-1.png', '1.png')
            }
            console.log(occupys[mousedownIdx].oldPosX);
            console.log(occupys[mousedownIdx].oldPosY);
        }else{
            occupyMoveNum ++
            console.log(occupyMoveNum);
            if(occupyMoveNum === 10){
                people.show = true
                talk10A.show = true
                talk10A.enlarge = true
                talk10B.show = true
                talk10B.enlarge = true
                talk10C.show = true
                talk10C.enlarge = true
                setTimeout(()=>{
                    talk10Chk = true
                }, 500)
            }
            occupys[mousedownIdx].show = false
            occupys[mousedownIdx].enlarge = false
        }
    }

    mousedownIdx = null
    isDragging = false
    differX = null
    differY = null
})