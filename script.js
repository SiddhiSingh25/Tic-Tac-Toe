let button = document.querySelectorAll(".box");
let reset = document.querySelector(".rst-btn");
let music = document.querySelector("#music");
let newBtn = document.querySelector("#new");
let congo = document.querySelector(".congrats");
let main = document.querySelector(".main");
let gameNm = document.querySelector(".game-name");
let turnO = true;
let count =0;
let patterns =[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];
const disable = () =>{
    for(let btn of button){
        btn.disabled = true;
    }
}
const enable = () =>{
    for(let btn of button){
        btn.disabled = false;
        btn.innerHTML ="";
    }}
const loss = ()=>{
    for(let btn of button){
        btn.disabled = false;
    }
    turnO = true;
}
const res = ()=>{
        turnO = true;
        enable();
        count = 0;
    }
button.forEach((val)=>{
    val.addEventListener("click", ()=>{
        count++;
        val.style.scale ="0.95";
        setTimeout(()=>{
            val.style.scale ="1";
            val.style.transition = "scale 0.4s linear ease-in";
        }, 300)
        if(turnO){
            val.innerHTML = "O";
            turnO = false;
        }
        else{
            val.innerHTML = "X";
            turnO = true;
        }
        val.disabled = true;
        checkWinner();
    });  
});
const checkWinner = () => {
    for( let pattern of patterns ){
        let pos1 = button[pattern[0]].innerHTML;
        let pos2 = button[pattern[1]].innerHTML;
        let pos3 = button[pattern[2]].innerHTML;
    if(pos1 != "" && pos2 != "" && pos3 != ""){
        if(pos1 === pos2 && pos2 === pos3){
         document.querySelector(".content").innerHTML = `CONGRATULAIONS, ${pos1}`;
         disable();
         anime();
         break;
    }
    if(count == 9 && pos1 != pos2 && pos2 != pos3 ){
        document.querySelector(".content").innerText = "Game is draw";
        disable();
        loss();
        anime();
    }
    }
}
}
let anime = ()=>{
    gsap.to(main, 
        {
            x :1000,
            delay : 0.7,
            duration :0.6
        })
    gsap.to(gameNm, 
        {
                x :-1000,
                delay : 0.7,
                duration :0.6
        })
    gsap.to(reset, 
        {
                    y : 140,
                    delay : 0.7,
                    duration :0.4
        })
    setTimeout( ()=>{
                main.style.display ="none";
                gameNm.style.display ="none";
                reset.style.display = "none";
                document.body.style.justifyContent ="Flex-start";
                gsap.to( congo, 
                    {
                        y: -700,
                        opacity:0
                    })                    
            },1300)
    setTimeout(()=>{
                congo.style.display = "flex";
                music.play();
                gsap.to(congo,
                    {
                        y:30,
                        delay : 0.2,
                        duration :0.6,
                        opacity : 1
                    })
            }, 1300)
};
let newFun = ()=>{
    gsap.to(congo,{
        y:-700,
        delay : 0.2,
        duration :0.6
    });
    music.pause();
    setTimeout(()=>{
        congo.style.display ="none";
        document.body.style.justifyContent ="Justify-around";
        gsap.to( main, 
            {
            x : 0,
            y:20,
            delay : 0.2,
            duration :0.9
            })  
        gsap.to(gameNm, 
            {
            x :0,
            y:10,
            delay : 0.2,
            duration :0.9
            })   
        gsap.to(reset, 
        {
            y : 50,
            delay : 0.2,
            duration :0.9
        })     
    },800)
    setTimeout(()=>{
        main.style.display ="flex";
        gameNm.style.display ="flex";
        reset.style.display = "flex";
        res();
    },800)
}
reset.addEventListener("click", res);
newBtn.addEventListener("click", newFun);