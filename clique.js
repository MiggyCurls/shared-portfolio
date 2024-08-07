/*
    Javascript file to control functionality of website
    and website only. Make the website less boring and 
    show how creative you can be.
*/

window.onload = function(){
    const projList = document.querySelectorAll('.projects');
    for(let i = 0; i < projList.length; i++){
        projList[i].addEventListener("mouseover", () => {
            for(let j = 0; j < projList.length; j++){
                if(projList[j] != projList[i]){
                    projList[j].classList.add("not-hovered");
                }else{
                    projList[j].style = 'box-shadow: 0px 10px 50px 5px grey';
                    projList[j].style.transform = 'scale(1.1)';
                    projList[j].style.transition = 'transform 1.05s ease-in-out';
                }
            }
        });
        projList[i].addEventListener("mouseout", () => {
            for(let j = 0; j < projList.length; j++){
                projList[j].classList.remove("not-hovered");
                projList[j].style = 'box-shadow:none';
            }
        })
    }
}
function projectOnHover(div){
    const others = document.getElementById('notProgress');
    div.onmouseover = function(){
        div.style = 'box-shadow: 0px 10px 50px 5px grey';
        //slowly phase in shadow
        //Look into keyframes to have shadow transition at same time as scale transform
        div.style.transform = 'scale(1.1)';
        div.style.transition = 'transform 1.05s ease-in-out';
        others.style.opacity = 0.5;
    };
    div.onmouseout = function(){
        div.style.transform = 'none';
        div.style = 'box-shadow:none';
        others.style.opacity = 1;
    };

}