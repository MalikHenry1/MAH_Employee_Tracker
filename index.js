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
    let departments
  
    const currentDepartments = db.promise().query(`SELECT id, department_name FROM department`)
    .then( ([results]) => {
        departments = results.map(({id, department_name}) => ({
            name: department_name,
            value: id
        }))
    })

    .then(() => {
        
  
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
            },
            {
                type: "list",
                name: "roleDepartment",
                message: "What department does this role belong to?",
                choices: departments
            }
        ])
        .then((answer) => {
            let department_id;

            for(let i=0; i<departments.length; i++) {
                if(departments[i] === answer.roleDepartment) {
                    department_id = i+1;
                };
            };

            db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
            [answer.roleTitle, answer.roleSalary, answer.roleDepartment], 
            function(err, answer) {
                if(err){
                    console.log(err);
                    return;
                }    
            });
        })
        .then(() => {
            mainMenu();
        })
    })
}

function viewEmployee() {
    db.query(`SELECT * FROM employee`, function (err, results) {
        console.table(results);
    });
}

function createEmployee() {
    let role

    const currentRoles = db.promise().query(`SELECT id, title FROM role`)
    .then( ([results]) => {
        role = results.map(({id, title}) => ({
            name: title,
            value: id
        }))
    })

    .then( () => {

    inquirer
    .prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the first name of this employee?",
            validate: (answer) => {
                if(answer !== "") {
                    return true;
                }
                return "You have entered an empty string, you must include a valid role."
            }
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the last name of this employee?",
            validate: (answer) => {
                if(answer !== "") {
                    return true;
                }
                return "You have entered an empty string, you must include a valid role."
            }
        },
        {
            type: "list",
            name: "employee_role",
            message: "What is the role of this employee?",
            choices: role
        },
        {
            type: "input",
            name: "employee_manager",
            message: "Who is the manager of this employee (type the manager's id)?",
            
        },

    ])
    .then((answers) => {
        db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)`,
        [answers.first_name, answers.last_name, answers.employee_role, answers.employee_manager],
        function(err) {
            if(err) {
                console.log(err);
                return;
            }
        })
    })
    .then(() => {
        mainMenu();
    })

})}

function updateEmployeeRole() {
    let role

    const currentRoles = db.promise().query(`SELECT id, title FROM role`)
    .then( ([results]) => {
        role = results.map(({id, title}) => ({
            name: title,
            value: id
        }))
    })

    let employee

    const currentEmployees = db.promise().query(`SELECT first_name, last_name FROM employee`)
    .then(([results]) => {
        employee = results.map(({first_name, last_name}) => ({
            name: first_name,
            value: last_name
        }))
    })

    .then(() => {
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "employee",
                    message: "Which employee would you like to update?",
                    choices: employee
                },
                {
                    type: "list",
                    name: "newRole",
                    message: "What is the new role of this employee?",
                    choices: role
                }
            ])
   

    .then((answers) => {
        db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)`,
        [first_name, last_name, answers.newRole, answers.employee_manager],
        function(err) {
            if(err) {
                console.log(err);
                return;
            }
        })
    })
})

}

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
        db.query(`INSERT INTO department(department_name) Values(?)`,
        [answers.newDepartment],
        function (err) {
            if(err) {
                console.log(err);
            }
        })
    })
    .then(() => {
        mainMenu();
    })
}


mainMenu();