const fs = require("fs");
const path = require("path");

const filePath = path.join('./src/data', "rss-data.json");

const saveToFile = (data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data))
    return true
       
  } catch (err) {
    console.error("Failed to save file:", err.message);
    throw err;
  }
};

module.exports = { saveToFile };