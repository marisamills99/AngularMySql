module.exports = app => {
  const modules = require("../controllers/module.controller.js");

  // Retrieve all tables
  app.get("/modules", modules.findAll);
  app.get("/module_input", modules.findIn);
  app.get("/module_output", modules.findOut);
  app.get("/workflow", modules.findWorkflow);
  app.get("/analysts", modules.findAnalysts);
  app.get("/modules/:module_id", modules.findbyModuleId);
  app.get("/workflowpath", modules.findWorkflowPath);
  app.get("/notes", modules.findNotes);
  app.get("/exec", modules.findExec);
  //add to module table
  app.post("/modules", modules.create);
  app.post("/any", modules.createNew);
  //delete from module table
  app.delete("/modules/:module_id/:table_name", modules.delete);
  // Update a Module with given id
  app.put("/modules/:module_id", modules.update);
  app.put("/module_input/:module_id", modules.updateInputs);
  app.put("/any/:module_id", modules.updateAny);
};