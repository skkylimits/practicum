import requests
import os
from bottle import Bottle, run

app = Bottle()

# Get GameMaster details from environment variables
gamemaster_ip = os.getenv('GAMEMASTER_IP')
gamemaster_port = os.getenv('GAMEMASTER_PORT')
gamemaster_url = f'http://{gamemaster_ip}:{gamemaster_port}'


# Print the values
print(f'GAMEMASTER_IP: {gamemaster_ip}')
print(f'GAMEMASTER_PORT: {gamemaster_port}')


# Function to register the Handelaar with the GameMaster
def register_handelaar():
    # Definieer de URL van het eindpunt
    url = f'{gamemaster_url}/handelaar'

    # Definieer de gegevens die naar het eindpunt moeten worden verzonden
    data = {
        'handelaar': 'Handelaar'
    }

    # Stuur het verzoek naar de server
    response = requests.post(url, json=data)

    # Controleer de statuscode van het antwoord
    if response.status_code == 200:
        print('Handelaar succesvol aangemeld!')
    else:
        print('Fout bij het aanmelden van de handelaar:', response.json())


# Endpoint to handle startSession
@app.post('/startSession')
def start_session():
    print('Start session received')
    return 'Session started'


if __name__ == '__main__':
    # Register the Handelaar with the GameMaster
    register_handelaar()
    # Start the Bottle server
    run(app, host='localhost', port=8000)
