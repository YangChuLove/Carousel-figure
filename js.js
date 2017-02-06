/**
 * Created by Administrator on 2017/2/6.
 */
window.onload = function(){
    var container = document.getElementById("container");
    var list = document.getElementById("list");
    var buttons = document.getElementById("buttons").getElementsByTagName("span");
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");
    var index = 1;
    var animated = false;
    var interval = 3000;
    var timer = null;

    function showButtons(){
        for(var i = 0;i < buttons.length;i++){
            if(buttons[i].className == "on"){
                buttons[i].className = "";
                break;
            }
        }
        buttons[index-1].className = "on";
    }

    function animate(offSet){
        animated = true;
        var newLeft = parseInt(list.style.left) + offSet;
        var time = 500; // 位移总时间
        var interval = 10; // 位移间隔时间
        var speed = offSet/(time/interval); // 每次的位移量

        function go(){
            if((speed < 0 && parseInt(list.style.left) > newLeft) || (speed > 0 && parseInt(list.style.left) < newLeft)){
                list.style.left = parseInt(list.style.left) + speed + "px";
                setTimeout(go,interval);
            }else{
                animated = false;
                list.style.left = newLeft + "px";
                if(newLeft > -1024){
                    list.style.left = -5120 + "px";
                }
                if(newLeft < -5120){
                    list.style.left = -1024 + "px";
                }
            }
        }
        go();
    }

    function play(){
        timer = setTimeout(function(){
            next.onclick();
            play();
        },interval);
    }

    function stop(){
        clearTimeout(timer);
    }

    next.onclick = function(){
        if(animated){
            return;
        }
        if(index == 5){
            index = 1;
        }else{
            index ++;
        }
        showButtons();
        if(!animated){
            animate(-1024);
        }
    }

    prev.onclick = function(){
        if(animated){
            return;
        }
        if(index == 1){
            index = 5;
        }else{
            index --;
        }
        showButtons();
        if(!animated){
            animate(1024);
        }
    }

    for(var i = 0;i < buttons.length;i++){
        buttons[i].onclick = function(){
            if(this.className == "on"){
                return;
            }
            var myIndex = parseInt(this.getAttribute("index"));
            var offSet = -1024 * (myIndex - index);
            if(!animated){
                animate(offSet);
            }
            index = myIndex;
            showButtons();
        }
    }

    container.onmouseover = stop;
    container.onmouseout = play;
    play();
}