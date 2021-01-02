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
            reviewInformation();
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


function addEmployees() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: `What is the employee's first name?`,
        validate: function (response) {
          const secondResponse = response.length > 1 && isNaN(response);
          return secondResponse || console.log("\nPlease enter a valid first name.");
        },
      },
      {
        type: "input",
        name: "lastName",
        message: `What is the employee's last name?`,
        validate: function (response) {
          const secondResponse = response.length > 1 && isNaN(response);
          return secondResponse || console.log("\nPlease enter a valid last name.");
        },
      },
      {
        type: "input",
        name: "roleId",
        message: `What is the employee's role id?`,
        validate: function (response) {
          const secondResponse = response.length > 0 && !isNaN(response) && response.length < 10;
          return secondResponse || console.log("\nPlease enter a valid role id.");
        },
      },
      {
        type: "input",
        name: "managerId",
        message: `What is the managers id?`,
        validate: function (response) {
          const secondResponse = response.length > 0 && !isNaN(response) && response.length < 10;
          return secondResponse || console.log("\nPlease enter a valid manager id.")
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
          console.log(`'${response.firstName} ${response.lastName}' has been succesfully added to Employee table.`);

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

function reviewInformation() {
  connection.query(`SELECT first_name, last_name, title, salary, department_id, dept_name FROM employee
   INNER JOIN role_info ON employee.role_id = role_info.id
   INNER JOIN department ON role_info.department_id = department.id;`,
    (err, res) => {
      if (err) throw err;
     
      console.table(res);
    }
  );
}

        