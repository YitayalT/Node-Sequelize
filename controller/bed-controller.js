const Bed = require('../model/Bed');

exports.getBed = (req, res) => {
    res.render('bed', {
        style: 'style.css'
    });
}

exports.addBed = (req, res) => {
    
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
        });
        
    }).catch((err) => {
        console.log(err);
        return res.render("bed", {
          message: "something goes wrong. please try again!",
          style: "style.css",
          script: "index.js",
        });
    });

}