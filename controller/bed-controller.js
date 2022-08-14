const Bed = require('../model/Bed');

exports.getBed = async (req, res) => {
  const token = await req.cookies["access-token"];
    res.render('bed', {
      style: 'style.css',
      token: token
    });
}

exports.addBed = async (req, res) => {
    const token = await req.cookies["access-token"];
    let bedData = {
      bedNo: req.body.bedNumber,
      dormNo: req.body.dormNumber,
      blockName: req.body.blockName,
      status: req.body.status,
    };
    Bed.create(bedData).then((result) => {
        return res.render("bed", {
          message: "bed details are added successfully!",
          style: "style.css",
          script: "index.js",
          token: token
        });
        
    }).catch((err) => {
        console.log(err);
        return res.render("bed", {
          message: "something goes wrong. please try again!",
          style: "style.css",
          script: "index.js",
          token: token
        });
    });

}