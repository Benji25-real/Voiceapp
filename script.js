const dictionnaireFacultes = {
    "SI": "Sciences Informatiques",
    "SE": "Sciences économiques ",
    "DR": "Droit",
    "SP": "Sciences Politiques",
    "PO": "Polytechnique",
    "GE": "Géosciences",
    "JO": " Sciences informatives",
    "ME": "Médecine",
    "PE": "Pédagogie"
}
    let faculteEtudiantConnecte = "";

const champMatricule = document.getElementById("champ-matricule");
const affichageFaculte = document.getElementById("affichage-faculte");

if (champMatricule) {
    champMatricule.addEventListener("input", function() {
        const valeur = champMatricule.value.trim();
        
        if (valeur.length >= 2) {
            const deuxLettres = valeur.slice(0, 2).toUpperCase();
            
            if (dictionnaireFacultes[deuxLettres]) {
                faculteEtudiantConnecte = dictionnaireFacultes[deuxLettres];
                affichageFaculte.innerText = "Faculté détectée : " + faculteEtudiantConnecte;
                affichageFaculte.style.color = "#4cd137"; 
            } else {
                faculteEtudiantConnecte = "";
                affichageFaculte.innerText = "Code de matricule inconnu.";
                affichageFaculte.style.color = "#ff4757"; 
            }
        } else {
            affichageFaculte.innerText = ""; 
        }
    });
}

const formulaireVote = document.getElementById("formulaire-vote");

if (formulaireVote) {
    formulaireVote.addEventListener("submit", function(event) {
        event.preventDefault(); 
        
        const matricule = document.getElementById("champ-matricule").value.trim();
        const nom = document.getElementById("champ-nom").value.trim();
        const email = document.getElementById("champ-email").value.trim();
        const password = document.getElementById("champ-password").value.trim();
        
        if (!faculteEtudiantConnecte) {
            alert("Veuillez saisir un matricule valide commençant par un code de faculté correct (SI, SE, DR, etc.).");
            return;
        }
        
        localStorage.setItem("user_matricule", matricule);
        localStorage.setItem("user_nom", nom);
        localStorage.setItem("user_email", email);
        localStorage.setItem("user_password", password);
        localStorage.setItem("user_faculte", faculteEtudiantConnecte);
        
        alert("Compte créé avec succès pour la faculté : " + faculteEtudiantConnecte);
        
        window.location.href = "accueil.html"; 
    });
}

function tenterVoter(faculteCandidat, posteCandidat) {
    const faculteDeLUtilisateur = localStorage.getItem("user_faculte");
    
    if (posteCandidat === "president_univ") {
        enregistrerLeVoteOfficiel(posteCandidat);
        return;
    }
    
    if (faculteDeLUtilisateur !== faculteCandidat) {
        alert(" Vote refusé ! Vous appartenez à la faculté des " + faculteDeLUtilisateur + ". Vous ne pouvez pas voter pour un candidat de la faculté de " + faculteCandidat + ".");
    } else {
        enregistrerLeVoteOfficiel(posteCandidat);
    }
}

function enregistrerLeVoteOfficiel(poste) {
    alert(" Votre vote pour le poste de " + poste + " a été enregistré avec succès !");
}

const formulaireIPQ = document.getElementById("formulaire-ipq");
const listeMessagesIpq = document.getElementById("liste-messages-ipq");
if (formulaireIPQ) {
    formulaireIPQ.addEventListener("submit", function(event) {
        event.preventDefault();

        const texteIdee = document.getElementById("champ-idees").value.trim();
        const textePreoc = document.getElementById("champ-preoccupations").value.trim();
        const texteQuest = document.getElementById("champ-questions").value.trim();

        if (!texteIdee && !textePreoc && !texteQuest) {
            alert(" Veuillez remplir au moins un des trois champs avant d'envoyer.");
            return;
        }

const auteurMatricule = localStorage.getItem("user_matricule") || "Anonyme";
const auteurFaculte = localStorage.getItem("user_faculte") || "Non spécifiée";

const nouvelleContribution = {
            matricule: auteurMatricule,
            faculte: auteurFaculte,
            idee: texteIdee || "Aucune proposition",
            preoccupation: textePreoc || "Aucune plainte",
            question: texteQuest || "Aucune question",
            date: new Date().toLocaleDateString("fr-FR")
        };

            let historiqueExistant = JSON.parse(localStorage.getItem("liste_ipq")) || [];
            historiqueExistant.push(nouvelleContribution);
            localStorage.setItem("liste_ipq", JSON.stringify(historiqueExistant));
            alert(" Vos données IPQ ont été enregistrées localement pour cette session !");
        
formulaireIPQ.reset();

          afficherHistoriqueIPQ();
    });
}
function afficherHistoriqueIPQ() {
    if (!listeMessagesIpq) return;

    const historique = JSON.parse(localStorage.getItem("liste_ipq")) || [];
    const monMatricule = localStorage.getItem("user_matricule");
const mesContributions = historique.filter(item => item.matricule === monMatricule);

    if (mesContributions.length === 0) {
        listeMessagesIpq.innerHTML = `<p style="color: #748d93; font-style: italic;">Vous n'avez pas encore envoyé de message.</p>`;
        return;
    }

    listeMessagesIpq.innerHTML = mesContributions.map(item => `
        <div style="background: #2c3e50; border-left: 4px solid #ff4757; padding: 12px; margin-bottom: 15px; border-radius: 4px;">
            <small style="color: #ff4757; font-weight: bold;">Soumis le ${item.date} par ${item.matricule} (${item.faculte})</small>
            <p style="margin: 5px 0; font-size: 14px;"><strong>💡 Idée :</strong> ${item.idee}</p>
            <p style="margin: 5px 0; font-size: 14px;"><strong>⚠️ Préoccupation :</strong> ${item.preoccupation}</p>
            <p style="margin: 5px 0; font-size: 14px;"><strong>❓ Question :</strong> ${item.question}</p>
        </div>
    `).join('');
}

document.addEventListener("DOMContentLoaded", afficherHistoriqueIPQ);
const formulaireConnexion = document.getElementById("formulaire-connexion");

if (formulaireConnexion) {
    formulaireConnexion.addEventListener("submit", function(event) {
        event.preventDefault(); 

        const matriculeTape = document.getElementById("champ-matricule-connexion").value.trim();
        const passwordTape = document.getElementById("champ-password-connexion").value.trim();

        const matriculeStocke = localStorage.getItem("user_matricule");
        const passwordStocke = localStorage.getItem("user_password");

        if (matriculeTape === matriculeStocke && passwordTape === passwordStocke) {
            alert("Connexion réussie ! Bienvenue sur votre espace Voice.");
            window.location.href = "accueil.html";
        } else {
            alert("Matricule ou mot de passe incorrect. Veuillez réessayer.");
        }
    });
}
function validerConnexion(event) {
    event.preventDefault(); 


    const matriculeTape = document.getElementById("champ-matricule").value.trim();
    const emailTape = document.getElementById("champ-email-connexion").value.trim();
    const passwordTape = document.getElementById("champ-password-connexion").value.trim();

    const matriculeStocke = localStorage.getItem("user_matricule");
    const emailStocke = localStorage.getItem("user_email");
    const passwordStocke = localStorage.getItem("user_password");

    if (matriculeTape === matriculeStocke && emailTape === emailStocke && passwordTape === passwordStocke) {
        alert(" Connexion réussie ! Bienvenue sur votre tableau de bord Voice.");
        window.location.href = "accueil.html"; 
    } else {
        alert(" Connexion échouée : Matricule, E-mail ou Mot de passe incorrect.");
    }
}


function tenterVoter(faculteCandidat, posteCandidat) {
    const faculteDeLUtilisateur = localStorage.getItem("user_faculte");
    const dejaVote = localStorage.getItem("user_a_vote");

    if (dejaVote === "A voté") {
        alert(" Action impossible ! Votre profil indique que vous avez déjà validé votre participation à ce scrutin.");
        return;
    }
    
    if (posteCandidat === "president_univ") {
        enregistrerLeVoteOfficiel(posteCandidat);
        return;
    }
    
    if (faculteDeLUtilisateur !== faculteCandidat) {
        alert(" Vote refusé ! Vous êtes en " + faculteDeLUtilisateur + ". Vous ne pouvez pas voter en " + faculteCandidat + ".");
    } else {
        enregistrerLeVoteOfficiel(posteCandidat);
    }
}

function enregistrerLeVoteOfficiel(poste) {
    localStorage.setItem("user_a_vote", "A voté");
    
    alert(" Votre vote pour le poste de " + poste + " a été pris en compte !");
    
    window.location.href = "profil.html";
}
function dirigerVersScrutin(typePoste) {
    const faculte = localStorage.getItem("user_faculte");
    const annee = localStorage.getItem("user_annee") || "L1";
    const statutVote = localStorage.getItem("user_a_vote");

    if (statutVote === "A voté") {
        alert(" Accès refusé : Votre profil indique que vous avez déjà validé votre participation à ce scrutin.");
        window.location.href = "profil.html";
        return;
    }

    if ((typePoste === "CP" || typePoste === "CPA") && annee !== "L1") {
        alert(" Accès refusé : L'élection des Chefs de Promotion (CP/CPA) est strictement réservée aux étudiants de première année (L1).");
        return;
    }

    function dirigerVersScrutin(typePoste) {
    const matricule = localStorage.getItem("user_matricule") || "";
    const faculte = localStorage.getItem("user_faculte") || "";
    const statutVote = localStorage.getItem("user_a_vote") || "Non voté";

    if (statutVote === "A voté") {
        alert(" Accès refusé : Votre profil indique que vous avez déjà validé votre participation à ce scrutin.");
        window.location.href = "profil.html";
        return;
    }

    let promotion = "";
    if (matricule.length >= 3) {
        const chiffrePromotion = matricule.charAt(2); 
        
        if (chiffrePromotion === "0") {
            promotion = "L1";
        } else if (chiffrePromotion === "1") {
            promotion = "L2";
        } else if (chiffrePromotion === "2") {
            promotion = "L3";
        } else {
            promotion = "Autre";
        }
    }

    switch (typePoste) {
        
        case "CP":
            if (promotion !== "L1") {
                alert(" Accès refusé : Le vote pour le Chef de Promotion (CP) est strictement réservé aux étudiants de L1.");
                return;
            }
            if (faculte === "Sciences économiques ") {
                window.location.href = "cpfase.html";
            } else if (faculte === "Droit") {
                window.location.href = "cpdroit.html";
            } else if (faculte === "Sciences Politiques") {
                window.location.href = "cppolitiques.html";
            } else if (faculte === "Polytechnique") {
                window.location.href = "cppolytech.html";
            } else if (faculte === "Médecine") {
                window.location.href = "cpmédecine.html";
            } else if (faculte === "Sciences Informatiques") {
                window.location.href = "cpfasi.html";
            } else if (faculte === "Sciences de informatives") {
                window.location.href = "cpjournalsime.html";
            } else if (faculte === "Géosciences") {
                window.location.href = "géosciences.html";
            } else if ( faculte === "Pédagogie") {
                window.location.href = "cppédagogie"
            } else {
                alert("Fichier de vote CP en cours de configuration pour cette faculté.");
            }
            break;

        case "CPA":
            if (promotion !== "L1") {
                alert("Accès refusé : Le vote pour le Chef de Promotion Adjoint (CPA) est strictement réservé aux étudiants de L1.");
                return;
            }
            if (faculte === "Droit") {
                window.location.href = "cpadroit.html";
            } else if (faculte === "Médecine") {
                window.location.href = "cpamédecine.html";
            } else if (faculte === "Pédagogie") {
                window.location.href = "cpapédagogie.html";
            } else if (faculte === "Polytechnique") {
                window.location.href = "cpapolytech.html";
            } else if (faculte === "Géosciences") {
                window.location.href = "cpagéosciences.html";
            } else if (faculte === "Sciences économiques") {
                window.location.href = "cpafase.html";
            } else if (faculte === "Sciences informatiques") {
                window.location.href = "cpafasi.html";
            } else if (faculte === "Sciences de informatives") {
                window.location.href = "cpajournalsime.html";
            } else if (faculte === "Sciences Politiques") {
                window.location.href = "cpapolitiques.html";
            } else {
                alert("Fichier de vote CPA en cours de configuration pour cette faculté.");
            }
            break;

        case "PREFAC":
            if (faculte === "Droit") {
                window.location.href = "droit.html";
            } else if (faculte === "Sciences économiques ") {
                window.location.href = "FASE.html";
            } else if (faculte === "Géosciences") {
                window.location.href = "géosciences.html";
            } else if (faculte === " Sciences de informatives") {
                window.location.href = "journalisme.html";
            } else if (faculte === "Médecine") {
                window.location.href = "médecine.html";
            } else if (faculte === "Pédagogie") {
                window.location.href = "pédagogie.html";
            } else if (faculte === "Polytechnique") {
                window.location.href = "Polytech.html";
            } else if (faculte === "Sciences Politiques") {
                window.location.href = "Politiques.html";
            } else if (faculte === "Sciences Informatiques") {
                window.location.href = "FASI.html";
            }
            break;

        case "PRESIDENCE":
            window.location.href = "présidence.html";
            break;
    }
}
}
