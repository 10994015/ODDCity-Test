const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width =16 * 90
canvas.height = 9 *90


let scrollOffset = -3645

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
    new Interaction({x:2889, y:481, w:142, h:218, name:'supermarket'}),
    new Interaction({x:3176, y:177, w:440, h:262, name:'occupy'}),
    new Interaction({x:4010, y:177, w:375, h:262, name:'hoard'}),
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
let openAnim = null
openAnim = setInterval(()=>{
    scrollOffset += player.speed
    backgruond.position.x -= player.speed *0.66
    player.position.x -= player.speed *0.66
    interactions.forEach(item=>{
        item.position.x -= player.speed *0.66
    })
    if(backgruond.position.x <= -2400){
        console.log(scrollOffset);
        clearInterval(openAnim)
    }
}, 20)


function animate(){
    window.requestAnimationFrame(animate)
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

