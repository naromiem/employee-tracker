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
            choices: ["Add", "Delete", "Update", "Exit Application"],
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
                const validResponse = response.length > 1 && !isNaN(response);
                return validResponse || console.log("\nPlease enter a number.");
              },
          },

          {
            type: "input",
            name: "depatmentId",
            message: `Department Id?`,
            validate: function (response) {
                const validResponse = response.length > 1 && !isNaN(response);
                return validResponse || console.log("\nPlease enter a Id number");
              },
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
            title:response.title,
            salary:response.salary,
            department_id:response.departmentId
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
  };

// function deleteDepartments() {
//     console.log("Delete under construction")
//     startApplication()
// }
// // for your reference => to add employees to tbale 

// nextStep();
// function nextStep() {
  
//   inquirer
//     .prompt([
//       {
//         type: "list",
//         name: "set",
//         message: `What would you like to do?`,
//         choices: ["Add Employee", "Delete Employee", "Exit Application"],
//       },
//     ])
//     .then((response) => {
//       switch (response.set) {
//         case "Add Employee":
//           addEmployee();
//           break;
//         case "Delete Employee":
//           deleteEmployee();
//           break;
//         case "Exit Application":
//             console.log("Thanks for visiting the application!");
//           connection.end()
//           break;
//       }
//     });
// }


// addEmployee();
// function addEmployee() {
    
//     inquirer
//     .prompt([
//         {
//             type: 'input',
//             name: 'firsName',
//             message: `What is the employee's first name?`,
//             validate: function (response) {
//                 const secondResponse = response.length > 1 && isNaN(response);
//                 return secondResponse || console.log("\nPlease enter a valid first name.");
//             }
//         },

//         {
//             type: 'input',
//             name: 'lastName',
//             message: `What is the employee's last name?`,
//             validate: function (response) {
//                 const secondResponse = response.length > 1 && isNaN(response);
//                 return secondResponse || console.log("\nPlease enter a valid last name.");
//             }
//         },

//         {
//             type: 'input',
//             name: 'roleId',
//             message: `What is the employee's role?`,
//             validate: function (response) {
//                 const secondResponse = response.length > 1 && isNaN(response);
//                 return secondResponse || console.log("\nPlease enter a valid role.");
//             }
//         },

//         {
//             type: 'input',
//             name: 'managerId',
//             message: `Who is employee's manager?`,
//             validate: function (response) {
//                 const secondResponse = response.length > 1 && isNaN(response);
//                 return secondResponse || console.log("\nPlease enter a valid manager name.");
//             }
//         },

//         {
//             type: 'list',
//             name: 'confirm',
//             message: `Are you adding any more employee's?`,
//             choices: ["YES", "NO"]
//         }

//     ]).then((response) => {
// connection.query("INSERT INTO employee SET ?", 
//     {
//         first_name: response.firstName,
//         last_name: response.lastName,
//         role_id: response.roleId,
//         manager_id: response.ManagerId
//     },
//     (err, res) => {
//     if(err) throw err;
//     console.log(`'${response.firstName} ${response.lastName} ${response.roleId} ${response.managerId}' has been succesfully added to Employee table.`);
    
//     switch(response.confirm){
//         case 'YES':
//             addEmployee();
//             break
//         case 'NO':
//             nextStep();
//             break 
//     }

    
// });
//     })
//         }

        