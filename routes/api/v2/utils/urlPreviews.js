import fetch from 'node-fetch';
import * as cheerio from 'cheerio'
import parser from 'node-html-parser';

const escapeHTML = str => String(str).replace(/[&<>'"]/g, 
    tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag]));


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

//something for security

async function getURLPreview(url){
    try{
        let webFetch = await fetch(url);
        let pageText = await webFetch.text();
        let fetchHTML = parser.parse(pageText);


        //Did both methods
        let safeInput = cheerio.load(fetchHTML)
        // let safeInput = escapeHTML(fetchHTML);

        // console.log(fetchHTML);

        let metaTitle = safeInput.querySelector('meta[property="og:title"]')?.getAttribute('content');
        let metaUrl = safeInput.querySelector('meta[property="og:url"]')?.getAttribute('content') || url;
        let metaImg = safeInput.querySelector('meta[property="og:image"]')?.getAttribute('content') || null;
        let metaDesc = safeInput.querySelector('meta[property="og:description"]')?.getAttribute('content') || null;

        // console.log("Title" + metaTitle);
        // console.log("URL" + metaUrl);
        // console.log("Image" + metaImg);
        // console.log("Description" + metaDesc);

        

        // <meta name="og:locale" content="en-US">
        // https://www.porsche.com/usa/
        let metaLocale = safeInput.querySelector('<meta[name="og:locale"]')?.getAttribute('content') || null;

        let title = metaTitle; 
        if (!title) {
            const htmlTitle = safeInput.querySelector('title')?.text;
            title = htmlTitle || url;  // If <title> tag is also missing, fall back to the URL as the title
        }

        let htmlCombine = `<div>
                ${urlHtml(metaUrl, title, metaImg)}
                ${descriptionHtml(metaDesc)}
                ${localeHtml(metaLocale)}
            </div>`;

        // ${localeHtml(metaLocale)}

        //console.log(htmlCombine);

        // res.type("html");
        // res.send(htmlCombine);

        return htmlCombine;


    }catch(err){
        //console.log(err);
        // res.send(err);

        return htmlCombine;

    }
}



export default getURLPreview;