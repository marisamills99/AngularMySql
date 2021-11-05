const Module = require("../models/module.model.js");
const mysql = require("mysql");

const InputModule = function(currmodule) {
  this.Input_Filename = currmodule.Input_Filename;
  this.Input_Notes = currmodule.Input_Notes;
  this.Input_ID = currmodule.Input_ID;
 
};
// Retrieve all Modules from the database.
exports.findAll = (req, res) => {
  Module.getAll( (err, data) => {
    if (err){
      console.log("Some error occurred while retrieving Modules.");
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Modules."
      });
    }
    else res.send(data);
  });
};
// Retrieve all Modules from the database.
exports.findIn = (req, res) => {
  Module.getInput( (err, data) => {
    if (err){
      console.log("Some error occurred while retrieving Module Input table.");
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Module Input table."
      });
    }
    else res.send(data);
  });
};
// Retrieve all Modules from the database.
exports.findOut = (req, res) => {
  Module.getOutput( (err, data) => {
    if (err){
      console.log("Some error occurred while retrieving Module Output table.");
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Module Output table."
      });
    }
    else res.send(data);
  });
};
exports.findAnalysts = (req, res) => {
  Module.getAnalysts( (err, data) => {
    if (err){
      console.log("Some error occurred while retrieving analysts table.");
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving analysts table."
      });
    }
    else res.send(data);
  });
};
exports.findWorkflow = (req, res) => {
  Module.getWorkflow( (err, data) => {
    if (err){
      console.log("Some error occurred while retrieving workflow table.");
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving workflow table."
      });
    }
    else res.send(data);
  });
};
exports.findWorkflowPath = (req, res) => {
  Module.getWorkflowPath( (err, data) => {
    if (err){
      console.log("Some error occurred while retrieving workflow path table.");
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving workflow path table."
      });
    }
    else res.send(data);
  });
};
exports.findExec = (req, res) => {
  Module.getExec( (err, data) => {
    if (err){
      console.log("Some error occurred while retrieving exec table.");
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving exec table."
      });
    }
    else res.send(data);
  });
};
exports.findNotes = (req, res) => {
  Module.getNotes( (err, data) => {
    if (err){
      console.log("Some error occurred while retrieving notes table.");
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving notes table."
      });
    }
    else res.send(data);
  });
};
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Module
  const newmodule = new Module({
    //Module ID	Module Name	Description	Purpose	Module Category	Last Build	Last Execution	ksh(s)
    Module_Id: req.body.Module_Id,
    ModuleName: req.body.ModuleName,
    DescrName: req.body.DescrName,
    Purpose: req.body.Purpose,
    ModuleCategory: req.body.ModuleCategory,
    LastBuild: req.body.LastBuild,
    LastExecuted: req.body.LastExecuted,
    Nbr_ksh: req.body.Nbr_ksh
  });

  // Save Module in the database
  Module.create(newmodule, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Module."
      });
    else res.send(data);
  });
};
exports.createNew = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }


  // Save Module in the database
  Module.createNew(req.body.query, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Module."
      });
    else res.send(data);
  });
};
exports.findbyModuleId = (req, res) => {

  Module.getModuleId(req.params.module_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Module with id ${req.params.module_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Module with id " + req.params.module_id
        });
      }
    } else res.send(data);
  });
};

//Remove a module from table with specified id
exports.delete = (req, res) => {
  str = JSON.stringify(req.params, null, 4);
  console.log("THE PARAMS ARE "+str)
  Module.remove(req.params.module_id, req.params.table_name,(err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Module with id ${req.params.module_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Module with id " + req.params.module_id
        });
      }
    } else res.send({ message: `Module was deleted successfully!` });
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
 
  Module.updateById(
    req.params.module_id,
    new Module(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Module with id ${req.params.module_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Module with id " + req.params.module_id
          });
        }
      } else res.send(data);
    }
  );
};
exports.updateAny = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  Module.updateByAnyId(
    req.params.module_id,
    req.body.query,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Module with id ${req.params.module_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Module with id " + req.params.module_id
          });
        }
      } else res.send(data);
    }
  );
};
exports.updateInputs = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  Module.updateByInputId(
    req.params.module_id,
    new InputModule(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Module with id ${req.params.module_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Module with id " + req.params.module_id
          });
        }
      } else res.send(data);
    }
  );
};