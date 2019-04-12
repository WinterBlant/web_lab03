main();

var
  quote,
  imgs,
  countLoadImgs,
  countDrawImgs;

function main() {
  quote = null;
  imgs = new Array();
  countLoadImgs = 0;
  countDrawImgs = 0;
  generateHTML();
  
}

function generateHTML() {
  var
    canvas = document.createElement('canvas'),
    body = document.getElementById('body'),
    download = document.createElement('button'),
    div = document.createElement('div');

  body.style.backgroundColor = 'beige';

  div.style.width = '100%';
  div.style.display = 'flex';
  div.style.flexDirection = 'column';
  div.style.alignItems = 'center';

  canvas.id = 'canvas';
  canvas.width = 600;
  canvas.height = 600;

  download.id = 'download';
  download.style.margin = '20px';
  download.style.padding = '10px';
  download.innerHTML = 'Download';
  download.style.backgroundColor = 'mediumpurple';
  download.style.color = 'azure';
  download.style.fontSize = '16px';
  download.onclick =
    function () {
      
    };

  div.appendChild(canvas);
  div.appendChild(download);
  body.appendChild(div);
}