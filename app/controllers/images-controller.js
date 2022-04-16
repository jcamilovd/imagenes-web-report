const db = require("../db/mysql");

let consultImages = (req, res) => {
  db.consultImages(req.query)
    .then((result) => {
      return res.download(`./images/${result[0].url}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

let uploadImage = (req, res) => {
  let documentReportId = req.body.id;
  let url = "defaultDocumentReport.png";

  if (req["files"]) {
    url = `${documentReportId}DocumentReport.png`;
    req["files"].files.mv(`./images/${url}`, function (err) {
      if (err) console.log(err);
    });
  }

  db.uploadImages({ documentReportId, url })
    .then((result) => {
      return res.status(201).json({ Status: "Upload ok", up: true });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  consultImages,
  uploadImage,
};