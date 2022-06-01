const fs = require("fs");
const inquirer = require("inquirer");
const db = require("./config/db.js");


const mainMenu = () => {
    inquirer
        .prompt([
            {
                type: "list",
                name: "mainMenu",
                message: "What would you like to do?",
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
            } else if (answers.mainMenu === "viewEmployees") {
                viewEmployee();
            } else if (answers.mainMenu === "createEmployee") {
                createEmployee();
            } else if (answers.mainMenu === "updateRole") {
                updateEmployeeRole();
            } else if (answers.mainMenu === "viewRole") {
                viewRole();
            } else if (answers.mainMenu === "viewDepartment") {
                viewDepartment();
            } else if (answers.mainMenu === "createDepartment") {
                createDepartment();
            }
        })
}

function createRole() {
    // to create a role
    // 1. query db for active depts
    const currentDepartments = db.query(`SELECT id, department_name FROM department`, function (err, results) {
        // console.table(results);
        // const arrayOFChoices = results.map(({id, deparment_name}) => {
        //     name: id;
        //     value: deparment_name
        // })
    });
  
    inquirer
        .prompt([
            
            {
                type: "input",
                name: "roleTitle",
                message: "What is the name of this role?",
                validate: (answer) => {
                    if(answer !== "") {
                        return true;
                    }
                    return "You have entered an empty string, you must include a valid role."
                }
            },
            {
                type: "input",
                name: "roleSalary",
                message: "What is the salary of this role?",
                validate: (answer) => {
                    if(answer !== "") {
                        return true;
                    }
                    return "You have entered an empty string, you must include a valid salary."
                }
            }
        ])
        .then((answer) => {
            // SQL Insert Into Database
            db.query(`INSERT INTO role (title, salary, department_id) VALUES (answers.roleTitle, answers.roleSalary, )`, function(err, answer) {
                console.table(answer);
            });
        })
        .then(() => {
            mainMenu();
        })

}

function viewEmployee() {
    db.query(`SELECT * FROM employee`, function (err, results) {
        console.table(results);
        // console.log(err);
    });
}

function createEmployee() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "newEmployee",
            message: "What is the name of this employee?",
            validate: (answer) => {
                if(answer !== "") {
                    return true;
                }
                return "You have entered an empty string, you must include a valid role."
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

function updateEmployeeRole() {}

function viewRole() {
    db.query(`SELECT * FROM role`, function (err, results) {
        console.table(results);
    });
    mainMenu();
}

function viewDepartment() {
    db.query(`SELECT * FROM department`, function (err, results) {
        console.table(results);
    });
    mainMenu();
}

function createDepartment() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "newDepartment",
            message: "What is the name of this department?",
            validate: (answer) => {
                if(answer !== "") {
                    return true;
                }
                return "You have entered an empty string, you must include a valid role."
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

module.exports = {mainMenu}
const {viewEmployee, createEmployee, updateEmployeeRole} = require('./lib/employee');
const {viewDepartment, createDepartment} = require('./lib/department');
const {createRole, viewRole} = require('./lib/role');

mainMenu();