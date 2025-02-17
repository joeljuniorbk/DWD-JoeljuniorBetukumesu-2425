// Functie om te controleren of een wachtwoord correct is
function isCorrectPassword(password) {
	if (password.length < 9) return false; // Minstens 9 tekens
	if (password.includes('@')) return false; // Geen @-teken
	if (password === 'password') return false; // Mag niet "password" zijn
	return true;
}

// Hoofdfunctie
function main() {
	// Alle wachtwoorden
	const passwords = [
		'idRegister',
		'list',
		'ArrayList',
		'registerRef',
		'password',
		'falseRestrictId',
		'password'
	];

	// Print alle wachtwoorden
	console.log('Alle wachtwoorden:');
	passwords.forEach((password, index) => {
		console.log(`${index + 1}. ${password}`);
	});
	console.log();

	// Maak twee lijsten voor correcte en incorrecte wachtwoorden
	const correctPasswords = [];
	const incorrectPasswords = [];

	passwords.forEach(password => {
		if (isCorrectPassword(password)) {
			correctPasswords.push(password);
		} else {
			incorrectPasswords.push(password);
		}
	});

	// Print de twee lijsten
	console.log('Correcte wachtwoorden:');
	console.log(correctPasswords.join(', '));
	console.log();

	console.log('Incorrecte wachtwoorden:');
	console.log(incorrectPasswords.join(', '));
}

// Roep de hoofdfunctie aan
main();