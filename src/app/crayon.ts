

export default class Crayon{
  static crayonList = document.querySelector('#crayonList');
  static crayonType = [
    "bille",
    "plume",
    "couleur",
    "feutre",
    "bois",
  ]

  constructor(
    private _marque?: string,
    private _type?: string,
    private _quantite?: number,
  ) {}

  async getCrayons(){
    const crayons = await fetch("http://localhost:3000/crayons",{
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let crayonList = await crayons.json();
    
    crayonList.forEach(crayon => {   
      const liste = document.querySelector('.liste-crayon')   
      const ionItem = document.createElement('ion-item');
      ionItem.innerHTML = `
      <div class="crayon" id="${crayon.id}">
        <ion-label>
          <h2>Modèle : ${crayon.marque}</h2>
          <h3>Type : ${crayon.type}</h3>
          <p>Quantité : ${crayon.quantite}</p>
          <ion-button data-id="${crayon.id}" class="modifier"><ion-icon slot="icon-only" name="build" ></ion-icon></ion-button>
          <ion-button class="supprimer"><ion-icon slot="icon-only" name="trash-bin"></ion-icon></ion-button>
        </ion-label>
      </div>
      `;
      Crayon.crayonList.insertBefore(ionItem, Crayon.crayonList.firstElementChild);      
    });
  }

  // fonction de suppression d'un crayon
  async deleteCrayon(){
    const idCrayon = document.querySelector('.crayon');
    if(idCrayon){
      await fetch("http://localhost:3000/crayons/" + idCrayon.id,{
        method: "DELETE",
      }).then(()=>{
          window.alert("Crayon supprimé");
          window.location.reload();
        }
      )
    }
  }
  
  
  // fonction de suppression d'un crayon
  async modifCrayon(){
    const idCrayon = document.querySelector('.crayon');
    if(idCrayon){
      const getCrayon = await fetch("http://localhost:3000/crayons/" + idCrayon.id,{
        method: "GET",
        body: JSON.stringify(idCrayon)
      });
      await fetch("http://localhost:3000/crayons/" + idCrayon.id,{
        method: "PATCH",
        body: JSON.stringify(getCrayon)
      }).then(()=>{
        window.alert("Crayon modifié");
        window.location.reload();
      })
    }
  }

  async promptCrayon(title = "Ajouter un crayon", firstLaunch = true, modification = false, id?: any){
    console.log(title,firstLaunch,modification,id);
    
    const alert = document.createElement('ion-alert') as any;
    alert.header = title;
    alert.mode = "ios";

    
    if(firstLaunch){
      alert.inputs = [
        {
          type: 'text',
          name: 'marque',
          placeholder: 'Indiquez la marque',
          maxlength: 50
        },
        {
          type: 'number',
          name: "quantite",
          placeholder: "Quantité",
          min: 1
        }
      ],
      alert.buttons = [
        {
          text: 'Go !',
          handler: (crayon: any) => {
            this._marque = crayon.marque;
            this._quantite = crayon.quantite;
          }
        }
      ];
    } else {
      console.log(title,firstLaunch,modification,id);
      
      alert.inputs = Crayon.crayonType.map(type => ({
        type: 'radio',
        value: type,
        label: type
      }));
      alert.buttons = [
        {
          text: 'Go !',
          handler: (type: any) => {
            // si on est pas dans la modification alors on ajoute un crayon sinon on le modifie
            if(!modification){
              let result = {
                marque: this._marque,
                type: type,
                quantite: this._quantite
              };
              let options: object = {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
              }
              fetch("http://localhost:3000/crayons", {
                ...options,
                body: JSON.stringify(result)
              }).then(()=>{
                window.alert('Le crayon a bien été créé');
                window.location.reload();
              })
            } else {
              // gestion de la modification du crayon
              let result = {
                marque: this._marque,
                type: type,
                quantite: this._quantite
              };
              let options: object = {
                method: "PATCH",
                headers: {
                  "content-type": "application/json",
                },
              }
              fetch("http://localhost:3000/crayons/" + id, {
                ...options,
                body: JSON.stringify(result)
              }).then(()=>{
                window.alert('Le crayon a bien été modifié');
                window.location.reload();
              })
            }
          }
        }
      ];
    }    

    document.body.appendChild(alert);
    await alert.present();

    if (firstLaunch) {
      alert.onDidDismiss().then(() => this.promptCrayon('Ajouter une quantité', false, modification, id));
    }    
  }
}