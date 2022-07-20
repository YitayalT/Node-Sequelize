const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const hbs = require("handlebars");
const path = require("path");
const Client = require('../model/Client');

const compile = async function (templateName, data) {
  
  const filePath = path.join(process.cwd(), "views", `${templateName}.hbs`);
  const html = await fs.readFile(filePath, "utf8");
  // console.log(html);
  console.log( data);
  return hbs.compile(html)({ data: data });
};




exports.report = async (req, res) => {
    try {
 
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
       
         const client = await Client.findAll({raw: true}).then((result) => {
           console.log('Congratulations!');
           console.log(result);
          return content = compile('client_list', result);
         }).then((content) => {
           console.log('content', content);
           return page.setContent(content);
         }).then((resu) => {
          //  console.log(resu);
         }).catch((err) => {
            console.log(err);
         });
        // console.log('client',client)
 
        
 
      // console.log('content 2', content)

        // await page.setContent(content);
 
        await page.pdf({
            path: 'client.pdf',
            format: 'A4',
            printBackground: true
        })
 
        console.log("done creating pdf");
 
        await browser.close();
 
        process.exit();
        
    } catch (e) {
        console.log(e)
    };
}

exports.videoConference = (req, res) => {
  res.render("video_conference", {
    style: "style.css",
    script: "index.js",
  });
};
