const cTable = require('console.table');
const database = require('./database');
const inquirer = require('inquirer');
const printTable = data => {
	const table = cTable.getTable(data);
	console.log(table);
};

const viewEmployeesByDepartment = async () => {
	const { option } = await inquirer.prompt({
		type: 'list',
		message: 'Choose a department',
		choices: ['Sales', 'Engineering', 'Finance', 'Legal'],
		name: 'option',
	});

	const employees = await database.getEmployeesbyDepartment(option);
	printTable(employees);
};

const viewDepartments = async () => {
	const departments = await database.getDepartments();
	printTable(departments);
};

const viewRoles = async () => {
	const roles = await database.getRoles();
	printTable(roles);
};

const viewEmployeesByManager = async () => {
	const managers = await database.getManagers();
	const managersNames = managers.map(manager => manager.name);

	const { option } = await inquirer.prompt({
		type: 'list',
		message: 'Choose a manager',
		choices: managersNames,
		name: 'option',
	});
	const employees = await database.getEmployeesbyManager(option);
	printTable(employees);
};

const addEmployee = async () => {
	const managers = await database.getManagers();
	const managersNames = ['None', ...managers.map(manager => manager.name)];

	const roles = await database.getRoles();
	const rolesNames = roles.map(role => role.title);

	const { firstName, lastName, role, manager } = await inquirer.prompt([
		{
			message: "What should the employee's first name be",
			name: 'firstName',
		},
		{
			message: "What should the employee's last name be",
			name: 'lastName',
		},
		{
			message: "What should the employee's role be",
			name: 'role',
			type: 'list',
			choices: rolesNames,
		},
		{
			message: "What should the employee's manager be",
			name: 'manager',
			type: 'list',
			choices: managersNames,
		},
	]);
	await database.addEmployee(firstName, lastName, role, manager);
};

const addDepartment = async () => {
	const { department } = await inquirer.prompt({
		message: 'What is the department name?',
		name: 'department',
	});
	await database.addDepartment(department);
};

const addRole = async () => {
	const departments = await database.getDepartments();
	const departmentsNames = departments.map(department => department.name);
	const { title, salary, department } = await inquirer.prompt([
		{
			message: "What should the role's title be?",
			name: 'title',
		},
		{
			message: "What should the role's salary be?",
			name: 'salary',
		},
		{
			type: 'list',
			message: "What should the role's department be?",
			name: 'department',
			choices: departmentsNames,
		},
	]);
	await database.addRoles(title, salary, department);
};

const updateEmployeeRole = async () => {
	const employees = await database.getEmployees();
	const employeeNames = employees.map(
		employee => `${employee.first_name} ${employee.last_name}`
	);

	const roles = await database.getRoles();
	const rolesNames = roles.map(role => role.title);

	const { employee, role } = await inquirer.prompt([
		{
			type: 'list',
			message: 'Which employee would you like to update?',
			choices: employeeNames,
			name: 'employee',
		},
		{
			type: 'list',
			message: 'What role should the employee have?',
			choices: rolesNames,
			name: 'role',
		},
	]);
	await database.updateEmployeeRole(employee, role);
};

const deleteEmployee = async () => {
	const employees = await database.getEmployees();
	const employeeNames = employees.map(
		employee => `${employee.first_name} ${employee.last_name}`
	);

	const { employee } = await inquirer.prompt({
		type: 'list',
		message: 'Which employee would you like to remove?',
		choices: employeeNames,
		name: 'employee',
	});

	await database.deleteEmployee(employee);
};

const viewEmployees = async () => {
	const employees = await database.getEmployees();
	printTable(employees);
};

module.exports = {
	viewEmployeesByDepartment,
	viewEmployeesByManager,
	viewEmployees,
	viewDepartments,
	viewRoles,
	deleteEmployee,
	updateEmployeeRole,
	addDepartment,
	addEmployee,
	addRole,
};
