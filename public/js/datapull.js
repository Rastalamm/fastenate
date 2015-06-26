window.onload = function(){

  var contentHouse = document.querySelector('.content-house')
  var dataPermalink;
  var image;
  var title;
  var author;
  var views;
  var creation;
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

  var myBoardsClick = function (){
    contentHouse.innerHTML = "";
    httpRequest.open('GET', '../api/my_boards.json', true);
    httpRequest.send(null);
  }

  var randomClick = function (){
    contentHouse.innerHTML = "";
    httpRequest.open('GET', '../api/random.json', true);
    httpRequest.send(null);
  }

  var getTheAppClick = function (){
    contentHouse.innerHTML = "";
    httpRequest.open('GET', '../api/get_the_app.json', true);
    httpRequest.send(null);
  }


  document.querySelector('#random-nav').addEventListener('click', myBoardsClick);
  document.querySelector('#my-boards-nav').addEventListener('click', randomClick);
  document.querySelector('#get-the-app').addEventListener('click', getTheAppClick);


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

        for (var i = 0; i < res.data.children.length; i++) {

          dataPermalink = res.data.children[i].data.permalink;
          image = res.data.children[i].data.url;
          title = res.data.children[i].data.title;
          author = res.data.children[i].data.author;
          creation = res.data.children[i].data.created_utc;
          views = res.data.children[i].data.score;

          dataGrabCreate(dataPermalink, image, title, author, creation, views)
        };

        console.log('res', res);
      } else {
        throw new Error('There was a problem with the request.');
      }
    }
  }

  function dataGrabCreate(dataPermalink, image, dataTitle, author, creation, views){

    var linkOut = document.createElement('a');
    linkOut.setAttribute('href', 'http://www.reddit.com' + dataPermalink );
    linkOut.setAttribute('target', '_blank' + dataPermalink );
    contentHouse.appendChild(linkOut);

    var articleHouse = document.createElement('div');
    articleHouse.setAttribute('class', 'article-house');
    linkOut.appendChild(articleHouse);

    var articlePic = document.createElement('div');
    articlePic.setAttribute('class', 'article-pic');
    articlePic.style.backgroundImage = image;
    articlePic.style.backgroundSize = 'cover';
    articleHouse.appendChild(articlePic);

    var articlePicImage = document.createElement('img');
    articlePicImage.setAttribute('src', image);
    articlePicImage.setAttribute('opacity', '0');
    articlePicImage.setAttribute('width', '275px');
    articlePicImage.setAttribute('height', '170px');
    articlePic.appendChild(articlePicImage)

    var title = document.createElement('h1');
    title.innerHTML = dataTitle;
    articleHouse.appendChild(title);

    var ulListStart = document.createElement('ul');
    articleHouse.appendChild(ulListStart);

    var authorList = document.createElement('li');
    authorList.innerHTML = author;
    ulListStart.appendChild(authorList);

    var ageList = document.createElement('li');
    ageList.innerHTML = moment(creation, "DD").fromNow();
    ulListStart.appendChild(ageList);

    var viewsList = document.createElement('li');
    viewsList.innerHTML = (views + ' views');
    ulListStart.appendChild(viewsList);

    var description = document.createElement('p');
    description.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus ipsam, facilis suscipit maiores nostrum pariatur.'
    articleHouse.appendChild(description);
  }
}

