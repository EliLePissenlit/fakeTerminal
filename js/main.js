const config = {
    help: "Commandes disponibles : ls, cat, whoami, date, clear, help",
    welcome: "Bienvenue sur mon CV interactif ! Tape 'help' pour voir les commandes disponibles.",
    invalid_command: "Commande non trouvée : ",
    files: {
        "about.txt": `Elodie CLEMENT, Développeuse Full Stack à la recherche d'une alternance en développement pour l'année 2024/2025.\n
Actuellement étudiante à l'ESGI, j'ai une base solide en informatique,\n
avec une expérience dans le développement front-end et back-end.`,

        "education.txt": `Éducation :\n
2024 - Présent : ESGI - Cycle Mastère en cours.\n
  Socle solide en informatique, avec un focus sur les aspects théoriques et pratiques du développement logiciel.\n\n
2020 - 2023 : Plovdiv Medical University.\n
  Études de médecine pendant 3 ans avant de me réorienter vers l'informatique.\n\n
2020 : Lycée Jacques Monod.\n
  Obtention du bac scientifique, spécialité Physique.`,

        "experience.txt": `Expérience professionnelle :\n\n
2024 - Stage My Water Technologies.\n
  Développement de nouvelles fonctionnalités et résolution de bugs pour le dashboard administrateur.\n
  Technologies utilisées : React, JavaScript.\n\n
2024 - Projet annuel.\n
  Réalisation d'un site web dynamique en équipe, intégration d'une base de données relationnelle et gestion d'un back-office.\n
  https://www.coscmicgames.online\n\n
2020 - Stage Le Plessis Informatique.\n
  Réparation de matériels informatiques, installation de NAS, systèmes opérateurs, et logiciels.`,

        "skills.txt": `Compétences techniques :\n
- HTML5, CSS3\n
- JavaScript, SQL\n
- C, Figma\n
- Git\n\n
En cours d'apprentissage :\n
- TypeScript et Frameworks (React, Angular ou Vue)\n
- NoSQL et applications mobiles Android\n
- Algorithmique avancée`,

        "languages.txt": `Langues :\n
- Français (C2 - Bilingue)\n
- Anglais (C1 - Avancé)\n
- Bulgare (B2 - Intermédiaire)\n
- Allemand (A2 - Débutant)`,

        "contact.txt": `Contacts :\n
- Email : e.clement1002@gmail.com\n
- Téléphone : +33 7 57 87 14 44\n
- Permis B (en cours)\n
- LinkedIn : www.linkedin.com/in/eli-clement`
    }
};
const sidenavBtn = document.getElementById('sidenavBtn');
const sidenav = document.getElementById('sidenav');

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
        } else if (event.key === "Tab") {
            event.preventDefault(); 
            this.autoComplete(); 
        }
    });
};



Terminal.prototype.handleCmd = function() {
    const command = this.cmdLine.value.trim(); 
    this.output.innerHTML += `<span class="prompt-color">${this.completePrompt}</span> ${command}<br/>`;  
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
            if (config.files[args[0]]) {
                this.output.innerHTML += config.files[args[0]].replace(/\n/g, "<br/>");
            } else {
                this.output.innerHTML += config.invalid_command + args[0];
            }
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

Terminal.prototype.autoComplete = function() {
    const input = this.cmdLine.value.trim(); 
    const splitInput = input.split(" "); 
    const command = splitInput[0]; 
    const args = splitInput.slice(1); 

    let suggestions = [];

  
    if (args.length === 0) {
        const commands = ["ls", "cat", "whoami", "date", "clear", "help"];
        suggestions = commands.filter(cmd => cmd.startsWith(command));
    } else if (command === "cat" && args.length === 1) {
        const partialFileName = args[0];
        const files = Object.keys(config.files);
        suggestions = files.filter(file => file.startsWith(partialFileName));
    }

    if (suggestions.length === 1) {
        if (args.length === 0) {
            this.cmdLine.value = suggestions[0];
        } else {
            this.cmdLine.value = `${command} ${suggestions[0]}`;
        }
    } else if (suggestions.length > 1) {
        this.output.innerHTML += `<br/><span class="prompt-color">${this.completePrompt}</span> Suggestions : ${suggestions.join(", ")}<br/>`;
        this.output.scrollTop = this.output.scrollHeight;
    }
};

sidenavBtn.addEventListener('click', () => {
    sidenav.classList.toggle('open'); 
});