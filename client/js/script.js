window.addEventListener("DOMContentLoaded", function(){
    document.getElementById("translate-button").addEventListener("click", getTranslation);
    document.getElementById("translate-button-mobile").addEventListener("click", getTranslation);
});

function getTranslation(){
    let url = "api/translate";

    let textToTranslate = document.getElementById("input-textarea").value;
    let targetLang = document.getElementById("input-lang").value;
    if(textToTranslate && textToTranslate.length > 0){
        url += "?to="+ targetLang;
        httpGetAsync(url, updateTranslation, textToTranslate);    
    }
}

function updateTranslation(httpRequest) {
    var res = httpRequest.responseText;
    var result = JSON.parse(res);
    var msg = res;
    if (result[0] != undefined && result[0].translations[0] != undefined)
    {
        msg = result[0].translations[0].text;
    }
      
    document.getElementById("translated-textarea").value = msg;
}

function httpGetAsync(url, callback,text){
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function(){
        if (httpRequest.readyState != 4) 
            return;
		if (httpRequest.status != 200 && httpRequest.status != 304) {
			console.error('HTTP error ' + httpRequest.status);
			return;
        }

        callback(httpRequest);
        
    }
    httpRequest.open('POST', url);
    let data = new FormData();
    data.append("text", text);
    httpRequest.send(data);
}
