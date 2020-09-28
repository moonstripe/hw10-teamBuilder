const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const Kojin = new Engineer('kojin', '1', 'kojinglick@gmail.com', 'moonstripe11');

const employeeList = [];
let currentId = 0;
let officeNumber = 0;

renderList = (employeeList) => {
    let data = render(employeeList);

    return fs.writeFile(outputPath, data, err => console.log(err));;
}

firstBattery = async () => {
    await inquirer
        .prompt([
            {
                type: "list",
                message: "What role are you hiring for?",
                name: "role",
                choices: ['Manager', 'Engineer', 'Intern']
            },
            {
                type: "input",
                message: "Who are you hiring?",
                name: "name"
            },
            {
                type: "input",
                message: "What is their email?",
                name: "email"
            }
        ])
        .then(response => {
            currentId += 1;
            secondBattery(response, currentId)
        })
        .catch(err => console.log(err));
}

secondBattery = async (response, currentId) => {
    switch (response.role) {
        case 'Manager':
            await inquirer
                .prompt([{
                    type: "list",
                    message: `Which office should ${response.name} occupy?`,
                    name: 'officeNumber',
                    choices: ['1', '2', '3', '4', '5']

                }])
                .then(async managerReply => {
                        employeeList.push(new Manager(response.name, currentId, response.email, managerReply.officeNumber));
                        // console.log(employeeList);

                        // restart questions for new employees

                        await inquirer
                            .prompt([
                                {
                                    type: "confirm",
                                    message: "Do you want to add another employee?",
                                    name: "addEmployee"
                                }
                            ])
                            .then(more => {
                                if (more.addEmployee) {
                                    firstBattery();
                                } else {
                                    return;
                                }
                            })


                    }
                ).catch(err => console.log(err));


            break;


        case 'Engineer':
            await inquirer
                .prompt([{
                    type: "input",
                    message: `What is ${response.name}'s GitHub username?`,
                    name: 'github'

                }])
                .then(async engineerReply => {
                        employeeList.push(new Engineer(response.name, currentId, response.email, engineerReply.github));
                        // console.log(employeeList);

                        // restart questions for new employees

                        await inquirer
                            .prompt([
                                {
                                    type: "confirm",
                                    message: "Do you want to add another employee?",
                                    name: "addEmployee"
                                }
                            ])
                            .then(more => {
                                if (more.addEmployee) {
                                    firstBattery();
                                } else {
                                    return ;
                                }
                            })
                    }
                ).catch(err => console.log(err));
            break;
        case 'Intern':
            await inquirer
                .prompt([{
                    type: "input",
                    message: `What school does ${response.name} attend?`,
                    name: 'school'

                }])
                .then(async internReply => {
                        employeeList.push(new Intern(response.name, currentId, response.email, internReply.school));
                        // console.log(employeeList);

                        // restart questions for new employees

                        await inquirer
                            .prompt([
                                {
                                    type: "confirm",
                                    message: "Do you want to add another employee?",
                                    name: "addEmployee"
                                }
                            ])
                            .then(more => {
                                if (more.addEmployee) {
                                    firstBattery();
                                } else {
                                    return;
                                }
                            })
                    }
                ).catch(err => console.log(err));
            break;
    }
    renderList(employeeList);
}


firstBattery();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
