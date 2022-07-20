const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const hbs = require("handlebars");
const path = require("path");
const Client = require('../model/Client');


const compile = async function (templateName, data) {
  const filePath = path.join(process.cwd(), "views", `${templateName}.hbs`);
  const html = await fs.readFile(filePath, "utf8");
  console.log(html);
  return hbs.compile(html)(data);
};



exports.report = async (req, res) => {
    try {
 
        const browser = await puppeteer.launch();
 
        const page = await browser.newPage();
 
        Client.findAll({raw: true}).then((result) => {
            console.log('Congratulations!');
         }).catch((err) => {
            console.log(err);
         });
        console.log(client)
 
        const content = await compile('client_list', client);
 
        console.log(content)

        await page.setContent(content);
 
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
