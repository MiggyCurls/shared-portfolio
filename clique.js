/*
    Javascript file to control functionality of website
    and website only. Make the website less boring and 
    show how creative you can be.
*/
document.getElementById('cli').addEventListener('keyup', function onEvent(e){
    if(e.key == 'Enter'){
        useCommandLine();
    }
});
async function useCommandLine(){
    const input = document.getElementById('cli');
    const val = input.value;
    const leftInd = val.indexOf('\\');
    let path;
    if(leftInd != -1){
        //rel path found inside
        path = val.substring(3, val.length);
        cdInto(path);
    }
    switch(val){
        case 'ls':
            //list files
            loading();
            await timeout(1250);
            cliReady();
            lsOutput();
            break;
        case 'cat classifiedDoc':
            //attempt to read secrets file
            catOutput();
            break;
        case 'cd Secrets':
            //change to Secrets directory
            cdInto('Secrets');
            break;
        case 'cd Users':
            //change to Users directory
            cdInto('Users');
            break;
        case 'cd userOne':
            //change to userOne directory
            cdInto('userOne');
            break;
        case 'cd ..':
            //Go back a directory
            cdBack();
            break;
        case 'cd ~':
            //Go to home directory
            cdInto('~');
            break;
        case 'cls':
            //clear screen
            clearTerminal();
            break;
        default:
            console.log('unrecognized command/option entered');
            break;
    }
}
function timeout(ms){
    return new Promise (resolve => setTimeout(resolve, ms));
}
async function catOutput(){
    const output = document.getElementById('commandOutput');
    clearTerminal();
    for(let i = 0; i < 5; i++){
        output.innerHTML += "<p class='outputText'> ACCESS DENIED !!!!!!!</p>";
        output.scrollTop = output.scrollHeight;
        await timeout(500);
    }
}
function cdBack(){
    //CD back a directory
    let path = document.getElementById('cliPath').innerText;
    const end = path.lastIndexOf("\\");
    if(end > 2){
        path = path.substring(0, end) + '>';
        document.getElementById('cliPath').innerText = path;
        document.getElementById('cli').value = '';
        clearTerminal();
    }else if(end == 2){
        document.getElementById('cliPath').innerText = 'C:\\>';
        document.getElementById('cli').value = '';
        clearTerminal();
    }else{
        console.log('cannot go further back');
    }
}
function cdInto(dir){
    //CD into a specific directory
    const path = document.getElementById('cliPath');
    const div = document.getElementById('commandOutput');
    const userInput = document.getElementById('cli');
    let str;
    userInput.value = '';
    div.innerHTML = '';
    if(dir == 'Secrets' && path.innerText == "C:\\Users\\userOne>"){
        path.innerText = "C:\\Users\\userOne\\Secrets>";
    }else if(dir == 'Users' && path.innerText == "C:\\>"){
        path.innerText = "C:\\Users>";
    }else if(dir == 'userOne' && path.innerText == "C:\\Users>"){
        path.innerText = "C:\\Users\\userOne>";
    }else if(dir == '~'){
        path.innerText = "C:\\>";
    }else if(dir == "Users\\userOne" && path.innerText == "C:\\>"){
        str = path.innerText.substring(0, path.innerText.length-1);
        path.innerText = (str + (dir + '>'));
    }else if(dir == "userOne\\Secrets" && path.innerText == "C:\\Users>"){
        str = path.innerText.substring(0, path.innerText.length-1);
        path.innerText = (str + '\\' + (dir + '>'));
    }else if(dir == "Users\\userOne\\Secrets" && path.innerText == "C:\\>"){
        path.innerText = ("C:\\" + dir + ">");
    }
}
function lsOutput(){
    const div = document.getElementById('commandOutput');
    const header = `<pre class='outputText'>Mode           LastWriteTime      Length  Name</pre>`;
    const path = document.getElementById('cliPath');
    let text = "<pre class='outputText'>";
    let footer;

    for (let i = 0; i < 46; i++){
        if(i <= 5 || (i >= 15 && i <= 28) || (i >= 34 && i <= 39) || i >= 42){
            text += "-";
        }else{
            text += " ";
        }
    }
    text += "</pre>";
    switch(path.innerText){
        case "C:\\Users\\userOne\\Secrets>":
            //show secrets
            footer = "<pre class='outputText'>-ar---       8/10/1999  1:25 PM   classifiedDoc</pre>";
            break;
        case "C:\\Users\\userOne>":
            //starting point
            footer = "<pre class='outputText'>d-----       8/10/1999  1:23 PM        Secrets</pre>";
            break;
        case "C:\\Users>":
            footer = "<pre class='outputText'>d-----       8/10/1999  1:22 PM        userOne</pre>";
            break;
        case "C:\\>":
            footer = "<pre class='outputText'>d-----       8/10/1999  1:20 PM          Users</pre>";
            break;
    }
    
    div.innerHTML = header + '\n' + text + footer;
}
function clearTerminal(){
    //Act as Cls in PowerShell
    document.getElementById('cli').value = '';
    document.getElementById('commandOutput').innerHTML = '';
}
function loading(){
    document.getElementById('cli').value = '...';
    document.getElementById('cli').setAttribute('readonly', true);
}
function cliReady(){
    document.getElementById('cli').removeAttribute('readonly');
    document.getElementById('cli').value = '';
}
function projHovers(){
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

function openDIR(elExcept){
    const elements = document.getElementsByClassName('textOptions');
    for(let i = 0; i < elements.length; i++){
        if(elements[i].id != elExcept){
            elements[i].style.display = 'none';
        }else if(elements[i].innerText.startsWith('>')){
            const title = elements[i].innerHTML;
            elements[i].innerHTML = title.substring(4, title.length) + ':';
            elements[i].style.margin = '1%';
        }
    }
    const cli = document.getElementById('cli');
    cli.style.display = 'none';
    const reverse = document.getElementById('reverse');
    reverse.style.display = 'initial';
    displayContent(elExcept);
}
function displayContent(element){
    let text;
    let div = document.getElementById('content');
    
    switch(element){
        case "openBio":
            text = writeBio();
            break;
        case "openProj":
            text = writeProj();
            break;
        case "openSkills":
            text = writeSkills();
            break;
        case "openSites":
            text = writeSites();
            break;
        default:
            //Weird error

    }
    div.innerHTML = text;
    projHovers();
    div.classList.add('textContent');
    div.style.fontSize = '30px';
    
}
function backButton(){
    window.location.href='index.html';
}

function writeBio(){
    const bio = `<p id="intro-paragraph" align="center">
    Computer Science student, <i>Miguel Gomez</i>, and Electrical Engineering student, 
    <i>Ian Rios</i>, have come together to showcase how our love for programming<br> can
    make this website and routinely add to it. This shows good initiative for
    both of us and acts as good practice to improve our knowledge of web<br>
    development; the cooperative nature of this website allows for our 
    creativity in our fields to come to fruition and work to accomplish what 
    we set our minds on.<br> <b>Version control</b> of this code will be down with <b>Git</b>
    and the Git provider to host our code (Remote repository) will be hosted 
    on <b>Github</b>.
    </p>`;
    return bio;
}

function writeProj(){
    const proj = `<div class="rowElements">
                    <div id="inProgress">
                        <div class="projects" id="loginDiv">
                            <h3>
                                Login Application
                            </h3>
                            <figure>
                                <img class="projectImages" src="ImageAssets/loginForm.png" onclick="window.location.href='LoginProject/loginIndex.html'" alt="Login form webpage">
                                <figcaption>The Login page will serve to implement/authenticate account registration</figcaption>
                            </figure>
                            <p class="projectText">
                                The login application will serve as a project to showcase our full stack development with 
                                tools and technologies that are widely used in the full stack development circle. For the
                                front-end part of the login application it will be a simple webpage displaying a username
                                and password field with a create account section if the end-user does not have an account
                                already created with the webpage. If the user wishes to create an account, they will be asked
                                to put in an email, username, and password where the information will be securely stored
                                and later referenced for authentication. The project should implement several tools and 
                                technologies like HTML, CSS, Javascript, Node.js, Express.js, SQLite. 
                            </p>
                        </div>
                        <div class="projects" id="calcDiv">
                            <h3>
                                Calculator app
                            </h3>
                            <figure>
                                <img class="projectImages" src="ImageAssets/calculatorBest.png" onclick="window.location.href='CalculatorProject/calcIndex.html'" alt="Simple calculator design">
                                <figcaption>The Calculator will have a cute design with simple functionality</figcaption>
                            </figure>
                            <p class="projectText">
                                The calculator will have a basic design (no high contrast colors) and will be styled
                                with techniques used in CSS. Special fonts and textures will be listed where they 
                                were downloaded and with their respective author. The calculator should be user-friendly
                                and allow for addition, subtraction, multiplication, division, and much more that can
                                be done with a standard calculator. Should be built with HTML, CSS, and Javascript.
                            </p>
                        </div>
                    </div>
                </div>`;
    return proj;
}

function writeSkills(){
    const skills = `<div class="rowElements">
                    <div id="MigSkills">
                        <h4 class="SkillTitle">
                            Miguel's Skills
                        </h4>
                        <ul>
                            <li>
                                Java
                                <img class="Icons" src="ImageAssets/javaIcon.png" alt="Java Icon">
                            </li>
                            <li>
                                Python
                                <img class="Icons" src="ImageAssets/pythonIcon.webp" alt="Python Icon">
                            </li>
                            <li>
                                C (Programming Language)
                                <img class="Icons" src="ImageAssets/CIcon.png" alt="C Icon">
                            </li>
                            <li>
                                SQL
                                <img class="Icons" src="ImageAssets/SQLIcon.png" alt="SQL Icon">
                            </li>
                            <li>
                                HTML
                                <img class="Icons" src="ImageAssets/HTMLIcon.png" alt="HTML Icon">
                            </li>
                            <li>
                                CSS
                                <img class="Icons" src="ImageAssets/CSSIcon.png" alt="CSS Icon">
                            </li>
                            <li>
                                Javascript
                                <img class="Icons" src="ImageAssets/JavascriptIcon.png" alt="Javascript Icon">
                            </li>
                        </ul>
                    </div>
                    <div id="IanSkills">
                        <h4 class="SkillTitle">
                            Ian's Skills
                        </h4>
                        <ul>
                            <li>
                                C
                                <img class="Icons" src="ImageAssets/CIcon.png" alt="C Icon">
                            </li>
                            <li>
                                C++
                                <img class="Icons" src="ImageAssets/CPlusPlusIcon.png" alt ="C++ Icon">
                            </li>
                            <li>
                                Java
                                <img class="Icons" src="ImageAssets/javaIcon.png" alt="Java Icon">
                            </li>
                            <li>
                                Javascript
                                <img class="Icons" src="ImageAssets/JavascriptIcon.png" alt="Javascript Icon">
                            </li>
                        </ul>
                    </div>
                </div>`;
    return skills;
}

function writeSites(){
    const sites = `<h4 id="contact">
                        Contact Information
                    </h4>
                    <table>
                        <tr>
                            <th>
                                LinkedIn
                                <img class="Icons" src="ImageAssets/LinkedInIcon.webp" alt="LinkedIn Icon">
                            </th>
                            <td><a href="https://www.linkedin.com/in/migg0m3z" target="_blank">Miguel Gomez</a></td>
                            <td><a href="https://www.linkedin.com/in/keanu-rios-de-sabato-0964a7223?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bn%2B4gpqZPQueqRLfps8pBVA%3D%3D" target="_blank">Ian Rios</a></td>
                        </tr>
                        <tr>
                            <th>
                                YouTube
                                <img class="Icons" src="ImageAssets/YouTubeIcon.png" alt="YouTube Icon">
                            </th>
                            <td><a href="http://www.youtube.com/@miggycurls9185" target="_blank">Miguel Gomez</a></td>
                            <td><a href="http://www.youtube.com/@lekooz2301" target="_blank">Ian Rios</a></td>
                        </tr>
                        <tr>
                            <th>
                                GitHub
                                <img class="Icons" src="ImageAssets/GitHubIcon.png" alt="GitHub Icon">
                            </th>
                            <td><a href="https://github.com/MiggyCurls" target="_blank">Miguel Gomez</a></td>
                            <td><a href="https://github.com/ichards" target="_blank">Ian Rios</a></td>
                        </tr>
                    </table>`;
    return sites;
}