const { writeFileSync } = require('fs');
const {
	PromptEngineer,
	PromptIntern,
	PromptManager,
	ShowMenu,
} = require('./src/Prompts');
const getPage = require('./src/page-template');
const inquirer = require('inquirer');

var Team = [];

const AddMoreMembers = async () => {
	const { selection } = await ShowMenu();
	if (selection == 'Engineer') {
		PromptEngineer().then((newEngineer) => {
			Team.push(newEngineer);
			AddMoreMembers();
		});
	} else if (selection == 'Intern') {
		PromptIntern().then((newEngineer) => {
			AddMoreMembers();
			Team.push(newEngineer);
		});
	} else {
		generatePage();
	}
};
const generatePage = () => {
	writeFileSync(`dist/index.html`, getPage(Team));
	console.log(`Readme.md generated successfully in ${process.cwd()}/dist`);
};
const AddMembers = () => {
	PromptManager().then(async (newManager) => {
		Team.push(newManager);
		await AddMoreMembers();
	});
};

function init() {
	AddMembers();
}
// Function call to initialize app
init();
