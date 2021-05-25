
const showOverlay=(text)=>{
  overlay=document.getElementById('overlay')
  overlay.style.display='block'
 
    justifiedText=document.createElement('p')
  justifiedText.innerHTML=text
  overlay.children[0].appendChild(justifiedText)
  
  
  
}

$("#submitBtn").click(function(e) {
  
        var formText = document.getElementById("form-justify")[0];
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
  overlay=document.getElementById('overlay')
  overlay.style.display='none'
  overlay.children[0].removeChild(overlay.children[0].firstChild);
})