function translate() {
  var text= document.getElementById('translate_from').value;
  window.mycallback = function(response) {
  document.getElementById('inputstr').innerHTML="<h6>" + document.getElementById('langpairFROM')[document.getElementById('langpairFROM').selectedIndex].text + "</h6><h3>" + document.getElementById('translate_from').value + "</h3>";
  document.getElementById('translate_to').innerHTML="<h6>" + document.getElementById('langpairTO')[document.getElementById('langpairTO').selectedIndex].text + "</h6><h3>" + response + "</h3>";
}

var languageFrom = document.getElementById("langpairFROM").value;
var languageTo = document.getElementById("langpairTO").value;
var s = document.createElement("script");
s.src = "http://api.microsofttranslator.com/V2/Ajax.svc/Translate?oncomplete=mycallback&appId=68D088969D79A8B23AF8585CC83EBA2A05A97651&from=" + languageFrom + "&to=" + languageTo + "&text=" + text;
document.getElementsByTagName("head")[0].appendChild(s);
}
