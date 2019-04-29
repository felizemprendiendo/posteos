var codigos={}
var busqueda=document.querySelector("button")
var ingreso=document.querySelector("input")
var alerta=document.getElementById("alerta")


var wV=window.visualViewport
var cuerpo=document.querySelector("body")
var cS=document.getElementById("container")

function cR(){
    cS.style.width=wV.width>wV.height?wV.height*0.80+"px":wV.width*0.80+"px"
    cS.style.marginTop=(wV.height-cS.clientHeight)/2+"px"
    cS.style.marginLeft=(wV.width-cS.clientWidth)/2+"px"
    cuerpo.style.width=(wV.width*0.0026+94.607)+"vw"
}

//---------------------------------
cR()
window.onresize=cR
//FUNCIONES
//----> Creando la alerta
function alertContent(text){
    console.log("entro a alert")
    alerta.style.visibility=text?"visible":"hidden"
    alerta.textContent=text
}

//--->Manejando la busqueda
window.onkeypress=function(e){
 if(e.keyCode==13){
    var valor=ingreso.value.toLowerCase()
    if(valor==""){
        //Check Si el input tiene valor
        alertContent("Debes introducir un codigo")
    } else if(codigos.hasOwnProperty(valor)){

        //Check Si el codigo existe
        window.location=codigos[valor]
    }else{
        alertContent("No es un codigo correcto")
    }
 }
}

//--->Manejando el ingreso
ingreso.oninput=function(){

    if(ingreso.value!=""){
        alertContent("")
    }
}


var fnName1='getCodigos'
var docId="1VWTsZuHcBcJMaoXtdcEsd6lleSJbpmV7xvnYsSahIrA"

function getCodigos(data){
    data.feed.entry.map(function(obj){
        codigos[obj.gsx$codigo.$t.toLowerCase()]=obj.gsx$link.$t
    })
}
//Pido los codigos
$.ajax({
    url:`https://spreadsheets.google.com/feeds/list/${docId}/1/public/values?alt=json-in-script&callback=${fnName1}`,
    dataType:"jsonp",
    jsonpCallback:`${fnName1}`
})



