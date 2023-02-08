var HTMLParser = require('node-html-parser');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


function reqListener() {
    init(this.responseText);
}

const req = new XMLHttpRequest();
req.addEventListener("load", reqListener);
req.open("GET", "https://en.wikipedia.org/wiki/Jazz");
req.send();

// ------------------------------------------------------------------------------------------------

function init(html) {
    let fullHtml = html;
    var root = HTMLParser.parse(fullHtml);
    let totalDiv = root.getElementsByTagName('div');

    for (let i in totalDiv) {
        if (totalDiv[i].rawAttrs === 'class="mw-parser-output"') {
            console.log(totalDiv[i].innerHTML)
        }
    }

}