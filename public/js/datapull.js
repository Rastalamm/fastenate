window.onload = function(){

  var httpRequest;

  if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
      httpRequest = new XMLHttpRequest();
  } else if (window.ActiveXObject) { // IE 6 and older
      httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
  }

  //All browsers
  httpRequest.onreadystatechange = function(){
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
          updateUI(httpRequest.responseText);
        } else {
          throw new Error('There was a problem with the request.');
        }
      }
  }


  httpRequest.open('GET', '../api/my_boards.json', true);
  httpRequest.send(null);

}
