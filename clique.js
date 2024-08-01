/*
    Javascript file to control functionality of website
    and website only. Make the website less boring and 
    show how creative you can be.
*/

window.onload = function(){
    const div = document.getElementById('calcDiv');
    projectOnHover(div);
}
function projectOnHover(div){
    const others = document.getElementById('notProgress');
    div.onmouseover = function(){
        console.log('mouse over image');
        div.style = 'box-shadow: 0px 10px 50px 5px grey';
        //slowly phase in shadow
        //Look into keyframes to have shadow transition at same time as scale transform
        div.style.transform = 'scale(1.1)';
        div.style.transition = 'transform 1.05s ease-in-out';
        others.style.opacity = 0.5;
    };
    div.onmouseout = function(){
        console.log('mouse not over image');
        div.style.transform = 'none';
        div.style = 'box-shadow:none';
        others.style.opacity = 1;
    };

}