var express = require("express");
var fs = require('fs');
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser')
var app = express();

const bdd=[] //contiendra des element email-token
const justify=function(text){
resultat=text.replace(/(\r\n|\n|\r)/gm, " ").split(' ').filter(f=>f!="") //on tout retire les saut de ligne
  resfinal=[]
  resfinal.push('')
  t=0
  for(let i =0;i<resultat.length;i++){
    if((resfinal[t].length+resultat[i].length)<=80){
      resfinal[t]+=resultat[i].trim()+" ";
    }else if(resultat[i].length>=80){
        resfinal[t]+=resultat[i].trim()+" ";
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
    nbespaceparmot=parseInt(nbespaces/(nbmot-1))
    resteespace=parseInt(nbespaces%(nbmot-1))
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

app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.text());
app.get('/',(req,res)=>{

  res.sendFile(process.cwd()+'/views/index.html')

})
app.post('/api/token',(req,res)=>{
  limit=req.body.limit
   res.clearCookie('token');
   res.clearCookie('remain');
  token=jwt.sign({
  data: req.body.mailInput
}, process.env['tokenpwd'], { expiresIn: 86400 });
/*jwt.verify(token, process.env['tokenpwd'], function(err, decoded) {
  console.log(decoded) // bar

});*/
bdd.push({'token':token,'mail':req.body.mailInput})
res.cookie('remain', limit, {expire: 86400000 + Date.now()})
res.cookie('token', token, {expire: 86400000 + Date.now()});
res.set('Content-Type', 'application/json')
res.send({"email":req.body.mailInput,"token":token}).status(200)

})
app.get('/clear', function(req, res){
   res.clearCookie('token');
   res.clearCookie('remain');
   res.redirect('/');
});
app.post('/api/justify',(req,res)=>{
textp=req.body
  nbwords=textp.split(' ').length
  if(req.cookies.remain-nbwords>0){
  
  res.set('Content-Type', 'text/plain')
  textp=justify(textp).join('</br>')
  res.cookie('remain', req.cookies.remain-nbwords, {expire: 86400000 + Date.now()})
  res.send(textp)
  res.status(200)
  }else{
    res.send(402)
  }
  
 
  
})
app.listen(3000, () => {
  console.log("listening on 3000")
})