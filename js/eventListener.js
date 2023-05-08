


let mousedownIdx= null
let isDragging = false
let differX = null
let differY = null

window.addEventListener("keydown", ({keyCode})=>{
    if(!isStart) return
    if(startNav) return
    if(!player.move) return
    switch (keyCode){
        case 87:
            if(player.velocity.y ===0 ) player.velocity.y = -20
            break;
        case 68:
            if(!isRoomOpen){
                keys.right.pressed = true
                audioWalk.loop = true
                audioWalk.play()
            }
            break;
        case 65:
            if(!isRoomOpen){
                keys.left.pressed = true
                audioWalk.loop = true
                audioWalk.play()
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
            audioWalk.pause()
            audioWalk.currentTime = 0
            break;
        case 65:
            keys.left.pressed = false
            audioWalk.pause()
            audioWalk.currentTime = 0
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
    if(busAudioStart){
        busAudio.play()
    }
    busAudioStart = false
    if(!isStart) return
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
   
    
    if(phone.show && phone.enlarge && !isRoomOpen){
        if( x > phone.position.x && x < (phone.position.x + phone.width) && y > phone.position.y && y < (phone.position.y + phone.height)){
            phone.width = phone.bigWidth
            phone.height = phone.bigHeight
            return canvas.style.cursor = "pointer"
        }else{
            phone.width = phone.oldWidth
            phone.height = phone.oldHeight
            canvas.style.cursor = "default"
        }
    }
    interactions.some(interaction=>{
        if(!isRoomOpen && x > interaction.position.x && x < (interaction.position.x + interaction.width) && y > interaction.position.y && y < (interaction.position.y + interaction.height)){
            let talk = talks.filter(talk=> talk.name === interaction.name)[0]
            if(interaction.show===false) return
            if(interaction.enlarge===false) return
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
        if(x >= close.position.x && x<=close.position.x+close.width && y>=close.position.y && y<=close.position.y + close.height && close.enlarge){
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
    if(roomOpen.hoard && isRoomOpen){
        hoards.some(hoard=>{
            if(!hoard.enlarge) return
            if(x >= hoard.position.x && x<=hoard.position.x+hoard.width && y>=hoard.position.y && y<=hoard.position.y + hoard.height){
                hoard.width = hoard.bigWidth
                hoard.height = hoard.bigHeight
                if((!hoard.image.src.includes('_.png')) && hoard.talk){
                    hoard.image.src = hoard.image.src.replace('.png', '_.png')
                }

                return canvas.style.cursor = "pointer"
            }
            hoard.width = hoard.oldWidth
            hoard.height = hoard.oldHeight
            canvas.style.cursor = "default"
            if(hoard.image.src.includes('_.png')){
                hoard.image.src = hoard.image.src.replace('_.png', '.png')
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
    sitdownChk: true,
    people: occupys.filter(occupy=>occupy.name === 'people')[0],
    talk1: occupys.filter(occupy=>occupy.name == '1')[0],
    talk1Chk: false,
    response2: occupys.filter(occupy=>occupy.name == '2')[0],
    talk3A: occupys.filter(occupy=>occupy.name == '3A')[0],
    talk3B: occupys.filter(occupy=>occupy.name == '3B')[0],
    talk3Chk: false,
    response4: occupys.filter(occupy=>occupy.name == '4')[0], 
    
    talk5A: occupys.filter(occupy=>occupy.name == '5A')[0],
    talk5B: occupys.filter(occupy=>occupy.name == '5B')[0],
    talk5Chk: false,
    response6A: occupys.filter(occupy=>occupy.name == '6A')[0], 
    response6B: occupys.filter(occupy=>occupy.name == '6B')[0], 
    
    talk7: occupys.filter(occupy=>occupy.name == '7')[0],
    talk7Chk: false,
    response8: occupys.filter(occupy=>occupy.name == '8')[0], 
    
    response9: occupys.filter(occupy=>occupy.name == '9')[0], 
    chk: occupys.filter(occupy=>occupy.name == 'chk')[0], 
    
    talk10A: occupys.filter(occupy=>occupy.name == '10A')[0],
    talk10B: occupys.filter(occupy=>occupy.name == '10B')[0],
    talk10C: occupys.filter(occupy=>occupy.name == '10C')[0],
    talk10Chk: false,

    end: occupys.filter(occupy=>occupy.name === 'end')[0],
}
const occupyTimer = {
    timer1:null,
    timer2:null,
    timer3:null,
    timer4:null,
    timer5:null,
    timer6:null,
    timer7:null,
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

    end:cools.filter(cool=> cool.name === 'end')[0],

    talk005: cools.filter(cool=>cool.name === '005')[0],
    talk005Chk: false,
    talk006: cools.filter(cool=>cool.name === '006')[0],
    talk006Chk: false,

    talk06: cools.filter(cool=>cool.name === '06')[0],
    talk06Chk: false,
    
}
const coolTimer = {
    timer1:null,
    timer2:null,
    timer3:null,
    timer4:null,
    timer5:null,
    timer6:null,
    timer7:null,
    timer8:null,
    timer9:null,
    timer10:null,
    timer11:null,
    timer12:null,
}

const hoardObject = {
    inter1: hoards.filter(hoard=>hoard.name === 'inter1')[0],
    inter2: hoards.filter(hoard=>hoard.name === 'inter2')[0],
    inter3: hoards.filter(hoard=>hoard.name === 'inter3')[0],
    inter4: hoards.filter(hoard=>hoard.name === 'inter4')[0],
    inter5: hoards.filter(hoard=>hoard.name === 'inter5')[0],
    inter6: hoards.filter(hoard=>hoard.name === 'inter6')[0],
    inter7: hoards.filter(hoard=>hoard.name === 'inter7')[0],
    inter8: hoards.filter(hoard=>hoard.name === 'inter8')[0],

    inter1Ok: hoards.filter(hoard=>hoard.name === 'ok-inter1')[0],
    inter2Ok: hoards.filter(hoard=>hoard.name === 'ok-inter2')[0],
    inter3Ok: hoards.filter(hoard=>hoard.name === 'ok-inter3')[0],
    inter4Ok: hoards.filter(hoard=>hoard.name === 'ok-inter4')[0],
    inter5Ok: hoards.filter(hoard=>hoard.name === 'ok-inter5')[0],
    inter6Ok: hoards.filter(hoard=>hoard.name === 'ok-inter6')[0],
    inter7Ok: hoards.filter(hoard=>hoard.name === 'ok-inter7')[0],
    inter8Ok: hoards.filter(hoard=>hoard.name === 'ok-inter8')[0],

    talk1: hoards.filter(hoard=>hoard.name === '1')[0],
    talk1Chk: true,
    talk2: hoards.filter(hoard=>hoard.name === '2')[0],
    talk2Chk: false,
    s1: hoards.filter(hoard=>hoard.name === 's1')[0],
    a1: hoards.filter(hoard=>hoard.name === 'a1')[0],
    b1: hoards.filter(hoard=>hoard.name === 'b1')[0],
    c1: hoards.filter(hoard=>hoard.name === 'c1')[0],
    d1: hoards.filter(hoard=>hoard.name === 'd1')[0],
    e1: hoards.filter(hoard=>hoard.name === 'e1')[0],
    f1: hoards.filter(hoard=>hoard.name === 'f1')[0],
    g1: hoards.filter(hoard=>hoard.name === 'g1')[0],
    h1: hoards.filter(hoard=>hoard.name === 'h1')[0],

    removeInterObj: false,

    hold: hoards.filter(hoard=>hoard.name === 'hold')[0],
    smallPeople: hoards.filter(hoard=>hoard.name === 'smallPeople')[0],
    people: hoards.filter(hoard=>hoard.name === 'people')[0],
    response3: hoards.filter(hoard=>hoard.name === '3')[0],
    talk4: hoards.filter(hoard=>hoard.name === '4')[0],
    talk4Chk: false,
    response5: hoards.filter(hoard=>hoard.name === '5')[0],

    talk6A: hoards.filter(hoard=>hoard.name === '6A')[0],
    talk6B: hoards.filter(hoard=>hoard.name === '6B')[0],
    talk6Chk: false,
    response7: hoards.filter(hoard=>hoard.name === '7')[0],

    talk8: hoards.filter(hoard=>hoard.name === '8')[0],
    talk8Chk: false,

    response9: hoards.filter(hoard=>hoard.name === '9')[0],

    talk10A:hoards.filter(hoard=>hoard.name === '10A')[0],
    talk10B:hoards.filter(hoard=>hoard.name === '10B')[0],
    talk10Chk: false,
    response11: hoards.filter(hoard=>hoard.name === '11')[0],

    talk12:hoards.filter(hoard=>hoard.name === '12')[0],
    talk12Chk: false,
    response13: hoards.filter(hoard=>hoard.name === '13')[0],
    
    talk14: hoards.filter(hoard=>hoard.name === '14')[0],
    talk14Chk: false,


    startInter: false,
    interNum: 0,

    finish: hoards.filter(hoard=>hoard.name === 'finish')[0],
    finishChk: false,

    talk16A: hoards.filter(hoard=>hoard.name === '16A')[0],
    talk16B: hoards.filter(hoard=>hoard.name === '16B')[0],
    talk16C: hoards.filter(hoard=>hoard.name === '16C')[0],
    talk16Chk: false,
    response15: hoards.filter(hoard=>hoard.name === '15')[0],
    chk: hoards.filter(hoard=>hoard.name === 'chk')[0],
    chk2: hoards.filter(hoard=>hoard.name === 'chk2')[0],
    end: hoards.filter(hoard=>hoard.name === 'end')[0],
}

const hoardTimer = {
    timer1:null,
    timer2:null,
    timer3:null,
    timer4:null,
    timer5:null,
    timer6:null,
    timer7:null,
    timer8:null,
    timer9:null,
    timer10:null,
    timer11:null,
    timer12:null,
    timer13:null,
    timer14:null,
    timer15:null,
    timer16:null,
    timer17:null,
    timer18:null,
    timer19:null,
    timer20:null,
    timer21:null,
    timer22:null,
}
canvas.addEventListener('click', (e)=>{
    if(!isStart) return
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    
    if(isRoomOpen){
        let close = buttons.close;
        if(x >= close.position.x && x<=close.position.x+close.width && y>=close.position.y && y<=close.position.y + close.height && close.enlarge){
            isRoomOpen = false
            if(startNav && coolObject.talk06Chk && coolObject.talk06.show && isTeaching){
                coolObject.talk06.show = false
                coolObject.talk06Chk = false
                globalClick = true
                interactions.filter(interaction=>interaction.name === 'cool')[0].show = false
                console.log(startNav);
                console.log(isTeaching);
                setTimeout(()=>{
                    starts.filter(start=>start.name === 'start07')[0].show = true
                },10)
            }
            if(roomOpen.cool){
                initCoolRoom(); 
            }else if(roomOpen.occupy){
                initOccupyRoom()
            }else if(roomOpen.hoard){
                initHoardRoom()
            }
            clickVedioPlay('inRoom')
            stopBgm()
            playBgm()
            audioGoodend.pause()
            audioGoodend.currentTime = 0
            audioBadend.pause()
            audioBadend.currentTime = 0
            Object.keys(roomOpen).forEach(room=>{
                roomOpen[room] = false
            })
            
            
            
        }
    }

    if(roomOpen.cool && isRoomOpen){
        if(coolObject.talk1.show && coolObject.talk1Chk){
            if(!coolObject.talk1Chk) return
            if(x>=coolObject.talk1.position.x && x<=coolObject.talk1.position.x + coolObject.talk1.width && y>=coolObject.talk1.position.y && y<=coolObject.talk1.position.y+coolObject.talk1.height){
                clickVedioPlay('talk')
                coolObject.talk1Chk = false
                coolObject.talk1.show = false
                coolObject.talk1.enlarge = false
                coolObject.talk001.show = false
                if(isTeaching){
                    coolObject.talk002.show = true
                }
                coolObject.talk1001.show = true
                coolObject.chk.show = true
                coolObject.chk.enlarge = true

                coolTimer.timer1 = setTimeout(()=>{
                    coolObject.talk2Chk = true
                },100)
            }
        }
        if(coolObject.talk1001.show && coolObject.talk2Chk){
            if(!coolObject.talk2Chk) return
            if(x>=coolObject.chk.position.x && x<=coolObject.chk.position.x + coolObject.chk.width && y>=coolObject.chk.position.y && y<=coolObject.chk.position.y+coolObject.chk.height){
                clickVedioPlay('btn')
                coolObject.talk2Chk = false

                coolObject.talk1001.show = false
                coolObject.talk002.show = false
                coolObject.chk.show = false
                coolObject.chk.enlarge = false
            
                coolObject.talk3.show = true
                coolObject.talk3.enlarge = true

                coolTimer.timer2 = setTimeout(()=>{
                    coolObject.talk3Chk = true
                },100)
            }
        }

        if(coolObject.talk3.show && coolObject.talk3Chk){
            if(!coolObject.talk3Chk) return
            if(x>=coolObject.talk3.position.x && x<=coolObject.talk3.position.x + coolObject.talk3.width && y>=coolObject.talk3.position.y && y<=coolObject.talk3.position.y+coolObject.talk3.height){
                clickVedioPlay('talk')
                coolObject.talk3Chk = false

                coolObject.talk3.show = false
                coolObject.talk3.enlarge = false
                
                coolObject.talk4A.show = true
                coolObject.talk4A.enlarge = true
                coolObject.talk4B.show = true
                coolObject.talk4B.enlarge = true
                if(isTeaching){
                    coolObject.talk003.show = true
                }

                coolTimer.timer3=  setTimeout(()=>{
                    coolObject.talk4Chk = true
                },100)
                
            }
        }

        if(coolObject.talk4A.show && coolObject.talk4B.show && coolObject.talk4Chk){
            if(!coolObject.talk4Chk) return
            if(x>=coolObject.talk4A.position.x && x<=coolObject.talk4A.position.x + coolObject.talk4A.width && y>=coolObject.talk4A.position.y && y<=coolObject.talk4A.position.y+coolObject.talk4A.height){
                clickVedioPlay('talk')
                coolObject.talkPeople.image.src = './images/cool/people2.png'

                coolObject.talk4Chk = false
                coolObject.people.show = false
                coolObject.talk003.show = false

                coolObject.talkPeople.show = true
                coolObject.response5A.show = true
                if(isTeaching){
                    coolObject.talk004.show = true
                }
                
                coolObject.talk4A.enlarge = false
                coolObject.talk4B.enlarge = false

                coolTimer.timer4 = setTimeout(()=>{
                    coolObject.talk4A.show = false
                    coolObject.talk4B.show = false
                    
                    coolObject.talk6.show = true
                    coolObject.talk6.enlarge = true
                    coolObject.talk6Chk = true
                    coolObject.talkPeople.image.src = './images/cool/people1.png'

                }, coolObject.response5A.text.split('').length*10 + 1500)
            }
            if(x>=coolObject.talk4B.position.x && x<=coolObject.talk4B.position.x + coolObject.talk4B.width && y>=coolObject.talk4B.position.y && y<=coolObject.talk4B.position.y+coolObject.talk4B.height){
                clickVedioPlay('talk')
                coolObject.talkPeople.image.src = './images/cool/people2.png'

                coolObject.talk4Chk = false
                coolObject.people.show = false
                coolObject.talk003.show = false

                coolObject.talkPeople.show = true
                coolObject.response5B.show = true

                if(isTeaching){
                    coolObject.talk004.show = true
                }

                coolObject.talk4A.enlarge = false
                coolObject.talk4B.enlarge = false

                CG.cool.isPeace = false
               
                coolTimer.timer5 = setTimeout(()=>{
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
                clickVedioPlay('talk')
                coolObject.talkPeople.image.src = './images/cool/people2.png'

                coolObject.talk6Chk = false
                coolObject.talk004.show = false

                coolObject.response5A.show = false
                coolObject.response5B.show = false
                coolObject.talk6.enlarge = false

                coolObject.response7.show = true
                coolTimer.timer6 = setTimeout(()=>{
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
                clickVedioPlay('talk')
                coolObject.talkPeople.image.src = './images/cool/people2.png'

                coolObject.talk8Chk = false

                coolObject.response7.show = false
                coolObject.talk8.enlarge = false

                coolObject.response9.show = true

                coolTimer.timer7 = setTimeout(()=>{
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
                clickVedioPlay('talk')
                coolObject.talkPeople.image.src = './images/cool/people2.png'

                coolObject.talk10Chk = false

                coolObject.response9.show = false
                coolObject.talk10A.enlarge = false
                coolObject.talk10B.enlarge = false

                coolObject.response11A.show = true

                coolTimer.timer8 = setTimeout(()=>{
                    coolObject.talk10A.show = false
                    coolObject.talk10B.show = false
                    coolObject.talkPeople.image.src = './images/cool/people1.png'
                    coolObject.response11A.show = false

                    coolObject.cup.enlarge = true
                    coolObject.cupChk = true
                }, coolObject.response11A.text.split('').length*10 + 2500)
            }
            if(x>=coolObject.talk10B.position.x && x<=coolObject.talk10B.position.x + coolObject.talk10B.width && y>=coolObject.talk10B.position.y && y<=coolObject.talk10B.position.y+coolObject.talk10B.height){
                clickVedioPlay('talk')
                coolObject.talkPeople.image.src = './images/cool/people2.png'

                coolObject.talk10Chk = false

                coolObject.response9.show = false
                coolObject.talk10A.enlarge = false
                coolObject.talk10B.enlarge = false

                coolObject.response11B.show = true

                CG.cool.isPeace = false
                coolTimer.timer9 = setTimeout(()=>{
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
                clickVedioPlay('obj')
                coolObject.cupChk = false
                coolObject.cup.enlarge = false
                coolObject.cup.show = false

                if(!CG.cool.isPeace){
                    coolObject.end.image.src = coolObject.end.image.src.replace('good', 'bad')
                    getCG.cool.push(0)
                    stopBgm()
                    audioBadend.play()
                }else{
                    getCG.cool.push(1)
                    stopBgm()
                    audioGoodend.play()
                }
                coolObject.end.show = true
                
                if(isTeaching){
                    coolObject.talk005.show = true
                }

                globalClick = true

                coolTimer.timer10 = setTimeout(()=>{
                    coolObject.talk005Chk = true
                    
                },100)
            }
            
        }

        if(globalClick && coolObject.talk005.show && coolObject.talk005Chk){
            clickVedioPlay('btn')
            coolObject.talk005Chk = false
            coolObject.talk005.show = false
            if(isTeaching){
                coolObject.talk006.show = true
            }

            coolTimer.timer11 = setTimeout(()=>{
                coolObject.talk006Chk = true
            },100)
        }

        if(globalClick && coolObject.talk006.show && coolObject.talk006Chk){
            clickVedioPlay('btn')
            coolObject.talk006Chk = false
            coolObject.talk006.show = false
            if(isTeaching){
                coolObject.talk06.show = true
            }
            buttons.close.enlarge = true
            globalClick = false
            starts.filter(start=>start.name === 'start05')[0].show = false

            coolTimer.timer12 = setTimeout(()=>{
                coolObject.talk06Chk = true
                startNav = true
            }, 100)
        }
    }

    if(roomOpen.occupy && isRoomOpen){
        if(occupyObject.sitdown.show && occupyObject.sitdownChk){
            if(x>=occupyObject.sitdown.position.x && x<=occupyObject.sitdown.position.x + occupyObject.sitdown.oldWidth && y>=occupyObject.sitdown.position.y && y<=occupyObject.sitdown.position.y + occupyObject.sitdown.oldHeight){
                clickVedioPlay('btn')
                occupyObject.sitdown.show = false
                occupyObject.sitdown.enlarge = false
                
                occupyObject.sitdownChk = false

                occupyObject.people.show = true
                occupyObject.talk1.show = true
                occupyObject.talk1.enlarge = true
                
                occupyTimer.timer1 = setTimeout(()=>{
                    occupyObject.talk1Chk = true

                }, 100)
                
            }
        }
        if(occupyObject.talk1.show && occupyObject.talk1Chk){
            if(!occupyObject.talk1Chk) return
            if(x>=occupyObject.talk1.position.x && x<=occupyObject.talk1.position.x + occupyObject.talk1.oldWidth && y>=occupyObject.talk1.position.y && y<=occupyObject.talk1.position.y + occupyObject.talk1.oldHeight){
                clickVedioPlay('talk')
                occupyObject.response2.show = true
                occupyObject.talk1Chk = false
                occupyObject.talk1.enlarge = false
                occupyTimer.timer2 = setTimeout(()=>{
                    occupyObject.talk1.show = false

                    occupyObject.talk3A.show = true
                    occupyObject.talk3A.enlarge = true
                    occupyObject.talk3B.show = true
                    occupyObject.talk3B.enlarge = true
                    occupyObject.talk3Chk  = true
                }, occupyObject.response2.text.split('').length*10 + 1500)
                
            }
        }

        if((occupyObject.talk3A.show && occupyObject.talk3B.show && occupyObject.talk3Chk)){
            if(!occupyObject.talk3Chk) return
            if(x>=occupyObject.talk3A.position.x && x<=occupyObject.talk3A.position.x + occupyObject.talk3A.oldWidth && y>=occupyObject.talk3A.position.y && y<=occupyObject.talk3A.position.y + occupyObject.talk3A.oldHeight){
                clickVedioPlay('talk')
                occupyObject.response4.show = true
                occupyObject.response2.show = false
                occupyObject.talk3Chk = false
                occupyObject.talk3A.enlarge = false
                occupyObject.talk3B.enlarge = false
                if(occupyObject.people.image.src.includes('people2')){
                    occupyObject.people.image.src = occupyObject.people.image.src.replace('people2', 'people1')
                }
                occupyTimer.timer3 = setTimeout(()=>{
                    occupyObject.talk3A.show = false
                    occupyObject.talk3B.show = false
    
                    occupyObject.talk5A.show = true
                    occupyObject.talk5A.enlarge = true
                    occupyObject.talk5B.show = true
                    occupyObject.talk5B.enlarge = true
    
                    occupyObject.talk5Chk = true
                    
                }, occupyObject.response4.text.split('').length*10 + 1500)
                
            }

            if(x>=occupyObject.talk3B.position.x && x<=occupyObject.talk3B.position.x + occupyObject.talk3B.oldWidth && y>=occupyObject.talk3B.position.y && y<=occupyObject.talk3B.position.y + occupyObject.talk3B.oldHeight){
                clickVedioPlay('talk')
                occupyObject.response4.show = true
                occupyObject.response2.show = false
                occupyObject.talk3Chk = false
                occupyObject.talk3A.enlarge = false
                occupyObject.talk3B.enlarge = false
                CG.occupy.isPeace = false
                if(occupyObject.people.image.src.includes('people1')){
                    occupyObject.people.image.src = occupyObject.people.image.src.replace('people1', 'people2')
                }
                occupyTimer.timer3 = setTimeout(()=>{
                    occupyObject.talk3A.show = false
                    occupyObject.talk3B.show = false
    
                    occupyObject.talk5A.show = true
                    occupyObject.talk5A.enlarge = true
                    occupyObject.talk5B.show = true
                    occupyObject.talk5B.enlarge = true
    
                    occupyObject.talk5Chk = true
                    
                }, occupyObject.response4.text.split('').length*10 + 1500)
            }

            
        }
      

        if((occupyObject.talk5A.show && occupyObject.talk5B.show && occupyObject.talk5Chk)){
            if(!occupyObject.talk5Chk) return
            if(x>=occupyObject.talk5A.position.x && x<=occupyObject.talk5A.position.x + occupyObject.talk5A.oldWidth && y>=occupyObject.talk5A.position.y && y<=occupyObject.talk5A.position.y + occupyObject.talk5A.oldHeight){
                clickVedioPlay('talk')
                occupyObject.response6A.show = true
                occupyObject.response4.show = false
                occupyObject.talk5Chk = false
                occupyObject.talk5A.enlarge = false
                occupyObject.talk5B.enlarge = false
                if(occupyObject.people.image.src.includes('people2')){
                    occupyObject.people.image.src = occupyObject.people.image.src.replace('people2', 'people1')
                }

                occupyTimer.timer4 = setTimeout(()=>{
                    occupyObject.talk5A.show = false
                    occupyObject.talk5B.show = false

                    occupyObject.talk7.show = true
                    occupyObject.talk7.enlarge = true
                    occupyObject.talk7Chk = true
                }, occupyObject.response6A.text.split('').length*10 + 1500)

            }
            if(x>=occupyObject.talk5B.position.x && x<=occupyObject.talk5B.position.x + occupyObject.talk5B.oldWidth && y>=occupyObject.talk5B.position.y && y<=occupyObject.talk5B.position.y + occupyObject.talk5B.oldHeight){
                clickVedioPlay('talk')
                occupyObject.response6B.show = true
                occupyObject.response4.show = false
                occupyObject.talk5Chk = false
                occupyObject.talk5A.enlarge = false
                occupyObject.talk5B.enlarge = false
                CG.occupy.isPeace = false
                if(occupyObject.people.image.src.includes('people1')){
                    occupyObject.people.image.src = occupyObject.people.image.src.replace('people1', 'people2')
                }
                occupyTimer.timer5 = setTimeout(()=>{
                    occupyObject.talk5A.show = false
                    occupyObject.talk5B.show = false

                    occupyObject.talk7.show = true
                    occupyObject.talk7.enlarge = true
                    occupyObject.talk7Chk = true
                }, occupyObject.response6B.text.split('').length*10 + 1500)

            }

            
        }

        if(occupyObject.talk7.show && occupyObject.talk7Chk){
            if(!occupyObject.talk7Chk) return
            if(x>=occupyObject.talk7.position.x && x<=occupyObject.talk7.position.x + occupyObject.talk7.oldWidth && y>=occupyObject.talk7.position.y && y<=occupyObject.talk7.position.y + occupyObject.talk7.oldHeight){
                clickVedioPlay('talk')
                occupyObject.response8.show = true
                occupyObject.response6A.show = false
                occupyObject.response6B.show = false
                occupyObject.talk7Chk = false
                occupyObject.talk7.enlarge = false

                occupyTimer.timer6 = setTimeout(()=>{
                    occupyObject.response9.show = true
                    occupyObject.chk.show = true
                    occupyObject.chk.enlarge = true
                    occupyObject.talk7.show = false
                }, occupyObject.response8.text.split('').length*10 + 2000)
            }
        }

        if(occupyObject.response9.show && occupyObject.chk.show){
            if(x>=occupyObject.chk.position.x && x<=occupyObject.chk.position.x + occupyObject.chk.oldWidth && y>=occupyObject.chk.position.y && y<=occupyObject.chk.position.y + occupyObject.chk.oldHeight){
                clickVedioPlay('btn')
                occupyObject.response8.show = false
                occupyObject.response9.show = false
                occupyObject.chk.show = false
                occupyObject.chk.enlarge = false
                occupyObject.people.show = false

                occupys.forEach(occupy=>{
                    if(occupy.name === null){
                        clickVedioPlay('obj')
                        occupy.dragging = true
                        occupy.enlarge = true
                    }
                })


            }
        }   

        if(occupyObject.talk10A.show && occupyObject.talk10B.show && occupyObject.talk10C.show && occupyObject.talk10Chk){
            if(!occupyObject.talk10Chk) return
            if(x>=occupyObject.talk10A.position.x && x<=occupyObject.talk10A.position.x + occupyObject.talk10A.oldWidth && y>=occupyObject.talk10A.position.y && y<=occupyObject.talk10A.position.y + occupyObject.talk10A.oldHeight){
                clickVedioPlay('talk')
                occupyObject.talk10Chk = false
                occupyObject.talk10A.enlarge = false
                occupyObject.talk10B.enlarge = false
                occupyObject.talk10C.enlarge = false
                if(occupyObject.people.image.src.includes('people2')){
                    occupyObject.people.image.src = occupyObject.people.image.src.replace('people2', 'people1')
                }
            }
            if(x>=occupyObject.talk10B.position.x && x<=occupyObject.talk10B.position.x + occupyObject.talk10B.oldWidth && y>=occupyObject.talk10B.position.y && y<=occupyObject.talk10B.position.y + occupyObject.talk10B.oldHeight){
                clickVedioPlay('talk')
                occupyObject.talk10Chk = false
                occupyObject.talk10A.enlarge = false
                occupyObject.talk10B.enlarge = false
                occupyObject.talk10C.enlarge = false
                if(occupyObject.people.image.src.includes('people2')){
                    occupyObject.people.image.src = occupyObject.people.image.src.replace('people2', 'people1')
                }
            }
            if(x>=occupyObject.talk10C.position.x && x<=occupyObject.talk10C.position.x + occupyObject.talk10C.oldWidth && y>=occupyObject.talk10C.position.y && y<=occupyObject.talk10C.position.y + occupyObject.talk10C.oldHeight){
                clickVedioPlay('talk')
                occupyObject.talk10Chk = false
                occupyObject.talk10A.enlarge = false
                occupyObject.talk10B.enlarge = false
                occupyObject.talk10C.enlarge = false
                CG.occupy.isPeace = false
                if(occupyObject.people.image.src.includes('people1')){
                    occupyObject.people.image.src = occupyObject.people.image.src.replace('people1', 'people2')
                }
            }

            occupyTimer.timer7 = setTimeout(()=>{
                if(!CG.occupy.isPeace){
                    occupyObject.end.image.src = occupyObject.end.image.src.replace('good', 'bad');
                    getCG.occupy.push(0)
                    stopBgm()
                    audioBadend.play()
                }else{
                    getCG.occupy.push(1)
                    stopBgm()
                    audioGoodend.play()
                }
                occupyObject.end.show = true
                occupyObject.talk10A.show = false
                occupyObject.talk10B.show = false
                occupyObject.talk10C.show = false
            }, 200)
        }
        
    }
    if(roomOpen.hoard && isRoomOpen){
        if(hoardObject.talk1.show && hoardObject.talk1Chk){
            if(!hoardObject.talk1Chk) return
            if(x>=hoardObject.talk1.position.x && x<=hoardObject.talk1.position.x + hoardObject.talk1.width && y>=hoardObject.talk1.position.y && y<=hoardObject.talk1.position.y+hoardObject.talk1.height){
                clickVedioPlay('talk')
                hoardObject.talk1Chk = false
                hoardObject.talk1.show = false
                hoardObject.talk1.enlarge = false

                hoardTimer.timer1 = setTimeout(()=>{
                    hoardObject.talk2.show = true
                    hoardObject.chk.show = true
                    hoardObject.chk.enlarge = true
                    hoardObject.talk2Chk = true
                }, 50)
            }
        }
        if(hoardObject.talk2.show && hoardObject.talk2Chk){
            if(!hoardObject.talk2Chk) return
            if(x>=hoardObject.chk.position.x && x<=hoardObject.chk.position.x + hoardObject.chk.width && y>=hoardObject.chk.position.y && y<=hoardObject.chk.position.y+hoardObject.chk.height){
                clickVedioPlay('btn')
                hoardObject.talk2Chk = false
                hoardObject.talk2.show = false
                hoardObject.chk.show = false
                hoardObject.chk.enlarge = false

                hoardTimer.timer2 = setTimeout(()=>{
                    hoardObject.h1.enlarge = true
                    hoardObject.removeInterObj = true
                }, 50)
            }
        }
        if(hoardObject.removeInterObj){
            if(hoardObject.removeInterObj && hoardObject.s1.show && hoardObject.s1.enlarge){
                if(x>=hoardObject.s1.position.x && x<=hoardObject.s1.position.x + hoardObject.s1.width && y>=hoardObject.s1.position.y && y<=hoardObject.s1.position.y+hoardObject.s1.height){
                    clickVedioPlay('obj')
                    hoardObject.removeInterObj = false

                    hoardObject.s1.show = false
                    hoardObject.s1.enlarge = false
                    
                    hoardObject.hold.show = false
                    hoardObject.hold.enlarge = false
                    hoardObject.smallPeople.show = true
                    hoardTimer.timer3 = setTimeout(()=>{
                        hoardObject.smallPeople.show = false
                        hoardObject.people.show = true
                        hoardObject.response3.show = true
                    }, 500)
                    hoardTimer.timer4 = setTimeout(()=>{
                        hoardObject.talk4.show = true
                        hoardObject.talk4.enlarge = true
                        hoardObject.talk4Chk = true
                    }, 1500)
                }
            }
            if(hoardObject.removeInterObj && hoardObject.a1.show && hoardObject.a1.enlarge){
                if(x>=hoardObject.a1.position.x && x<=hoardObject.a1.position.x + hoardObject.a1.width && y>=hoardObject.a1.position.y && y<=hoardObject.a1.position.y+hoardObject.a1.height){
                    clickVedioPlay('obj')
                    hoardObject.a1.show = false
                    hoardObject.a1.enlarge = false
                    hoardTimer.timer5 = setTimeout(()=>{
                        hoardObject.s1.enlarge = true
                    }, 10)
                }
            }
            if(hoardObject.removeInterObj && hoardObject.b1.show && hoardObject.b1.enlarge){
                if(x>=hoardObject.b1.position.x && x<=hoardObject.b1.position.x + hoardObject.b1.width && y>=hoardObject.b1.position.y && y<=hoardObject.b1.position.y+hoardObject.b1.height){
                    clickVedioPlay('obj')
                    hoardObject.b1.show = false
                    hoardObject.b1.enlarge = false
    
                    hoardTimer.timer6 = setTimeout(()=>{
                        hoardObject.a1.enlarge = true
                    }, 50)
                }
            }
            if(hoardObject.removeInterObj && hoardObject.c1.show && hoardObject.c1.enlarge){
                if(x>=hoardObject.c1.position.x && x<=hoardObject.c1.position.x + hoardObject.c1.width && y>=hoardObject.c1.position.y && y<=hoardObject.c1.position.y+hoardObject.c1.height){
                    clickVedioPlay('obj')
                    hoardObject.c1.show = false
                    hoardObject.c1.enlarge = false
    
                    hoardTimer.timer7 = setTimeout(()=>{
                        hoardObject.b1.enlarge = true
                    }, 50)
                }
            }
            if(hoardObject.removeInterObj && hoardObject.d1.show && hoardObject.d1.enlarge){
                if(x>=hoardObject.d1.position.x && x<=hoardObject.d1.position.x + hoardObject.d1.width && y>=hoardObject.d1.position.y && y<=hoardObject.d1.position.y+hoardObject.d1.height){
                    clickVedioPlay('obj')
                    hoardObject.d1.show = false
                    hoardObject.d1.enlarge = false
    
                    hoardTimer.timer8 = setTimeout(()=>{
                        hoardObject.c1.enlarge = true
                    }, 50)
                }
            }
            if(hoardObject.removeInterObj && hoardObject.e1.show && hoardObject.e1.enlarge){
                if(x>=hoardObject.e1.position.x && x<=hoardObject.e1.position.x + hoardObject.e1.width && y>=hoardObject.e1.position.y && y<=hoardObject.e1.position.y+hoardObject.e1.height){
                    clickVedioPlay('obj')
                    hoardObject.e1.show = false
                    hoardObject.e1.enlarge = false
    
                    hoardTimer.timer9 = setTimeout(()=>{
                        hoardObject.d1.enlarge = true
                    }, 50)
                }
            }
            if(hoardObject.removeInterObj && hoardObject.f1.show && hoardObject.f1.enlarge){
                if(x>=hoardObject.f1.position.x && x<=hoardObject.f1.position.x + hoardObject.f1.width && y>=hoardObject.f1.position.y && y<=hoardObject.f1.position.y+hoardObject.f1.height){
                    clickVedioPlay('obj')
                    hoardObject.f1.show = false
                    hoardObject.f1.enlarge = false
    
                    hoardTimer.timer10 = setTimeout(()=>{
                        hoardObject.e1.enlarge = true
                    }, 50)
                }
            }
            if(hoardObject.removeInterObj && hoardObject.g1.show && hoardObject.g1.enlarge){
                if(x>=hoardObject.g1.position.x && x<=hoardObject.g1.position.x + hoardObject.g1.width && y>=hoardObject.g1.position.y && y<=hoardObject.g1.position.y+hoardObject.g1.height){
                    clickVedioPlay('obj')
                    hoardObject.g1.show = false
                    hoardObject.g1.enlarge = false
    
                    hoardTimer.timer11 = setTimeout(()=>{
                        hoardObject.f1.enlarge = true
                    }, 50)
                }
            }
            if(hoardObject.removeInterObj && hoardObject.h1.show && hoardObject.h1.enlarge ){
                if(x>=hoardObject.h1.position.x && x<=hoardObject.h1.position.x + hoardObject.h1.width && y>=hoardObject.h1.position.y && y<=hoardObject.h1.position.y+hoardObject.h1.height){
                    clickVedioPlay('obj')
                    hoardObject.h1.show = false
                    hoardObject.h1.enlarge = false
    
                    hoardTimer.timer12 = setTimeout(()=>{
                        hoardObject.g1.enlarge = true
                    }, 50)
                }
            }
            
        }
        if(hoardObject.talk4.show && hoardObject.talk4Chk){
            if(!hoardObject.talk4Chk) return
            if(x>=hoardObject.talk4.position.x && x<=hoardObject.talk4.position.x + hoardObject.talk4.width && y>=hoardObject.talk4.position.y && y<=hoardObject.talk4.position.y+hoardObject.talk4.height){
                clickVedioPlay('talk')
                hoardObject.talk4Chk = false
                hoardObject.talk4.enlarge = false
                hoardObject.response3.show = false
                hoardObject.response5.show = true
                hoardTimer.timer13 = setTimeout(()=>{
                    hoardObject.talk4.show = false

                    hoardObject.talk6A.show = true
                    hoardObject.talk6A.enlarge = true
                    hoardObject.talk6B.show = true
                    hoardObject.talk6B.enlarge = true

                    hoardObject.talk6Chk = true
                }, hoardObject.response5.text.split('').length*10 + 1500)
            }
        }
        if(hoardObject.talk6A.show && hoardObject.talk6B.show && hoardObject.talk6Chk){
            if(!hoardObject.talk6Chk) return
            if(x>=hoardObject.talk6A.position.x && x<=hoardObject.talk6A.position.x + hoardObject.talk6A.width && y>=hoardObject.talk6A.position.y && y<=hoardObject.talk6A.position.y+hoardObject.talk6A.height){
                clickVedioPlay('talk')
                hoardObject.talk6Chk = false
                hoardObject.talk6A.enlarge = false
                hoardObject.talk6B.enlarge = false
                hoardObject.response5.show = false
                hoardObject.response7.show = true
                if(hoardObject.people.image.src.includes('people1')){
                    hoardObject.people.image.src = hoardObject.people.image.src.replace('people1', 'people3')
                }

                hoardTimer.timer14 = setTimeout(()=>{
                    hoardObject.talk6A.show = false
                    hoardObject.talk6B.show = false

                    hoardObject.talk8.show = true
                    hoardObject.talk8.enlarge = true

                    hoardObject.talk8Chk = true
                }, hoardObject.response7.text.split('').length*10 + 1500)
            }
            if(x>=hoardObject.talk6B.position.x && x<=hoardObject.talk6B.position.x + hoardObject.talk6B.width && y>=hoardObject.talk6B.position.y && y<=hoardObject.talk6B.position.y+hoardObject.talk6B.height){
                clickVedioPlay('talk')
                if(hoardObject.people.image.src.includes('people1')){
                    hoardObject.people.image.src = hoardObject.people.image.src.replace('people1', 'people2')
                }
                hoardObject.talk6Chk = false
                hoardObject.talk6A.enlarge = false
                hoardObject.talk6B.enlarge = false
                hoardObject.response5.show = false
                hoardObject.response7.show = true
                CG.hoard.isPeace = false
                hoardTimer.timer15 = setTimeout(()=>{
                    hoardObject.talk6A.show = false
                    hoardObject.talk6B.show = false

                    hoardObject.talk8.show = true
                    hoardObject.talk8.enlarge = true

                    hoardObject.talk8Chk = true
                }, hoardObject.response7.text.split('').length*10 + 1500)
            }
        }
        if(hoardObject.talk8.show && hoardObject.talk8Chk){
            if(!hoardObject.talk8Chk) return
            if(x>=hoardObject.talk8.position.x && x<=hoardObject.talk8.position.x + hoardObject.talk8.width && y>=hoardObject.talk8.position.y && y<=hoardObject.talk8.position.y+hoardObject.talk8.height){
                clickVedioPlay('talk')
                hoardObject.talk8Chk = false
                hoardObject.talk8.enlarge  = false
                hoardObject.response7.show = false
                hoardObject.response9.show = true

                hoardTimer.timer16 = setTimeout(()=>{
                    hoardObject.talk8.show = false

                    hoardObject.talk10A.show = true
                    hoardObject.talk10A.enlarge = true
                    hoardObject.talk10B.show = true
                    hoardObject.talk10B.enlarge = true

                    hoardObject.talk10Chk = true
                }, hoardObject.response9.text.split('').length*10 + 2000)
            }
        }
        if(hoardObject.talk10A.show && hoardObject.talk10B.show && hoardObject.talk10Chk){
            if(!hoardObject.talk10Chk) return
            if(x>=hoardObject.talk10A.position.x && x<=hoardObject.talk10A.position.x + hoardObject.talk10A.width && y>=hoardObject.talk10A.position.y && y<=hoardObject.talk10A.position.y+hoardObject.talk10A.height){
                clickVedioPlay('talk')
                if(hoardObject.people.image.src.includes('people1')){
                    hoardObject.people.image.src = hoardObject.people.image.src.replace('people1', 'people3')
                }else if(hoardObject.people.image.src.includes('people2')){
                    hoardObject.people.image.src = hoardObject.people.image.src.replace('people2', 'people3')
                }
                hoardObject.talk10Chk = false
                hoardObject.talk10A.enlarge = false
                hoardObject.talk10B.enlarge = false
                hoardObject.response9.show = false
                hoardObject.response11.show = true
                
                hoardTimer.timer17 = setTimeout(()=>{
                    hoardObject.talk10A.show = false
                    hoardObject.talk10B.show = false

                    hoardObject.talk12.show = true
                    hoardObject.talk12.enlarge = true

                    hoardObject.talk12Chk = true
                }, hoardObject.response11.text.split('').length*10 + 2000)
            }
            if(x>=hoardObject.talk10B.position.x && x<=hoardObject.talk10B.position.x + hoardObject.talk10B.width && y>=hoardObject.talk10B.position.y && y<=hoardObject.talk10B.position.y+hoardObject.talk10B.height){
                clickVedioPlay('talk')
                if(hoardObject.people.image.src.includes('people1')){
                    hoardObject.people.image.src = hoardObject.people.image.src.replace('people1', 'people2')
                }else if(hoardObject.people.image.src.includes('people3')){
                    hoardObject.people.image.src = hoardObject.people.image.src.replace('people3', 'people2')
                }
                hoardObject.talk10Chk = false
                hoardObject.talk10A.enlarge = false
                hoardObject.talk10B.enlarge = false
                hoardObject.response9.show = false
                hoardObject.response11.show = true
                CG.hoard.isPeace = false
                hoardTimer.timer18 = setTimeout(()=>{
                    hoardObject.talk10A.show = false
                    hoardObject.talk10B.show = false

                    hoardObject.talk12.show = true
                    hoardObject.talk12.enlarge = true

                    hoardObject.talk12Chk = true
                }, hoardObject.response11.text.split('').length*10 + 2000)
            }
        }
        if(hoardObject.talk12.show && hoardObject.talk12Chk){
            if(!hoardObject.talk12Chk) return
            if(x>=hoardObject.talk12.position.x && x<=hoardObject.talk12.position.x + hoardObject.talk12.width && y>=hoardObject.talk12.position.y && y<=hoardObject.talk12.position.y+hoardObject.talk12.height){
                clickVedioPlay('talk')
                hoardObject.talk12Chk = false
                hoardObject.talk12.enlarge  = false
                hoardObject.response11.show = false
                hoardObject.response13.show = true

                hoardTimer.timer19 = setTimeout(()=>{
                    hoardObject.talk12.show = false
                    hoardObject.talk14.show = true
                    hoardObject.chk.show = true
                    hoardObject.chk.enlarge = true
                    hoardObject.talk14Chk = true
                    
                }, hoardObject.response13.text.split('').length*10 + 1500)
            }
        }

        if(hoardObject.talk14.show && hoardObject.talk14Chk){
            if(!hoardObject.talk14Chk) return
            if(x>=hoardObject.chk.position.x && x<=hoardObject.chk.position.x + hoardObject.chk.width && y>=hoardObject.chk.position.y && y<=hoardObject.chk.position.y+hoardObject.chk.height){
                clickVedioPlay('talk')
                hoardObject.talk14Chk = false

                hoardObject.response13.show = false

                hoardObject.talk14.show = false
                hoardObject.chk.show = false
                hoardObject.chk.enlarge = false
                hoardObject.people.show = false
                hoardTimer.timer20 = setTimeout(()=>{
                    hoardObject.startInter = true

                    hoardObject.inter1.enlarge = true
                    hoardObject.inter2.enlarge = true
                    hoardObject.inter3.enlarge = true
                    hoardObject.inter4.enlarge = true
                    hoardObject.inter5.enlarge = true
                    hoardObject.inter6.enlarge = true
                    hoardObject.inter7.enlarge = true
                    hoardObject.inter8.enlarge = true
                }, 100)
            }
        }

        if(hoardObject.startInter){
            if(hoardObject.inter1.enlarge && !hoardObject.inter1Ok.show){
                if(x>=hoardObject.inter1.position.x && x<=hoardObject.inter1.position.x + hoardObject.inter1.width && y>=hoardObject.inter1.position.y && y<=hoardObject.inter1.position.y+hoardObject.inter1.height){
                    clickVedioPlay('btn')
                    hoardObject.inter1Ok.show = true
                    hoardObject.inter1.enlarge = false
                    hoardObject.interNum ++
                }
            }
            if(hoardObject.inter2.enlarge && !hoardObject.inter2Ok.show){
                if(x>=hoardObject.inter2.position.x && x<=hoardObject.inter2.position.x + hoardObject.inter2.width && y>=hoardObject.inter2.position.y && y<=hoardObject.inter2.position.y+hoardObject.inter2.height){
                    clickVedioPlay('btn')
                    hoardObject.inter2Ok.show = true
                    hoardObject.inter2.enlarge = false
                    hoardObject.interNum ++
                }
            }
            if(hoardObject.inter3.enlarge && !hoardObject.inter3Ok.show){
                if(x>=hoardObject.inter3.position.x && x<=hoardObject.inter3.position.x + hoardObject.inter3.width && y>=hoardObject.inter3.position.y && y<=hoardObject.inter3.position.y+hoardObject.inter3.height){
                    clickVedioPlay('btn')
                    hoardObject.inter3Ok.show = true
                    hoardObject.inter3.enlarge = false
                    hoardObject.interNum ++
                }
            }
            if(hoardObject.inter4.enlarge && !hoardObject.inter4Ok.show){
                if(x>=hoardObject.inter4.position.x && x<=hoardObject.inter4.position.x + hoardObject.inter4.width && y>=hoardObject.inter4.position.y && y<=hoardObject.inter4.position.y+hoardObject.inter4.height){
                    clickVedioPlay('btn')
                    hoardObject.inter4Ok.show = true
                    hoardObject.inter4.enlarge = false
                    hoardObject.interNum ++
                }
            }
            if(hoardObject.inter5.enlarge && !hoardObject.inter5Ok.show){
                if(x>=hoardObject.inter5.position.x && x<=hoardObject.inter5.position.x + hoardObject.inter5.width && y>=hoardObject.inter5.position.y && y<=hoardObject.inter5.position.y+hoardObject.inter5.height){
                    clickVedioPlay('btn')
                    hoardObject.inter5Ok.show = true
                    hoardObject.inter5.enlarge = false
                    hoardObject.interNum ++
                }
            }
            if(hoardObject.inter6.enlarge && !hoardObject.inter6Ok.show){
                if(x>=hoardObject.inter6.position.x && x<=hoardObject.inter6.position.x + hoardObject.inter6.width && y>=hoardObject.inter6.position.y && y<=hoardObject.inter6.position.y+hoardObject.inter6.height){
                    clickVedioPlay('btn')
                    hoardObject.inter6Ok.show = true
                    hoardObject.inter6.enlarge = false
                    hoardObject.interNum ++
                }
            }
            if(hoardObject.inter7.enlarge && !hoardObject.inter7Ok.show){
                if(x>=hoardObject.inter7.position.x && x<=hoardObject.inter7.position.x + hoardObject.inter7.width && y>=hoardObject.inter7.position.y && y<=hoardObject.inter7.position.y+hoardObject.inter7.height){
                    clickVedioPlay('btn')
                    hoardObject.inter7Ok.show = true
                    hoardObject.inter7.enlarge = false
                    hoardObject.interNum ++
                }
            }
            if(hoardObject.inter8.enlarge && !hoardObject.inter8Ok.show){
                if(x>=hoardObject.inter8.position.x && x<=hoardObject.inter8.position.x + hoardObject.inter8.width && y>=hoardObject.inter8.position.y && y<=hoardObject.inter8.position.y+hoardObject.inter8.height){
                    clickVedioPlay('btn')
                    hoardObject.inter8Ok.show = true
                    hoardObject.inter8.enlarge = false
                    hoardObject.interNum ++
                }
            }
            if(hoardObject.interNum === 8){
                hoardObject.startInter = false
                hoardTimer.timer21 = setTimeout(()=>{
                    hoardObject.finish.show = true
                    hoardObject.chk2.show = true
                    hoardObject.chk2.enlarge = true

                    hoardObject.finishChk = true
                }, 100)
            }
        }

        if(hoardObject.finishChk && hoardObject.finish.show){
            if(!hoardObject.finishChk) return
            if(x>=hoardObject.chk2.position.x && x<=hoardObject.chk2.position.x + hoardObject.chk2.width && y>=hoardObject.chk2.position.y && y<=hoardObject.chk2.position.y+hoardObject.chk2.height){
                clickVedioPlay('btn')
                hoardObject.finishChk = false

                hoardObject.finish.show = false
                hoardObject.chk2.show = false
                hoardObject.chk2.enlarge = false


                hoardObject.inter1.show = false
                hoardObject.inter2.show = false
                hoardObject.inter3.show = false
                hoardObject.inter4.show = false
                hoardObject.inter5.show = false
                hoardObject.inter6.show = false
                hoardObject.inter7.show = false
                hoardObject.inter8.show = false
                hoardObject.inter1Ok.show = false
                hoardObject.inter2Ok.show = false
                hoardObject.inter3Ok.show = false
                hoardObject.inter4Ok.show = false
                hoardObject.inter5Ok.show = false
                hoardObject.inter6Ok.show = false
                hoardObject.inter7Ok.show = false
                hoardObject.inter8Ok.show = false

                if(!hoard.image.src.includes('-.png')){
                    hoard.image.src = hoard.image.src.replace('.png', '-.png')
                }
                hoardObject.people.show = true
                if(hoardObject.people.image.src.includes('people2')){
                    hoardObject.people.image.src = hoardObject.people.image.src.replace('people2', 'people1')
                }else if(hoardObject.people.image.src.includes('people3')){
                    hoardObject.people.image.src = hoardObject.people.image.src.replace('people3', 'people1')
                }
                hoardObject.response15.show = true
                hoardTimer.timer22 = setTimeout(()=>{
                    hoardObject.talk16A.show = true
                    hoardObject.talk16A.enlarge = true
                    hoardObject.talk16B.show = true
                    hoardObject.talk16B.enlarge = true
                    hoardObject.talk16C.show = true
                    hoardObject.talk16C.enlarge = true
                    hoardObject.talk16Chk = true
                }, hoardObject.response15.text.split('').length*10 + 1500)
            }
        }
        if(hoardObject.talk16A.show && hoardObject.talk16B.show && hoardObject.talk16C.show && hoardObject.talk16Chk){
            if(!hoardObject.talk16Chk) return
            if(x>=hoardObject.talk16A.position.x && x<=hoardObject.talk16A.position.x + hoardObject.talk16A.width && y>=hoardObject.talk16A.position.y && y<=hoardObject.talk16A.position.y+hoardObject.talk16A.height){
                clickVedioPlay('talk')
                hoardObject.talk16Chk = false
                hoardObject.response15.show = false
                hoardObject.talk16A.show = false
                hoardObject.talk16B.show = false
                hoardObject.talk16C.show = false
                hoardObject.talk16A.enlarge = false
                hoardObject.talk16B.enlarge = false
                hoardObject.talk16C.enlarge = false

                if(!CG.hoard.isPeace){
                    if(hoardObject.people.image.src.includes('people1')){
                        hoardObject.people.image.src = hoardObject.people.image.src.replace('people1', 'people2')
                    }else if(hoardObject.people.image.src.includes('people3')){
                        hoardObject.people.image.src = hoardObject.people.image.src.replace('people3', 'people2')
                    }
                    getCG.hoard.push(0)
                    stopBgm()
                    audioBadend.play()
                    hoardObject.end.image.src = hoardObject.end.image.src.replace('good', 'bad')
                }else{
                    stopBgm()
                    audioGoodend.play()
                    getCG.hoard.push(1)
                }
                hoardObject.end.show = true
            }
            if(x>=hoardObject.talk16B.position.x && x<=hoardObject.talk16B.position.x + hoardObject.talk16B.width && y>=hoardObject.talk16B.position.y && y<=hoardObject.talk16B.position.y+hoardObject.talk16B.height){
                clickVedioPlay('talk')
                hoardObject.talk16Chk = false
                hoardObject.response15.show = false
                hoardObject.talk16A.show = false
                hoardObject.talk16B.show = false
                hoardObject.talk16C.show = false
                hoardObject.talk16A.enlarge = false
                hoardObject.talk16B.enlarge = false
                hoardObject.talk16C.enlarge = false

                if(!CG.hoard.isPeace){
                    if(hoardObject.people.image.src.includes('people1')){
                        hoardObject.people.image.src = hoardObject.people.image.src.replace('people1', 'people2')
                    }else if(hoardObject.people.image.src.includes('people3')){
                        hoardObject.people.image.src = hoardObject.people.image.src.replace('people3', 'people2')
                    }
                    getCG.hoard.push(0)
                    stopBgm()
                    audioBadend.play()
                    hoardObject.end.image.src = hoardObject.end.image.src.replace('good', 'bad')
                }else{
                    stopBgm()
                    audioGoodend.play()
                    getCG.hoard.push(1)
                }
                hoardObject.end.show = true
            }
            if(x>=hoardObject.talk16C.position.x && x<=hoardObject.talk16C.position.x + hoardObject.talk16C.width && y>=hoardObject.talk16C.position.y && y<=hoardObject.talk16C.position.y+hoardObject.talk16C.height){
                clickVedioPlay('talk')
                CG.hoard.isPeace = false
                
                hoardObject.talk16Chk = false
                hoardObject.response15.show = false
                hoardObject.talk16A.show = false
                hoardObject.talk16B.show = false
                hoardObject.talk16C.show = false
                hoardObject.talk16A.enlarge = false
                hoardObject.talk16B.enlarge = false
                hoardObject.talk16C.enlarge = false

                if(!CG.hoard.isPeace){
                    if(hoardObject.people.image.src.includes('people1')){
                        hoardObject.people.image.src = hoardObject.people.image.src.replace('people1', 'people2')
                    }else if(hoardObject.people.image.src.includes('people3')){
                        hoardObject.people.image.src = hoardObject.people.image.src.replace('people3', 'people2')
                    }
                    getCG.hoard.push(0)
                    stopBgm()
                    audioBadend.play()
                    hoardObject.end.image.src = hoardObject.end.image.src.replace('good', 'bad')
                }else{
                    getCG.hoard.push(1)
                    stopBgm()
                    audioGoodend.play()
                }
                hoardObject.end.show = true
            }
        }
    }
    interactions.forEach(interaction=>{
        let bool = x >= interaction.position.x && x <= interaction.position.x + interaction.width && y>=interaction.position.y && y<=interaction.position.y + interaction.height
        if(!bool) return
        if(!interaction.show) return
        if(!interaction.enlarge) return
        if(startNav){
            if(!interaction.show) return
        }
        if(interaction.name === 'cool'){
            if(isRoomOpen) return
            clickVedioPlay('inRoom')
            roomOpen.cool = true
            isRoomOpen = true
            player.move = true
            if(!isTeaching){
                buttons.close.enlarge = true
                cools.filter(cool=> cool.name === '001')[0].show = false
            }else{
                buttons.close.enlarge = false
            }
            if(startNav){
                startNav = false
                Object.keys(interactions).forEach(interaction=>{
                    interactions[interaction].show = true
                    interactions[interaction].enlarge = false
                })
            }
            
        }else if(interaction.name === 'occupy'){
            if(isRoomOpen) return
            clickVedioPlay('inRoom')
            roomOpen.occupy = true
            isRoomOpen = true
        }else if(interaction.name === 'hoard'){
            if(isRoomOpen) return
            clickVedioPlay('inRoom')
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
                clickVedioPlay('btn')
                setTimeout(()=>{
                    globalClick = true
                    starts.filter(start=> start.name === 'chk2' )[0].show = true
                    starts.filter(start=> start.name === 'chk2' )[0].enlarge = true
                    starts.filter(start=> start.name === 'skip' )[0].show = true
                    starts.filter(start=> start.name === 'skip' )[0].enlarge = true
                }, 100)
            }
        
        })
    }
    if(startNav){
        if(startNav && globalClick && starts.filter(start=> start.name === 'start02' )[0].show ){
            let chk = starts.filter(start=> start.name === 'chk2' )[0]
            let bool = x >= chk.position.x && x <= chk.position.x + chk.width && y>=chk.position.y && y<=chk.position.y + chk.height
            if(bool){
                clickVedioPlay('btn')
                globalClick = false
                starts.filter(start=> start.name === 'start02' )[0].show = false
                starts.filter(start=> start.name === 'skip' )[0].show = false
                starts.filter(start=> start.name === 'skip' )[0].enlarge = false

                starts.filter(start=> start.name === 'chk2' )[0].show = false
                starts.filter(start=> start.name === 'chk2' )[0].enlarge = false

                starts.filter(start=> start.name === 'start03' )[0].show = true
                setTimeout(()=>{
                    globalClick = true
                }, 100)
            }
            
        }
        if(startNav && globalClick && starts.filter(start=> start.name === 'start03' )[0].show ){
            clickVedioPlay('btn')
            globalClick = false
            starts.filter(start=> start.name === 'start03' )[0].show = false
            starts.filter(start=> start.name === 'start04' )[0].show = true
            setTimeout(()=>{
                globalClick = true
            }, 100)
        }
        if(startNav && globalClick && starts.filter(start=> start.name === 'start04' )[0].show ){
            clickVedioPlay('btn')
            globalClick = false
            starts.filter(start=> start.name === 'start04' )[0].show = false
            starts.filter(start=> start.name === 'start05' )[0].show = true
            interactions.filter(interaction=>interaction.name === 'cool')[0].show = true
            interactions.filter(interaction=>interaction.name === 'cool')[0].enlarge = true
        }
        if(startNav && globalClick && starts.filter(start=> start.name === 'start07' )[0].show){
            clickVedioPlay('btn')
            starts.filter(start=> start.name === 'start07' )[0].show = false
    
            setTimeout(()=>{
                starts.filter(start=> start.name === 'start08' )[0].show = true
            }, 10)
        }
        if(startNav && globalClick && starts.filter(start=> start.name === 'start08' )[0].show){
            clickVedioPlay('btn')
            starts.filter(start=> start.name === 'start08' )[0].show = false
    
            setTimeout(()=>{
                starts.filter(start=> start.name === 'start09' )[0].show = true
            }, 10)
        }
        if(startNav && globalClick && starts.filter(start=> start.name === 'start09' )[0].show){
            clickVedioPlay('btn')
            starts.filter(start=> start.name === 'start09' )[0].show = false
    
            setTimeout(()=>{
                starts.filter(start=> start.name === 'start10' )[0].show = true
            }, 10)
        }
        if(startNav && globalClick && starts.filter(start=> start.name === 'start10' )[0].show){
            clickVedioPlay('btn')
            starts.filter(start=> start.name === 'start10' )[0].show = false
            setTimeout(()=>{
                startNav = false
                globalClick = false
                isTeaching = false
                Object.keys(interactions).forEach(interaction=>{
                    interactions[interaction].show = true
                    interactions[interaction].enlarge = true
                })
                phone.enlarge = true
            }, 10)
        }
        
    }
    if(isTeaching && starts.filter(start=> start.name === 'skip' )[0].show && starts.filter(start=> start.name === 'skip' )[0].enlarge){
    
        let skip = starts.filter(start=> start.name === 'skip' )[0]
        let bool = x >= skip.position.x && x <= skip.position.x + skip.width && y>=skip.position.y && y<=skip.position.y + skip.height
        if(bool){
            clickVedioPlay('btn')
            starts.forEach(start=>{
                start.show = false
                start.enlarge = false
            })
            Object.keys(interactions).forEach(interaction=>{
                interactions[interaction].show = true
                interactions[interaction].enlarge = true
            })
            buttons.close.enlarge = true
            startNav = false
            isTeaching = false
            globalClick = false
            player.move = true
            phone.enlarge = true
        }
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


function initCoolRoom(){
    coolObject.talk1Chk = true
    coolObject.talk2Chk = false
    coolObject.talk3Chk = false
    coolObject.talk4Chk = false
    coolObject.talk6Chk = false
    coolObject.talk8Chk = false
    coolObject.talk10Chk = false
    coolObject.cupChk = false
    coolObject.talk005Chk = false
    coolObject.talk006Chk = false
    coolObject.talk06Chk = false
    
    Object.keys(coolTimer).forEach(timer=>{
        clearTimeout(coolTimer[timer])
    })
    cools.forEach(cool=>{
        if(cool.name === 'cup' || cool.name === 'people' || cool.name === '1'){
            cool.show = true
        }else{
            cool.show = false
        }

        if(cool.name === '1'){
            cool.enlarge = true
        }else{
            cool.enlarge = false
        }
        if(cool.talk){
            cool.isTypewriter = true
            if(cool.image.src.includes('_.png')){
                cool.image.src = cool.image.src.replace('_.png', '.png')
            }
        }
        cool.num = 0;cool.step = 0;cool.twoStep = 25;cool.threeStep = 50
    })

    CG.cool.isPeace = true
    if(coolObject.people.image.src.includes('people2')){
        coolObject.people.image.src = coolObject.people.image.src.replace('people2', 'people1')
    }else if(coolObject.people.image.src.includes('people3')){
        coolObject.people.image.src = coolObject.people.image.src.replace('people3', 'people1')
    }
    if(coolObject.end.image.src.includes('bad')){
        coolObject.end.image.src = coolObject.end.image.src.replace('bad','good')
    }
    console.log(getCG);
}
function initOccupyRoom(){
    occupyObject.sitdownChk = true
    occupyObject.talk1Chk = false
    occupyObject.talk3Chk = false
    occupyObject.talk5Chk = false
    occupyObject.talk7Chk = false
    occupyObject.talk10Chk = false

    occupyMoveNum = 0

    Object.keys(occupyTimer).forEach(timer=>{
        clearTimeout(occupyTimer[timer])
    })
    occupys.forEach(occupy=>{
        
        if(occupy.name === 'sitdown'){
            occupy.show = true
            occupy.enlarge = true
        }else{
            occupy.dragging = false
            occupy.enlarge = false
            if(occupy.name === null){
                occupy.show = true
                occupy.position.x = occupy.oldPosition.x
                occupy.position.y = occupy.oldPosition.y
                occupy.width = occupy.oldWidth
                occupy.height = occupy.oldHeight
                if(occupy.image.src.includes('1-1.png')){
                    occupy.image.src = occupy.image.src.replace('1-1.png', '1.png')
                }
            }else{
                occupy.show = false
            }
        }

        if(occupy.talk){
            occupy.isTypewriter = true
            if(occupy.image.src.includes('_.png')){
                occupy.image.src = occupy.image.src.replace('_.png', '.png')
            }
        }
        occupy.num = 0;occupy.step = 0;occupy.twoStep = 25;occupy.threeStep = 50

    })
    CG.occupy.isPeace = true
    if(occupyObject.people.image.src.includes('people2')){
        occupyObject.people.image.src = occupyObject.people.image.src.replace('people2', 'people1')
    }
    if(occupyObject.end.image.src.includes('bad')){
        occupyObject.end.image.src = occupyObject.end.image.src.replace('bad', 'good')
    }
    console.log(getCG);
}
function initHoardRoom(){
    hoardObject.talk1Chk = true
    hoardObject.talk2Chk = false
    hoardObject.removeInterObj = false
    hoardObject.talk4Chk = false
    hoardObject.talk6Chk = false
    hoardObject.talk8Chk = false
    hoardObject.talk10Chk = false
    hoardObject.talk12Chk = false
    hoardObject.talk14Chk = false
    hoardObject.startInter = false
    hoardObject.finishChk = false
    hoardObject.talk16Chk = false

    hoardObject.interNum = 0
    if(hoard.image.src.includes('-.png')){
        hoard.image.src = hoard.image.src.replace('-.png', '.png')
    }
    
    Object.keys(hoardTimer).forEach(timer=>{
        clearTimeout(hoardTimer[timer])
    })

    hoards.forEach(hoard=>{
        hoard.enlarge = false
        if( hoard.name === 'inter1' ||
            hoard.name === 'inter2' ||
            hoard.name === 'inter3' ||
            hoard.name === 'inter4' || 
            hoard.name === 'inter5' || 
            hoard.name === 'inter6' || 
            hoard.name === 'inter7' || 
            hoard.name === 'inter8' ||
            hoard.name === 'hold' ||
            hoard.name === 's1' ||
            hoard.name === 'a1' ||
            hoard.name === 'b1' ||
            hoard.name === 'c1' ||
            hoard.name === 'd1' ||
            hoard.name === 'e1' ||
            hoard.name === 'f1' ||
            hoard.name === 'g1' ||
            hoard.name === 'h1' ||
            hoard.name === '1' ){
                hoard.show = true
            }else{
                hoard.show = false
            }
        if(hoard.name === '1'){
            hoard.enlarge = true
        }

        if(hoard.talk){
            hoard.isTypewriter = true
            if(hoard.image.src.includes('_.png')){
                hoard.image.src = hoard.image.src.replace('_.png', '.png')
            }
        }
        hoard.num = 0;hoard.step = 0;hoard.twoStep = 25;hoard.threeStep = 50

    })
    console.log(getCG);
    CG.hoard.isPeace = true
    
    if(hoardObject.people.image.src.includes('people2')){
        hoardObject.people.image.src = hoardObject.people.image.src.replace('people2', 'people1')
    }else if(hoardObject.people.image.src.includes('people3')){
        hoardObject.people.image.src = hoardObject.people.image.src.replace('people3', 'people1')
    }
    if(hoardObject.end.image.src.includes('bad')){
        console.log('有');
        hoardObject.end.image.src = hoardObject.end.image.src.replace('bad', 'good')
    }
}




function clickVedioPlay(name){
    if(name == 'talk'){
        audioTalk.play()
    }else if(name == 'btn'){
        audioBtn.play()
    }else if(name == 'inRoom'){
        audioInRoom.play()
    }else if(name == 'obj'){
        audioObj.play()
    }
}

function playBgm(){
    bgmAudio.loop = true
    bgmAudio.play();
    
}
function stopBgm(){
    bgmAudio.pause();
    bgmAudio.currentTime = 0;
}
