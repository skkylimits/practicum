const Hapi = require('@hapi/hapi');

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello, Postbus!';
        }
    });

    // Endpoint voor het ontvangen van het startsein van een sessie en handelaren van de GameMaster
    server.route({
        method: 'POST',
        path: '/startSession',
        handler: (request, h) => {
            return 'Hello, Postbus!';
        }
    });

    // Endpoint voor het ontvangen van berichten over goederen van een handelaar
    server.route({
        method: 'POST',
        path: '/goods',
        handler: (request, h) => {
            return 'Endpoint voor het ontvangen van berichten over goederen van een handelaar';
        }
    });

    // Endpoint voor het afsluiten van een sessie
    server.route({
        method: 'POST',
        path: '/endSession',
        handler: (request, h) => {
            return 'Endpoint voor het afsluiten van een sessie';
        }
    });

    // Endpoint voor het ontvangen van statistieken
    server.route({
        method: 'GET',
        path: '/statistics',
        handler: (request, h) => {
            return 'Endpoint voor het ontvangen van statistieken';
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
