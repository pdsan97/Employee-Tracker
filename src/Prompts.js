const inquirer = require('inquirer');
const Engineer = require('../lib/Engineer');
const Intern = require('../lib/Intern');
const Manager = require('../lib/Manager');

const PromptEngineer = async () => {
	var questions = [
		{
			message: "Enter team member's name",
			name: 'name',
		},
		{
			message: "Enter team member's id",
			name: 'id',
		},
		{
			message: "Enter team member's email address",
			name: 'email',
		},
		{
			message: "Enter team member's github",
			name: 'github',
		},
	];
	const { name, id, email, officeNumber, github } = await inquirer.prompt(
		questions,
	);
	const newEngineer = new Engineer(name, id, email, github);
	return newEngineer;
};
const PromptIntern = async () => {
	var questions = [
		{
			message: "Enter team member's name",
			name: 'name',
		},
		{
			message: "Enter team member's id",
			name: 'id',
		},
		{
			message: "Enter team member's email address",
			name: 'email',
		},
		{
			message: "Enter team member's school",
			name: 'school',
		},
	];
	const { name, id, email, school } = await inquirer.prompt(questions);
	const newEngineer = new Intern(name, id, email, school);
	return newEngineer;
};
const PromptManager = async () => {
	const questions = [
		{
			message: "Enter team manager's name",
			name: 'name',
		},
		{
			message: "Enter team manager's id",
			name: 'id',
		},
		{
			message: "Enter team manager's email address",
			name: 'email',
		},
		{
			message: "Enter team manager's office number",
			name: 'officeNumber',
		},
	];
	const { name, id, email, officeNumber } = await inquirer.prompt(questions);
	var newManger = new Manager(name, id, email, officeNumber);
	return newManger;
};
const ShowMenu = async () => {
	var questions = [
		{
			type: 'rawlist',
			message: 'Add more members',
			choices: [
				'Engineer',
				'Intern',
				'Finish building the team and generate page',
			],
			name: 'selection',
		},
	];
	return await inquirer.prompt(questions);
};

module.exports = { PromptEngineer, PromptIntern, PromptManager, ShowMenu };
