


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
                audioRunning.loop = true
                audioRunning.play()
            }
            break;
        case 65:
            if(!isRoomOpen){
                keys.left.pressed = true
                audioRunning.loop = true
                audioRunning.play()
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
            audioRunning.pause()
            audioRunning.currentTime = 0
            break;
        case 65:
            keys.left.pressed = false
            audioRunning.pause()
            audioRunning.currentTime = 0
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
    busAudioStart = false
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    if(!bus.start && beginningBool){
        beginnings.some(beginning=>{
            if(!beginning.enlarge) return
            if(x >= beginning.position.x && x<=beginning.position.x+beginning.width && y>=beginning.position.y && y<=beginning.position.y + beginning.height){
                // beginning.width = beginning.bigWidth
                // beginning.height = beginning.bigHeight
                if((!beginning.image.src.includes('_.png')) && beginning.talk){
                    beginning.image.src = beginning.image.src.replace('.png', '_.png')
                }
                return canvas.style.cursor = "pointer"
            }
            // beginning.width = beginning.oldWidth
            // beginning.height = beginning.oldHeight
            canvas.style.cursor = "default"
            if(beginning.image.src.includes('_.png')){
                beginning.image.src = beginning.image.src.replace('_.png', '.png')
            }
        })
    }
    if(!isStart) return

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
    if(roomOpen.network && isRoomOpen){
        networks.some(net=>{
            if(!net.enlarge) return
            if(x >= net.position.x && x<=net.position.x+net.width && y>=net.position.y && y<=net.position.y + net.height){
                net.width = net.bigWidth
                net.height = net.bigHeight
                if((!net.image.src.includes('_.png')) && net.talk){
                    net.image.src = net.image.src.replace('.png', '_.png')
                }
                return canvas.style.cursor = "pointer"
            }
            net.width = net.oldWidth
            net.height = net.oldHeight
            canvas.style.cursor = "default"
            if(net.image.src.includes('_.png')){
                net.image.src = net.image.src.replace('_.png', '.png')
            }
        })
    }
    if(roomOpen.noisy && isRoomOpen){
        noisys.some(noisy=>{
            if(!noisy.enlarge) return
            if(x >= noisy.position.x && x<=noisy.position.x+noisy.width && y>=noisy.position.y && y<=noisy.position.y + noisy.height){
                noisy.width = noisy.bigWidth
                noisy.height = noisy.bigHeight
                if((!noisy.image.src.includes('_.png')) && noisy.talk){
                    noisy.image.src = noisy.image.src.replace('.png', '_.png')
                }
                return canvas.style.cursor = "pointer"
            }
            noisy.width = noisy.oldWidth
            noisy.height = noisy.oldHeight
            canvas.style.cursor = "default"
            if(noisy.image.src.includes('_.png')){
                noisy.image.src = noisy.image.src.replace('_.png', '.png')
            }
        })
    }
    if(roomOpen.delay && isRoomOpen){
        delays.some(delay=>{
            if(!delay.enlarge) return
            if(x >= delay.position.x && x<=delay.position.x+delay.width && y>=delay.position.y && y<=delay.position.y + delay.height){
                delay.width = delay.bigWidth
                delay.height = delay.bigHeight
                if((!delay.image.src.includes('_.png')) && delay.talk){
                    delay.image.src = delay.image.src.replace('.png', '_.png')
                }
                return canvas.style.cursor = "pointer"
            }
            delay.width = delay.oldWidth
            delay.height = delay.oldHeight
            canvas.style.cursor = "default"
            if(delay.image.src.includes('_.png')){
                delay.image.src = delay.image.src.replace('_.png', '.png')
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

    interOkNum: 0,

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
//網路
const netObject = {
    computer: networks.filter(net=>net.name === 'computer')[0],

    smallPeople: networks.filter(net=>net.name === 'smallPeople')[0],
    people: networks.filter(net=>net.name === 'people')[0],
    startChk:true,
    response1: networks.filter(net=>net.name === '1')[0],

    talk2: networks.filter(net=>net.name === '2')[0],
    talk2Chk: false,
    response3: networks.filter(net=>net.name === '3')[0],

    talk4: networks.filter(net=>net.name === '4')[0],
    talk4Chk: false,
    response5: networks.filter(net=>net.name === '5')[0],

    talk6: networks.filter(net=>net.name === '6')[0],
    talk6Chk: false,
    response7: networks.filter(net=>net.name === '7')[0],

    talk8A: networks.filter(net=>net.name === '8A')[0],
    talk8B: networks.filter(net=>net.name === '8B')[0],
    talk8Chk: false,
    response9A: networks.filter(net=>net.name === '9A')[0],
    response9B: networks.filter(net=>net.name === '9B')[0],

    talk10: networks.filter(net=>net.name === '10')[0],
    talk10Chk: false,

    talk11A: networks.filter(net=>net.name === '11A')[0],
    talk11B: networks.filter(net=>net.name === '11B')[0],
    talk11Chk: false,
    response12: networks.filter(net=>net.name === '12')[0],

    talk13A: networks.filter(net=>net.name === '13A')[0],
    talk13B: networks.filter(net=>net.name === '13B')[0],
    talk13Chk: false,
    response14: networks.filter(net=>net.name === '14')[0],

    talk15: networks.filter(net=>net.name === '15')[0],
    talk15Chk: false,

    webShow:false,
    web: networks.filter(cool=>cool.name === 'web')[0],
    left: networks.filter(cool=>cool.name === 'left')[0],
    right: networks.filter(cool=>cool.name === 'right')[0],
    webNum: 1,
    web2btn1: networks.filter(cool=>cool.name === 'web2btn1')[0],
    web2btn2: networks.filter(cool=>cool.name === 'web2btn2')[0],
    web2btn3: networks.filter(cool=>cool.name === 'web2btn3')[0],
    web3btn: networks.filter(cool=>cool.name === 'web3btn')[0],
    web4btn: networks.filter(cool=>cool.name === 'web4btn')[0],
    web5btn: networks.filter(cool=>cool.name === 'web5btn')[0],
    web6btn: networks.filter(cool=>cool.name === 'web6btn')[0],

    is404: false,
    goback: networks.filter(cool=>cool.name === 'goback')[0],
    chk: networks.filter(net=>net.name === 'chk')[0],
    
    end: networks.filter(net=>net.name === 'end')[0],
}
const noisyObject = {
    wall1: noisys.filter(noisy=>noisy.name === 'wall1')[0],
    wall2: noisys.filter(noisy=>noisy.name === 'wall2')[0],
    wall3: noisys.filter(noisy=>noisy.name === 'wall3')[0],
    wall4: noisys.filter(noisy=>noisy.name === 'wall4')[0],
    wall5: noisys.filter(noisy=>noisy.name === 'wall5')[0],
    wall6: noisys.filter(noisy=>noisy.name === 'wall6')[0],
    wall7: noisys.filter(noisy=>noisy.name === 'wall7')[0],

    walltalk1: noisys.filter(noisy=>noisy.name === 'walltalk1')[0],
    walltalk2: noisys.filter(noisy=>noisy.name === 'walltalk2')[0],
    walltalk3: noisys.filter(noisy=>noisy.name === 'walltalk3')[0],
    walltalk4: noisys.filter(noisy=>noisy.name === 'walltalk4')[0],
    walltalk5: noisys.filter(noisy=>noisy.name === 'walltalk5')[0],
    walltalk6: noisys.filter(noisy=>noisy.name === 'walltalk6')[0],
    walltalk7: noisys.filter(noisy=>noisy.name === 'walltalk7')[0],

    walltalk1chk: noisys.filter(noisy=>noisy.name === 'walltalk1chk')[0],
    walltalk2chk: noisys.filter(noisy=>noisy.name === 'walltalk2chk')[0],
    walltalk3chk: noisys.filter(noisy=>noisy.name === 'walltalk3chk')[0],
    walltalk4chk: noisys.filter(noisy=>noisy.name === 'walltalk4chk')[0],
    walltalk5chk: noisys.filter(noisy=>noisy.name === 'walltalk5chk')[0],
    walltalk6chk: noisys.filter(noisy=>noisy.name === 'walltalk6chk')[0],
    walltalk7chk: noisys.filter(noisy=>noisy.name === 'walltalk7chk')[0],

    walltalk1cancel: noisys.filter(noisy=>noisy.name === 'walltalk1cancel')[0],
    walltalk2cancel: noisys.filter(noisy=>noisy.name === 'walltalk2cancel')[0],
    walltalk3cancel: noisys.filter(noisy=>noisy.name === 'walltalk3cancel')[0],
    walltalk4cancel: noisys.filter(noisy=>noisy.name === 'walltalk4cancel')[0],
    walltalk5cancel: noisys.filter(noisy=>noisy.name === 'walltalk5cancel')[0],
    walltalk6cancel: noisys.filter(noisy=>noisy.name === 'walltalk6cancel')[0],
    walltalk7cancel: noisys.filter(noisy=>noisy.name === 'walltalk7cancel')[0],


    smallPeople: noisys.filter(noisy=>noisy.name === 'smallPeople')[0],
    people: noisys.filter(noisy=>noisy.name === 'people')[0],
    startChk: true,

    talk1A: noisys.filter(noisy=>noisy.name === '1A')[0],
    talk1B: noisys.filter(noisy=>noisy.name === '1B')[0],
    talk1Chk: false,
    response2A: noisys.filter(noisy=>noisy.name === '2A')[0],
    response2B: noisys.filter(noisy=>noisy.name === '2B')[0],

    talk3: noisys.filter(noisy=>noisy.name === '3')[0],
    talk3Chk: false,

    talk4A: noisys.filter(noisy=>noisy.name === '4A')[0],
    talk4B: noisys.filter(noisy=>noisy.name === '4B')[0],
    talk4Chk: false,

    response5A: noisys.filter(noisy=>noisy.name === '5A')[0],
    response5B: noisys.filter(noisy=>noisy.name === '5B')[0],

    talk6: noisys.filter(noisy=>noisy.name === '6')[0],
    talk6Chk: false,

    wallChk: false,
    wallStop: false,
    chk: noisys.filter(noisy=>noisy.name === 'chk')[0],

    ans:[0,0,0,0,0,0,1],
    idx:0,

    A: noisys.filter(noisy=>noisy.name === 'A')[0],
    B: noisys.filter(noisy=>noisy.name === 'B')[0],

    response7A: noisys.filter(noisy=>noisy.name === '7A')[0],
    response7B: noisys.filter(noisy=>noisy.name === '7B')[0],
    
    end: noisys.filter(noisy=>noisy.name === 'end')[0],
}
const delayObject = {
    people: delays.filter(delay=>delay.name === 'people')[0],
    talk1: delays.filter(delay=>delay.name === '1')[0],
    talk1Chk: true,
    response2: delays.filter(delay=>delay.name === '2')[0],
    response3: delays.filter(delay=>delay.name === '3')[0],

    talk4: delays.filter(delay=>delay.name === '4')[0],
    talk4Chk: false,
    response5: delays.filter(delay=>delay.name === '5')[0],

    talk6: delays.filter(delay=>delay.name === '6')[0],
    talk6Chk: false,
    response7: delays.filter(delay=>delay.name === '7')[0],

    talk8A: delays.filter(delay=>delay.name === '8A')[0],
    talk8B: delays.filter(delay=>delay.name === '8B')[0],
    talk8C: delays.filter(delay=>delay.name === '8C')[0],
    talk8Chk: false,

    talk9: delays.filter(delay=>delay.name === '9')[0],
    talk9Chk: false,

    CG1: delays.filter(delay=>delay.name === 'CG1')[0],
    CG2: delays.filter(delay=>delay.name === 'CG2')[0],
    battery1: delays.filter(delay=>delay.name === 'battery1')[0],
    battery2: delays.filter(delay=>delay.name === 'battery2')[0],
    battery3: delays.filter(delay=>delay.name === 'battery3')[0],
    battery4: delays.filter(delay=>delay.name === 'battery4')[0],
    a1: delays.filter(delay=>delay.name === 'a1')[0],
    b1: delays.filter(delay=>delay.name === 'b1')[0],
    c1: delays.filter(delay=>delay.name === 'c1')[0],
    d1: delays.filter(delay=>delay.name === 'd1')[0],
    a2: delays.filter(delay=>delay.name === 'a2')[0],
    b2: delays.filter(delay=>delay.name === 'b2')[0],
    c2: delays.filter(delay=>delay.name === 'c2')[0],
    d2: delays.filter(delay=>delay.name === 'd2')[0],
    chk: delays.filter(delay=>delay.name === 'chk')[0],
    count: delays.filter(delay=>delay.name === 'count')[0],
    startInter: false,
    batteryNum:0,

    response10: delays.filter(delay=>delay.name === '10')[0],
    talk11: delays.filter(delay=>delay.name === '11')[0],
    talk11Chk: false,
    response12: delays.filter(delay=>delay.name === '12')[0],
    talk13A: delays.filter(delay=>delay.name === '13A')[0],
    talk13B: delays.filter(delay=>delay.name === '13B')[0],
    talk13Chk: false,

    response14A: delays.filter(delay=>delay.name === '14A')[0],
    response14B: delays.filter(delay=>delay.name === '14B')[0],
    response15: delays.filter(delay=>delay.name === '15')[0],

    talk16A: delays.filter(delay=>delay.name === '16A')[0],
    talk16B: delays.filter(delay=>delay.name === '16B')[0],
    talk16Chk: false,
    response17A: delays.filter(delay=>delay.name === '17A')[0],
    response17B: delays.filter(delay=>delay.name === '17B')[0],

    end: delays.filter(delay=>delay.name === 'end')[0],

}


const beginningObject = {
    model: beginnings.filter(beginning=>beginning.name === 'model')[0],
    model1Chk: true,
    chk1: beginnings.filter(beginning=>beginning.name === 'chk1')[0],
    chk2: beginnings.filter(beginning=>beginning.name === 'chk2')[0],
    selectPeople:true,
    model2Chk: false,
    people1: beginnings.filter(beginning=>beginning.name === 'people1')[0],
    people2: beginnings.filter(beginning=>beginning.name === 'people2')[0],
    people1Selected: false,
    people2Selected: false,

}
canvas.addEventListener('click', (e)=>{
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    if(!bus.start && beginningBool){
        if(beginningObject.model1Chk && beginningObject.chk1.show){
            if(!beginningObject.model1Chk) return
            if(x>=beginningObject.chk1.position.x && x<=beginningObject.chk1.position.x + beginningObject.chk1.width && y>=beginningObject.chk1.position.y && y<=beginningObject.chk1.position.y+beginningObject.chk1.height){
                clickVedioPlay('btn')
                beginningObject.model1Chk = false
                beginningObject.model.image.src = './images/beginning/model2.png'
                beginningObject.chk1.show = false
                beginningObject.chk1.enlarge = false
                setTimeout(()=>{
                    beginningObject.selectPeople = true
                    beginningObject.people1.show = true
                    beginningObject.people1.enlarge = true
                    beginningObject.people2.show = true
                    beginningObject.people2.enlarge = true
                }, 100)
            }
        }
        if(beginningObject.selectPeople){
            if(!beginningObject.selectPeople) return
            if(x>=beginningObject.people1.position.x && x<=beginningObject.people1.position.x + beginningObject.people1.width && y>=beginningObject.people1.position.y && y<=beginningObject.people1.position.y+beginningObject.people1.height){
                clickVedioPlay('btn')
                beginningObject.people1Selected = !beginningObject.people1Selected
                if(beginningObject.people1Selected){
                    if(beginningObject.people2Selected){
                        beginningObject.people2Selected = false
                        beginningObject.people2.width = beginningObject.people2.oldWidth
                        beginningObject.people2.height = beginningObject.people2.oldHeight
                    }
                    beginningObject.people1.width = beginningObject.people1.bigWidth 
                    beginningObject.people1.height = beginningObject.people1.bigHeight 
                }else{
                    beginningObject.people1.width = beginningObject.people1.oldWidth
                    beginningObject.people1.height = beginningObject.people1.oldHeight
     
                }
            }
            if(x>=beginningObject.people2.position.x && x<=beginningObject.people2.position.x + beginningObject.people2.width && y>=beginningObject.people2.position.y && y<=beginningObject.people2.position.y+beginningObject.people2.height){
                clickVedioPlay('btn')
                beginningObject.people2Selected = !beginningObject.people2Selected
                if(beginningObject.people2Selected){
                    if(beginningObject.people1Selected){
                        beginningObject.people1Selected = false
                        beginningObject.people1.width = beginningObject.people1.oldWidth
                        beginningObject.people1.height = beginningObject.people1.oldHeight
                    }
                    beginningObject.people2.width = beginningObject.people2.bigWidth 
                    beginningObject.people2.height = beginningObject.people2.bigHeight 
                }else{
                    beginningObject.people2.width = beginningObject.people2.oldWidth
                    beginningObject.people2.height = beginningObject.people2.oldHeight
     
                }
            }
            if(beginningObject.people1Selected || beginningObject.people2Selected){
                beginningObject.chk2.show = true
                beginningObject.chk2.enlarge = true
                beginningObject.model2Chk = true
            }else{
                beginningObject.chk2.show = false
                beginningObject.chk2.enlarge = false
                beginningObject.model2Chk = false
            }
        }
        if(beginningObject.model2Chk && beginningObject.chk2.show){
            if(x>=beginningObject.chk1.position.x && x<=beginningObject.chk1.position.x + beginningObject.chk1.width && y>=beginningObject.chk1.position.y && y<=beginningObject.chk1.position.y+beginningObject.chk1.height){
                clickVedioPlay('btn')
                startFn()
            }
        }
    }
    if(!isStart) return
    
    
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
            }else if(roomOpen.network){
                initNetworkRoom()
            }else if(roomOpen.noisy){
                initNoisyRoom()
            }else if(roomOpen.delay){
                initDelayRoom()
            }
            if(roomOpen.cool){
                clickVedioPlay('inCoolRoom')
            }else{
                clickVedioPlay('inRoom')
            }
                
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

                setTimeout(()=>{
                    if(!isRoomOpen) return
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

                setTimeout(()=>{
                    if(!isRoomOpen) return
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

                setTimeout(()=>{
                    if(!isRoomOpen) return
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

                setTimeout(()=>{
                    if(!isRoomOpen) return
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
               
                setTimeout(()=>{
                    if(!isRoomOpen) return
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
                setTimeout(()=>{
                    if(!isRoomOpen) return
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

                setTimeout(()=>{
                    if(!isRoomOpen) return
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

                setTimeout(()=>{
                    if(!isRoomOpen) return
                    coolObject.talk10A.show = false
                    coolObject.talk10B.show = false
                    coolObject.talkPeople.image.src = './images/cool/people1.png'
                    coolObject.response11A.show = false

                    if(CG.cool.isPeace){
                        coolObject.talkPeople.show = false
                        coolObject.cup.enlarge = true
                        coolObject.cupChk = true
                    }else{
                        coolObject.end.image.src = coolObject.end.image.src.replace('good', 'bad')
                        getCG.cool.push(0)
                        stopBgm()
                        audioBadend.play()
                        coolObject.people.show = true
                        coolObject.talkPeople.show = false
                        coolObject.end.show = true
                        if(isTeaching){
                            coolObject.talk005.show = true
                        }

                        globalClick = true
                        setTimeout(()=>{
                            if(!isRoomOpen) return
                            coolObject.talk005Chk = true
                            
                        },100)
                    }
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
                setTimeout(()=>{
                    if(!isRoomOpen) return
                    coolObject.talk10A.show = false
                    coolObject.talk10B.show = false
                    coolObject.talkPeople.image.src = './images/cool/people3.png'
                    coolObject.response11B.show = false

                    if(CG.cool.isPeace){
                        coolObject.talkPeople.show = false
                        coolObject.cup.enlarge = true
                        coolObject.cupChk = true
                    }else{
                        coolObject.end.image.src = coolObject.end.image.src.replace('good', 'bad')
                        getCG.cool.push(0)
                        stopBgm()
                        audioBadend.play()
                        coolObject.people.show = true
                        coolObject.talkPeople.show = false
                        coolObject.end.show = true
                        if(isTeaching){
                            coolObject.talk005.show = true
                        }

                        globalClick = true
                        setTimeout(()=>{
                            if(!isRoomOpen) return
                            coolObject.talk005Chk = true
                            
                        },100)
                    }

                    
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

                setTimeout(()=>{
                    if(!isRoomOpen) return
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

            setTimeout(()=>{
                if(!isRoomOpen) return
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

            setTimeout(()=>{
                if(!isRoomOpen) return
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
                
                setTimeout(()=>{
                    if(!isRoomOpen) return
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
                setTimeout(()=>{
                    if(!isRoomOpen) return
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
                setTimeout(()=>{
                    if(!isRoomOpen) return
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
                setTimeout(()=>{
                    if(!isRoomOpen) return
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

                setTimeout(()=>{
                    if(!isRoomOpen) return
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
                setTimeout(()=>{
                    if(!isRoomOpen) return
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

                setTimeout(()=>{
                    if(!isRoomOpen) return
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

            setTimeout(()=>{
                if(!isRoomOpen) return
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

                setTimeout(()=>{
                    if(!isRoomOpen) return
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

                setTimeout(()=>{
                    if(!isRoomOpen) return
                    hoardObject.a1.enlarge = true
                    hoardObject.b1.enlarge = true
                    hoardObject.c1.enlarge = true
                    hoardObject.d1.enlarge = true
                    hoardObject.e1.enlarge = true
                    hoardObject.f1.enlarge = true
                    hoardObject.g1.enlarge = true
                    hoardObject.h1.enlarge = true
                    hoardObject.s1.enlarge = true
                    hoardObject.removeInterObj = true
                }, 50)
            }
        }
        if(hoardObject.removeInterObj){
            if(hoardObject.removeInterObj && hoardObject.s1.show && hoardObject.s1.enlarge){
                if(x>=hoardObject.s1.position.x && x<=hoardObject.s1.position.x + hoardObject.s1.width && y>=hoardObject.s1.position.y && y<=hoardObject.s1.position.y+hoardObject.s1.height){
                    clickVedioPlay('obj')
                    hoardObject.s1.show = false
                    hoardObject.s1.enlarge = false
                    hoardObject.interOkNum ++

                    
                }
            }
            if(hoardObject.removeInterObj && hoardObject.a1.show && hoardObject.a1.enlarge){
                if(x>=hoardObject.a1.position.x && x<=hoardObject.a1.position.x + hoardObject.a1.width && y>=hoardObject.a1.position.y && y<=hoardObject.a1.position.y+hoardObject.a1.height){
                    clickVedioPlay('obj')
                    hoardObject.a1.show = false
                    hoardObject.a1.enlarge = false
                    hoardObject.interOkNum ++
                }
            }
            if(hoardObject.removeInterObj && hoardObject.b1.show && hoardObject.b1.enlarge){
                if(x>=hoardObject.b1.position.x && x<=hoardObject.b1.position.x + hoardObject.b1.width && y>=hoardObject.b1.position.y && y<=hoardObject.b1.position.y+hoardObject.b1.height){
                    clickVedioPlay('obj')
                    hoardObject.b1.show = false
                    hoardObject.b1.enlarge = false
                    hoardObject.interOkNum ++
                }
            }
            if(hoardObject.removeInterObj && hoardObject.c1.show && hoardObject.c1.enlarge){
                if(x>=hoardObject.c1.position.x && x<=hoardObject.c1.position.x + hoardObject.c1.width && y>=hoardObject.c1.position.y && y<=hoardObject.c1.position.y+hoardObject.c1.height){
                    clickVedioPlay('obj')
                    hoardObject.c1.show = false
                    hoardObject.c1.enlarge = false
                    hoardObject.interOkNum ++
                }
            }
            if(hoardObject.removeInterObj && hoardObject.d1.show && hoardObject.d1.enlarge){
                if(x>=hoardObject.d1.position.x && x<=hoardObject.d1.position.x + hoardObject.d1.width && y>=hoardObject.d1.position.y && y<=hoardObject.d1.position.y+hoardObject.d1.height){
                    clickVedioPlay('obj')
                    hoardObject.d1.show = false
                    hoardObject.d1.enlarge = false
                    hoardObject.interOkNum ++

                }
            }
            if(hoardObject.removeInterObj && hoardObject.e1.show && hoardObject.e1.enlarge){
                if(x>=hoardObject.e1.position.x && x<=hoardObject.e1.position.x + hoardObject.e1.width && y>=hoardObject.e1.position.y && y<=hoardObject.e1.position.y+hoardObject.e1.height){
                    clickVedioPlay('obj')
                    hoardObject.e1.show = false
                    hoardObject.e1.enlarge = false
                    hoardObject.interOkNum ++
                }
            }
            if(hoardObject.removeInterObj && hoardObject.f1.show && hoardObject.f1.enlarge){
                if(x>=hoardObject.f1.position.x && x<=hoardObject.f1.position.x + hoardObject.f1.width && y>=hoardObject.f1.position.y && y<=hoardObject.f1.position.y+hoardObject.f1.height){
                    clickVedioPlay('obj')
                    hoardObject.f1.show = false
                    hoardObject.f1.enlarge = false
                    hoardObject.interOkNum ++
                }
            }
            if(hoardObject.removeInterObj && hoardObject.g1.show && hoardObject.g1.enlarge){
                if(x>=hoardObject.g1.position.x && x<=hoardObject.g1.position.x + hoardObject.g1.width && y>=hoardObject.g1.position.y && y<=hoardObject.g1.position.y+hoardObject.g1.height){
                    clickVedioPlay('obj')
                    hoardObject.g1.show = false
                    hoardObject.g1.enlarge = false
                    hoardObject.interOkNum ++
                }
            }
            if(hoardObject.removeInterObj && hoardObject.h1.show && hoardObject.h1.enlarge ){
                if(x>=hoardObject.h1.position.x && x<=hoardObject.h1.position.x + hoardObject.h1.width && y>=hoardObject.h1.position.y && y<=hoardObject.h1.position.y+hoardObject.h1.height){
                    clickVedioPlay('obj')
                    hoardObject.h1.show = false
                    hoardObject.h1.enlarge = false
                    hoardObject.interOkNum ++
                }
            }
            if(hoardObject.interOkNum >= 8 &&
                !hoardObject.s1.show && 
                !hoardObject.a1.show && 
                !hoardObject.b1.show && 
                !hoardObject.c1.show && 
                !hoardObject.d1.show && 
                !hoardObject.e1.show && 
                !hoardObject.f1.show && 
                !hoardObject.g1.show && 
                !hoardObject.h1.show  
                 ){
                hoardObject.removeInterObj = false
                hoardObject.hold.show = false
                hoardObject.hold.enlarge = false
                hoardObject.smallPeople.show = true
                setTimeout(()=>{
                    if(!isRoomOpen) return
                    hoardObject.smallPeople.show = false
                    hoardObject.people.show = true
                    hoardObject.response3.show = true
                }, 500)
                setTimeout(()=>{
                    if(!isRoomOpen) return
                    hoardObject.talk4.show = true
                    hoardObject.talk4.enlarge = true
                    hoardObject.talk4Chk = true
                }, 1500)
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
                
                setTimeout(()=>{
                    if(!isRoomOpen) return
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

                setTimeout(()=>{
                    if(!isRoomOpen) return
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
                setTimeout(()=>{
                    if(!isRoomOpen) return
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

                setTimeout(()=>{
                    if(!isRoomOpen) return
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
                
                setTimeout(()=>{
                    if(!isRoomOpen) return
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
                setTimeout(()=>{
                    if(!isRoomOpen) return
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

                setTimeout(()=>{
                    if(!isRoomOpen) return
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
                setTimeout(()=>{
                    if(!isRoomOpen) return
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
                setTimeout(()=>{
                    if(!isRoomOpen) return
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
                setTimeout(()=>{
                    if(!isRoomOpen) return
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
    
    if(roomOpen.network && isRoomOpen){
        if(netObject.smallPeople.show && netObject.startChk){
            if(!netObject.startChk) return
            if(x>=netObject.smallPeople.position.x && x<=netObject.smallPeople.position.x + netObject.smallPeople.width && y>=netObject.smallPeople.position.y && y<=netObject.smallPeople.position.y+netObject.smallPeople.height){
                clickVedioPlay('btn')
                netObject.startChk = false
                netObject.smallPeople.show = false
                netObject.smallPeople.enlarge = false

                netObject.people.show = true
                netObject.response1.show = true

                setTimeout(()=>{
                    if(!isRoomOpen) return
                    netObject.talk2Chk = true
                    netObject.talk2.show = true
                    netObject.talk2.enlarge = true
                }, netObject.response1.text.split('').length*10 + 1000)
            }
        }
        if(netObject.talk2.show && netObject.talk2Chk){
            if(!netObject.talk2Chk) return
            if(x>=netObject.talk2.position.x && x<=netObject.talk2.position.x + netObject.talk2.width && y>=netObject.talk2.position.y && y<=netObject.talk2.position.y+netObject.talk2.height){
                clickVedioPlay('talk')
                netObject.talk2Chk = false
                netObject.response1.show = false
                netObject.talk2.enlarge = false
                netObject.response3.show = true

                setTimeout(()=>{
                    if(!isRoomOpen) return
                    netObject.talk2.show = false
                    netObject.talk4.show = true
                    netObject.talk4.enlarge = true
                    netObject.talk4Chk = true
                }, netObject.response3.text.split('').length*10 + 1500)
            }
        }
        if(netObject.talk4.show && netObject.talk4Chk){
            if(!netObject.talk4Chk) return
            if(x>=netObject.talk4.position.x && x<=netObject.talk4.position.x + netObject.talk4.width && y>=netObject.talk4.position.y && y<=netObject.talk4.position.y+netObject.talk4.height){
                clickVedioPlay('talk')
                netObject.talk4Chk = false
                netObject.response3.show = false
                netObject.talk4.enlarge = false
                netObject.response5.show = true

                setTimeout(()=>{
                    if(!isRoomOpen) return
                    netObject.talk4.show = false
                    netObject.talk6.show = true
                    netObject.talk6.enlarge = true
                    netObject.talk6Chk = true
                }, netObject.response5.text.split('').length*10 + 1500)
            }
        }
        if(netObject.talk6.show && netObject.talk6Chk){
            if(!netObject.talk6Chk) return
            if(x>=netObject.talk6.position.x && x<=netObject.talk6.position.x + netObject.talk6.width && y>=netObject.talk6.position.y && y<=netObject.talk6.position.y+netObject.talk6.height){
                clickVedioPlay('talk')
                netObject.talk6Chk = false
                netObject.response5.show = false
                netObject.talk6.enlarge = false
                netObject.response7.show = true

                setTimeout(()=>{
                    if(!isRoomOpen) return
                    netObject.talk6.show = false
                    netObject.talk8A.show = true
                    netObject.talk8A.enlarge = true
                    netObject.talk8B.show = true
                    netObject.talk8B.enlarge = true
                    netObject.talk8Chk = true
                }, netObject.response7.text.split('').length*10 + 1500)
            }
        }
        if(netObject.talk8A.show && netObject.talk8B.show && netObject.talk8Chk){
            if(!netObject.talk8Chk) return
            if(x>=netObject.talk8A.position.x && x<=netObject.talk8A.position.x + netObject.talk8A.width && y>=netObject.talk8A.position.y && y<=netObject.talk8A.position.y+netObject.talk8A.height){
                clickVedioPlay('talk')
                netObject.talk8Chk = false
                netObject.response7.show = false
                netObject.talk8A.enlarge = false
                netObject.talk8B.enlarge = false
                netObject.response9A.show = true

                setTimeout(()=>{
                    if(!isRoomOpen) return
                    netObject.talk8A.show = false
                    netObject.talk8B.show = false
                    netObject.talk10.show = true
                    netObject.talk10.enlarge = true
                    netObject.talk10Chk = true
                }, netObject.response9A.text.split('').length*10 + 1500)
            }
            if(x>=netObject.talk8B.position.x && x<=netObject.talk8B.position.x + netObject.talk8B.width && y>=netObject.talk8B.position.y && y<=netObject.talk8B.position.y+netObject.talk8B.height){
                clickVedioPlay('talk')
                netObject.talk8Chk = false
                netObject.response7.show = false
                netObject.talk8A.enlarge = false
                netObject.talk8B.enlarge = false
                netObject.response9B.show = true

                CG.network.isPeace = false

                setTimeout(()=>{
                    if(!isRoomOpen) return
                    netObject.talk8A.show = false
                    netObject.talk8B.show = false
                    netObject.talk10.show = true
                    netObject.talk10.enlarge = true
                    netObject.talk10Chk = true
                }, netObject.response9B.text.split('').length*10 + 1500)
            }
        }
        if(netObject.talk10.show && netObject.talk10Chk){
            if(!netObject.talk10Chk) return
            if(x>=netObject.talk10.position.x && x<=netObject.talk10.position.x + netObject.talk10.width && y>=netObject.talk10.position.y && y<=netObject.talk10.position.y+netObject.talk10.height){
                clickVedioPlay('talk')
                netObject.talk10Chk = false
                netObject.response9A.show = false
                netObject.response9B.show = false
                netObject.talk10.enlarge = false

                setTimeout(()=>{
                    if(!isRoomOpen) return
                    netObject.talk10.show = false
                    netObject.talk11A.show = true
                    netObject.talk11A.enlarge = true
                    netObject.talk11B.show = true
                    netObject.talk11B.enlarge = true
                    netObject.talk11Chk = true
                }, 100)
            }
        }
        if(netObject.talk11A.show && netObject.talk11B.show && netObject.talk11Chk){
            if(!netObject.talk11Chk) return
            if(x>=netObject.talk11A.position.x && x<=netObject.talk11A.position.x + netObject.talk11A.width && y>=netObject.talk11A.position.y && y<=netObject.talk11A.position.y+netObject.talk11A.height){
                clickVedioPlay('talk')
                netObject.talk11Chk = false
                netObject.talk11A.enlarge = false
                netObject.talk11B.enlarge = false
                netObject.response12.show = true

                setTimeout(()=>{
                    if(!isRoomOpen) return
                    netObject.talk11A.show = false
                    netObject.talk11B.show = false
                    netObject.talk13A.show = true
                    netObject.talk13A.enlarge = true
                    netObject.talk13B.show = true
                    netObject.talk13B.enlarge = true
                    netObject.talk13Chk = true
                }, netObject.response12.text.split('').length*10 + 1500)
            }
            if(x>=netObject.talk11B.position.x && x<=netObject.talk11B.position.x + netObject.talk11B.width && y>=netObject.talk11B.position.y && y<=netObject.talk11B.position.y+netObject.talk11B.height){
                clickVedioPlay('talk')
                netObject.talk11Chk = false
                netObject.response7.show = false
                netObject.talk11A.enlarge = false
                netObject.talk11B.enlarge = false
                netObject.response12.show = true

                CG.network.isPeace = false

                setTimeout(()=>{
                    if(!isRoomOpen) return
                    netObject.talk11A.show = false
                    netObject.talk11B.show = false
                    netObject.talk13A.show = true
                    netObject.talk13A.enlarge = true
                    netObject.talk13B.show = true
                    netObject.talk13B.enlarge = true
                    netObject.talk13Chk = true
                }, netObject.response12.text.split('').length*10 + 1500)
            }
        }
        if(netObject.talk13A.show && netObject.talk13B.show && netObject.talk13Chk){
            if(!netObject.talk13Chk) return
            if(x>=netObject.talk13A.position.x && x<=netObject.talk13A.position.x + netObject.talk13A.width && y>=netObject.talk13A.position.y && y<=netObject.talk13A.position.y+netObject.talk13A.height){
                clickVedioPlay('talk')
                netObject.talk13Chk = false
                netObject.response12.show = false
                netObject.talk13A.enlarge = false
                netObject.talk13B.enlarge = false
                netObject.response14.show = true

                setTimeout(()=>{
                    if(!isRoomOpen) return
                    netObject.talk13A.show = false
                    netObject.talk13B.show = false
                    
                    netObject.talk15.show = true
                    netObject.chk.show = true
                    netObject.chk.enlarge = true
                    netObject.talk15Chk = true
                }, netObject.response14.text.split('').length*10 + 1500)
            }
            if(x>=netObject.talk13B.position.x && x<=netObject.talk13B.position.x + netObject.talk13B.width && y>=netObject.talk13B.position.y && y<=netObject.talk13B.position.y+netObject.talk13B.height){
                clickVedioPlay('talk')
                netObject.talk13Chk = false
                netObject.response12.show = false
                netObject.talk13A.enlarge = false
                netObject.talk13B.enlarge = false
                netObject.response14.show = true

                CG.network.isPeace = false

                setTimeout(()=>{
                    if(!isRoomOpen) return
                    netObject.talk13A.show = false
                    netObject.talk13B.show = false
                    
                    netObject.talk15.show = true
                    netObject.chk.show = true
                    netObject.chk.enlarge = true
                    netObject.talk15Chk = true
                }, netObject.response14.text.split('').length*10 + 1500)
            }
        }
        if(netObject.talk15.show && netObject.talk15Chk){
            if(!netObject.talk15Chk) return
            if(x>=netObject.chk.position.x && x<=netObject.chk.position.x + netObject.chk.width && y>=netObject.chk.position.y && y<=netObject.chk.position.y+netObject.chk.height){
                clickVedioPlay('btn')
                netObject.talk15Chk = false
                netObject.response14.show = false
                netObject.chk.enlarge = false
                netObject.talk15.show = false
                netObject.chk.show = false

                setTimeout(()=>{
                    if(!isRoomOpen) return
                    netObject.people.show = false
                    netObject.computer.enlarge = true
                }, 100)
            }
        }
        if(netObject.computer.show && netObject.computer.enlarge){
            if(!netObject.computer.enlarge) return
            if(x>=netObject.computer.position.x && x<=netObject.computer.position.x + netObject.computer.width && y>=netObject.computer.position.y && y<=netObject.computer.position.y+netObject.computer.height){
                clickVedioPlay('obj')
                netObject.computer.enlarge = false
                netObject.webShow = true

                setTimeout(()=>{
                    if(!isRoomOpen) return
                    netObject.web.show = true
                    netObject.left.show = true
                    netObject.left.enlarge = true
                    netObject.right.show = true
                    netObject.right.enlarge = true
                }, 10)
            }
        }
        if(netObject.web.show && netObject.webShow){
            if(netObject.left.show && netObject.left.enlarge){
                if(x>=netObject.left.position.x && x<=netObject.left.position.x + netObject.left.width && y>=netObject.left.position.y && y<=netObject.left.position.y+netObject.left.height){
                    if(netObject.webNum <= 1 ) return
                    clickVedioPlay('btn')
                    netObject.webNum --
                    netObject.web.image.src = `./images/network/web/web${netObject.webNum}.png`
                }
            }
            if(netObject.right.show && netObject.right.enlarge){
                if(x>=netObject.right.position.x && x<=netObject.right.position.x + netObject.right.width && y>=netObject.right.position.y && y<=netObject.right.position.y+netObject.right.height){
                    if(netObject.webNum >= 6 ) return
                    clickVedioPlay('btn')
                    netObject.webNum ++
                    netObject.web.image.src = `./images/network/web/web${netObject.webNum}.png`
                }
            }
            const initWebBtn = ()=>{
                netObject[`web3btn`].show = false
                netObject[`web3btn`].enlarge = false
                netObject[`web4btn`].show = false
                netObject[`web4btn`].enlarge = false
                netObject[`web5btn`].show = false
                netObject[`web5btn`].enlarge = false
                netObject[`web6btn`].show = false
                netObject[`web6btn`].enlarge = false
                netObject[`web2btn1`].show = false
                netObject[`web2btn1`].enlarge = false
                netObject[`web2btn2`].show = false
                netObject[`web2btn2`].enlarge = false
                netObject[`web2btn3`].show = false
                netObject[`web2btn3`].enlarge = false
            }
            const open404Fn = ()=>{
                initWebBtn()
                clickVedioPlay('btn')
                netObject.web.image.src = `./images/network/web/404.png`
                netObject.is404 = true
                netObject.left.show = false
                netObject.left.enlarge = false
                netObject.right.show = false
                netObject.right.enlarge = false
                netObject.goback.show = true
                netObject.goback.enlarge = true
            }
            if(netObject.is404 && netObject.goback.show){
                if(x>=netObject.goback.position.x && x<=netObject.goback.position.x + netObject.goback.width && y>=netObject.goback.position.y && y<=netObject.goback.position.y+netObject.goback.height){
                    clickVedioPlay('btn')
                    netObject.is404 = false
                    netObject.goback.show = false
                    netObject.goback.enlarge = false
                    netObject.web.image.src = `./images/network/web/web${netObject.webNum}.png`
                    netObject.left.show = true
                    netObject.left.enlarge = true
                    netObject.right.show = true
                    netObject.right.enlarge = true
                }
            }
            if(netObject.webNum === 2){
                if(netObject.is404) return
                initWebBtn()

                netObject[`web2btn1`].show = true
                netObject[`web2btn1`].enlarge = true
                netObject[`web2btn2`].show = true
                netObject[`web2btn2`].enlarge = true
                netObject[`web2btn3`].show = true
                netObject[`web2btn3`].enlarge = true
            }else{
                if(netObject.is404) return
                initWebBtn()
                if(netObject.webNum >= 3){
                    netObject[`web${netObject.webNum}btn`].show = true
                    netObject[`web${netObject.webNum}btn`].enlarge = true
                }
            }
            
            if(!netObject.is404 && netObject.webNum === 2 && netObject.web2btn1.show){
                if(x>=netObject.web2btn1.position.x && x<=netObject.web2btn1.position.x + netObject.web2btn1.width && y>=netObject.web2btn1.position.y && y<=netObject.web2btn1.position.y+netObject.web2btn1.height){
                    open404Fn()
                }
                if(x>=netObject.web2btn2.position.x && x<=netObject.web2btn2.position.x + netObject.web2btn2.width && y>=netObject.web2btn2.position.y && y<=netObject.web2btn2.position.y+netObject.web2btn2.height){
                    open404Fn()
                }
                if(x>=netObject.web2btn3.position.x && x<=netObject.web2btn3.position.x + netObject.web2btn3.width && y>=netObject.web2btn3.position.y && y<=netObject.web2btn3.position.y+netObject.web2btn3.height){
                    open404Fn()
                }
            }
            if(!netObject.is404 && netObject.webNum === 3 && netObject.web3btn.show){
                if(x>=netObject.web3btn.position.x && x<=netObject.web3btn.position.x + netObject.web3btn.width && y>=netObject.web3btn.position.y && y<=netObject.web3btn.position.y+netObject.web3btn.height){
                    open404Fn()
                }
            }
            if(!netObject.is404 && netObject.webNum === 4 && netObject.web4btn.show){
                if(x>=netObject.web4btn.position.x && x<=netObject.web4btn.position.x + netObject.web4btn.width && y>=netObject.web4btn.position.y && y<=netObject.web4btn.position.y+netObject.web4btn.height){
                    open404Fn()
                }
            }
            if(!netObject.is404 && netObject.webNum === 5 && netObject.web5btn.show){
                if(x>=netObject.web5btn.position.x && x<=netObject.web5btn.position.x + netObject.web5btn.width && y>=netObject.web5btn.position.y && y<=netObject.web5btn.position.y+netObject.web5btn.height){
                    open404Fn()
                }
            }
            if(!netObject.is404 && netObject.webNum === 6 && netObject.web6btn.show){
                if(x>=netObject.web6btn.position.x && x<=netObject.web6btn.position.x + netObject.web6btn.width && y>=netObject.web6btn.position.y && y<=netObject.web6btn.position.y+netObject.web6btn.height){
                    clickVedioPlay('btn')
                    initWebBtn()
                    netObject.web.show = false
                    netObject.left.show = false
                    netObject.left.enlarge = false
                    netObject.right.show = false
                    netObject.right.enlarge = false
                    netObject.people.show = true

                    if(!CG.network.isPeace){
                        getCG.network.push(0)
                        stopBgm()
                        audioBadend.play()
                        if(netObject.end.image.src.includes('good')){
                            netObject.end.image.src = netObject.end.image.src.replace('good', 'bad')
                        }
                    }else{
                        getCG.network.push(1)
                        stopBgm()
                        if(netObject.end.image.src.includes('bad')){
                            netObject.end.image.src = netObject.end.image.src.replace('bad', 'good')
                        }
                        audioGoodend.play()
                    }
                    netObject.end.show = true
                }
            }
        }
    }

    if(roomOpen.noisy && isRoomOpen){
        if(noisyObject.smallPeople.show && noisyObject.startChk){
            if(!noisyObject.startChk) return
            if(x>=noisyObject.smallPeople.position.x && x<=noisyObject.smallPeople.position.x + noisyObject.smallPeople.width && y>=noisyObject.smallPeople.position.y && y<=noisyObject.smallPeople.position.y+noisyObject.smallPeople.height){
                clickVedioPlay('btn')
                noisyObject.startChk = false
                noisyObject.smallPeople.show = false
                noisyObject.smallPeople.enlarge = false

                noisyObject.people.show = true
                stopKnock()
                setTimeout(()=>{
                    if(!isRoomOpen) return
                    noisyObject.talk1Chk = true
                    noisyObject.talk1A.show = true
                    noisyObject.talk1A.enlarge = true
                    noisyObject.talk1B.show = true
                    noisyObject.talk1B.enlarge = true
                }, 10)
            }
        }
        if(noisyObject.talk1A.show && noisyObject.talk1B.show && noisyObject.talk1Chk){
            if(!noisyObject.talk1Chk) return
            if(x>=noisyObject.talk1A.position.x && x<=noisyObject.talk1A.position.x + noisyObject.talk1A.width && y>=noisyObject.talk1A.position.y && y<=noisyObject.talk1A.position.y+noisyObject.talk1A.height){
                clickVedioPlay('talk')
                noisyObject.talk1Chk = false
                noisyObject.talk1A.enlarge = false
                noisyObject.talk1B.enlarge = false
                noisyObject.response2A.show = true

                setTimeout(()=>{
                    if(!isRoomOpen) return
                    noisyObject.talk1A.show = false
                    noisyObject.talk1B.show = false
                    noisyObject.talk3.show = true
                    noisyObject.talk3.enlarge = true
                    noisyObject.talk3Chk = true
                }, noisyObject.response2A.text.split('').length*10 + 1500)
            }
            if(x>=noisyObject.talk1B.position.x && x<=noisyObject.talk1B.position.x + noisyObject.talk1B.width && y>=noisyObject.talk1B.position.y && y<=noisyObject.talk1B.position.y+noisyObject.talk1B.height){
                clickVedioPlay('talk')
                noisyObject.talk1Chk = false
                noisyObject.talk1A.enlarge = false
                noisyObject.talk1B.enlarge = false
                noisyObject.response2B.show = true
                CG.noisy.isPeace = false
                setTimeout(()=>{
                    if(!isRoomOpen) return
                    noisyObject.talk1A.show = false
                    noisyObject.talk1B.show = false
                    noisyObject.talk3.show = true
                    noisyObject.talk3.enlarge = true
                    noisyObject.talk3Chk = true
                }, noisyObject.response2B.text.split('').length*10 + 1500)
            }
        }
        if(noisyObject.talk3.show && noisyObject.talk3Chk){
            if(!noisyObject.talk3Chk) return
            if(x>=noisyObject.talk3.position.x && x<=noisyObject.talk3.position.x + noisyObject.talk3.width && y>=noisyObject.talk3.position.y && y<=noisyObject.talk3.position.y+noisyObject.talk3.height){
                clickVedioPlay('talk')
                noisyObject.talk3Chk = false

                noisyObject.response2A.show = false
                noisyObject.response2B.show = false
                noisyObject.talk3.enlarge = false

                setTimeout(()=>{
                    if(!isRoomOpen) return
                    noisyObject.talk3.show = false
                    noisyObject.talk4A.show = true
                    noisyObject.talk4A.enlarge = true
                    noisyObject.talk4B.show = true
                    noisyObject.talk4B.enlarge = true
                    noisyObject.talk4Chk = true
                }, 100)
            }

        }
        if(noisyObject.talk4A.show && noisyObject.talk4B.show &&  noisyObject.talk4Chk){
            if(!noisyObject.talk4Chk) return
            if(x>=noisyObject.talk4A.position.x && x<=noisyObject.talk4A.position.x + noisyObject.talk4A.width && y>=noisyObject.talk4A.position.y && y<=noisyObject.talk4A.position.y+noisyObject.talk4A.height){
                clickVedioPlay('talk')
                noisyObject.talk4Chk = false
                noisyObject.response2A.show = false
                noisyObject.response2B.show = false
                noisyObject.talk4A.enlarge = false
                noisyObject.talk4B.enlarge = false
                noisyObject.response5A.show = true

                setTimeout(()=>{
                    if(!isRoomOpen) return
                    noisyObject.talk4A.show = false
                    noisyObject.talk4B.show = false
                    noisyObject.response5A.show = false
                    noisyObject.response5B.show = false
                    //互動提示
                    noisyObject.talk6.show = true
                    noisyObject.talk6Chk = true
                    noisyObject.chk.show = true
                    noisyObject.chk.enlarge = true
                }, noisyObject.response5A.text.split('').length*10 + 1500)
            }
            if(x>=noisyObject.talk4B.position.x && x<=noisyObject.talk4B.position.x + noisyObject.talk4B.width && y>=noisyObject.talk4B.position.y && y<=noisyObject.talk4B.position.y+noisyObject.talk4B.height){
                clickVedioPlay('talk')
                noisyObject.talk4Chk = false
                noisyObject.response2A.show = false
                noisyObject.response2B.show = false
                noisyObject.talk4A.enlarge = false
                noisyObject.talk4B.enlarge = false
                noisyObject.response5B.show = true
                CG.noisy.isPeace = false
                setTimeout(()=>{
                    if(!isRoomOpen) return
                    noisyObject.talk4A.show = false
                    noisyObject.talk4B.show = false
                    noisyObject.response5A.show = false
                    noisyObject.response5B.show = false
                    //互動提示
                    noisyObject.talk6.show = true
                    noisyObject.talk6Chk = true
                    noisyObject.chk.show = true
                    noisyObject.chk.enlarge = true
                }, noisyObject.response5B.text.split('').length*10 + 1500)
            }
        }
        if(noisyObject.talk6.show && noisyObject.talk6Chk){
            if(!noisyObject.talk6Chk) return
            if(x>=noisyObject.chk.position.x && x<=noisyObject.chk.position.x + noisyObject.chk.width && y>=noisyObject.chk.position.y && y<=noisyObject.chk.position.y+noisyObject.chk.height){
                clickVedioPlay('btn')
                noisyObject.talk6Chk = false
                noisyObject.talk6.show = false
                noisyObject.chk.show = false
                noisyObject.chk.enlarge = false

                setTimeout(()=>{
                    noisyObject.wallChk = true
                    noisyObject.people.show = false
                    noisyObject.wall1.enlarge = true
                    noisyObject.wall2.enlarge = true
                    noisyObject.wall3.enlarge = true
                    noisyObject.wall4.enlarge = true
                    noisyObject.wall5.enlarge = true
                    noisyObject.wall6.enlarge = true
                    noisyObject.wall7.enlarge = true
                }, 100)
            }
        }
        const initWall = ()=>{
            noisyObject.wallStop = true
            noisyObject.wall1.enlarge = false
            noisyObject.wall2.enlarge = false
            noisyObject.wall3.enlarge = false
            noisyObject.wall4.enlarge = false
            noisyObject.wall5.enlarge = false
            noisyObject.wall6.enlarge = false
            noisyObject.wall7.enlarge = false
        }
        const cancelWall = ()=>{
            clickVedioPlay('btn')
            noisyObject.wallStop = false
            noisyObject.wall1.enlarge = true
            noisyObject.wall2.enlarge = true
            noisyObject.wall3.enlarge = true
            noisyObject.wall4.enlarge = true
            noisyObject.wall5.enlarge = true
            noisyObject.wall6.enlarge = true
            noisyObject.wall7.enlarge = true
        }
        const chkWall = ()=>{
            noisyObject.wallStop = false
            noisyObject.wall1.enlarge = true
            noisyObject.wall2.enlarge = true
            noisyObject.wall3.enlarge = true
            noisyObject.wall4.enlarge = true
            noisyObject.wall5.enlarge = true
            noisyObject.wall6.enlarge = true
            noisyObject.wall7.enlarge = true
        }
        if(noisyObject.wallChk){
            if(noisyObject.wall1.enlarge){
                if(x>=noisyObject.wall1.position.x && x<=noisyObject.wall1.position.x + noisyObject.wall1.width && y>=noisyObject.wall1.position.y && y<=noisyObject.wall1.position.y+noisyObject.wall1.height){
                    initWall()
                    if(noisyObject.ans[0]==0){
                        wall1.play()
                    }else{
                        wall2.play()
                    }
                    noisyObject.walltalk1.show = true
                    noisyObject.walltalk1chk.show = true
                    noisyObject.walltalk1chk.enlarge = true
                    noisyObject.walltalk1cancel.show = true
                    noisyObject.walltalk1cancel.enlarge = true
                }
            }
            if(noisyObject.wall2.enlarge){
                if(x>=noisyObject.wall2.position.x && x<=noisyObject.wall2.position.x + noisyObject.wall2.width && y>=noisyObject.wall2.position.y && y<=noisyObject.wall2.position.y+noisyObject.wall2.height){
                    initWall()
                    if(noisyObject.ans[1]==0){
                        wall1.play()
                    }else{
                        wall2.play()
                    }
                    noisyObject.walltalk2.show = true
                    noisyObject.walltalk2chk.show = true
                    noisyObject.walltalk2chk.enlarge = true
                    noisyObject.walltalk2cancel.show = true
                    noisyObject.walltalk2cancel.enlarge = true
                }
            }
            if(noisyObject.wall3.enlarge){
                if(x>=noisyObject.wall3.position.x && x<=noisyObject.wall3.position.x + noisyObject.wall3.width && y>=noisyObject.wall3.position.y && y<=noisyObject.wall3.position.y+noisyObject.wall3.height){
                    initWall()
                    if(noisyObject.ans[2]==0){
                        wall1.play()
                    }else{
                        wall2.play()
                    }
                    noisyObject.walltalk3.show = true
                    noisyObject.walltalk3chk.show = true
                    noisyObject.walltalk3chk.enlarge = true
                    noisyObject.walltalk3cancel.show = true
                    noisyObject.walltalk3cancel.enlarge = true
                }
            }
            if(noisyObject.wall4.enlarge){
                if(x>=noisyObject.wall4.position.x && x<=noisyObject.wall4.position.x + noisyObject.wall4.width && y>=noisyObject.wall4.position.y && y<=noisyObject.wall4.position.y+noisyObject.wall4.height){
                    initWall()
                    if(noisyObject.ans[3]==0){
                        wall1.play()
                    }else{
                        wall2.play()
                    }
                    noisyObject.walltalk4.show = true
                    noisyObject.walltalk4chk.show = true
                    noisyObject.walltalk4chk.enlarge = true
                    noisyObject.walltalk4cancel.show = true
                    noisyObject.walltalk4cancel.enlarge = true
                }
            }
            if(noisyObject.wall5.enlarge){
                if(x>=noisyObject.wall5.position.x && x<=noisyObject.wall5.position.x + noisyObject.wall5.width && y>=noisyObject.wall5.position.y && y<=noisyObject.wall5.position.y+noisyObject.wall5.height){
                    initWall()
                    if(noisyObject.ans[4]==0){
                        wall1.play()
                    }else{
                        wall2.play()
                    }
                    noisyObject.walltalk5.show = true
                    noisyObject.walltalk5chk.show = true
                    noisyObject.walltalk5chk.enlarge = true
                    noisyObject.walltalk5cancel.show = true
                    noisyObject.walltalk5cancel.enlarge = true
                }
            }
            if(noisyObject.wall6.enlarge){
                if(x>=noisyObject.wall6.position.x && x<=noisyObject.wall6.position.x + noisyObject.wall6.width && y>=noisyObject.wall6.position.y && y<=noisyObject.wall6.position.y+noisyObject.wall6.height){
                    initWall()
                    if(noisyObject.ans[5]==0){
                        wall1.play()
                    }else{
                        wall2.play()
                    }
                    noisyObject.walltalk6.show = true
                    noisyObject.walltalk6chk.show = true
                    noisyObject.walltalk6chk.enlarge = true
                    noisyObject.walltalk6cancel.show = true
                    noisyObject.walltalk6cancel.enlarge = true
                }
            }
            if(noisyObject.wall7.enlarge){
                if(x>=noisyObject.wall7.position.x && x<=noisyObject.wall7.position.x + noisyObject.wall7.width && y>=noisyObject.wall7.position.y && y<=noisyObject.wall7.position.y+noisyObject.wall7.height){
                    initWall()
                    if(noisyObject.ans[6]==0){
                        wall1.play()
                    }else{
                        wall2.play()
                    }
                    noisyObject.walltalk7.show = true
                    noisyObject.walltalk7chk.show = true
                    noisyObject.walltalk7chk.enlarge = true
                    noisyObject.walltalk7cancel.show = true
                    noisyObject.walltalk7cancel.enlarge = true
                }
            }
        }
        if(noisyObject.wallStop){
            if(noisyObject.walltalk1.show){
                if(x>=noisyObject.walltalk1cancel.position.x && x<=noisyObject.walltalk1cancel.position.x + noisyObject.walltalk1cancel.width && y>=noisyObject.walltalk1cancel.position.y && y<=noisyObject.walltalk1cancel.position.y+noisyObject.walltalk1cancel.height){
                    cancelWall()
                    noisyObject.walltalk1.show = false
                    noisyObject.walltalk1chk.show = false
                    noisyObject.walltalk1chk.enlarge = false
                    noisyObject.walltalk1cancel.show = false
                    noisyObject.walltalk1cancel.enlarge = false
                }
                if(x>=noisyObject.walltalk1chk.position.x && x<=noisyObject.walltalk1chk.position.x + noisyObject.walltalk1chk.width && y>=noisyObject.walltalk1chk.position.y && y<=noisyObject.walltalk1chk.position.y+noisyObject.walltalk1chk.height){
                    noisyObject.walltalk1.show = false
                    noisyObject.walltalk1chk.show = false
                    noisyObject.walltalk1chk.enlarge = false
                    noisyObject.walltalk1cancel.show = false
                    noisyObject.walltalk1cancel.enlarge = false
                    if(noisyObject.idx != 1){
                        noisyObject.A.show = true
                        setTimeout(()=>{
                            noisyObject.A.show = false
                            noisyObject.B.show = false
                            chkWall()
                        }, 1000)
                    }else{
                        noisyObject.B.show = true
                        setTimeout(()=>{
                            noisyObject.A.show = false
                            noisyObject.B.show = false
                            chkWall()
                            noisyObject.people.show = true
                            if(CG.noisy.isPeace){
                                noisyObject.response7A.show = true
                            }else{
                                noisyObject.response7B.show = true
                                
                            }
                            setTimeout(()=>{
                                noisyObject.response7A.show = false
                                noisyObject.response7B.show = false
                                noisyObject.people.show = false
                                if(!CG.noisy.isPeace){
                                    if(noisyObject.end.image.src.includes('good')){
                                        noisyObject.end.image.src = noisyObject.end.image.src.replace('good', 'bad')
                                    }
                                    audioBadend.play()
                                    getCG.noisy.push(0)
                                }else{
                                    audioGoodend.play()
                                    getCG.noisy.push(1)
                                }
                                noisyObject.end.show = true
                            }, 1500)

                        }, 1000)
                    }
                }
            }
            if(noisyObject.walltalk2.show){
                if(x>=noisyObject.walltalk2cancel.position.x && x<=noisyObject.walltalk2cancel.position.x + noisyObject.walltalk2cancel.width && y>=noisyObject.walltalk2cancel.position.y && y<=noisyObject.walltalk2cancel.position.y+noisyObject.walltalk2cancel.height){
                    cancelWall()
                    noisyObject.walltalk2.show = false
                    noisyObject.walltalk2chk.show = false
                    noisyObject.walltalk2chk.enlarge = false
                    noisyObject.walltalk2cancel.show = false
                    noisyObject.walltalk2cancel.enlarge = false
                }
                if(x>=noisyObject.walltalk2chk.position.x && x<=noisyObject.walltalk2chk.position.x + noisyObject.walltalk2chk.width && y>=noisyObject.walltalk2chk.position.y && y<=noisyObject.walltalk2chk.position.y+noisyObject.walltalk2chk.height){
                    noisyObject.walltalk2.show = false
                    noisyObject.walltalk2chk.show = false
                    noisyObject.walltalk2chk.enlarge = false
                    noisyObject.walltalk2cancel.show = false
                    noisyObject.walltalk2cancel.enlarge = false
                    if(noisyObject.idx != 2){
                        noisyObject.A.show = true
                        setTimeout(()=>{
                            noisyObject.A.show = false
                            noisyObject.B.show = false
                            chkWall()
                        }, 1000)
                    }else{
                        noisyObject.B.show = true
                        setTimeout(()=>{
                            noisyObject.A.show = false
                            noisyObject.B.show = false
                            chkWall()
                            noisyObject.people.show = true
                            if(CG.noisy.isPeace){
                                noisyObject.response7A.show = true
                            }else{
                                noisyObject.response7B.show = true
                                
                            }
                            setTimeout(()=>{
                                noisyObject.response7A.show = false
                                noisyObject.response7B.show = false
                                noisyObject.people.show = false
                                if(!CG.noisy.isPeace){
                                    if(noisyObject.end.image.src.includes('good')){
                                        noisyObject.end.image.src = noisyObject.end.image.src.replace('good', 'bad')
                                    }
                                    audioBadend.play()
                                    getCG.noisy.push(0)
                                }else{
                                    audioGoodend.play()
                                    getCG.noisy.push(1)
                                }
                                noisyObject.end.show = true
                            }, 1500)

                        }, 1000)
                    }
                }
            }
            if(noisyObject.walltalk3.show){
                if(x>=noisyObject.walltalk3cancel.position.x && x<=noisyObject.walltalk3cancel.position.x + noisyObject.walltalk3cancel.width && y>=noisyObject.walltalk3cancel.position.y && y<=noisyObject.walltalk3cancel.position.y+noisyObject.walltalk3cancel.height){
                    cancelWall()
                    noisyObject.walltalk3.show = false
                    noisyObject.walltalk3chk.show = false
                    noisyObject.walltalk3chk.enlarge = false
                    noisyObject.walltalk3cancel.show = false
                    noisyObject.walltalk3cancel.enlarge = false
                }
                if(x>=noisyObject.walltalk3chk.position.x && x<=noisyObject.walltalk3chk.position.x + noisyObject.walltalk3chk.width && y>=noisyObject.walltalk3chk.position.y && y<=noisyObject.walltalk3chk.position.y+noisyObject.walltalk3chk.height){
                    noisyObject.walltalk3.show = false
                    noisyObject.walltalk3chk.show = false
                    noisyObject.walltalk3chk.enlarge = false
                    noisyObject.walltalk3cancel.show = false
                    noisyObject.walltalk3cancel.enlarge = false
                    if(noisyObject.idx != 3){
                        noisyObject.A.show = true
                        setTimeout(()=>{
                            noisyObject.A.show = false
                            noisyObject.B.show = false
                            chkWall()
                        }, 1000)
                    }else{
                        noisyObject.B.show = true
                        setTimeout(()=>{
                            noisyObject.A.show = false
                            noisyObject.B.show = false
                            chkWall()
                            noisyObject.people.show = true
                            if(CG.noisy.isPeace){
                                noisyObject.response7A.show = true
                            }else{
                                noisyObject.response7B.show = true
                                
                            }
                            setTimeout(()=>{
                                noisyObject.response7A.show = false
                                noisyObject.response7B.show = false
                                noisyObject.people.show = false
                                if(!CG.noisy.isPeace){
                                    if(noisyObject.end.image.src.includes('good')){
                                        noisyObject.end.image.src = noisyObject.end.image.src.replace('good', 'bad')
                                    }
                                    audioBadend.play()
                                    getCG.noisy.push(0)
                                }else{
                                    audioGoodend.play()
                                    getCG.noisy.push(1)
                                }
                                noisyObject.end.show = true
                            }, 1500)

                        }, 1000)
                    }
                }
            }
            if(noisyObject.walltalk4.show){
                if(x>=noisyObject.walltalk4cancel.position.x && x<=noisyObject.walltalk4cancel.position.x + noisyObject.walltalk4cancel.width && y>=noisyObject.walltalk4cancel.position.y && y<=noisyObject.walltalk4cancel.position.y+noisyObject.walltalk4cancel.height){
                    cancelWall()
                    noisyObject.walltalk4.show = false
                    noisyObject.walltalk4chk.show = false
                    noisyObject.walltalk4chk.enlarge = false
                    noisyObject.walltalk4cancel.show = false
                    noisyObject.walltalk4cancel.enlarge = false
                }
                if(x>=noisyObject.walltalk4chk.position.x && x<=noisyObject.walltalk4chk.position.x + noisyObject.walltalk4chk.width && y>=noisyObject.walltalk4chk.position.y && y<=noisyObject.walltalk4chk.position.y+noisyObject.walltalk4chk.height){
                    noisyObject.walltalk4.show = false
                    noisyObject.walltalk4chk.show = false
                    noisyObject.walltalk4chk.enlarge = false
                    noisyObject.walltalk4cancel.show = false
                    noisyObject.walltalk4cancel.enlarge = false
                    if(noisyObject.idx != 4){
                        noisyObject.A.show = true
                        setTimeout(()=>{
                            noisyObject.A.show = false
                            noisyObject.B.show = false
                            chkWall()
                        }, 1000)
                    }else{
                        noisyObject.B.show = true
                        setTimeout(()=>{
                            noisyObject.A.show = false
                            noisyObject.B.show = false
                            chkWall()
                            noisyObject.people.show = true
                            if(CG.noisy.isPeace){
                                noisyObject.response7A.show = true
                            }else{
                                noisyObject.response7B.show = true
                                
                            }
                            setTimeout(()=>{
                                noisyObject.response7A.show = false
                                noisyObject.response7B.show = false
                                noisyObject.people.show = false
                                if(!CG.noisy.isPeace){
                                    if(noisyObject.end.image.src.includes('good')){
                                        noisyObject.end.image.src = noisyObject.end.image.src.replace('good', 'bad')
                                    }
                                    audioBadend.play()
                                    getCG.noisy.push(0)
                                }else{
                                    audioGoodend.play()
                                    getCG.noisy.push(1)
                                }
                                noisyObject.end.show = true
                            }, 1500)

                        }, 1000)
                    }
                }
            }
            if(noisyObject.walltalk5.show){
                if(x>=noisyObject.walltalk5cancel.position.x && x<=noisyObject.walltalk5cancel.position.x + noisyObject.walltalk5cancel.width && y>=noisyObject.walltalk5cancel.position.y && y<=noisyObject.walltalk5cancel.position.y+noisyObject.walltalk5cancel.height){
                    cancelWall()
                    noisyObject.walltalk5.show = false
                    noisyObject.walltalk5chk.show = false
                    noisyObject.walltalk5chk.enlarge = false
                    noisyObject.walltalk5cancel.show = false
                    noisyObject.walltalk5cancel.enlarge = false
                }
                if(x>=noisyObject.walltalk5chk.position.x && x<=noisyObject.walltalk5chk.position.x + noisyObject.walltalk5chk.width && y>=noisyObject.walltalk5chk.position.y && y<=noisyObject.walltalk5chk.position.y+noisyObject.walltalk5chk.height){
                    noisyObject.walltalk5.show = false
                    noisyObject.walltalk5chk.show = false
                    noisyObject.walltalk5chk.enlarge = false
                    noisyObject.walltalk5cancel.show = false
                    noisyObject.walltalk5cancel.enlarge = false
                    if(noisyObject.idx != 5){
                        noisyObject.A.show = true
                        setTimeout(()=>{
                            noisyObject.A.show = false
                            noisyObject.B.show = false
                            chkWall()
                        }, 1000)
                    }else{
                        noisyObject.B.show = true
                        setTimeout(()=>{
                            noisyObject.A.show = false
                            noisyObject.B.show = false
                            chkWall()
                            noisyObject.people.show = true
                            if(CG.noisy.isPeace){
                                noisyObject.response7A.show = true
                            }else{
                                noisyObject.response7B.show = true
                                
                            }
                            setTimeout(()=>{
                                noisyObject.response7A.show = false
                                noisyObject.response7B.show = false
                                noisyObject.people.show = false
                                if(!CG.noisy.isPeace){
                                    if(noisyObject.end.image.src.includes('good')){
                                        noisyObject.end.image.src = noisyObject.end.image.src.replace('good', 'bad')
                                    }
                                    audioBadend.play()
                                    getCG.noisy.push(0)
                                }else{
                                    audioGoodend.play()
                                    getCG.noisy.push(1)
                                }
                                noisyObject.end.show = true
                            }, 1500)

                        }, 1000)
                    }
                }
            }
            if(noisyObject.walltalk6.show){
                if(x>=noisyObject.walltalk6cancel.position.x && x<=noisyObject.walltalk6cancel.position.x + noisyObject.walltalk6cancel.width && y>=noisyObject.walltalk6cancel.position.y && y<=noisyObject.walltalk6cancel.position.y+noisyObject.walltalk6cancel.height){
                    cancelWall()
                    noisyObject.walltalk6.show = false
                    noisyObject.walltalk6chk.show = false
                    noisyObject.walltalk6chk.enlarge = false
                    noisyObject.walltalk6cancel.show = false
                    noisyObject.walltalk6cancel.enlarge = false
                }
                if(x>=noisyObject.walltalk6chk.position.x && x<=noisyObject.walltalk6chk.position.x + noisyObject.walltalk6chk.width && y>=noisyObject.walltalk6chk.position.y && y<=noisyObject.walltalk6chk.position.y+noisyObject.walltalk6chk.height){
                    noisyObject.walltalk6.show = false
                    noisyObject.walltalk6chk.show = false
                    noisyObject.walltalk6chk.enlarge = false
                    noisyObject.walltalk6cancel.show = false
                    noisyObject.walltalk6cancel.enlarge = false
                    if(noisyObject.idx != 6){
                        noisyObject.A.show = true
                        setTimeout(()=>{
                            noisyObject.A.show = false
                            noisyObject.B.show = false
                            chkWall()
                        }, 1000)
                    }else{
                        noisyObject.B.show = true
                        setTimeout(()=>{
                            noisyObject.A.show = false
                            noisyObject.B.show = false
                            chkWall()
                            noisyObject.people.show = true
                            if(CG.noisy.isPeace){
                                noisyObject.response7A.show = true
                            }else{
                                noisyObject.response7B.show = true
                                
                            }
                            setTimeout(()=>{
                                noisyObject.response7A.show = false
                                noisyObject.response7B.show = false
                                noisyObject.people.show = false
                                if(!CG.noisy.isPeace){
                                    if(noisyObject.end.image.src.includes('good')){
                                        noisyObject.end.image.src = noisyObject.end.image.src.replace('good', 'bad')
                                    }
                                    audioBadend.play()
                                    getCG.noisy.push(0)
                                }else{
                                    audioGoodend.play()
                                    getCG.noisy.push(1)
                                }
                                noisyObject.end.show = true
                            }, 1500)
                        }, 1000)
                    }
                }
            }
            if(noisyObject.walltalk7.show){
                if(x>=noisyObject.walltalk7cancel.position.x && x<=noisyObject.walltalk7cancel.position.x + noisyObject.walltalk7cancel.width && y>=noisyObject.walltalk7cancel.position.y && y<=noisyObject.walltalk7cancel.position.y+noisyObject.walltalk7cancel.height){
                    cancelWall()
                    noisyObject.walltalk7.show = false
                    noisyObject.walltalk7chk.show = false
                    noisyObject.walltalk7chk.enlarge = false
                    noisyObject.walltalk7cancel.show = false
                    noisyObject.walltalk7cancel.enlarge = false
                }
                if(x>=noisyObject.walltalk7chk.position.x && x<=noisyObject.walltalk7chk.position.x + noisyObject.walltalk7chk.width && y>=noisyObject.walltalk7chk.position.y && y<=noisyObject.walltalk7chk.position.y+noisyObject.walltalk7chk.height){
                    noisyObject.walltalk7.show = false
                    noisyObject.walltalk7chk.show = false
                    noisyObject.walltalk7chk.enlarge = false
                    noisyObject.walltalk7cancel.show = false
                    noisyObject.walltalk7cancel.enlarge = false
                    if(noisyObject.idx != 7){
                        noisyObject.A.show = true
                        setTimeout(()=>{
                            noisyObject.A.show = false
                            noisyObject.B.show = false
                            chkWall()
                        }, 1000)
                    }else{
                        noisyObject.B.show = true
                        setTimeout(()=>{
                            noisyObject.A.show = false
                            noisyObject.B.show = false
                            chkWall()
                            noisyObject.people.show = true
                            if(CG.noisy.isPeace){
                                noisyObject.response7A.show = true
                            }else{
                                noisyObject.response7B.show = true
                                
                            }
                            setTimeout(()=>{
                                noisyObject.response7A.show = false
                                noisyObject.response7B.show = false
                                noisyObject.people.show = false
                                if(!CG.noisy.isPeace){
                                    if(noisyObject.end.image.src.includes('good')){
                                        noisyObject.end.image.src = noisyObject.end.image.src.replace('good', 'bad')
                                    }
                                    audioBadend.play()
                                    getCG.noisy.push(0)
                                }else{
                                    audioGoodend.play()
                                    getCG.noisy.push(1)
                                }
                                noisyObject.end.show = true
                            }, 1500)
                        }, 1000)
                    }
                }
            }
            
        }
    }
    if(roomOpen.delay && isRoomOpen){
        if(delayObject.talk1.show && delayObject.talk1Chk){
            if(!delayObject.talk1Chk) return
            if(x>=delayObject.talk1.position.x && x<=delayObject.talk1.position.x + delayObject.talk1.width && y>=delayObject.talk1.position.y && y<=delayObject.talk1.position.y+delayObject.talk1.height){
                clickVedioPlay('talk')
                delayObject.talk1Chk = false
                delayObject.talk1.enlarge = false
                delayObject.people.show = true
                delayObject.response2.show = true

                setTimeout(()=>{
                    if(!isRoomOpen) return
                    delayObject.talk1.show = false

                    delayObject.response2.show = false
                    delayObject.response3.show = true
                    setTimeout(() => {
                        if(!isRoomOpen) return
                        delayObject.response3.show = false
                        delayObject.talk4Chk = true
                        delayObject.talk4.show = true
                        delayObject.talk4.enlarge = true
                    }, 2000);
                }, delayObject.response2.text.split('').length*10 + 1000)
            }
        }

        if(delayObject.talk4.show && delayObject.talk4Chk){
            if(!delayObject.talk4Chk) return
            if(x>=delayObject.talk4.position.x && x<=delayObject.talk4.position.x + delayObject.talk4.width && y>=delayObject.talk4.position.y && y<=delayObject.talk4.position.y+delayObject.talk4.height){
                clickVedioPlay('talk')
                delayObject.talk4Chk = false
                delayObject.response3.show = false
                delayObject.talk4.enlarge = false
                delayObject.response5.show = true

                setTimeout(() => {
                    if(!isRoomOpen) return
                    delayObject.talk4.show = false
                    delayObject.talk6Chk = true
                    delayObject.talk6.show = true
                    delayObject.talk6.enlarge = true
                }, 1500);
            }
        }
        if(delayObject.talk6.show && delayObject.talk6Chk){
            if(!delayObject.talk6Chk) return
            if(x>=delayObject.talk6.position.x && x<=delayObject.talk6.position.x + delayObject.talk6.width && y>=delayObject.talk6.position.y && y<=delayObject.talk6.position.y+delayObject.talk6.height){
                clickVedioPlay('talk')
                delayObject.talk6Chk = false
                delayObject.response5.show = false
                delayObject.talk6.enlarge = false
                delayObject.response7.show = true
                setTimeout(() => {
                    if(!isRoomOpen) return
                    delayObject.response7.show = false
                    delayObject.talk6.show = false
                    delayObject.talk8Chk = true
                    delayObject.talk8A.show = true
                    delayObject.talk8A.enlarge = true
                    delayObject.talk8B.show = true
                    delayObject.talk8B.enlarge = true
                    delayObject.talk8C.show = true
                    delayObject.talk8C.enlarge = true
                }, 2000);
            }
        }
        if(delayObject.talk8A.show && delayObject.talk8B.show && delayObject.talk8C.show && delayObject.talk8Chk){
            if(!delayObject.talk8Chk) return
            if(x>=delayObject.talk8A.position.x && x<=delayObject.talk8A.position.x + delayObject.talk8A.width && y>=delayObject.talk8A.position.y && y<=delayObject.talk8A.position.y+delayObject.talk8A.height){
                clickVedioPlay('talk')
                delayObject.talk8Chk = false
                delayObject.response7.show = false
                delayObject.talk8A.enlarge = false
                delayObject.talk8A.show = false
                delayObject.talk8B.show = false
                delayObject.talk8B.enlarge = false
                delayObject.talk8C.show = false
                delayObject.talk8C.enlarge = false
                delay.image.src = delay.image.src.replace('.png', '2.png')
                delayObject.people.show = false
                setTimeout(()=>{
                    if(!isRoomOpen) return
                    delayObject.talk9.show = true
                    delayObject.talk9Chk = true
                    delayObject.chk.show = true
                    delayObject.chk.enlarge = true
                }, 500)
            }
            if(x>=delayObject.talk8B.position.x && x<=delayObject.talk8B.position.x + delayObject.talk8B.width && y>=delayObject.talk8B.position.y && y<=delayObject.talk8B.position.y+delayObject.talk8B.height){
                clickVedioPlay('talk')
                delayObject.talk8Chk = false
                delayObject.response7.show = false
                delayObject.talk8A.enlarge = false
                delayObject.talk8A.show = false
                delayObject.talk8B.show = false
                delayObject.talk8B.enlarge = false
                delayObject.talk8C.show = false
                delayObject.talk8C.enlarge = false
                delay.image.src = delay.image.src.replace('.png', '2.png')
                delayObject.people.show = false
                CG.delay.isPeace = false
                setTimeout(()=>{
                    if(!isRoomOpen) return
                    delayObject.talk9.show = true
                    delayObject.talk9Chk = true
                    delayObject.chk.show = true
                    delayObject.chk.enlarge = true
                }, 500)
            }
            if(x>=delayObject.talk8C.position.x && x<=delayObject.talk8C.position.x + delayObject.talk8C.width && y>=delayObject.talk8C.position.y && y<=delayObject.talk8C.position.y+delayObject.talk8C.height){
                clickVedioPlay('talk')
                delayObject.talk8Chk = false
                delayObject.response7.show = false
                delayObject.talk8A.enlarge = false
                delayObject.talk8A.show = false
                delayObject.talk8B.show = false
                delayObject.talk8B.enlarge = false
                delayObject.talk8C.show = false
                delayObject.talk8C.enlarge = false
                delay.image.src = delay.image.src.replace('.png', '2.png')
                delayObject.people.show = false
                CG.delay.isPeace = false
                setTimeout(()=>{
                    if(!isRoomOpen) return
                    delayObject.talk9.show = true
                    delayObject.talk9Chk = true
                    delayObject.chk.show = true
                    delayObject.chk.enlarge = true
                }, 500)
            }
        }
        if(delayObject.talk9.show && delayObject.talk9Chk){
            if(!delayObject.talk9Chk) return
            if(x>=delayObject.chk.position.x && x<=delayObject.chk.position.x + delayObject.chk.width && y>=delayObject.chk.position.y && y<=delayObject.chk.position.y+delayObject.chk.height){
                clickVedioPlay('btn')
                delayObject.talk9Chk = false
                delayObject.talk9.show = false
                delayObject.chk.show = false
                delayObject.chk.enlarge = false
                delay.image.src = delay.image.src.replace('2.png', '3.png')

                delayObject.battery1.show = true
                delayObject.battery2.show = true
                delayObject.battery3.show = true
                delayObject.battery4.show = true
                delayObject.battery1.enlarge = true
                delayObject.battery4.enlarge = true
                
                delayObject.a1.show = true
                delayObject.b1.show = true
                delayObject.c1.show = true
                delayObject.d1.show = true
                delayObject.a1.enlarge = true
                delayObject.c1.enlarge = true
                delayObject.d1.enlarge = true
                delayObject.count.show = true
                setTimeout(()=>{
                    delayObject.startInter = true
                }, 100)
            }
        }
        if(delayObject.talk11.show && delayObject.talk11Chk){
            if(!delayObject.talk11Chk) return
            if(x>=delayObject.talk11.position.x && x<=delayObject.talk11.position.x + delayObject.talk11.width && y>=delayObject.talk11.position.y && y<=delayObject.talk11.position.y+delayObject.talk11.height){
                clickVedioPlay('talk')
                delayObject.talk11Chk = false
                delayObject.response10.show = false
                delayObject.talk11.enlarge = false
                delayObject.response12.show = true

                setTimeout(()=>{
                    delayObject.talk11.show = false
                    delayObject.talk13A.show = true
                    delayObject.talk13A.enlarge = true
                    delayObject.talk13B.show = true
                    delayObject.talk13B.enlarge = true
                    delayObject.talk13Chk = true
                }, 1000)
            }
        }
        if(delayObject.talk13A.show && delayObject.talk13B.show && delayObject.talk13Chk){
            if(!delayObject.talk13Chk) return
            if(x>=delayObject.talk13A.position.x && x<=delayObject.talk13A.position.x + delayObject.talk13A.width && y>=delayObject.talk13A.position.y && y<=delayObject.talk13A.position.y+delayObject.talk13A.height){
                clickVedioPlay('talk')
                delayObject.talk13Chk = false
                delayObject.response12.show = false
                delayObject.talk13A.enlarge = false
                delayObject.talk13B.enlarge = false
                delayObject.response14A.show = true
                
                setTimeout(()=>{
                    delayObject.response14A.show = false
                    delayObject.response14B.show = false
                    delayObject.talk13A.show = false
                    delayObject.talk13B.show = false
                    delayObject.response15.show = true
                }, delayObject.response14A.text.split('').length*10 + 1500)
                setTimeout(()=>{
                    delayObject.talk16A.show = true
                    delayObject.talk16A.enlarge = true
                    delayObject.talk16B.show = true
                    delayObject.talk16B.enlarge = true
                    delayObject.talk16Chk = true
                }, delayObject.response14A.text.split('').length*10 + 3000)
            }
            if(x>=delayObject.talk13B.position.x && x<=delayObject.talk13B.position.x + delayObject.talk13B.width && y>=delayObject.talk13B.position.y && y<=delayObject.talk13B.position.y+delayObject.talk13B.height){
                clickVedioPlay('talk')
                delayObject.talk13Chk = false
                delayObject.response12.show = false
                delayObject.talk13A.enlarge = false
                delayObject.talk13B.enlarge = false
                delayObject.response14B.show = true
                CG.delay.isPeace = false
                setTimeout(()=>{
                    delayObject.response14A.show = false
                    delayObject.response14B.show = false
                    delayObject.talk13A.show = false
                    delayObject.talk13B.show = false
                    delayObject.response15.show = true
                }, delayObject.response14B.text.split('').length*10 + 1500)
                setTimeout(()=>{
                    delayObject.talk16A.show = true
                    delayObject.talk16A.enlarge = true
                    delayObject.talk16B.show = true
                    delayObject.talk16B.enlarge = true
                    delayObject.talk16Chk = true
                }, delayObject.response14A.text.split('').length*10 + 3000)
            }
        }
        if(delayObject.talk16A.show && delayObject.talk16B.show && delayObject.talk16Chk){
            if(!delayObject.talk16Chk) return
            if(x>=delayObject.talk16A.position.x && x<=delayObject.talk16A.position.x + delayObject.talk16A.width && y>=delayObject.talk16A.position.y && y<=delayObject.talk16A.position.y+delayObject.talk16A.height){
                clickVedioPlay('talk')
                delayObject.talk16Chk = false
                delayObject.talk16A.enlarge = false
                delayObject.talk16B.enlarge = false
                delayObject.response15.show = false
                delayObject.response17A.show = true
                setTimeout(()=>{
                    if(!CG.delay.isPeace){
                        delayObject.end.image.src = delayObject.end.image.src.replace('good', 'bad')
                        audioBadend.play()
                        getCG.delay.push(0)
                    }else{
                        audioGoodend.play()
                        getCG.delay.push(1)
                    }
                    delayObject.talk16A.show = false
                    delayObject.talk16B.show = false
                    delayObject.response17A.show = false
                    delayObject.response17B.show = false
                    delayObject.people.show = false
                    delayObject.end.show = true
                }, 1500)
            }
            if(x>=delayObject.talk16B.position.x && x<=delayObject.talk16B.position.x + delayObject.talk16B.width && y>=delayObject.talk16B.position.y && y<=delayObject.talk16B.position.y+delayObject.talk16B.height){
                clickVedioPlay('talk')
                delayObject.talk16Chk = false
                delayObject.talk16A.enlarge = false
                delayObject.talk16B.enlarge = false
                delayObject.response15.show = false
                delayObject.response17B.show = true
                CG.delay.isPeace = false
                setTimeout(()=>{
                    if(!CG.delay.isPeace){
                        delayObject.end.image.src = delayObject.end.image.src.replace('good', 'bad')
                        audioBadend.play()
                        getCG.delay.push(0)
                    }else{
                        audioGoodend.play()
                        getCG.delay.push(1)
                    }
                    delayObject.talk16A.show = false
                    delayObject.talk16B.show = false
                    delayObject.response17A.show = false
                    delayObject.response17B.show = false
                    delayObject.people.show = false
                    delayObject.end.show = true
                }, 1500)
            }
        }
        if(delayObject.startInter){
            if(delayObject.battery1.enlarge){
                if(x>=delayObject.battery1.position.x && x<=delayObject.battery1.position.x + delayObject.battery1.width && y>=delayObject.battery1.position.y && y<=delayObject.battery1.position.y+delayObject.battery1.height){
                    clickVedioPlay('obj')
                    delayObject.battery1.enlarge = false
                    delayObject.battery1.show = false
                    delayObject.batteryNum++
                }
            }
            if(delayObject.battery2.enlarge){
                if(x>=delayObject.battery2.position.x && x<=delayObject.battery2.position.x + delayObject.battery2.width && y>=delayObject.battery2.position.y && y<=delayObject.battery2.position.y+delayObject.battery2.height){
                    clickVedioPlay('obj')
                    delayObject.battery2.enlarge = false
                    delayObject.battery2.show = false
                    delayObject.batteryNum++
                }
            }
            if(delayObject.battery3.enlarge){
                if(x>=delayObject.battery3.position.x && x<=delayObject.battery3.position.x + delayObject.battery3.width && y>=delayObject.battery3.position.y && y<=delayObject.battery3.position.y+delayObject.battery3.height){
                    clickVedioPlay('obj')
                    delayObject.battery3.enlarge = false
                    delayObject.battery3.show = false
                    delayObject.batteryNum++
                }
            }
            if(delayObject.battery4.enlarge){
                if(x>=delayObject.battery4.position.x && x<=delayObject.battery4.position.x + delayObject.battery4.width && y>=delayObject.battery4.position.y && y<=delayObject.battery4.position.y+delayObject.battery4.height){
                    clickVedioPlay('obj')
                    delayObject.battery4.enlarge = false
                    delayObject.battery4.show = false
                    delayObject.batteryNum++
                }
            }
            if(delayObject.a1.enlarge && !delayObject.a2.show){
                if(x>=delayObject.a1.position.x && x<=delayObject.a1.position.x + delayObject.a1.width && y>=delayObject.a1.position.y && y<=delayObject.a1.position.y+delayObject.a1.height){
                    clickVedioPlay('obj')
                    delayObject.a1.enlarge = false
                    delayObject.a1.show = false
                    delayObject.a2.show = true
                    setTimeout(()=>{
                        delayObject.battery2.enlarge = true
                    }, 100)
                }
                
            }
            if(delayObject.b1.enlarge && !delayObject.b2.show){
                if(x>=delayObject.b1.position.x && x<=delayObject.b1.position.x + delayObject.b1.width && y>=delayObject.b1.position.y && y<=delayObject.b1.position.y+delayObject.b1.height){
                    clickVedioPlay('obj')
                    delayObject.b1.enlarge = false
                    delayObject.b1.show = false
                    delayObject.b2.show = true
                    setTimeout(()=>{
                        delayObject.battery3.enlarge = true
                    }, 100)
                }
            }
            if(delayObject.c1.enlarge && !delayObject.c2.show){
                if(x>=delayObject.c1.position.x && x<=delayObject.c1.position.x + delayObject.c1.width && y>=delayObject.c1.position.y && y<=delayObject.c1.position.y+delayObject.c1.height){
                    clickVedioPlay('obj')
                    delayObject.c1.enlarge = false
                    delayObject.c1.show = false
                    delayObject.c2.show = true
                }
            }
            if(delayObject.d1.enlarge && !delayObject.d2.show){
                if(x>=delayObject.d1.position.x && x<=delayObject.d1.position.x + delayObject.d1.width && y>=delayObject.d1.position.y && y<=delayObject.d1.position.y+delayObject.d1.height){
                    clickVedioPlay('obj')
                    delayObject.d1.enlarge = false
                    delayObject.d1.show = false
                    delayObject.d2.show = true
                    setTimeout(()=>{
                        if(!isRoomOpen) return
                        delayObject.b1.enlarge = true
                    }, 100)
                }
                
            }
            if(delayObject.batteryNum === 1){
                delayObject.count.image.src = "./images/delays/talk/1-4.png"
            }else if(delayObject.batteryNum === 2){
                delayObject.count.image.src = "./images/delays/talk/2-4.png"
            }else if(delayObject.batteryNum === 3){
                delayObject.count.image.src = "./images/delays/talk/3-4.png"
            }else if(delayObject.batteryNum === 4){
                delayObject.count.image.src = "./images/delays/talk/4-4.png"
                delayObject.a1.enlarge = false
                delayObject.b1.enlarge = false
                delayObject.c1.enlarge = false
                delayObject.d1.enlarge = false
                delayObject.a1.show = false
                delayObject.b1.show = false
                delayObject.c1.show = false
                delayObject.d1.show = false
                delayObject.a2.show = false
                delayObject.b2.show = false
                delayObject.c2.show = false
                delayObject.d2.show = false
                delay.image.src = delay.image.src.replace('3.png', '4.png')
                if(!isRoomOpen) return
                delayObject.response10.show = true
                delayObject.people.show = true
                delayObject.startInter = false
                setTimeout(()=>{
                    if(!isRoomOpen) return
                    delayObject.talk11.show = true
                    delayObject.talk11.enlarge = true
                    delayObject.talk11Chk = true
                }, 1000)
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
            clickVedioPlay('inCoolRoom')
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
            audioWhistle.play()
            roomOpen.occupy = true
            isRoomOpen = true
        }else if(interaction.name === 'hoard'){
            if(isRoomOpen) return
            clickVedioPlay('inRoom')
            roomOpen.hoard = true
            isRoomOpen = true
        }else if(interaction.name === 'network'){
            if(isRoomOpen) return
            clickVedioPlay('inRoom')
            roomOpen.network = true
            isRoomOpen = true
        }else if(interaction.name === 'noisy'){
            if(isRoomOpen) return
            clickVedioPlay('inRoom')
            roomOpen.noisy = true
            isRoomOpen = true
            noisyObject.ans = noisyObject.ans.sort(() => Math.random() - 0.5);
            noisyObject.idx = noisyObject.ans.indexOf(1) + 1

            playKnock();
        }else if(interaction.name === 'delay'){
            if(isRoomOpen) return
            clickVedioPlay('inRoom')
            roomOpen.delay = true
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
}
function initOccupyRoom(){
    occupyObject.sitdownChk = true
    occupyObject.talk1Chk = false
    occupyObject.talk3Chk = false
    occupyObject.talk5Chk = false
    occupyObject.talk7Chk = false
    occupyObject.talk10Chk = false

    occupyMoveNum = 0

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

    hoardObject.interOkNum = 0
    hoardObject.interNum = 0
    if(hoard.image.src.includes('-.png')){
        hoard.image.src = hoard.image.src.replace('-.png', '.png')
    }
    
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
    CG.hoard.isPeace = true
    
    if(hoardObject.people.image.src.includes('people2')){
        hoardObject.people.image.src = hoardObject.people.image.src.replace('people2', 'people1')
    }else if(hoardObject.people.image.src.includes('people3')){
        hoardObject.people.image.src = hoardObject.people.image.src.replace('people3', 'people1')
    }
    if(hoardObject.end.image.src.includes('bad')){
        hoardObject.end.image.src = hoardObject.end.image.src.replace('bad', 'good')
    }
}
function initNetworkRoom(){
    netObject.startChk  = true
    netObject.talk2Chk  = false
    netObject.talk4Chk  = false
    netObject.talk6Chk  = false
    netObject.talk8Chk  = false
    netObject.talk10Chk  = false
    netObject.talk11Chk  = false
    netObject.talk13Chk  = false
    netObject.talk15Chk  = false
    netObject.webShow  = false
    netObject.is404  = false

    netObject.webNum = 1

    networks.forEach(net=>{
        if(net.name === 'smallPeople'){
            net.show = true
            net.enlarge = true
        }else if(net.name === 'computer'){
            net.show = true
        }
        else{
            net.show = false
            net.enlarge = false
            if(net.talk){
                net.isTypewriter = true
                if(net.image.src.includes('_.png')){
                    net.image.src = net.image.src.replace('_.png', '.png')
                }
            }
            if(net.name === 'web'){
                net.image.src = './images/network/web/web1.png'
            }
            net.num = 0;net.step = 0;net.twoStep = 25;net.threeStep = 50
        }
    })

    CG.network.isPeace = true

    if(netObject.end.image.src.includes('bad')){
        netObject.end.image.src = netObject.end.image.src.replace('bad', 'good')
    }
}
function initNoisyRoom(){
    stopKnock()
    noisyObject.startChk = true
    noisyObject.talk1Chk = false
    noisyObject.talk3Chk = false
    noisyObject.talk4Chk = false
    noisyObject.talk6Chk = false
    noisyObject.wallChk = false
    noisyObject.wallStop = false
    
    noisys.forEach(noisy=>{
        if(noisy.name === 'smallPeople'){
            noisy.show = true
            noisy.enlarge = true
        }else if(noisy.name === 'wall1' || noisy.name === 'wall2' || noisy.name === 'wall3' || noisy.name === 'wall4' || noisy.name === 'wall5' || noisy.name === 'wall6' || noisy.name === 'wall7'){
            noisy.show = true
            noisy.enlarge = false
        }
        else{
            noisy.show = false
            noisy.enlarge = false
            if(noisy.talk){
                noisy.isTypewriter = true
                if(noisy.image.src.includes('_.png')){
                    noisy.image.src = noisy.image.src.replace('_.png', '.png')
                }
            }
            
            noisy.num = 0;noisy.step = 0;noisy.twoStep = 25;noisy.threeStep = 50
        }
    })

    CG.noisy.isPeace = true

    if(noisyObject.end.image.src.includes('bad')){
        noisyObject.end.image.src = noisyObject.end.image.src.replace('bad', 'good')
    }
}
function initDelayRoom(){
    delay.image.src = "./images/delay.png"
    delayObject.talk1Chk = true
    delayObject.talk4Chk = false
    delayObject.talk6Chk = false
    delayObject.talk8Chk = false
    delayObject.talk9Chk = false
    delayObject.startInter = false
    delayObject.talk11Chk = false
    delayObject.talk13Chk = false
    delayObject.talk16Chk = false

    delayObject.batteryNum = 0

    delays.forEach(delay=>{
        if(delay.name === '1'){
            delay.show = true
            delay.enlarge = true
        }
        else{
            delay.show = false
            delay.enlarge = false
            if(delay.talk){
                delay.isTypewriter = true
                if(delay.image.src.includes('_.png')){
                    delay.image.src = delay.image.src.replace('_.png', '.png')
                }
            }
            if(delay.name === 'count'){
                delay.image.src = './images/delays/talk/0-4.png'
            }
            delay.num = 0;delay.step = 0;delay.twoStep = 25;delay.threeStep = 50
        }
        CG.delay.isPeace = true

        if(delayObject.end.image.src.includes('bad')){
            delayObject.end.image.src = delayObject.end.image.src.replace('bad', 'good')
        }
    })
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
    }else if(name == 'inCoolRoom'){
        audioInCoolRoom.play()
    }
}

function playBgm(){
    // bgmAudio.loop = true
    // bgmAudio.play();
    
}
function stopBgm(){
    bgmAudio.pause();
    bgmAudio.currentTime = 0;
}

function playKnock(){
    knock.loop = true
    knock.play()
}

function stopKnock(){
    knock.pause();
    knock.currentTime = 0;
}