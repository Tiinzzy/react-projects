const express = require("express");
const dataServices = require("./data-services.js");

const PORT = process.env.PORT || 8888;

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);

  app.post("/save-csv", (req, res) => {
    console.log('Saving CSV');
    res.json(dataServices.saveCsv(req));
  })

  app.get("/get-all-data", (req, res) => {
    res.json(dataServices.getAllData(req));
  })

  app.post("/edit-data", (req, res) => {
    res.json(dataServices.editData(req));
  })
  
});
