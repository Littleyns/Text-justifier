
const fermerPopup=()=>{
overlay=document.getElementById('overlay')
  overlay.style.display='none'
    document.getElementById('overlayContent').removeChild(document.getElementById('overlayContent').firstChild);
}
const showOverlay=(text)=>{
  overlay=document.getElementById('overlay')
  overlay.style.display='block'
 
    justifiedText=document.createElement('p')
  justifiedText.innerHTML=text
  document.getElementById('overlayContent').appendChild(justifiedText)
  
  
  
}

$("#submitBtn").click(function(e) {
  
        var formText = document.querySelector("#form-justify > textArea");
        console.log(formText)
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/justify',
            data: formText.value,
            processData: false,
            contentType: "text/plain",
            
        }).then(msg=>{
          
          showOverlay(msg)
          

        });
})
$("#overlay").click(e=>{
  if(e.target !== e.currentTarget) return;
  fermerPopup();
})
$("button[aria-label=Close]").click(e=>{
  
  fermerPopup();
})