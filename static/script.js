async function generate() {

    const url = document.getElementById("url").value
    const task = document.getElementById("task").value
    
    if(!url){
    
    alert("Enter website URL")
    
    return
    
    }
    
    const output = document.getElementById("output")
    
    output.innerHTML = "Loading..."
    
    
    /* STEP 1 — WEBSITE INFO */
    
    const info = await fetch("/analyze",{
    
    method:"POST",
    
    headers:{
    "Content-Type":"application/json"
    },
    
    body:JSON.stringify({url:url})
    
    })
    
    const infoData = await info.json()
    
    
    
    let html = `
    
    <div class="result-box">
    
    <h2>About This Website</h2>
    
    <div class="chat-style">
    
    ${formatText(infoData.result)}
    
    </div>
    
    <br>
    
    <h2>What do you want to learn?</h2>
    
    <p>Enter a task above and click Generate Guide</p>
    
    </div>
    
    `
    
    
    
    /* STEP 2 — TASK GUIDE */
    
    if(task){
    
    const guide = await fetch("/guide",{
    
    method:"POST",
    
    headers:{
    "Content-Type":"application/json"
    },
    
    body:JSON.stringify({
    
    url:url,
    
    task:task
    
    })
    
    })
    
    const guideData = await guide.json()
    
    
    
    html += `
    
    <div class="result-box">
    
    <h2>Step-by-Step Guide</h2>
    
    ${formatSteps(guideData.result)}
    
    </div>
    
    `
    
    }
    
    
    
    output.innerHTML = html
    
    }
    
    
    
    /* CLEAN CHATGPT TEXT */
    
    function formatText(text){

        // Remove extra blank lines
        text = text.replace(/\n+/g,"\n")
        
        // Add spacing before numbered points
        text = text.replace(/[0-9]+\./g,match=>"<br><br>"+match)
        
        // Convert lines to HTML
        text = text.replace(/\n/g,"<br>")
        
        return text
        
        }
    
    
    /* FORMAT STEPS LIKE CHATGPT */
    
    function formatSteps(text){
    
    text = text.replace(/\n/g,"<br>")
    
    text = text.replace(/[0-9]+\./g,match=>"<br><br>"+match)
    
    return "<div class='chat-style'>"+text+"</div>"
    
    }
    
    
    
    /* SCROLL TO TOP BUTTON */
    
    function scrollToTop(){
    
    window.scrollTo({
    
    top:0,
    
    behavior:"smooth"
    
    })
    
    }
/* SLIDER */

const slider = document.getElementById("slider");
const dotsContainer = document.getElementById("dots");

if(slider){

const slides=document.querySelectorAll(".slide");

let index=0;


/* Create dots */

slides.forEach((_,i)=>{

const dot=document.createElement("span");

dot.onclick=()=>moveSlide(i);

dotsContainer.appendChild(dot);

});


updateDots();


function moveSlide(i){

index=i;

slider.style.transform=`translateX(${-index*280}px)`;

updateDots();

}


function updateDots(){

document.querySelectorAll(".dots span")

.forEach((d,i)=>{

d.classList.toggle("active",i===index)

})

}


/* AUTO SLIDE EVERY 3 SEC */

setInterval(()=>{

index++;

if(index>=slides.length) index=0;

moveSlide(index);

},3000);

}


/* AUTO FILL */

function fillExample(site,task){

document.getElementById("url").value=site;

document.getElementById("task").value=task;

window.scrollTo({

top:0,

behavior:"smooth"

});

}

/* FAQ DROPDOWN - WORKING VERS*/

function toggle(el){

    const text = el.nextElementSibling;
    
    if(text.style.display === "block"){
    
    text.style.display = "none";
    
    }
    else{
    
    text.style.display = "block";
    
    }
    
    }

    // CLEAN FAQ TOGGLE

document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {

        const answer = button.nextElementSibling;

        // Close other open answers
        document.querySelectorAll(".faq-answer").forEach(item => {
            if (item !== answer) {
                item.style.maxHeight = null;
            }
        });

        // Toggle current
        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
        } else {
            answer.style.maxHeight = answer.scrollHeight + "px";
        }

    });
});

/* PROFESSIONAL FAQ TOGGLE */

document.querySelectorAll(".faq-question").forEach(q => {

    q.onclick = () => {
    
    const card = q.parentElement;
    
    document.querySelectorAll(".faq-card").forEach(c=>{
    c.classList.remove("active")
    })
    
    card.classList.toggle("active")
    
    }
    
    })

    /* FAQ TOGGLE (WORKING VERSION) */

document.addEventListener("DOMContentLoaded", function () {

    const questions = document.querySelectorAll(".faq-question");
    
    questions.forEach(function(q){
    
    q.addEventListener("click", function(){
    
    const card = this.parentElement;
    
    card.classList.toggle("active");
    
    });
    
    });
    
    });