var cardId = 0;
var deckId = 0;
var handId = 0;

//Card : lo que compone los pilones. Hay tipos de cartas. Se pueden repetir. Tienen ID único por creación y tienen posicion en el pilon,

//CardType : Es el tipo de carta. Varias cartas pueden ser la misma carta repetida.
//CardPile : contine las caracteristicas generales de un pilon de cartas. Tiene X cantidad, se puede mezclar y reordenar.

//Deck : Es un pilon, pero de 60 cartas, que se reparten 7 al principio a la Hand y una por turno. Además pertenece a un jugador.

//Hand : Es un pilón, pero de 7 cartas iniciales, que son obtenidas al principio y una por turno. Pertenecen a un jugador. El jugador puede tirar las que quiera cada turno, siempre y cuando las reglas lo permitan.



//Falta que me construya un deck con n cartas a partir de una lista con n cartas. Averiguar API.
//Luego, de ese deck, puedo repartir 7 cartas a la mano
//De la mano las puedo reordenar, o tirarlas al campo de juego

// Carga el mazo seleccionado

var fileInput:any = document.querySelector('#file-input');

document.getElementById('read-button').addEventListener('click', () =>
  loadDeck(fileInput, txt => fetchCardList(newDeckList(txt)))
)

async function fetchCardList(list) {
  const cardList = list;
  const cardListKeys = Object.keys(this.deckCardList);
  const cardListNames = cardListKeys.map((key) => cardList[key].name);
  const cardListPromises:object = cardListNames.map(card => getCard(card));
  const cardListCards = Promise.all(cardListPromises);
  const deckCardObject = await cardListCards;

  return deckCardObject;
}

function newDeckList(txt:string){
      let lines = this.txt.split("\n");
      let numLines = lines.length;
      let cardList = [];
      let idcount = 0;

      // parse
      for ( let i = 0 ; i < numLines ; i++ ) {
        let line = lines[i];

        if ( !((line.indexOf('/') == 0) || (line.indexOf(' ') == -1) || (line.indexOf('SB:') == 0)) )
        {
          let qty = line.match(/\d+/);
          let name = line.match(/\D+/);

          for ( let d = 0 ; d < qty[0] ; d++ ){
            cardList[ idcount++ ] = {
              'name': name[ 0 ].slice( 1 )
            }
          } //endfor
        } //endif
      }

      return cardList;
    }



function loadDeck(fileInput, cb){
  let file = fileInput.files[0];
       const reader = new FileReader();
       reader.readAsText(file);
       reader.onload = readSuccess;
       function readSuccess(evt) {
         cb(evt.target.result);
     }
}

async function getCard(named:string) {
  let url = `https://api.scryfall.com/cards/named?exact=${named}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}



 getCard('Martyr+of+Dusk')
   .then((card) => {
     displayCard(getCardImageUri(card, 'normal'))
   }
 );

function getCardImageUri(object:object, size:string){
   return object['image_uris'][size];
}

function displayCard(source) {
  let img = document.createElement('img');
  document.querySelector(".card").appendChild(img);
  img.src = source;
  //getCardImageUri(getCard()).then()
}

//
//
//
// function newId( type:any ) {
//   switch (type) {
//     case Card:
//       cardId++;
//         return cardId;
//     case Deck:
//     deckId++;
//         return deckId;
//     case Hand:
//     handId++;
//       return handId;
//   }
// }

// class CardPile {
//   constructor (qty:number, max:number) {
//     let numberOfCards:number = qty;
//     let maxCards:number = max;
//   }
// }

function counter(b:number) {
  let a = 0;
  () =>
    { return a + b;
  }
}


class Deck {

  deckTxt:string;
  deckCardList:Array<Object>;
  deckCardObject:Promise<Object>;


  constructor(fileTxt:string, name:string) {
    this.deckTxt = fileTxt;
    // this.deckName = name;
    this.deckCardList = this.createCardListFromTxt();
    this.fetchCardList();
    // this.newDeck()
  }


  async fetchCardList() {
    const cardList = this.deckCardList;
    const cardListKeys = Object.keys(this.deckCardList);
    const cardListNames = cardListKeys.map((key) => cardList[key].name);
    const cardListPromises:object = cardListNames.map(card => getCard(card));
    const cardListCards = Promise.all(cardListPromises);
    this.deckCardObject = await cardListCards;
    console.log(this.deckCardObject);
    return this.deckCardObject;

  }

  createCardListFromTxt():Array<string> {
      let lines = this.deckTxt.split("\n");
      let numLines = lines.length;
      let cardList = [];
      let idcount = 0;

      // parse
      for ( let i = 0 ; i < numLines ; i++ ) {
        let line = lines[i];

        if ( !((line.indexOf('/') == 0) || (line.indexOf(' ') == -1) || (line.indexOf('SB:') == 0)) )
        {
          let qty = line.match(/\d+/);
          let name = line.match(/\D+/);

          for ( let d = 0 ; d < qty[0] ; d++ ){
            cardList[ idcount++ ] = {
              'name': name[ 0 ].slice( 1 )
            }
          } //endfor
        } //endif
      }

      return cardList;
    }
}


class Hand {
  constructor (id:number, name:string) {
    let cardId:number = id;
    let handName:string = name;
  }
}

class Card {
  constructor (name:string) {
    cardId = newId(Card);
    let cardName:string = name;

    console.log(`Card ${cardId} with name "${cardName}" has been created.`);
  }
}

// const deck01 = new Deck(30);
//
// const card02 = new Card('pepito');
// const card03 = new Card('pepito');
