module.exports = app => {
  const modules = require("../controllers/module.controller.js");

  // Retrieve all modules
  app.get("/modules", modules.findAll);
  app.get("/module_input", modules.findIn);
  app.get("/module_output", modules.findOut);
  app.get("/workflow", modules.findWorkflow);
  app.get("/analysts", modules.findAnalysts);


};