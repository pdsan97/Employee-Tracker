const mysql = require('mysql');
class Database {
	constructor() {
		this.init();
	}

	async init() {
		this.db = mysql.createConnection({
			host: process.env.HOST,
			user: process.env.USER,
			password: process.env.PASSWORD,
			database: process.env.DATABASE,
		});

		this.db.connect(err => {
			if (err) console.log(err);
		});
	}

	async getQueryResults(sql) {
		const results = await new Promise((resolve, reject) => {
			this.db.query(sql, (err, res) => {
				if (err) {
					return reject('db', `${err.message}`);
				}
				resolve(res);
			});
		});
		return results;
	}

	async getDepartments() {
		const sql = `SELECT * FROM department;`;
		const results = await this.getQueryResults(sql);
		return results;
	}

	async getRoles() {
		const sql = `
		SELECT role.id,
			   title,
			   salary,
			   department.name department
		FROM role
		INNER JOIN department ON role.department_id = department.id;
		`;
		const results = await this.getQueryResults(sql);
		return results;
	}

	async getEmployees() {
		const sql = `SELECT employee.id,employee.first_name,employee.last_name,employeeRole.title,
		employeeDepartment.name department,
		employeeRole.salary,
		CONCAT(manager.first_name, ' ', manager.last_name) manager
		FROM employee 
		LEFT JOIN role employeeRole ON employee.role_id = employeeRole.id 
		LEFT JOIN department employeeDepartment ON employeeDepartment.id = employeeRole.department_id
		LEFT JOIN employee manager ON manager.id = employee.manager_id`;
		const results = await this.getQueryResults(sql);
		return results;
	}

	async getEmployeesbyDepartment(department) {
		const sql = `SELECT employee.id,employee.first_name,employee.last_name,employeeRole.title,
		employeeDepartment.name department,
		employeeRole.salary,
		CONCAT(manager.first_name, ' ', manager.last_name) manager
		FROM employee 
		LEFT JOIN role employeeRole ON employee.role_id = employeeRole.id 
		LEFT JOIN department employeeDepartment ON employeeDepartment.id = employeeRole.department_id
		LEFT JOIN employee manager ON manager.id = employee.manager_id 
		WHERE employeeDepartment.name = '${department}'`;
		const results = await this.getQueryResults(sql);
		return results;
	}

	async getEmployeesbyManager(manager) {
		const [firstName, lastName] = manager.split(' ');
		const sql = `SELECT employee.id,employee.first_name,employee.last_name,employeeRole.title,
		employeeDepartment.name department,
		employeeRole.salary,
		CONCAT(manager.first_name, ' ', manager.last_name) manager
		FROM employee 
		LEFT JOIN role employeeRole ON employee.role_id = employeeRole.id 
		LEFT JOIN department employeeDepartment ON employeeDepartment.id = employeeRole.department_id
		LEFT JOIN employee manager ON manager.id = employee.manager_id 
		WHERE manager.first_name = '${firstName}' AND manager.last_name = '${lastName}'`;
		const results = await this.getQueryResults(sql);
		return results;
	}

	async getManagers() {
		const sql = `SELECT DISTINCT(CONCAT(manager.first_name, ' ', manager.last_name)) name
		FROM employee 
		INNER JOIN role employeeRole ON employee.role_id = employeeRole.id 
		INNER JOIN department employeeDepartment ON employeeDepartment.id = employeeRole.department_id
		INNER JOIN employee manager ON manager.id = employee.manager_id`;
		const results = await this.getQueryResults(sql);
		return results;
	}
	async addEmployee(firstName, lastName, role, manager) {
		const [managerFirstName, managerLastName] = manager.split(' ');
		const sql = `
		INSERT INTO employee (first_name,last_name,role_id,manager_id)
		VALUES('${firstName}','${lastName}',
			(SELECT id FROM role WHERE title = '${role}'),
			(SELECT id FROM (SELECT id FROM employee WHERE first_name = '${managerFirstName}' AND last_name = '${managerLastName}') AS empl))`;
		await this.getQueryResults(sql);
	}

	async addDepartment(department) {
		const sql = `INSERT INTO department (name) VALUES('${department}')`;
		await this.getQueryResults(sql);
	}

	async addRoles(title, salary, departmentName) {
		const sql = `INSERT INTO role (title,salary,department_id) VALUES('${title}','${salary}',(SELECT id FROM department WHERE name = '${departmentName}'))`;
		await this.getQueryResults(sql);
	}

	async updateEmployeeRole(employee, role) {
		const [firstName, lastName] = employee.split(' ');
		const sql = `UPDATE employee
		SET role_id = (SELECT id FROM role WHERE role.title = '${role}')
		WHERE id = (SELECT id FROM (SELECT id FROM employee WHERE first_name = '${firstName}' AND last_name = '${lastName}') as empl)`;
		await this.getQueryResults(sql);
	}
	async deleteEmployee(employee) {
		const [firstName, lastName] = employee.split(' ');
		const sql = `DELETE FROM employee 
		WHERE id=(SELECT id FROM (SELECT id FROM employee WHERE first_name = '${firstName}' AND last_name = '${lastName}') as empl)`;
		await this.getQueryResults(sql);
	}
}

const database = new Database();
module.exports = database;
