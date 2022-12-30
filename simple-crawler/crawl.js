const cheerio = require('cheerio');

main();

// ------------------------------------------------------------
async function main() {
    // const links = await getPageAnchors("https://www.kindacode.com/article/how-to-get-all-links-from-a-webpage-using-node-js/");    
    // console.log(links);    

    let links;
    startUrl = "https://py4e-data.dr-chuck.net/known_by_Kasandra.html";
    let lookForwardIndex = 18

    console.log("-> " + startUrl);
    for (let i = 0; i < 7; i++) {
        links = await getPageAnchors(startUrl);
        startUrl = links[lookForwardIndex - 1];
        console.log("-".repeat(i + 1) + "> " + startUrl);
    }
}

// ------------------------------------------------------------
async function getPageAnchors(url) {
    const pageContent = await getUrlContent(url);
    const links = await extractLinks(pageContent);
    return links;
}

// ------------------------------------------------------------
async function extractLinks(pageContent) {
    const $ = cheerio.load(pageContent);
    const links = [];
    $('a').each((index, element) => {
        links.push($(element).attr('href'));
    });
    return links;
}

// ------------------------------------------------------------
async function getUrlContent(url) {
    return await fetch(url)
        .then(async function (response) {
            return await response.text();
        })
        .then(function (pageContent) {
            return pageContent;
        })
        .catch(function (error) {
            console.log(error)
            return ""
        });
}

