# READme

## Run Dockerfile

Om deze Dockerfile uit te voeren en een Docker-image te bouwen, moet je de volgende stappen volgen:

- Zorg ervoor dat je in de directory bent waarin je Dockerfile en de bijbehorende servercode zich bevinden.

- Gebruik het `docker build` commando om een Docker-image te bouwen. Voer het volgende commando uit in de terminal:

```bash
sudo docker build -f dockerfile.yml -t gamemaster-server .
```

Hierbij is "gamemaster-server" de naam die je aan het Docker-image geeft. Je kunt hier elke gewenste naam gebruiken.

- Nadat het buildproces is voltooid, kun je een Docker-container maken en uitvoeren op basis van het gebouwde Docker-image met behulp van het `docker run` commando:

```bash
docker run -p 10000:10000 gamemaster-server
```

Dit commando maakt een nieuwe Docker-container op basis van het gebouwde Docker-image en stelt poort 10000 van de host in op poort 10000 van de container, waar de GameMaster-server naar luistert. De server zal nu draaien in de Docker-container.

Je kunt de server testen door een bericht te sturen naar `http://localhost:10000/report` met behulp van een POST-tool zoals

## GameMaster V1

`npm install @hapi/hapi`

## Kill process

To list all active ports and processes using them, you can use the `netstat` command or `lsof` command. Here's how you can do it:

Using `netstat`:

```bash
netstat -tuln
```

Using `lsof`:

```bash
lsof -i -P -n | grep LISTEN
```

These commands will list all the ports that are actively being listened on.

To kill a process using a specific port, you can use the `kill` command with the process ID (PID) of the process. First, identify the PID of the process using the port you want to kill, then use the `kill` command to terminate it.

For example, if you want to kill a process using port 3000:

- Find the PID of the process using port 3000:

```bash
lsof -i :3000
```

This will give you the PID of the process.

- Once you have the PID, you can use the `kill` command to terminate the process:

```bash
kill <PID>
```

Replace `<PID>` with the actual process ID you obtained from the previous command.

Please be cautious when killing processes, as terminating processes abruptly can have unintended consequences. Make sure you understand which process you're terminating and its potential impact on your system.

To list all open ports along with the processes that are using them, you can combine the `netstat` or `ss` command with `ps`. Here's how you can do it using `netstat`:

```bash
sudo netstat -tulnep
```

This command will display a list of all listening ports along with the corresponding processes that are using them. It includes information about the PID and the process name.

Similarly, you can use `ss` command to achieve the same:

```bash
sudo ss -tulnp
```

Both commands will require superuser privileges (`sudo`) to display detailed information about the processes. The output will show you a list of listening ports, the corresponding processes, their PIDs, and more.

Choose the command that best suits your system's configuration or availability.

You can set environment variables in your shell environment using commands directly in your terminal. Here's how you can do it:

### Setting Environment Variables in Terminal

1. **Open a Terminal**:
   Open your terminal application. This could be Terminal on macOS, Command Prompt on Windows, or any terminal emulator in Linux.

2. **Execute Commands**:
   Enter the following commands to set the environment variables:

   ```sh
   export GAMEMASTER_IP=127.0.0.1
   export GAMEMASTER_PORT=10000
   ```

   This will set the `GAMEMASTER_IP` variable to `127.0.0.1` (localhost) and `GAMEMASTER_PORT` to `10000`.

3. **Verify Environment Variables**:
   You can verify that the environment variables are set correctly by echoing their values:

   ```sh
   echo $GAMEMASTER_IP
   echo $GAMEMASTER_PORT
   ```

   If set correctly, you should see the values `127.0.0.1` and `10000` respectively.

### Saving Environment Variables

If you want these environment variables to persist across terminal sessions, you can add these export commands to your shell's configuration file (`~/.bashrc`, `~/.zshrc`, etc.).

For example, to add them to `~/.bashrc`, you can use a text editor like `nano` or `vim`:

```sh
nano ~/.bashrc
```

Then add the export commands at the end of the file:

```sh
export GAMEMASTER_IP=127.0.0.1
export GAMEMASTER_PORT=10000
```

Save the file and exit the text editor. The changes will take effect the next time you open a terminal session.

### Using a File

Alternatively, you can store these commands in a shell script file (e.g., `set_env_variables.sh`) and execute the script whenever you need to set the environment variables:

```sh
#!/bin/bash

export GAMEMASTER_IP=127.0.0.1
export GAMEMASTER_PORT=10000
```

Make the script executable:

```sh
chmod +x set_env_variables.sh
```

Then execute the script:

```sh
./set_env_variables.sh
```

This will set the environment variables for the current terminal session.

Choose the method that best suits your workflow and preferences.
