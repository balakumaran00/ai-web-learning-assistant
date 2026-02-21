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
    
    <p>${infoData.result}</p>
    
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
    
    
    
    /* FORMAT LIKE CHATGPT */
    
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