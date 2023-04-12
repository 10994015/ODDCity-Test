const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width =16 * 90
canvas.height = 9 *90
c.fillStyle = "#fff"
c.fillRect(0,0,canvas.width, canvas.height)

let scrollOffset = 0

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
    imageSrc :'./images/bg.png',
})

const interactions = [
    new Interaction({x:460, y:480, w:140, h:218, name:'supermarket'}),
    new Interaction({x:755, y:177, w:457, h:262, name:'occupy'}),
]
const dynamics = [
]

const supermarket = new Room({image:createImage('./images/supermarket.png')});

//occupy
const occupy = new Room({image:createImage('./images/occupy.png')});
const occupys = [
    new Shared({x:235, y:500, w:134.784, h:40, image: createImage('./images/occupys/a1.png')}),
]


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

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = "#fff"
    c.fillRect(0,0,canvas.width, canvas.height)
    backgruond.draw()

    player.velocity.x = 0
    if((keys.right.pressed && player.position.x < 600) || (keys.right.pressed && scrollOffset>= 15400)){
        if(player.position.x < 1300){
            player.velocity.x = player.speed
        }
    }else if(keys.left.pressed && player.position.x >50){
        player.velocity.x = -player.speed
    }else{
        player.velocity.x = 0
        if(keys.right.pressed){
            scrollOffset += player.speed
            backgruond.position.x -= player.speed *0.66
            interactions.forEach(item=>{
                item.position.x -= player.speed *0.66
            })
            
        }else if(keys.left.pressed){
            if(scrollOffset > 0){
                scrollOffset -=player.speed
                backgruond.position.x += player.speed *0.66

                interactions.forEach(item=>{
                    item.position.x += player.speed *0.66
                })
            }
        }
    }

    interactions.forEach(interaction=>{
        interaction.draw()
    })
    dynamics.forEach(dynamic=>{
        dynamic.draw()
    })
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
        occupys.forEach(occupy=>{
            occupy.draw()
        })
    }
    
}

animate()

