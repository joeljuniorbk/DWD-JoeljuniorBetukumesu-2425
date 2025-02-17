// Constanten
const AANTAL_SPELERS = 10000;
const MIN_GETAL = 1000;
const MAX_GETAL = 9999;

// Constanten voor winstbedragen
const WINST_1_JUIST = 2.5; // €2.5 voor 1 juist cijfer
const WINST_2_JUIST = 10; // €10 voor 2 juiste cijfers
const WINST_3_JUIST = 100; // €100 voor 3 juiste cijfers
const WINST_4_JUIST = 500; // €500 voor 4 juiste cijfers

// Functie om een willekeurig getal tussen min en max te genereren
function genereerWillekeurigGetal(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Functie om het aantal juiste cijfers te bepalen
function aantalJuisteCijfers(getrokkenGetal, spelerGetal) {
	let aantalJuist = 0;

	// Controleer de laatste cijfers met modulo
	if (getrokkenGetal % 1000 === spelerGetal % 1000) {
		aantalJuist = 3; // Laatste 3 cijfers juist
	} else if (getrokkenGetal % 100 === spelerGetal % 100) {
		aantalJuist = 2; // Laatste 2 cijfers juist
	} else if (getrokkenGetal % 10 === spelerGetal % 10) {
		aantalJuist = 1; // Laatste cijfer juist
	}

	// Als alle 4 cijfers juist zijn
	if (getrokkenGetal === spelerGetal) {
		aantalJuist = 4;
	}

	return aantalJuist;
}

// Functie om de winst te berekenen op basis van het aantal juiste cijfers
function berekenWinst(aantalJuist) {
	switch (aantalJuist) {
	case 1:
		return WINST_1_JUIST;
	case 2:
		return WINST_2_JUIST;
	case 3:
		return WINST_3_JUIST;
	case 4:
		return WINST_4_JUIST;
	default:
		return 0; // Geen winst
	}
}

// Hoofdfunctie
function main() {
	// Genereer het getrokken getal
	const getrokkenGetal = genereerWillekeurigGetal(MIN_GETAL, MAX_GETAL);
	console.log('Getrokken getal:', getrokkenGetal);

	// Arrays om de resultaten bij te houden
	const winstCategorieën = [0, 0, 0, 0, 0]; // Index 0 = 0 juist, 1 = 1 juist, ..., 4 = 4 juist
	const winstPerSpeler = [];

	// Simuleer 10000 spelers
	for (let i = 0; i < AANTAL_SPELERS; i++) {
		const spelerGetal = genereerWillekeurigGetal(MIN_GETAL, MAX_GETAL);
		const aantalJuist = aantalJuisteCijfers(getrokkenGetal, spelerGetal);
		const winst = berekenWinst(aantalJuist);

		// Update de winstcategorieën
		winstCategorieën[aantalJuist]++;

		// Voeg de winst toe aan de array
		winstPerSpeler.push(winst);
	}

	// Print de resultaten
	console.log('Resultaten:');
	console.log('0 juist:', winstCategorieën[0]);
	console.log('1 juist:', winstCategorieën[1]);
	console.log('2 juist:', winstCategorieën[2]);
	console.log('3 juist:', winstCategorieën[3]);
	console.log('4 juist:', winstCategorieën[4]);

	// Bereken de gemiddelde winst
	const totaleWinst = winstPerSpeler.reduce((som, winst) => som + winst, 0);
	const gemiddeldeWinst = totaleWinst / AANTAL_SPELERS;
	console.log('Gemiddelde winst: €' + gemiddeldeWinst.toFixed(3));
}

// Roep de hoofdfunctie aan
main();