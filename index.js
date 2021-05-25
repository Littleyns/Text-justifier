var express = require("express");
var fs = require('fs');
var bodyParser = require('body-parser')
var app = express();

const justify=function(text){
resultat=text.replace(/(\r\n|\n|\r)/gm, "").split(' ') //on tout retire les saut de ligne
  resfinal=[]
  resfinal.push('')
  t=0
  for(let i =0;i<resultat.length;i++){
    if((resfinal[t].length+resultat[i].length)<=80){
      resfinal[t]+=resultat[i]+" ";
    }else if(resultat[i].length>=80){
        resfinal[t]+=resultat[i]+" ";
    resfinal.push('')
    t++
    }else{
    resfinal.push('')
    t++
    i-=1
    }
  }
  for(let i =0;i<resfinal.length;i++){
    mots=resfinal[i].trim().split(' ')
    nbmot=mots.length
    nbespaces=81-resfinal[i].length
    nbespaceparmot=nbespaces/(nbmot-1)
    resteespace=nbespaces%(nbmot-1)
    finalLine=""
    for(let j =0;j<nbmot;j++){
      if(j==nbmot-1  ){
        finalLine+=mots[j]
      }else if(i==resfinal.length-1){
        finalLine=finalLine+mots[j]+"&nbsp"
      }else{finalLine+=mots[j]+"&nbsp"+"&nbsp".repeat(nbespaceparmot)
      }
      
      if(resteespace>0 && i!=resfinal.length-1){
        finalLine+="&nbsp"
        resteespace--
      }
    }
    resfinal[i]=finalLine.trim()
  }
  
  return resfinal
}
app.use(express.urlencoded({extended: true}))
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.text());
app.get('/',(req,res)=>{
  res.sendFile(process.cwd()+'/views/index.html')
})
app.post('/api/justify',(req,res)=>{
  textp=req.body
  res.set('Content-Type', 'text/plain')
  textp=justify(textp).join('</br>')
  console.log(textp)
  res.send(textp)
  res.status(200)
  
 
  
})
app.listen(3000, () => {
  console.log("lol")
})