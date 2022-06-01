INSERT INTO department (id, department_name)
VALUES  (001, "Sales"),
        (002, "Legal"),
        (003, "Engineering"),
        (004, "Finance");
        
INSERT INTO role (id, title, salary, department_id)
VALUES  (001, "Salesperson", "150000", 001),
        (002, "Attorney", "250000", 002),
        (003, "Software Engineer", "190000", 003),
        (004, "CFO", "250000", 004);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("BillyBob", "Wilson", 001, 001),
        ("Jan", "Firster", 002, 001),
        ("Marko", "Lopez", 003, 002),
        ("Taryn", "O'Haire", 004, 002);
  