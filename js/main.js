const config = {
    help: "Commandes disponibles : ls, cat, whoami, date, clear, help, linkedin, cv, contact, compteur, ascii",
    welcome: "Bienvenue sur mon CV interactif ! Tape 'help' pour voir les commandes disponibles.",
    invalid_command: "Commande non trouvée : ",
    files: {
        "about.txt": `Elodie CLEMENT, Développeuse à la recherche d'une alternance en développement pour l'année 2024/2025.\n
Actuellement étudiante à l'ESGI, j'ai une base solide en informatique,
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
    this.commandHistory = [];
    this.historyIndex = -1;
    this.commandCounter = 0;
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
        } else if (event.key === "ArrowUp") { 
            event.preventDefault();
            this.showPreviousCommand();
        } else if (event.key === "ArrowDown") { 
            event.preventDefault();
            this.showNextCommand();
        }
    });
};

Terminal.prototype.showPreviousCommand = function() {
    if (this.historyIndex > 0) { 
        this.historyIndex--;
        this.cmdLine.value = this.commandHistory[this.historyIndex];
    }
};

Terminal.prototype.showNextCommand = function() {
    if (this.historyIndex < this.commandHistory.length - 1) { 
        this.historyIndex++;
        this.cmdLine.value = this.commandHistory[this.historyIndex];
    } else { 
        this.historyIndex = this.commandHistory.length;
        this.cmdLine.value = "";
    }
};



Terminal.prototype.handleCmd = function() {
    const command = this.cmdLine.value.trim(); 
    this.output.innerHTML += `<span class="prompt-color">${this.completePrompt}</span> ${command}<br/>`;
    
    if (command) { 
        this.commandHistory.push(command); 
        this.historyIndex = this.commandHistory.length; 
    }  


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
            this.commandCounter++;
            break;
        case "cat":
            if (config.files[args[0]]) {
                this.output.innerHTML += config.files[args[0]].replace(/\n/g, "<br/>");
                this.commandCounter++;
            } else {
                this.output.innerHTML += config.invalid_command + args[0];
            }
            break;
        case "whoami":
            this.output.innerHTML += "guest";
            this.commandCounter++;
            break;
        case "date":
            this.output.innerHTML += new Date().toString();
            this.commandCounter++;
            break;
        case "clear":
            this.output.innerHTML = "";
            this.commandCounter++;
            break;
        case "help":
            this.output.innerHTML += config.help;
            this.commandCounter++;
            break;
        case "linkedin":
            window.open("https://www.linkedin.com/in/eli-clement", "_blank");
            this.commandCounter++;
            break;
        case "cv":
            const cvLink = document.createElement("a");
            cvLink.href = "./assets/ClementElodieCV.pdf"; 
            cvLink.download = "cv-elodie-clement.pdf";
            cvLink.click();
            this.output.innerHTML += "Téléchargement du CV lancé.";
            break;
            case "contact":
                const contactFormContainer = document.getElementById("contactFormContainer");
                if (contactFormContainer) {
                    contactFormContainer.classList.remove("hidden");
                    this.output.innerHTML += "Le formulaire de contact a été ouvert.";
                    this.commandCounter++;
                } else {
                    this.output.innerHTML += "Erreur : le formulaire de contact n'a pas pu être ouvert.";
                }
                break;
            case "compteur":
                this.commandCounter++;
                this.output.innerHTML += `Nombre de commandes exécutées : ${this.commandCounter}`;
                break;
                case "ascii":
                    this.output.innerHTML += `<pre>
                 ######   ######   #######  ##   ##  #######  #######          ##   ##   #####    ####             #######  ##   ##             ##     ####     ######   #######  ######   ##   ##    ##     ##   ##    ####   #######            #####   ##   ##  ######
                 ##  ##   ##  ##   ##   #  ###  ##   ##   #  #   ##            ### ###  ##   ##    ##               ##   #  ###  ##            ####     ##      # ## #    ##   #   ##  ##  ###  ##   ####    ###  ##   ##  ##   ##   #           ##   ##  ##   ##   ##  ##
                 ##  ##   ##  ##   ## #    #### ##   ## #       ##             #######  ##   ##    ##               ## #    #### ##           ##  ##    ##        ##      ## #     ##  ##  #### ##  ##  ##   #### ##  ##        ## #             #         ## ##    ##  ##
                 #####    #####    ####    ## ####   ####      ##              #######  ##   ##    ##               ####    ## ####           ##  ##    ##        ##      ####     #####   ## ####  ##  ##   ## ####  ##        ####              #####    ## ##    #####
                 ##       ## ##    ## #    ##  ###   ## #     ##               ## # ##  ##   ##    ##               ## #    ##  ###           ######    ##   #    ##      ## #     ## ##   ##  ###  ######   ##  ###  ##        ## #                  ##    ###     ##
                 ##       ##  ##   ##   #  ##   ##   ##   #  ##    #           ##   ##  ##   ##    ##               ##   #  ##   ##           ##  ##    ##  ##    ##      ##   #   ##  ##  ##   ##  ##  ##   ##   ##   ##  ##   ##   #           ##   ##    ###     ##
                 ##       ###  ##  ####### ##   ##  #######  #######           ##   ##   #####    ####             #######  ##   ##           ##  ##   #######   ####    #######  #### ##  ##   ##  ##  ##   ##   ##    ####   #######            #####      #     ####
                    </pre>`;
                    this.commandCounter++;
                    break;
                
        default:
            this.output.innerHTML += config.invalid_command + cmd;
    }



const counterDisplay = document.getElementById("commandCounterDisplay");
    if (counterDisplay) {
        counterDisplay.textContent = `Commandes exécutées : ${this.commandCounter}`;
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
        const commands = ["ls", "cat", "whoami", "date", "clear", "help", "linkedin", "cv", "contact", "compteur", "ascii"];
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

/*form*/
document.getElementById('contactBtn').addEventListener('click', () => {
    document.getElementById('contactFormContainer').classList.remove('hidden');
});

document.getElementById('closeForm').addEventListener('click', () => {
    document.getElementById('contactFormContainer').classList.add('hidden');
});

document.getElementById('contactForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    emailjs.send("service_a1akkxs","template_c9vo4yk", {
        from_name: name,      
        reply_to: email,      
        message: message      
    })
    .then(() => {
        alert("Votre message a été envoyé !");
        document.getElementById('contactFormContainer').classList.add('hidden');
    })
    .catch((error) => {
        alert("Erreur lors de l'envoi de votre message.");
        console.error("Erreur EmailJS :", error); 
    });
});
