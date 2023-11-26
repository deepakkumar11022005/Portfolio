let more_flag=0;
document.getElementById("more_id").addEventListener("click",()=>{
    if(more_flag==0){
        document.getElementById("after_click_more").style.display="flex"
        document.getElementById("after_click_more").innerHTML=` <div id="after_click_more_id" >
                    
    <a href="#">Home </a>
    <a href="#">About</a>
    <a href="#">Skill</a>
    <a href="#">Work</a>
    <a href="#">Contact</a>

</div>`
more_flag=1;

    }
    else{
        more_flag=0;
        document.getElementById("after_click_more").style.display="none"
    }
})


 const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("html_rank")
          
        }
        else{
            entry.target.classList.remove("html_rank")
            
        }
    })
 });
 const hiddenelements=document.querySelectorAll(".htmlrank_mover")
 hiddenelements.forEach((el)=>observer.observe(el));
  
 
 const observer2 = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("c_rank")
          
        }
        else{
            entry.target.classList.remove("c_rank")
            
        }
    })
 });
 const hiddenelements2=document.querySelectorAll(".crank_mover")
 hiddenelements2.forEach((el)=>observer2.observe(el));


 
 
 const observer3 = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("css_rank")
          
        }
        else{
            entry.target.classList.remove("css_rank")
            
        }
    })
 });
 const hiddenelements3=document.querySelectorAll(".cssrank_mover")
 hiddenelements3.forEach((el)=>observer3.observe(el));

 
 
 const observer4 = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("js_rank")
          
        }
        else{
            entry.target.classList.remove("js_rank")
            
        }
    })
 });
 const hiddenelements4=document.querySelectorAll(".jsrank_mover")
 hiddenelements4.forEach((el)=>observer4.observe(el));

 
 
 const observer5 = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("sql_rank")
          
        }
        else{
            entry.target.classList.remove("sql_rank")
            
        }
    })
 });
 const hiddenelements5=document.querySelectorAll(".sqlrank_mover")
 hiddenelements5.forEach((el)=>observer5.observe(el));

 
 
 const observer6 = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("java_rank")
          
        }
        else{
            entry.target.classList.remove("java_rank")
            
        }
    })
 });
 const hiddenelements6=document.querySelectorAll(".javarank_mover")
 hiddenelements6.forEach((el)=>observer6.observe(el));

 
 
 const observer7 = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("php_rank")
          
        }
        else{
            entry.target.classList.remove("php_rank")
            
        }
    })
 });
 const hiddenelements7=document.querySelectorAll(".phprank_mover")
 hiddenelements7.forEach((el)=>observer7.observe(el));

 document.getElementById("skillranking").style.display="none"