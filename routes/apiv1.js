import express from 'express';
// const fetch = require("node-fetch");
// const { parser } = require("node-html-parser");
import parser from "node-html-parser";
import fetch from "node-fetch";

var router = express.Router();

// Helper funcations


function descriptionHtml(description){
    if(description){
        return `<p>${description}</p>`
    }else {
        return ""
    }
}

function localeHtml(localeInput){
    if(localeInput){
        return `<p>${localeInput}</p>`
    }else {
        return ""
    }
}


function titleHtml(titleInsert){
    if(titleInsert){
        return `<p><strong>${titleInsert}</strong></p>`;
    }else {
        return "";
    }
}

function imageHtml(imgSource){
    if(imgSource){
        return `<img src=${imgSource}>`;
    }else {
        return "";
    }
}

function urlHtml(htmlURL, title, imgSource){
    if(htmlURL){
        return `
        <a href=${htmlURL}>
        ${titleHtml(title)}
        ${imageHtml(imgSource)}
        </a>`;
    }else {
        return "";
    }
}


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/urls/preview", async (req, res) => {
    let url = req.query.url;
    // console.log(url);

    try{
        let webFetch = await fetch(url);
        let pageText = await webFetch.text();
        let fetchHTML = parser.parse(pageText);

        console.log(fetchHTML);

        let metaTitle = fetchHTML.querySelector('meta[property="og:title"]')?.getAttribute('content');
        let metaUrl = fetchHTML.querySelector('meta[property="og:url"]')?.getAttribute('content') || url;
        let metaImg = fetchHTML.querySelector('meta[property="og:image"]')?.getAttribute('content') || null;
        let metaDesc = fetchHTML.querySelector('meta[property="og:description"]')?.getAttribute('content') || null;

        // console.log("Title" + metaTitle);
        // console.log("URL" + metaUrl);
        // console.log("Image" + metaImg);
        // console.log("Description" + metaDesc);

        

        // <meta name="og:locale" content="en-US">
        // https://www.porsche.com/usa/
        let metaLocale = fetchHTML.querySelector('<meta[name="og:locale"]')?.getAttribute('content') || null;

        let title = metaTitle; 
        if (!title) {
            const htmlTitle = fetchHTML.querySelector('title')?.text;
            title = htmlTitle || url;  // If <title> tag is also missing, fall back to the URL as the title
        }

        let htmlCombine = `<div>
                ${urlHtml(metaUrl, title, metaImg)}
                ${descriptionHtml(metaDesc)}
                ${localeHtml(metaLocale)}
            </div>`;

        // ${localeHtml(metaLocale)}

        console.log(htmlCombine);

        res.type("html");
        res.send(htmlCombine);


    }catch(err){
        console.log(err);
        res.send(err);

    }

});

export default router;
