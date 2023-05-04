
let mousedownIdx = null
let isDragging = false
let differX = null
let differY = null

window.addEventListener("keydown", ({keyCode})=>{
    if(!isStart) return
    if(startNav) return
    if(!player.move) return
    console.log(keyCode);
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
    if(startNav) return
    if(!player.move) return
    switch (keyCode){
        case 68:
            keys.right.pressed = false
            console.log(scrollOffset);
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

//talk
// let talk_occupy = talks.filter(talk=>talk.name === 'occupy')[0]
canvas.addEventListener('mousemove', (e)=>{
    if(!isStart) return
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    
    interactions.some(interaction=>{
        if(!isRoomOpen && x > interaction.position.x && x < (interaction.position.x + interaction.width) && y > interaction.position.y && y < (interaction.position.y + interaction.height)){
            let talk = talks.filter(talk=> talk.name === interaction.name)[0]
            if(interaction.show===false) return
            if(talk) {
                if(talk.direction!==0){
                    if(scrollOffset <= talk.direction){
                        if(!talk.image.src.includes('_.png')){
                            talk.position.x = talk.position.x - talk.width
                            talk.image.src = talk.image.src.replace('.png', '_.png')
                        }
                    }else{
                        if(talk.image.src.includes('_.png')){
                            talk.position.x = talk.position.x + talk.width
                            talk.image.src = talk.image.src.replace('_.png', '.png')
                        }
                    }
                }
                talk.show = true
            }
            
            
            interaction.width = interaction.bigWidth
            interaction.height = interaction.bigHeight
            return canvas.style.cursor = "pointer"
        }else{
            talks.forEach(talk=>{
                talk.show = false
            })
            interaction.width = interaction.oldWidth
            interaction.height = interaction.oldHeight
            canvas.style.cursor = "default"
        }
    })

    starts.some(start=>{
        if(!(start.show && start.enlarge)) return 
        if(startNav && x > start.position.x && x < (start.position.x + start.width) && y > start.position.y && y < (start.position.y + start.height)){
            start.width = start.bigWidth
            start.height = start.bigHeight
            return canvas.style.cursor = "pointer"
        }else{
            start.width = start.oldWidth
            start.height = start.oldHeight
            canvas.style.cursor = "default"
        }
    })

    if(isRoomOpen){
        let close = buttons.close;
        if(x >= close.position.x && x<=close.position.x+close.width && y>=close.position.y && y<=close.position.y + close.height){
            close.width = close.bigWidth
            close.height = close.bigHeight
            return canvas.style.cursor = "pointer"
        }else{
            close.width = close.oldWidth
            close.height = close.oldHeight
            canvas.style.cursor = "default"
        }
    }
    if(roomOpen.cool && isRoomOpen){
        cools.some(cool=>{
            if(!cool.enlarge) return
            if(x >= cool.position.x && x<=cool.position.x+cool.width && y>=cool.position.y && y<=cool.position.y + cool.height){
                cool.width = cool.bigWidth
                cool.height = cool.bigHeight
                if((!cool.image.src.includes('_.png')) && cool.talk){
                    cool.image.src = cool.image.src.replace('.png', '_.png')
                }
                
                return canvas.style.cursor = "pointer"
                
            }
            cool.width = cool.oldWidth
            cool.height = cool.oldHeight
            canvas.style.cursor = "default"
            if(cool.image.src.includes('_.png')){
                cool.image.src = cool.image.src.replace('_.png', '.png')
            }
        })
    }
    if(roomOpen.occupy && isRoomOpen){
        occupys.some(occupy=>{
            if(!occupy.enlarge) return
            if(x >= occupy.position.x && x<=occupy.position.x+occupy.width && y>=occupy.position.y && y<=occupy.position.y + occupy.height){
                occupy.width = occupy.bigWidth
                occupy.height = occupy.bigHeight
                if((!occupy.image.src.includes('_.png')) && occupy.talk){
                    occupy.image.src = occupy.image.src.replace('.png', '_.png')
                }
                
                return canvas.style.cursor = "pointer"
                
            }
            occupy.width = occupy.oldWidth
            occupy.height = occupy.oldHeight
            canvas.style.cursor = "default"
            if(occupy.image.src.includes('_.png')){
                occupy.image.src = occupy.image.src.replace('_.png', '.png')
            }
        })
    }
    
    if(isDragging && roomOpen.occupy && isRoomOpen){
        occupys[mousedownIdx].position.x = e.offsetX + differX
        occupys[mousedownIdx].position.y = e.offsetY + differY
    }
})

//霸位
const occupyObject = {
    sitdown: occupys.filter(occupy=> occupy.name === 'sitdown')[0],
    sitdownChk: false,
    people: occupys.filter(occupy=>occupy.name === 'people')[0],
    talk1: occupys.filter(occupy=>occupy.name == '1')[0],
    talk1Chk: true,
    response2: occupys.filter(occupy=>occupy.name == '2')[0],
    talk3A: occupys.filter(occupy=>occupy.name == '3A')[0],
    talk3B: occupys.filter(occupy=>occupy.name == '3B')[0],
    talk3Chk: true,
    response4: occupys.filter(occupy=>occupy.name == '4')[0], 
    
    talk5A: occupys.filter(occupy=>occupy.name == '5A')[0],
    talk5B: occupys.filter(occupy=>occupy.name == '5B')[0],
    talk5Chk: true,
    response6A: occupys.filter(occupy=>occupy.name == '6A')[0], 
    response6B: occupys.filter(occupy=>occupy.name == '6B')[0], 
    
    talk7: occupys.filter(occupy=>occupy.name == '7')[0],
    talk7Chk: true,
    response8: occupys.filter(occupy=>occupy.name == '8')[0], 
    
    response9: occupys.filter(occupy=>occupy.name == '9')[0], 
    chk: occupys.filter(occupy=>occupy.name == 'chk')[0], 
    
    talk10A: occupys.filter(occupy=>occupy.name == '10A')[0],
    talk10B: occupys.filter(occupy=>occupy.name == '10B')[0],
    talk10C: occupys.filter(occupy=>occupy.name == '10C')[0],
    talk10Chk: false,
}

//納涼
const coolObject = {
    people: cools.filter(cool=>cool.name === 'people')[0],
    talk1: cools.filter(cool=> cool.name === '1')[0],
    talk001: cools.filter(cool=> cool.name === '001')[0],
    talk1Chk: true,

    talk1001: cools.filter(cool=> cool.name === '1001')[0],
    talk002: cools.filter(cool=> cool.name === '002')[0],
    chk: cools.filter(cool=> cool.name === 'chk')[0],
    talk2Chk: false,

    talk3: cools.filter(cool=> cool.name === '3')[0],
    talk3Chk: false,

    talk4A: cools.filter(cool=> cool.name === '4A')[0],
    talk4B: cools.filter(cool=> cool.name === '4B')[0],
    talk003: cools.filter(cool=> cool.name === '003')[0],
    talk4Chk: false,

    talkPeople: cools.filter(cool=> cool.name === 'talkPeople')[0],
    response5A: cools.filter(cool=> cool.name === '5A')[0],
    response5B: cools.filter(cool=> cool.name === '5B')[0],
    talk004: cools.filter(cool=> cool.name === '004')[0],

    talk6: cools.filter(cool=> cool.name === '6')[0],
    talk6Chk: false,

    response7: cools.filter(cool=> cool.name === '7')[0],

    talk8: cools.filter(cool=> cool.name === '8')[0],
    talk8Chk: false,

    response9: cools.filter(cool=> cool.name === '9')[0],

    talk10A: cools.filter(cool=> cool.name === '10A')[0],
    talk10B: cools.filter(cool=> cool.name === '10B')[0],
    talk10Chk: false,

    response11A: cools.filter(cool=> cool.name === '11A')[0],
    response11B: cools.filter(cool=> cool.name === '11B')[0],


    cup:cools.filter(cool=> cool.name==='cup')[0],
    cupChk:false,
}

canvas.addEventListener('click', (e)=>{
    if(!isStart) return
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    
    if(isRoomOpen){
        let close = buttons.close;
        if(x >= close.position.x && x<=close.position.x+close.width && y>=close.position.y && y<=close.position.y + close.height){
            isRoomOpen = false
            Object.keys(roomOpen).forEach(room=>{
                roomOpen[room] = false
            })
            console.log(roomOpen);
        }
    }

    if(roomOpen.cool && isRoomOpen){
        if(coolObject.talk1.show && coolObject.talk1Chk){
            if(!coolObject.talk1Chk) return
            if(x>=coolObject.talk1.position.x && x<=coolObject.talk1.position.x + coolObject.talk1.width && y>=coolObject.talk1.position.y && y<=coolObject.talk1.position.y+coolObject.talk1.height){
                coolObject.talk1Chk = false
                coolObject.talk1.show = false
                coolObject.talk1.enlarge = false
                coolObject.talk001.show = false

                coolObject.talk1001.show = true
                coolObject.talk002.show = true
                coolObject.chk.show = true
                coolObject.chk.enlarge = true

                setTimeout(()=>{
                    coolObject.talk2Chk = true
                },100)
            }
        }
        if(coolObject.talk002.show && coolObject.talk2Chk){
            if(!coolObject.talk2Chk) return
            if(x>=coolObject.chk.position.x && x<=coolObject.chk.position.x + coolObject.chk.width && y>=coolObject.chk.position.y && y<=coolObject.chk.position.y+coolObject.chk.height){
                coolObject.talk2Chk = false

                coolObject.talk1001.show = false
                coolObject.talk002.show = false
                coolObject.chk.show = false
                coolObject.chk.enlarge = false
            
                coolObject.talk3.show = true
                coolObject.talk3.enlarge = true

                setTimeout(()=>{
                    coolObject.talk3Chk = true
                },100)
            }
        }

        if(coolObject.talk3.show && coolObject.talk3Chk){
            if(!coolObject.talk3Chk) return
            if(x>=coolObject.talk3.position.x && x<=coolObject.talk3.position.x + coolObject.talk3.width && y>=coolObject.talk3.position.y && y<=coolObject.talk3.position.y+coolObject.talk3.height){
                coolObject.talk3Chk = false

                coolObject.talk3.show = false
                coolObject.talk3.enlarge = false
                
                coolObject.talk4A.show = true
                coolObject.talk4A.enlarge = true
                coolObject.talk4B.show = true
                coolObject.talk4B.enlarge = true
                coolObject.talk003.show = true

                setTimeout(()=>{
                    coolObject.talk4Chk = true
                },100)
                
            }
        }

        if(coolObject.talk4A.show && coolObject.talk4B.show && coolObject.talk4Chk){
            if(!coolObject.talk4Chk) return
            if(x>=coolObject.talk4A.position.x && x<=coolObject.talk4A.position.x + coolObject.talk4A.width && y>=coolObject.talk4A.position.y && y<=coolObject.talk4A.position.y+coolObject.talk4A.height){
                coolObject.talkPeople.image.src = './images/cool/people2.png'

                coolObject.talk4Chk = false
                coolObject.people.show = false
                coolObject.talk003.show = false

                coolObject.talkPeople.show = true
                coolObject.response5A.show = true
                coolObject.talk004.show = true
                
                coolObject.talk4A.enlarge = false
                coolObject.talk4B.enlarge = false

                setTimeout(()=>{
                    coolObject.talk4A.show = false
                    coolObject.talk4B.show = false
                    
                    coolObject.talk6.show = true
                    coolObject.talk6.enlarge = true
                    coolObject.talk6Chk = true
                    coolObject.talkPeople.image.src = './images/cool/people1.png'

                }, coolObject.response5A.text.split('').length*10 + 1500)
            }
            if(x>=coolObject.talk4B.position.x && x<=coolObject.talk4B.position.x + coolObject.talk4B.width && y>=coolObject.talk4B.position.y && y<=coolObject.talk4B.position.y+coolObject.talk4B.height){
                coolObject.talkPeople.image.src = './images/cool/people2.png'

                coolObject.talk4Chk = false
                coolObject.people.show = false
                coolObject.talk003.show = false

                coolObject.talkPeople.show = true
                coolObject.response5B.show = true
                coolObject.talk004.show = true

                coolObject.talk4A.enlarge = false
                coolObject.talk4B.enlarge = false

                CG.cool.isPeace = false
               
                setTimeout(()=>{
                    coolObject.talk4A.show = false
                    coolObject.talk4B.show = false
                    
                    
                    coolObject.talk6.show = true
                    coolObject.talk6.enlarge = true
                    coolObject.talk6Chk = true
                    coolObject.talkPeople.image.src = './images/cool/people3.png'
                }, coolObject.response5B.text.split('').length*10 + 1500)
            }
        }

        if(coolObject.talk6.show && coolObject.talk6Chk){
            if(!coolObject.talk6Chk) return
            if(x>=coolObject.talk6.position.x && x<=coolObject.talk6.position.x + coolObject.talk6.width && y>=coolObject.talk6.position.y && y<=coolObject.talk6.position.y+coolObject.talk6.height){
                coolObject.talkPeople.image.src = './images/cool/people2.png'

                coolObject.talk6Chk = false
                coolObject.talk004.show = false

                coolObject.response5A.show = false
                coolObject.response5B.show = false
                coolObject.talk6.enlarge = false

                coolObject.response7.show = true

                setTimeout(()=>{
                    coolObject.talk6.show = false
                    
                    coolObject.talk8.show = true
                    coolObject.talk8.enlarge = true
                    coolObject.talk8Chk = true

                    if(CG.cool.isPeace){
                        coolObject.talkPeople.image.src = './images/cool/people1.png'
                    }else{
                        coolObject.talkPeople.image.src = './images/cool/people3.png'
                    }

                }, coolObject.response7.text.split('').length*10 + 2500)

            }
        }

        if(coolObject.talk8.show && coolObject.talk8Chk){
            if(!coolObject.talk8Chk) return
            if(x>=coolObject.talk8.position.x && x<=coolObject.talk8.position.x + coolObject.talk8.width && y>=coolObject.talk8.position.y && y<=coolObject.talk8.position.y+coolObject.talk8.height){
                coolObject.talkPeople.image.src = './images/cool/people2.png'

                coolObject.talk8Chk = false

                coolObject.response7.show = false
                coolObject.talk8.enlarge = false

                coolObject.response9.show = true

                setTimeout(()=>{
                    coolObject.talk8.show = false
                    
                    coolObject.talk10A.show = true
                    coolObject.talk10A.enlarge = true
                    coolObject.talk10B.show = true
                    coolObject.talk10B.enlarge = true
                    coolObject.talk10Chk = true

                    if(CG.cool.isPeace){
                        coolObject.talkPeople.image.src = './images/cool/people1.png'
                    }else{
                        coolObject.talkPeople.image.src = './images/cool/people3.png'
                    }

                }, coolObject.response9.text.split('').length*10 + 2500)

            }
        }

        if(coolObject.talk10A.show && coolObject.talk10B.show && coolObject.talk10Chk){
            if(!coolObject.talk10Chk) return
            if(x>=coolObject.talk10A.position.x && x<=coolObject.talk10A.position.x + coolObject.talk10A.width && y>=coolObject.talk10A.position.y && y<=coolObject.talk10A.position.y+coolObject.talk10A.height){
                coolObject.talkPeople.image.src = './images/cool/people2.png'

                coolObject.talk10Chk = false

                coolObject.response9.show = false
                coolObject.talk10A.enlarge = false
                coolObject.talk10B.enlarge = false

                coolObject.response11A.show = true

                setTimeout(()=>{
                    coolObject.talk10A.show = false
                    coolObject.talk10B.show = false
                    coolObject.talkPeople.image.src = './images/cool/people1.png'
                    coolObject.response11A.show = false

                    coolObject.cup.enlarge = true
                    coolObject.cupChk = true
                }, coolObject.response11A.text.split('').length*10 + 2500)
            }
            if(x>=coolObject.talk10B.position.x && x<=coolObject.talk10B.position.x + coolObject.talk10B.width && y>=coolObject.talk10B.position.y && y<=coolObject.talk10B.position.y+coolObject.talk10B.height){
                coolObject.talkPeople.image.src = './images/cool/people2.png'

                coolObject.talk10Chk = false

                coolObject.response9.show = false
                coolObject.talk10A.enlarge = false
                coolObject.talk10B.enlarge = false

                coolObject.response11B.show = true

                CG.cool.isPeace = false
                setTimeout(()=>{
                    coolObject.talk10A.show = false
                    coolObject.talk10B.show = false
                    coolObject.talkPeople.image.src = './images/cool/people3.png'
                    coolObject.response11B.show = false

                    coolObject.cup.enlarge = true
                    coolObject.cupChk = true
                }, coolObject.response11B.text.split('').length*10 + 2500)
            }

            
        }

        if(coolObject.cup.enlarge && coolObject.cupChk){
            if(x>=coolObject.cup.position.x && x<=coolObject.cup.position.x + coolObject.cup.width && y>=coolObject.cup.position.y && y<=coolObject.cup.position.y+coolObject.cup.height){
                coolObject.cupChk = false
                console.log(123);
            }
        }
    }

    if(roomOpen.occupy && isRoomOpen){
        if(occupyObject.sitdown.show){
            if(x>=occupyObject.sitdown.position.x && x<=occupyObject.sitdown.position.x + occupyObject.sitdown.oldWidth && y>=occupyObject.sitdown.position.y && y<=occupyObject.sitdown.position.y + occupyObject.sitdown.oldHeight){
                occupyObject.sitdown.show = false
                occupyObject.sitdown.enlarge = false
                
                occupyObject.sitdownChk = false

                occupyObject.people.show = true
                occupyObject.talk1.show = true
                occupyObject.talk1.enlarge = true
            }
        }
        if(occupyObject.talk1.show && occupyObject.talk1Chk){
            if(!occupyObject.talk1Chk) return
            if(x>=occupyObject.talk1.position.x && x<=occupyObject.talk1.position.x + occupyObject.talk1.oldWidth && y>=occupyObject.talk1.position.y && y<=occupyObject.talk1.position.y + occupyObject.talk1.oldHeight){
                occupyObject.response2.show = true
                occupyObject.talk1Chk = false
                occupyObject.talk1.enlarge = false
                setTimeout(()=>{
                    occupyObject.talk1.show = false

                    occupyObject.talk3A.show = true
                    occupyObject.talk3A.enlarge = true
                    occupyObject.talk3B.show = true
                    occupyObject.talk3B.enlarge = true
                }, occupyObject.response2.text.split('').length*10 + 1500)
                
            }
        }

        if((occupyObject.talk3A.show && occupyObject.talk3B.show && occupyObject.talk3Chk)){
            if(!occupyObject.talk3Chk) return
            if(x>=occupyObject.talk3A.position.x && x<=occupyObject.talk3A.position.x + occupyObject.talk3A.oldWidth && y>=occupyObject.talk3A.position.y && y<=occupyObject.talk3A.position.y + occupyObject.talk3A.oldHeight){
                occupyObject.response4.show = true
                occupyObject.response2.show = false
                occupyObject.talk3Chk = false
                occupyObject.talk3A.enlarge = false
                occupyObject.talk3B.enlarge = false
                if(occupyObject.people.image.src.includes('people2')){
                    occupyObject.people.image.src = occupyObject.people.image.src.replace('people2', 'people1')
                }
                
            }

            if(x>=occupyObject.talk3B.position.x && x<=occupyObject.talk3B.position.x + occupyObject.talk3B.oldWidth && y>=occupyObject.talk3B.position.y && y<=occupyObject.talk3B.position.y + occupyObject.talk3B.oldHeight){
                occupyObject.response4.show = true
                occupyObject.response2.show = false
                occupyObject.talk3Chk = false
                occupyObject.talk3A.enlarge = false
                occupyObject.talk3B.enlarge = false
                CG.occupy.isPeace = false
                if(occupyObject.people.image.src.includes('people1')){
                    occupyObject.people.image.src = occupyObject.people.image.src.replace('people1', 'people2')
                }
            }

            setTimeout(()=>{
                occupyObject.talk3A.show = false
                occupyObject.talk3B.show = false

                occupyObject.talk5A.show = true
                occupyObject.talk5A.enlarge = true
                occupyObject.talk5B.show = true
                occupyObject.talk5B.enlarge = true

                
            }, occupyObject.response4.text.split('').length*10 + 1500)
        }
      

        if((occupyObject.talk5A.show && occupyObject.talk5B.show && occupyObject.talk5Chk)){
            if(!occupyObject.talk5Chk) return
            if(x>=occupyObject.talk5A.position.x && x<=occupyObject.talk5A.position.x + occupyObject.talk5A.oldWidth && y>=occupyObject.talk5A.position.y && y<=occupyObject.talk5A.position.y + occupyObject.talk5A.oldHeight){
                occupyObject.response6A.show = true
                occupyObject.response4.show = false
                occupyObject.talk5Chk = false
                occupyObject.talk5A.enlarge = false
                occupyObject.talk5B.enlarge = false
                if(occupyObject.people.image.src.includes('people2')){
                    occupyObject.people.image.src = occupyObject.people.image.src.replace('people2', 'people1')
                }

                setTimeout(()=>{
                    occupyObject.talk5A.show = false
                    occupyObject.talk5B.show = false

                    occupyObject.talk7.show = true
                    occupyObject.talk7.enlarge = true

                }, occupyObject.response6A.text.split('').length*10 + 1500)

            }
            if(x>=occupyObject.talk5B.position.x && x<=occupyObject.talk5B.position.x + occupyObject.talk5B.oldWidth && y>=occupyObject.talk5B.position.y && y<=occupyObject.talk5B.position.y + occupyObject.talk5B.oldHeight){
                occupyObject.response6B.show = true
                occupyObject.response4.show = false
                occupyObject.talk5Chk = false
                occupyObject.talk5A.enlarge = false
                occupyObject.talk5B.enlarge = false
                CG.occupy.isPeace = false
                if(occupyObject.people.image.src.includes('people1')){
                    occupyObject.people.image.src = occupyObject.people.image.src.replace('people1', 'people2')
                }
                setTimeout(()=>{
                    occupyObject.talk5A.show = false
                    occupyObject.talk5B.show = false

                    occupyObject.talk7.show = true
                    occupyObject.talk7.enlarge = true

                }, occupyObject.response6B.text.split('').length*10 + 1500)

            }

            
        }

        if(occupyObject.talk7.show && occupyObject.talk7Chk){
            if(!occupyObject.talk7Chk) return
            if(x>=occupyObject.talk7.position.x && x<=occupyObject.talk7.position.x + occupyObject.talk7.oldWidth && y>=occupyObject.talk7.position.y && y<=occupyObject.talk7.position.y + occupyObject.talk7.oldHeight){
                occupyObject.response8.show = true
                occupyObject.response6A.show = false
                occupyObject.response6B.show = false
                occupyObject.talk7Chk = false
                occupyObject.talk7.enlarge = false

                setTimeout(()=>{
                    occupyObject.response9.show = true
                    occupyObject.chk.show = true
                    occupyObject.chk.enlarge = true
                    occupyObject.talk7.show = false
                }, occupyObject.response8.text.split('').length*10 + 2000)
            }
        }

        if(occupyObject.response9.show && occupyObject.chk.show){
            if(x>=occupyObject.chk.position.x && x<=occupyObject.chk.position.x + occupyObject.chk.oldWidth && y>=occupyObject.chk.position.y && y<=occupyObject.chk.position.y + occupyObject.chk.oldHeight){
                occupyObject.response8.show = false
                occupyObject.response9.show = false
                occupyObject.chk.show = false
                occupyObject.chk.enlarge = false
                occupyObject.people.show = false

                occupys.forEach(occupy=>{
                    if(occupy.name === null){
                        occupy.dragging = true
                        occupy.enlarge = true
                    }
                })
            }
        }   

        if(occupyObject.talk10A.show && occupyObject.talk10B.show && occupyObject.talk10C.show && occupyObject.talk10Chk){
            if(!occupyObject.talk10Chk) return
            if(x>=occupyObject.talk10A.position.x && x<=occupyObject.talk10A.position.x + occupyObject.talk10A.oldWidth && y>=occupyObject.talk10A.position.y && y<=occupyObject.talk10A.position.y + occupyObject.talk10A.oldHeight){
                occupyObject.talk10Chk = false
                occupyObject.talk10A.enlarge = false
                occupyObject.talk10B.enlarge = false
                occupyObject.talk10C.enlarge = false
                if(occupyObject.people.image.src.includes('people2')){
                    occupyObject.people.image.src = occupyObject.people.image.src.replace('people2', 'people1')
                }
            }
            if(x>=occupyObject.talk10B.position.x && x<=occupyObject.talk10B.position.x + occupyObject.talk10B.oldWidth && y>=occupyObject.talk10B.position.y && y<=occupyObject.talk10B.position.y + occupyObject.talk10B.oldHeight){
                occupyObject.talk10Chk = false
                occupyObject.talk10A.enlarge = false
                occupyObject.talk10B.enlarge = false
                occupyObject.talk10C.enlarge = false
                if(occupyObject.people.image.src.includes('people2')){
                    occupyObject.people.image.src = occupyObject.people.image.src.replace('people2', 'people1')
                }
            }
            if(x>=occupyObject.talk10C.position.x && x<=occupyObject.talk10C.position.x + occupyObject.talk10C.oldWidth && y>=occupyObject.talk10C.position.y && y<=occupyObject.talk10C.position.y + occupyObject.talk10C.oldHeight){
                occupyObject.talk10Chk = false
                occupyObject.talk10A.enlarge = false
                occupyObject.talk10B.enlarge = false
                occupyObject.talk10C.enlarge = false
                if(occupyObject.people.image.src.includes('people1')){
                    occupyObject.people.image.src = occupyObject.people.image.src.replace('people1', 'people2')
                }
            }

            setTimeout(()=>{
                roomOpen.occupy =false
                isRoomOpen = false
            }, 1500)
        }
        
    }
    interactions.forEach(interaction=>{
        let bool = x >= interaction.position.x && x <= interaction.position.x + interaction.width && y>=interaction.position.y && y<=interaction.position.y + interaction.height
        if(!bool) return
        if(startNav){
            if(!interaction.show) return
        }
        if(interaction.name === 'cool'){
            if(isRoomOpen) return
            roomOpen.cool = true
            isRoomOpen = true
            player.move = true
            if(startNav){
                startNav = false
                Object.keys(interactions).forEach(interaction=>{
                    interactions[interaction].show = true
                })
            }
            
        }else if(interaction.name === 'occupy'){
            if(isRoomOpen) return
            roomOpen.occupy = true
            isRoomOpen = true
        }else if(interaction.name === 'hoard'){
            if(isRoomOpen) return
            roomOpen.hoard = true
            isRoomOpen = true
        }
        
    })
    if(startNav){
        starts.forEach(start=>{
            let bool = x >= start.position.x && x <= start.position.x + start.width && y>=start.position.y && y<=start.position.y + start.height
            if(!bool) return
            if(!start.show) return
            if(!start.enlarge) return
            if(start.name === 'start01Btn'){
                getOff = true;
                starts.filter(start=> start.name === 'start01' )[0].show = false
                starts.filter(start=> start.name === 'start01Btn' )[0].show = false
                starts.filter(start=> start.name === 'start02' )[0].show = true
                setTimeout(()=>{
                    globalClick = true
                }, 100)


            }
        
        })
    }

    if(startNav && globalClick && starts.filter(start=> start.name === 'start02' )[0].show ){
        globalClick = false
        starts.filter(start=> start.name === 'start02' )[0].show = false
        starts.filter(start=> start.name === 'start03' )[0].show = true
        setTimeout(()=>{
            globalClick = true
        }, 100)
    }
    if(startNav && globalClick && starts.filter(start=> start.name === 'start03' )[0].show ){
        globalClick = false
        starts.filter(start=> start.name === 'start03' )[0].show = false
        starts.filter(start=> start.name === 'start04' )[0].show = true
        setTimeout(()=>{
            globalClick = true
        }, 100)
    }
    if(startNav && globalClick && starts.filter(start=> start.name === 'start04' )[0].show ){
        globalClick = false
        starts.filter(start=> start.name === 'start04' )[0].show = false
        starts.filter(start=> start.name === 'start05' )[0].show = true
        interactions.filter(interaction=>interaction.name === 'cool')[0].show = true
    }
})

canvas.addEventListener('mousedown', (e)=>{
    e.preventDefault();
    let x = parseInt(e.offsetX)
    let y = parseInt(e.offsetY)
    occupys.forEach((occupy,key)=>{
        if(!occupy.dragging) return
        if(x > occupy.position.x && x < occupy.position.x + occupy.width && y > occupy.position.y && y < occupy.position.y + occupy.height){
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
        let bool = occupys[mousedownIdx].position.x >= 1000 && occupys[mousedownIdx].position.x + occupys[mousedownIdx].oldWidth <= 1309 && occupys[mousedownIdx].position.y + occupys[mousedownIdx].oldHeight >= 251 && occupys[mousedownIdx].position.y + occupys[mousedownIdx].oldHeight <= 435
        if(!bool){;
            occupys[mousedownIdx].position.x = occupys[mousedownIdx].oldPosX
            occupys[mousedownIdx].position.y = occupys[mousedownIdx].oldPosY
            if(occupys[mousedownIdx].image.src.includes('1-1.png')){
                occupys[mousedownIdx].image.src = occupys[mousedownIdx].image.src.replace('1-1.png', '1.png')
            }
        }else{
            occupyMoveNum ++
            if(occupyMoveNum === 10){
                occupyObject.people.show = true
                occupyObject.talk10A.show = true
                occupyObject.talk10A.enlarge = true
                occupyObject.talk10B.show = true
                occupyObject.talk10B.enlarge = true
                occupyObject.talk10C.show = true
                occupyObject.talk10C.enlarge = true
                setTimeout(()=>{
                    occupyObject.talk10Chk = true
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