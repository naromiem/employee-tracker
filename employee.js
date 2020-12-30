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
        choices: ["Add Department", "Delete Department", "Exit Application"],
      },
    ])
    .then((response) => {
      switch (response.action) {
        case "Add Department":
          addDepartments();
          break;
        case "Delete Department":
          deleteDepartments();
          break;
        case "Exit Application":
            console.log("Thanks for visiting the application!");
          connection.end()
          break;
      }
    });
}



function addDepartments() {
    
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'department',
            message: `What's the department name?`,
            validate: function (response) {
                const validResponse = response.length > 1 && isNaN(response);
                return validResponse || console.log("\nPlease enter a valid name.");
            }
        },
        {
            type: 'list',
            name: 'confirm',
            message: `Are you adding any more departments?`,
            choices: ["YES", "NO"]
        }
    ]).then((response) => {
        // console.log(response);
        connection.query("INSERT INTO department SET ?", {
            dept_name: response.department
        }, (err, res) => {
            if(err) throw err;
            console.log(`'${response.department}' has been succesfully added to Department table.`);
            
            switch(response.confirm){
                case 'YES':
                    addDepartments();
                    break
                case 'NO':
                    startApplication();
                    break 
            }
        })
    })
};

function deleteDepartments() {
    console.log("Delete under construction")
    startApplication()
}
// for your reference => to add employees to tbale 

nextStep();
function nextStep() {
  
  inquirer
    .prompt([
      {
        type: "list",
        name: "set",
        message: `What would you like to do?`,
        choices: ["Add Employee", "Delete Employee", "Exit Application"],
      },
    ])
    .then((response) => {
      switch (response.set) {
        case "Add Employee":
          addEmployee();
          break;
        case "Delete Employee":
          deleteEmployee();
          break;
        case "Exit Application":
            console.log("Thanks for visiting the application!");
          connection.end()
          break;
      }
    });
}


addEmployee();
function addEmployee() {
    
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'firsName',
            message: `What is the employee's first name?`,
            validate: function (response) {
                const validResponse = response.length > 1 && isNaN(response);
                return validResponse || console.log("\nPlease enter a valid first name.");
            }
        },

        {
            type: 'input',
            name: 'lastName',
            message: `What is the employee's last name?`,
            validate: function (response) {
                const validResponse = response.length > 1 && isNaN(response);
                return validResponse || console.log("\nPlease enter a valid last name.");
            }
        },

        {
            type: 'input',
            name: 'roleId',
            message: `What is the employee's role?`,
            validate: function (response) {
                const validResponse = response.length > 1 && isNaN(response);
                return validResponse || console.log("\nPlease enter a valid role.");
            }
        },

        {
            type: 'input',
            name: 'managerId',
            message: `Who is employee's manager?`,
            validate: function (response) {
                const validResponse = response.length > 1 && isNaN(response);
                return validResponse || console.log("\nPlease enter a valid manager name.");
            }
        },

        {
            type: 'list',
            name: 'confirm',
            message: `Are you adding any more employee's?`,
            choices: ["YES", "NO"]
        }

    ]).then((response) => {
connection.query("INSERT INTO employee SET ?", 
    {
        first_name: response.firstName,
        last_name: response.lastName,
        role_id: response.roleId,
        manager_id: response.ManagerId
    },
    (err, res) => {
    if(err) throw err;
    console.log(`'${response.firstName} ${response.lastName} ${response.roleId} ${response.managerId}' has been succesfully added to Employee table.`);
    
    switch(response.confirm){
        case 'YES':
            addEmployee();
            break
        case 'NO':
            nextStep();
            break 
    }

    
});
    })
        }

        