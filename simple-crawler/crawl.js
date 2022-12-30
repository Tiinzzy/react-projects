const cheerio = require('cheerio');

const START_URL = "https://py4e-data.dr-chuck.net/known_by_Kasandra.html";
const MAX_LINK_PARSE = 3;
const MAX_DEPTH = 10;

let visitedNames = new Set();
visitedNames.add(getShortName(START_URL));

main();


// ------------------------------------------------------------
async function main() {
    await firstTenUrl(START_URL, 0);
}

// ------------------------------------------------------------
async function firstTenUrl(url, depth) {
    console.log("--".repeat(depth) + depth + " => " + getShortName(url));
    if (depth > MAX_DEPTH) {
        return;
    } else {
        let links;
        links = await getPageAnchors(url);
        for (let i = 0; i < Math.min(links.length, MAX_LINK_PARSE); i++) {
            url = links[i];
            depth += 1;
            let shortName = getShortName(url);
            if (visitedNames.has(shortName)) {
                console.log("SORRY ALREADY VISITED")    
            } else {
                visitedNames.add(shortName);
                await firstTenUrl(url, depth);
            }
            depth -= 1;
        }
    }
}

// ------------------------------------------------------------
async function getPageAnchors(url) {
    let pageContent = await getUrlContent(url);
    let links = await extractLinks(pageContent);
    return links;
}

// ------------------------------------------------------------
async function extractLinks(pageContent) {
    let $ = cheerio.load(pageContent);
    let links = [];
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

// ------------------------------------------------------------
function getShortName(url) {
    return url.replace('http://py4e-data.dr-chuck.net/known_by_', '').replace('.html', '');

}