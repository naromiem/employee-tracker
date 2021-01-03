const inquirer = require ("inquirer");
const mySql = require ("mysql");
const table = require ("console.table");

const connection = mySql.createConnection({
    host: "localhost", 
    port: 3306,
    user: "root",
    password: "Issaboom19",
    database: "employee_trackerdb"
});


console.log("\nWelcome!\n");
startApplication();
function startApplication() {
  
  inquirer
    .prompt([
        {
            type: "list",
            name: "action",
            message: `What would you like to do?`,
            choices: ["Add", "Delete", "Update","Review", "Exit Application"],
        }
    ])
    .then((response) => {

      switch (response.action) {
        case "Add":
          addActions();
          break;
        case "Delete":
          deleteActions();
          break;
        case "Update":
            updateActions();
            break;
            case "Review":
            reviewActions();
            break;
        case "Exit Application":
            console.log("Thanks for visiting the application!");
          connection.end()
            break;
      }
    });
};

function addActions() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: `What would you like to add?`,
        choices: ["Department", "Role", "Employee", "Restart Application"],
      },
    ])
    .then((data) => {
      switch (data.action) {
        case "Department":
          addDepartments();
          break;
        case "Role":
          addRoles();
          break;
        case "Employee":
          addEmployees();
          break;
        case "Restart Application":
          startApplication();
          break;
      }
    });
}

function deleteActions() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: `What would you like to delete?`,
          choices: ["Department", "Role", "Employee", "Restart Application"],
        },
      ])
      .then((data) => {
        switch (data.action) {
          case "Department":
            deleteDepartments();
            break;
          case "Role":
            deleteRoles();
            break;
          case "Employee":
            deleteEmployees();
            break;
          case "Restart Application":
            startApplication();
            break;
        }
      });
  }

  function updateActions() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: `What would you like to update?`,
          choices: ["Department", "Role", "Employee", "Restart Application"],
        },
      ])
      .then((data) => {
        switch (data.action) {
          case "Department":
            updateDepartments();
            break;
          case "Role":
            updateRoles();
            break;
          case "Employee":
            updateEmployees();
            break;
          case "Restart Application":
            startApplication();
            break;
        }
      });
  }

  
function addDepartments() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: `What's the department name?`,
        validate: function (response) {
          const validResponse = response.length > 1 && isNaN(response);
          return validResponse || console.log("\nPlease enter a valid name.");
        },
      },
      {
        type: "list",
        name: "confirm",
        message: `Are you adding any more departments?`,
        choices: ["YES", "NO"],
      },
    ])
    .then((response) => {
      // console.log(response);
      connection.query(
        "INSERT INTO department SET ?",
        {
          dept_name: response.department,
        },
        (err, res) => {
          if (err) throw err;

          switch (response.confirm) {
            case "YES":
              console.log(
                `'${response.department}' has been succesfully added to Department table.`
              );
              addDepartments();
              break;
            case "NO":
              console.log(
                `'${response.department}' has been succesfully added to Department table.`
              );
              startApplication();
              break;
          }
        }
      );
    });
};

function addRoles() {
    connection.query("SELECT * FROM department", (err,res)=>{
        if (err) throw err;
    
    let departments = ["0(No Departments Available)"];
    res.forEach(department => departments.push(`${department.id}(${department.dept_name})`)); //"1(HR)"
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: `What is the role title?`,
          validate: function (response) {
            const validResponse = response.length > 1 && isNaN(response);
            return validResponse || console.log("\nPlease enter a valid role.");
          },
        },
        {
            type: "input",
            name: "salary",
            message: `Salary?`,
            validate: function (response) {
                const validResponse = response > 0 && !isNaN(response);
                return validResponse || console.log("\nPlease enter a number.");
              },
          },

          {
            type: "list",
            name: "departmentId",
            message: `Department Id?`,
            choices: departments

          },
        {
          type: "list",
          name: "confirm",
          message: `Are you adding any more roles?`,
          choices: ["YES", "NO"],
        },
      ])
      .then((response) => {
        // console.log(response);
        connection.query(
          "INSERT INTO role_info SET ?",
          {
            title: response.title,
            salary: response.salary,
            department_id: response.departmentId[0]
          },
          (err, res) => {
            if (err) throw err;
  
            switch (response.confirm) {
              case "YES":
                console.log(
                  `'${response.title}' has been succesfully added to roles table.`
                );
                addRoles();
                break;
              case "NO":
                console.log(
                  `'${response.title}' has been succesfully added to roles table.`
                );
                startApplication();
                break;
            }
          }
        );
      });

    })
  };

function deleteDepartments() {
   connection.query("SELECT * FROM department",(err,res)=>{
       if (err) throw err;
       const departments = [];
       res.forEach(element=> departments.push(element.dept_name));
       
       inquirer
       .prompt([
           {
               type:"list",
               name: "departmentToDelete",
               message: "What department would you like to delete?",
               choices: departments
       },
       {
        type:"list",
        name: "deleteOtherDept",
        message: "Would you like to delete another department?",
        choices: ["YES","NO"] 
       }

       ]).then((response)=>{
           connection.query("DELETE FROM department WHERE ? ", {
               dept_name: response.departmentToDelete
           }, (err,res)=>{
               if (err) throw err;
               switch (response.deleteOtherDept){
                   case "YES": deleteDepartments();
                   break
                   case "NO": startApplication();
                   break
               }
           })
       })
   }) 
};

function deleteRoles() {
  connection.query("SELECT * FROM role_info", (err, res) => {
    if (err) throw err;
    const roles = ['0-no roles to delete'];
    res.forEach((element) => roles.push(`${element.id}-${element.title}`));

    inquirer
      .prompt([
        {
          type: "list",
          name: "rolesToDelete",
          message: "What role would you like to delete?",
          choices: roles,
        },
        {
          type: "list",
          name: "otherRole",
          message: "Would you like to delete another role?",
          choices: ["YES", "NO"],
        },
      ])
      .then((response) => {
        let oldTitle = [];

        for (let i = 0; i < response.rolesToDelete.length; i++) {
          oldTitle.push(response.rolesToDelete[i]);
        }

        oldTitle = oldTitle.filter((x) => x != oldTitle[0] && x != "-");
        let newTitle = oldTitle.join("");

        connection.query(
          "DELETE FROM role_info WHERE?",
          {
            title: newTitle,
          },
          (err, res) => {
            if (err) throw err;
            switch (response.otherRole) {
              case "YES":
                deleteRoles();
                break;
              case "NO":
                startApplication();
                break;
            }
          }
        );
      });
  });
};

function deleteEmployees() {
    connection.query("SELECT * FROM employee",(err,res)=>{
        if (err) throw err;
        const employees = ['Restart App'];
        res.forEach(element=> employees.push(element.last_name));
        
        inquirer
        .prompt([
            {
                type:"list",
                name: "employeesToDelete",
                message: "Which employee would you like to delete?",
                choices: employees
        },
        {
         type:"list",
         name: "deleteOtherEmployee",
         message: "Would you like to delete another employee?",
         choices: ["YES","NO"] 
        }
        ]).then((response)=>{
            connection.query("DELETE FROM employee WHERE ? ", {
                last_name: response.employeesToDelete
            }, (err,res)=>{
                if (err) throw err;
                if(response.deleteOtherEmployee == 'YES'){
                    deleteEmployees();
                }
                if (response.deleteOtherEmployee == 'NO' || response.employeesToDelete == 'Restart App'){
                    startApplication();
                }
            });
                
        });
    })

 };

function addEmployees() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: `What is the employee's first name?`,
        validate: function (response) {
          const secondResponse = response.length > 1 && isNaN(response);
          return (
            secondResponse || console.log("\nPlease enter a valid first name.")
          );
        },
      },
      {
        type: "input",
        name: "lastName",
        message: `What is the employee's last name?`,
        validate: function (response) {
          const secondResponse = response.length > 1 && isNaN(response);
          return (
            secondResponse || console.log("\nPlease enter a valid last name.")
          );
        },
      },
      {
        type: "input",
        name: "roleId",
        message: `What is the employee's role id?`,
        validate: function (response) {
          const secondResponse =
            response.length > 0 && !isNaN(response) && response.length < 10;
          return (
            secondResponse || console.log("\nPlease enter a valid role id.")
          );
        },
      },
      {
        type: "input",
        name: "managerId",
        message: `What is the managers id?`,
        validate: function (response) {
          const secondResponse =
            response.length > 0 && !isNaN(response) && response.length < 10;
          return (
            secondResponse || console.log("\nPlease enter a valid manager id.")
          );
        },
      },
      {
        type: "list",
        name: "confirm",
        message: `Are you adding any more employee's?`,
        choices: ["YES", "NO"],
      },
    ])
    .then((response) => {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: response.firstName,
          last_name: response.lastName,
          role_id: response.roleId,
          manager_id: response.managerId,
        },
        (err, res) => {
          if (err) throw err;
          console.log(
            `'${response.firstName} ${response.lastName}' has been succesfully added to Employee table.`
          );

          switch (response.confirm) {
            case "YES":
              addEmployees();
              break;
            case "NO":
              startApplication();
              break;
          }
        }
      );
    });
}

function reviewActions() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "toView",
        message: "What data do you want to view?",
        choices: ["Employees", "Departments", "Roles"],
      },
    ])
    .then((response) => {
      let displayThis = "";
      switch (response.toView) {
        case "Employees":
          displayThis = "SELECT * FROM employee";
          break
        case "Departments":
          displayThis = "SELECT * FROM department";
          break
        case "Roles":
            displayThis = "SELECT * FROM role_info";
      }
      connection.query(displayThis, (err, res) => {
        if (err) throw err;
        if(res[0] != null){
            console.table(res);
            startApplication();
        } else {
            console.log('No Information to display yet.');
            startApplication();
        }
        
      });
    });
}

        