const mysql = require("mysql2");
const connection =  require("./db");
connection.on('connection', function (_conn) {
  if (_conn) {
      console.log('Connected the database via threadId '+ _conn.threadId);
      _conn.query('SET SESSION auto_increment_increment=1');
  }
});


// constructor
const Module = function(currmodule) {
  this.Module_Id = currmodule.Module_Id;
  this.ModuleName = currmodule.ModuleName;
  this.DescrName = currmodule.DescrName;
  this.Purpose= currmodule.Purpose,
  this. ModuleCategory= currmodule.ModuleCategory,
  this.LastBuild= currmodule.LastBuild,
  this.LastExecuted= currmodule.LastExecuted,
  this.Nbr_ksh= currmodule.Nbr_ksh
};



Module.getAll = result => {
  
  connection.query("SELECT * FROM Modules", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("module: ", res);
    result(null, res);
    
  });

};

Module.getInput = result => {
  
  connection.query("SELECT * FROM Module_Input", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("module_input: ", res);
    result(null, res);
    
  });

};
Module.getOutput = result => {
  
  connection.query("SELECT * FROM Module_Output", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("module: ", res);
    result(null, res);
    
  });
  
};
Module.getAnalysts = result => {
  
  connection.query("SELECT * FROM Analysts", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("analysts: ", res);
    result(null, res);
    
  });
  
};
Module.getWorkflow = result => {
  
  connection.query("SELECT * FROM Workflow", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("workflow: ", res);
    result(null, res);
    
  });
  
};
Module.getWorkflowPath = result => {
  
  connection.query("SELECT * FROM Workflow_Path", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("workflow path: ", res);
    result(null, res);
    
  });
  
};
Module.getExec = result => {
  
  connection.query("SELECT * FROM Module_Exec", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("exec: ", res);
    result(null, res);
    
  });
  
};
Module.getNotes = result => {
  
  connection.query("SELECT * FROM Module_Notes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("notes: ", res);
    result(null, res);
    
  });
  
};
Module.create = (newmodule, result) => {
  connection.query("INSERT INTO Modules SET ?", newmodule, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created module: ", { id: res.module_id, ...newmodule });
    result(null, { id: res.module_id, ...newmodule });
  });
};
Module.createNew = (str, result) => {
  connection.query(str, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};
Module.getModuleId= (ModuleId, result) => {
  
  connection.query(`select m.Module_Id,m.ModuleName,i.Input_Id,i.Input_Filename,i.Input_Type, i.Input_Notes
 from Modules as m left join Module_Input as i on i.Module_Id = m.Module_Id
   where m.Module_Id=${ModuleId};select m.Module_Id,m.ModuleName,o.Output_Id, o.Output_Filename,o.Output_Notes from Modules as m
    left join Module_Output as o on o.Module_Id=m.Module_Id 
    where m.Module_Id=${ModuleId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found input: ", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
    
  });
  
};
Module.remove = (id,tablename, result) => {
  connection.query(`delete from ${tablename} where Module_Id= ${id}`,  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Module with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted module with id: ", id);
    result(null, res);
  });
};
Module.updateById = (id, module, result) => {
  connection.query(
    "UPDATE Modules SET ModuleName = ?, DescrName = ?, ModuleCategory = ?, Nbr_ksh = ?, Purpose = ? WHERE Module_Id = ?",
    [module.ModuleName, module.DescrName, module.ModuleCategory, module.Nbr_ksh, module.Purpose, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated module: ", { id: id, ...module });
      result(null, { id: id, ...module });
    }
  );
};
Module.updateByAnyId = (id, updatestr, result) => {
  console.log("update str is %s", updatestr);
  connection.query(
    updatestr,(err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      // console.log("updated module: ", { id: id, ...module });
       result(null, { });
    }
  );
};
Module.updateByInputId = (id, module, result) => {
  
  connection.query(
    "UPDATE Module_Input SET Module_ID=?, Input_Filename = ?, Input_Notes = ? WHERE Input_ID = ?",
    [ module.Module_ID, module.Input_Filename, module.Input_Notes, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated module: ", { id: id, ...module });
      result(null, { id: id, ...module });
    }
  );
  
};
module.exports = Module;
