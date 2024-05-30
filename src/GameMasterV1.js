const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 10000;

app.use(bodyParser.json());

// Datastructuur voor het bijhouden van informatie in de Game Master
const gameData = {
    handelaren: [],
    postbussen: [],
    inactieveHandelaren: [],
    inactievePostbussen: [],
    statistieken: {
        aantalRondenTotaal: 0,
        perHandelaar: [], // Array van objecten voor elke handelaar
    },
    constanten: {
        aantalRondenPerSessie: 10,
        winstVerlies: {
            winst: 0,
            verlies: 0,
        },
    },
};

// Functie om een handelaar toe te voegen aan de lijst van handelaren
function voegHandelaarToe(handelaar) {
    gameData.handelaren.push(handelaar);
}

// Functie om een postbus toe te voegen aan de lijst van postbussen
function voegPostbusToe(postbus) {
    gameData.postbussen.push(postbus);
}

// Functie om een inactieve handelaar toe te voegen aan de lijst van inactieve handelaren
function voegInactieveHandelaarToe(handelaar) {
    gameData.inactieveHandelaren.push(handelaar);
}

// Functie om een inactieve postbus toe te voegen aan de lijst van inactieve postbussen
function voegInactievePostbusToe(postbus) {
    gameData.inactievePostbussen.push(postbus);
}

// Functie om statistieken bij te werken na elke handelssessie
function updateStatistieken(handelaar, aantalRonden, winst, verlies) {
    // Update totaal aantal ronden
    gameData.statistieken.aantalRondenTotaal += aantalRonden;

    // Zoek de handelaar in de lijst van handelaren en update zijn statistieken
    const handelaarIndex = gameData.statistieken.perHandelaar.findIndex(h => h.handelaar === handelaar);
    if (handelaarIndex !== -1) {
        gameData.statistieken.perHandelaar[handelaarIndex].aantalRonden += aantalRonden;
        gameData.statistieken.perHandelaar[handelaarIndex].winst += winst;
        gameData.statistieken.perHandelaar[handelaarIndex].verlies += verlies;
    } else {
        // Voeg een nieuw object toe voor de handelaar als hij nog niet bestaat
        gameData.statistieken.perHandelaar.push({
            handelaar: handelaar,
            aantalRonden: aantalRonden,
            winst: winst,
            verlies: verlies,
        });
    }

    // Update winst/verlies totalen
    gameData.constanten.winstVerlies.winst += winst;
    gameData.constanten.winstVerlies.verlies += verlies;
}

app.get('/', (req, res) =>
    res.json({ message: 'GameMaster V1 🐳' })
);

// Root endpoint
app.get('/', (req, res) => {
    res.send('Hello, Gamemaster!');
});

app.post('/handelaar', (req, res) => {
    // Controleren of het vereiste veld 'handelaar' in het verzoek aanwezig is
    if (!req.body || !req.body.handelaar) {
        // Onvolledig verzoek, reageer met statuscode 400 (Bad Request)
        return res.status(400).json({ error: 'Handelaar is niet opgegeven in het verzoek.' });
    }

    // De handelaar uit het verzoek halen
    const { handelaar } = req.body;
    
    // VoegHandelaarToe aan gameData
    voegHandelaarToe(handelaar);

    // Handelaar toevoegen
    console.log('Handelaar toegevoegd:', handelaar);

    // Succesvolle reactie met statuscode 200 (OK)
    res.status(200).send('Handelaar succesvol aangemeld!');
});

// Endpoint voor het aanmelden van een Postbus
app.post('/postbus', (req, res) => {
    // Hier kun je logica toevoegen om een Postbus aan te melden
    res.send('Postbus aangemeld!');
    return 'Postbus aangemeld'
});

// Endpoint voor het ophalen van statistieken van de laatste sessie
app.get('/statistics', (req, res) => {
    // Hier kun je logica toevoegen om statistieken op te halen
    res.send('Statistieken van de laatste sessie');
});

// Endpoint voor het rapporteren van alle statistieken tot nu toe
app.post('/report', (req, res) => {
    // Hier kun je logica toevoegen om alle statistieken tot nu toe te rapporteren
    const response = {
        sessions: gameData.statistieken.aantalRondenTotaal,
        profits: {
            winst: gameData.constanten.winstVerlies.winst,
            verlies: gameData.constanten.winstVerlies.verlies,
        }
    };
    res.json(response);
});


app.listen(port, () => console.log(`app listening on http://localhost:${port}`));


