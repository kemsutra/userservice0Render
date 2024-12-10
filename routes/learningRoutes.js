const express = require("express");
const router = express.Router();
const mockData = require("../mockdata/mockdata.js");

// Fetch all learning records for a specific language
router.get("/learnings/:language", (req, res) => {
  const { language } = req.params;
  const filteredData = mockData.filter(
    (record) => record.id_language === language
  );

  if (filteredData.length === 0) {
    return res
      .status(404)
      .json({ error: "No records found for this language" });
  }

  res.json(filteredData);
});

// Fetch a specific learning record by ID for a specific language
router.get("/learnings/:language/:id", (req, res) => {
  const { language, id } = req.params;
  const record = mockData.find(
    (record) =>
      record.id_language === language && record.id === parseInt(id, 10)
  );

  if (!record) {
    return res.status(404).json({ error: "Record not found" });
  }

  res.json(record);
});

module.exports = router;
