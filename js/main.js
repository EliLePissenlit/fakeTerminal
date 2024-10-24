const config = {
    help: "Commandes disponibles : ls, cat, whoami, date, clear, help",
    welcome: "Bienvenue sur mon CV interactif ! Tape 'help' pour voir les commandes disponibles.",
    invalid_command: "Commande non trouvée : ",
    files: {
        "about.txt": "Ce CV est une simulation de terminal en JavaScript.",
        "contact.txt": "e.clement1002@gmail.com +33 7 57 87 14 44",
        "interests.txt": ""
    }
};

function Terminal(prompt, cmdLine, output) {
    this.prompt = prompt;
    this.cmdLine = cmdLine;
    this.output = output;
    this.completePrompt = "guest@cv:~$ ";
}
Terminal.prototype.init = function() {
    this.prompt.textContent = this.completePrompt;  
    this.output.innerHTML = config.welcome + "<br/>"; 
    this.cmdLine.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            this.handleCmd();
        }
    });
};



Terminal.prototype.handleCmd = function() {
    const command = this.cmdLine.value.trim(); 
    this.output.innerHTML += `<span class="prompt-color">${this.completePrompt}</span> ${command}<br/>`;  // Affiche le prompt et la commande entrée
    this.cmdLine.value = ""; 
    this.execCommand(command); 
    this.output.innerHTML += "<br/>";  
    this.output.scrollTop = this.output.scrollHeight; 
};





Terminal.prototype.execCommand = function(cmd) {
    const [command, ...args] = cmd.split(" ");
    switch (command) {
        case "ls":
            this.output.innerHTML += Object.keys(config.files).join("<br/>");
            break;
        case "cat":
            this.output.innerHTML += config.files[args[0]] || config.invalid_command + args[0];
            break;
        case "whoami":
            this.output.innerHTML += "guest";
            break;
        case "date":
            this.output.innerHTML += new Date().toString();
            break;
        case "clear":
            this.output.innerHTML = "";
            break;
        case "help":
            this.output.innerHTML += config.help;
            break;
        default:
            this.output.innerHTML += config.invalid_command + cmd;
    }
};

// Initialisation du terminal
window.onload = function() {
    new Terminal(
        document.getElementById("prompt"),
        document.getElementById("cmdline"),
        document.getElementById("output")
    ).init();
};
