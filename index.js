const fs = require("fs");
const inquirer = require("inquirer");
const db = require("./config/db.js");


function mainMenu() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "mainMenu",
                choices: [
                    {
                        name: "View All Employees",
                        value: "viewEmployees"
                    },
                    {
                        name: "Add Employee",
                        value: "createEmployee"
                    },
                    {
                        name: "Update Employee Role",
                        value: "updateRole"
                    },
                    {
                        name: "View All Roles",
                        value: "viewRole"
                    },
                    {
                        name: "Add Role",
                        value: "createRole"
                    },
                    {
                        name: "View All Departments",
                        value: "viewDepartment"
                    },
                    {
                        name: "Add Department",
                        value: "createDepartment"
                    }
                ],
            }
        ])
        .then ((answers) => {
            if(answers.mainMenu === "createRole") {
                createRole();
            }
        })
}

function createRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "employeeRole",
                message: "What is the name of this role?",
                validate: (answer) => {
                    if(answer !== "") {
                        return true;
                    }
                    return "You have anetered an empty string, you must include a valid role."
                }
            }
        ])
        .then((answers) => {
            console.log(answers);
        })
        .then(() => {
            mainMenu();
        })

}

mainMenu();