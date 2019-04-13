main();

var
  quote,
  imgs,
  countLoadPctrs,
  countDrawPctrs;

function main() {
  quote = null;
  imgs = new Array();
  countLoadPctrs = 0;
  countDrawPctrs = 0;
  generateHTML();
  getPctrs();
  drawPctrs();
  getText();
  drawText();
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
      var link = document.createElement('a');

      link.href = canvas.toDataURL('image/jpg');
      link.download = 'quote.jpg';
      link.click();
    };

  div.appendChild(canvas);
  div.appendChild(download);
  body.appendChild(div);
}

function getPctrs() {
  for (var i = 0; i < 4; i++) {
    imgs[i] = new Image();
    imgs[i].crossOrigin = 'anonymous';
    a = (i + 5) * 100;
    imgs[i].src = 'https://source.unsplash.com/' + a + 'x' + a + '/?mountain';
    imgs[i].onload = function () {
      countLoadPctrs++;
    };
  }
}

function drawPctr(img, sx, sy, swidth, sheight, x, y, width, height) {
  var ctx = canvas.getContext('2d');

  ctx.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
  countDrawPctrs++;
}

function calcCoords(img, width, height) {
  if (width != height)
    if (width < height)
      return [img.naturalWidth * (0.5 - 0.5 / (height / width)), 0,
      img.naturalWidth / (height / width), img.naturalHeight]
    else
      return [0, img.naturalHeight * (0.5 - 0.5 / (width / height)),
        img.naturalWidth, img.naturalHeight / (width / height)]
  else
    return [0, 0, img.naturalWidth, img.naturalHeight]
}

function drawPctrs() {
  if (countLoadPctrs == 4) {
    var
      x = 0,
      y = 0,
      ox = 150 + Math.round(Math.random() * 250),
      oy = 150 + Math.round(Math.random() * 250),
      h = oy,
      par = [];

    for (var i = 0; i < 2; i++) {
      w = ox;
      par = calcCoords(imgs[i * 2], w, h);
      drawPctr(imgs[i * 2], par[0], par[1], par[2], par[3], x, y, w, h);
      x = ox;
      w = 600 - w;
      par = calcCoords(imgs[i * 2 + 1], w, h);
      drawPctr(imgs[i * 2 + 1], par[0], par[1], par[2], par[3], x, y, w, h);
      x = 0;
      y = oy;
      h = 600 - h;
    }

    var ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(0, 0, 600, 600);
  } else {
    setTimeout(drawPctrs, 1);
  }
}

function getText() {
  var http = new XMLHttpRequest;

  http.open('GET', 'https://cors-anywhere.herokuapp.com/' +
    'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru', true);
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(http.responseText);
      quote = JSON.parse(http.responseText)['quoteText'];
    }
  }
}

function formateStrings(context, text, x, y, maxWidth, lineHeight) {
  var
    words = text.split(" "),
    countWords = words.length,
    countStrs = Math.floor(context.measureText(text).width / 550),
    str = "";

  y -= countStrs * (lineHeight / 2);
  for (var n = 0; n < countWords; n++) {
    var
      tryStr = str + words[n] + " ",
      tryWidth = context.measureText(tryStr).width;

    if (tryWidth > maxWidth) {
      context.fillText(str, x, y);
      str = words[n] + " ";
      y += lineHeight;
    }
    else {
      str = tryStr;
    }
  }
  context.fillText(str, x, y);
}

function drawText() {
  if (quote != null && countDrawPctrs == 4) {
    var context = canvas.getContext('2d');

    context.fillStyle = 'azure';
    context.font = '22pt Segoe UI';
    context.textAlign = 'center';
    var x = canvas.width / 2,
      y = canvas.height / 2 + 11;

    formateStrings(context, quote, x, y, 550, 40);
  }
  else {
    setTimeout(drawText, 1);
  }
}