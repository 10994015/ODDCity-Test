const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width =16 * 90
canvas.height = 9 *90


const CG = {
    occupy:{
        isPeace:true
    }
}
let occupyInteractiveBtn = false

let scrollOffset =-2400
let isStart = false
const player = new Player()

const createImage = (imgSrc)=>{
    const image = new Image();
    image.src = imgSrc
    return image
}

const backgruond = new Backgruond({
    position:{
        x:0, y:0
    },
    image :createImage('./images/bg.png'),
})

const interactions = [
    new Interaction({x:2973, y:481, w:147, h:218, name:'supermarket'}),
    new Interaction({x:3750, y:450, w:60, h:60, name:'occupy', image: createImage('./images/buttons/in2f.png'), multiple:1.05}),
]
const talks = [
    new Talk({x:3780, y:350, w:3318/15, h:1604/15, name:'occupy', image: createImage('./images/talks/enter2f.png'),isShow:false}),
]
const dynamics = [
    
]        
const bus = new Bus({x:200, y:461, w:1024, h:825/2.7, image:createImage('./images/bus3.png')})
const supermarket = new Room({image:createImage('./images/supermarket.png')});

let playerTalkX = canvas.width-(canvas.width-canvas.height*0.8*1.844)/2
let playerTalkXY= canvas.height-(canvas.height-canvas.height*0.8)/2
let mesterTalkX = (canvas.width-canvas.height*0.8*1.844)/2 + 100
let mesterTalkY = 355
//occupy
const occupy = new Room({image:createImage('./images/occupy.png')});
const occupys = [
    new Shared({x:235, y:480, w:134.784, h:40, image: createImage('./images/occupys/a1.png'),}),
    new Shared({x:290, y:535, w:91/2.8, h:137/2.8, image: createImage('./images/occupys/b1.png')}),
    new Shared({x:395, y:490, w:258/2.8, h:126/2.8, image: createImage('./images/occupys/c1.png')}),
    new Shared({x:455, y:680, w:132/2.6, h:103/2.6, image: createImage('./images/occupys/d1.png')}),
    new Shared({x:570, y:550, w:110/2.4, h:113/2.4, image: createImage('./images/occupys/e1.png')}),
    new Shared({x:670, y:538, w:654/3.4, h:178/3.2, image: createImage('./images/occupys/f1.png')}),
    new Shared({x:835, y:460, w:122/2.7, h:233/2.7, image: createImage('./images/occupys/g1.png')}),
    new Shared({x:880, y:530, w:259/2.7, h:138/2.7, image: createImage('./images/occupys/h1.png')}),
    new Shared({x:1030, y:415, w:331/2.9, h:158/2.8, image: createImage('./images/occupys/i1.png')}),
    new Shared({x:1120, y:680, w:134/2.9, h:89/2.8, image: createImage('./images/occupys/j1.png')}),
    new Shared({x:950, y:355, w:383/2, h:774/2, image: createImage('./images/occupys/sitdown.png'), isPeople:true, isEnlarge:true, name:'sitdown', multiple:1.05}),
    new Shared({x:20, y:255, w:223, h:795, image: createImage('./images/occupys/people1.png'), isPeople:true, name:'people', isShow:false}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/1.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'1', isShow:false, text:'先生！你怎麼把這邊搞得亂七八糟呢？'}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/10A.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'3A', isShow:false}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*2-15, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/3B.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'3B', isShow:false}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/5A.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'5A', isShow:false}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*2-15, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/5B.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'5B', isShow:false}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/7.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'7', isShow:false}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/10A.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'10A', isShow:false}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*2-15, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/10B.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'10B', isShow:false}),
    new Shared({x:playerTalkX-(2378/4.5)-25, y:playerTalkXY-630/4.5*3-30, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/10C.png'), isTalk:true, isEnlarge:false, multiple:1.02, name:'10C', isShow:false}),
    new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'2', isShow:false, text:"啊林北就累了！這裡不就是給人休息的逆？", isTypewriter:true }),
    new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'4', isShow:false ,text:"你管老子那麼多幹嘛！", isTypewriter:true}),
    new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'6A', isShow:false , text:"但林北實在累到快昏倒，天氣熱、腳又酸，偏偏這條街上可以休息德地方少的可憐餒", isTypewriter:true}),
    new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'6B', isShow:false ,text:"洗勒考喔！是在趕狗出去喔！", isTypewriter:true}),
    new Shared({x:mesterTalkX, y:mesterTalkY-630/4.5, w:2378/4.5, h:630/4.5, image: createImage('./images/occupys/talk/res.png'), isTalk:true, isEnlarge:false, multiple:1, name:'8', isShow:false ,text:"賀啦！也算是多虧這家店，林北才有地方休息，林北會盡量不影響其他人啦！", isTypewriter:true}),
    new Shared({x:canvas.width/2 - (3149/4.5)/2, y:canvas.height/2 - (482/4.5)/2, w:3149/4.5, h:485/4.5, image: createImage('./images/occupys/talk/9.png'), isTalk:true, isEnlarge:false, multiple:1, name:'9', isShow:false ,}),
    new Shared({x:canvas.width/2 - (112/2)/2 + 300, y:canvas.height/2 - (68/2)/2 + 20, w:112/2, h:68/2, image: createImage('./images/buttons/chk.png'), isEnlarge:false, multiple:1, name:'chk', isShow:false ,}),
]
const buttons = {
    close: new Button({x:(canvas.width - ( canvas.height*0.8*1.844 ))/2 + canvas.height*0.8*1.844 - 10,y:(canvas.height - canvas.height *0.8)/2 - 50, w:418/9, h:418/9, image: createImage('./images/buttons/close.png'), name:"close", multiple:1.05}),
    // in2f:  new Button({x: 3750, y:450, w:60, h:60, name:'in2f', isMove:true, image: createImage('./images/buttons/in2f.png'),}),
}

let isRoomOpen = false;

const roomOpen = {
    supermarket:false,
    occupy:false,
}

const keys = {
    right:{
        pressed:false
    },
    left:{
        pressed:false
    },
    up:{
        pressed:false
    }
}
let busRun = false;
let openAnim = null
let busSpeed = 10
openAnim = setInterval(()=>{
    if(backgruond.position.x <=  -935){
        if(busSpeed > 2 ){
            busSpeed = busSpeed - 0.05
        }
    }
    scrollOffset += busSpeed
    backgruond.position.x -= busSpeed
    
    player.position.x -= busSpeed
    interactions.forEach(item=>{
        item.position.x -= busSpeed
    })
    talks.forEach(talk=>{
        talk.position.x -= busSpeed
    })
    
    if(backgruond.position.x <= -2400){
        clearInterval(openAnim)
        scrollOffset = 0
        isStart = true
        bus.run = false
        
    }
    if(scrollOffset > -1500){
        busRun = true
        if(scrollOffset > -500){
            bus.divisor = 40
        }else{
            bus.divisor = 15
        }
        
    }
  
}, 0)

let busPos = 1.5
function animate(){
    window.requestAnimationFrame(animate)
    backgruond.draw()

    player.velocity.x = 0
    if((keys.right.pressed && player.position.x < 600) || (keys.right.pressed && scrollOffset>= 15400)){
        if(player.position.x < 1295){
            player.velocity.x = player.speed
        }
    }else if(keys.left.pressed && player.position.x >50){
        player.velocity.x = -player.speed
    }else{
        player.velocity.x = 0
        if(keys.right.pressed){
            scrollOffset += player.speed
            bus.position.x -= player.speed *0.66
            backgruond.position.x -= player.speed *0.66
            interactions.forEach(item=>{
                item.position.x -= player.speed *0.66
            })
            talks.forEach(talk=>{
                talk.position.x -= player.speed *0.66
            })
            
        }else if(keys.left.pressed){
            if(scrollOffset > 0){
                scrollOffset -=player.speed
                backgruond.position.x += player.speed *0.66
                bus.position.x += player.speed *0.66
                interactions.forEach(item=>{
                    item.position.x += player.speed *0.66
                })
                talks.forEach(talk=>{
                    talk.position.x += player.speed *0.66
                })
            }
        }
    }

    interactions.forEach(interaction=>{
        interaction.draw()
    })
    talks.forEach(talk=>{
        if(talk.show) talk.draw()
    })
    dynamics.forEach(dynamic=>{
        dynamic.draw()
    })

    bus.update()
    if(busRun){
       if(bus.position.x > -600){
        bus.position.x -= 1.6
       }
        
    }
    player.draw()
    player.update()

    if(roomOpen.supermarket && isRoomOpen){
        c.fillStyle = 'rgba(255,255,255,.5)'
        c.fillRect(0,0,canvas.width, canvas.height)
        supermarket.draw()
    }
    if(roomOpen.occupy && isRoomOpen){
        c.fillStyle = 'rgba(255,255,255,.5)'
        c.fillRect(0,0,canvas.width, canvas.height)
        occupy.draw()
        buttons.close.draw()
        occupys.forEach(occupy=>{
            if(occupy.show){
                occupy.draw()
            }
        })
        
    }
    
}

animate()

