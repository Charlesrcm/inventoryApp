import Crayon from './app/crayon';

document.addEventListener('deviceready', onDeviceReady, false);

async function onDeviceReady(){
  const newCrayon = new Crayon();

  //affichage des crayon dans l'api
  await newCrayon.getCrayons();
  
  
  // fonction de status de la batterie avec plugin cordova
  window.addEventListener("batterystatus", onBatteryStatus, false);
  function onBatteryStatus(status){
    const battery = document.querySelector('#battery');
    battery.innerHTML = `<ion-icon name="battery-half-outline"></ion-icon>` + status.level + `%`;
  }

  const btnSupprimer = document.querySelectorAll('.supprimer');
 
  const btnModification = document.querySelectorAll('.modifier');
  

  const btnCreateCrayon = document.querySelector('#addCrayon');
    
  const btnAccueil = document.querySelector('.accueil');
  const btnAjoutCrayon = document.querySelector('.ajout-crayon');
  const btnListe = document.querySelector('.liste-crayon');

  const accueil = document.getElementById('accueil');
  const ajoutCrayon = document.getElementById('ajout-crayon');
  const liste = document.getElementById('liste-crayon');

  accueil.hidden = false;
  ajoutCrayon.hidden = true;
  liste.hidden = true;

  // affichage de l'accueil si on clique sur le bouton dans le menu
  btnAccueil.addEventListener('click', ()=>{        
    if(accueil.hidden === true){
      accueil.hidden = false;
      ajoutCrayon.hidden = true;
      liste.hidden = true;
    }      
  })

  // affichage de l'ajout de crayon si on clique sur le bouton dans le menu
  btnAjoutCrayon.addEventListener('click', ()=>{
    if(ajoutCrayon.hidden === true){
      ajoutCrayon.hidden = false;
      liste.hidden = true;
      accueil.hidden = true;
    }      
  })
  
  // affichage de la liste des crayon ajouté si on clique sur le bouton dans le menu
  btnListe.addEventListener('click', ()=>{
    if(liste.hidden === true){
      liste.hidden = false;
      accueil.hidden = true;
      ajoutCrayon.hidden = true;
    }      
  })
  

  //écouteur si on veut supprimer le crayon
  btnSupprimer.forEach(supprime=>{
    supprime.addEventListener('click', ()=>{
      newCrayon.deleteCrayon();
    })
  })


  // si on veut créer un nouveau crayon
  btnCreateCrayon.addEventListener('click', ()=>{   
    newCrayon.promptCrayon();
  })

  btnModification.forEach(modification=>{
    modification.addEventListener('click', ()=>{
      const id = (modification as HTMLElement).dataset.id;
      newCrayon.promptCrayon("Modifier un crayon", true, true, id);
    })
  })
}