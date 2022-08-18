const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const hbs = require("handlebars");
const path = require("path");
const Client = require("../model/Client");
const Prescription = require('../model/Prescription');
const User = require('../model/User');

const compile = async function (templateName, result) {
  const filePath = path.join(process.cwd(), "views", `${templateName}.hbs`);
  const html = await fs.readFile(filePath, "utf8");
  // console.log(html);
//   console.log(data);
  return hbs.compile(html)({ result: result });
};

exports.report = async (req, res) => {
  try {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    const client = await Client.findAll({ raw: true })
      .then((result) => {
        console.log("Congratulations!");
        //  console.log(result);
        return (content = compile("client-report", result));
      })
      .then((content) => {
        //  console.log('content', content);
        return page.setContent(content);
      })
      .then((resu) => {
        //  console.log(resu);
      })
      .catch((err) => {
        console.log(err);
      });
    let rand = Math.random();
    // console.log('randome', rand);
    await page.pdf({
      path: `report${rand}.pdf`,
      format: "A4",
      printBackground: true,
    });

    console.log("done creating pdf");
    await browser.close();
    return res.render("video_conference", {
      style: "style.css",
      script: "index.js",
      message: "report is downloaded at USER-AUTH folder",
    });
  } catch (e) {
    console.log(e);
  }
};



exports.prescriptionReport = async (req, res) => {
  const token = await req.cookies["access-token"];
    try {
    const browser = await puppeteer.launch();
      let query = req.body.mrn;
    const page = await browser.newPage();
 
        const prescription = await Prescription.findAll({

            order: [["createdAt", "DESC"]],
            limit: 1,
          include: [
            {
              model: User,
            },
            {
              model: Client,
            },
            ],
            where: {
              MRN: query
          },
          raw: true,
        })
          .then((result) => {
            console.log("Congratulations!");
            //  console.log(result);
               res.render("new-prescription", {
                 style: "style.css",
                 script: "index.js",
                 result: result,
                 token: token,
                 message: "report is downloaded at USER-AUTH folder",
               });
            return (content = compile("prescription-report", result));
          })
          .then((content) => {
            //  console.log('content', content);
            return page.setContent(content);
          })
          .then((resu) => {
            //  console.log(resu);
          })
          .catch((err) => {
            console.log(err);
          });

    let rand = Math.random();
    // console.log('randome', rand);
    await page.pdf({
      path: `report/prescription${rand}.pdf`,
      format: "A4",
      printBackground: true,
    });

    console.log("done creating pdf");
    await browser.close();
    
  } catch (e) {
    console.log(e);
  } 
    
}
