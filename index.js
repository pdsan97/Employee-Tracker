require('dotenv').config();
const inquirer = require('inquirer');
const {
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
} = require('./lib/prompts');

const inquirerLoop = async () => {
	const { option } = await inquirer.prompt({
		type: 'list',
		message: 'What would you like to do?',
		choices: [
			'View All Employees',
			'View All Departments',
			'View All Roles',
			'View All Employees By Department',
			'View All Employees by Manager',
			'Add Employee',
			'Add Department',
			'Add Role',
			'Remove Employee',
			'Update Employee Role',
			'Exit',
		],
		name: 'option',
	});
	if (option === 'View All Employees') {
		await viewEmployees();
		return await inquirerLoop();
	} else if (option === 'View All Departments') {
		await viewDepartments();
		return await inquirerLoop();
	} else if (option === 'View All Roles') {
		await viewRoles();
		return await inquirerLoop();
	} else if (option === 'View All Employees By Department') {
		await viewEmployeesByDepartment();
		return await inquirerLoop();
	} else if (option === 'View All Employees by Manager') {
		await viewEmployeesByManager();
		return await inquirerLoop();
	} else if (option === 'Add Employee') {
		await addEmployee();
		return await inquirerLoop();
	} else if (option === 'Add Role') {
		await addRole();
		return await inquirerLoop();
	} else if (option === 'Add Department') {
		await addDepartment();
		return await inquirerLoop();
	} else if (option === 'Update Employee Role') {
		await updateEmployeeRole();
		return await inquirerLoop();
	} else if (option === 'Remove Employee') {
		await deleteEmployee();
		return await inquirerLoop();
	} else {
		return;
	}
};

const main = async () => {
	await inquirerLoop();
};
main();
