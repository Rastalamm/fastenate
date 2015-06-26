window.onload = function(){

  var contentHouse = document.getElementsByTagName('content-house')

  var articleHouse = document.createElement('div');
  articleHouse.setAttribute('class', 'article-house');
  contentHouse.appendChild(articleHouse);



  var imageDiv = document.createElement('div');
  imageDiv.setAttribute('class', 'article-pic');
  imageDiv.style.backgroundImage = GRABFROMOBJ;
  imageDiv.style.backgroundSize = 'cover';

  var image







  var HTTP_UNSENT = 0;
  var HTTP_OPENED = 1;
  var HTTP_HEADERS_RECV = 2;
  var HTTP_LOADING = 3;
  var HTTP_DONE = 4;
  var HTTP_STATUS_OK = 200;
  var HTTP_STATUS_NOT_FOUND = 404;
  var HTTP_STATUS_SERVER_ERROR = 500;
  var HTTP_GET = 'GET';
  var httpRequest;

  if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
      httpRequest = new XMLHttpRequest();
  } else if (window.ActiveXObject) { // IE 6 and older
      httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
  }

  httpRequest.open('GET', '../api/my_boards.json', true);
  httpRequest.send(null);

  httpRequest.onreadystatechange = function(){
      if (httpRequest.readyState === HTTP_DONE) {
        if (httpRequest.status === HTTP_STATUS_OK) {
          var res = JSON.parse(httpRequest.responseText);
          updateUI(res);
          console.log('res', res);
        } else {
          throw new Error('There was a problem with the request.');
        }
      }
  }

  function updateUI (pretendJson){
    var imageID;
    var imagey;

    for(var i = 0; i < 4; i++){
      imageID = document.getElementById('image' + i);
      console.log('here', imageID);

      imagey = pretendJson.data.children[i].data.url;
      imageID.style.backgroundImage = "url('" + imagey + "')";


  console.log(pretendJson.data.children[0].data.url);
    }




  }
}

