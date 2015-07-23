var containerAnimation = document.getElementById('animationLoadDataCanvas');
var animationMorePostInterval;

function morePostAnimation(){ 
    containerAnimation.style.display = "block";
    animationMorePostInterval = setInterval(animationLoop, 1000/55);
}

function animationLoop(){
    if (!flagAnimation) {
        clearInterval( animationMorePostInterval );
        setTimeout(function(){
            containerAnimation.style.display = "none";
            successGetPostByCategoryRequest();
        },2000)
    }else if (!buttonMorePost) {
        clearInterval( animationMorePostInterval );
        setTimeout(function(){
            successGetPostByCategoryRequest();
            document.getElementById("morePostButtonContainer").hidden = true;
        },2000);        
    };
}