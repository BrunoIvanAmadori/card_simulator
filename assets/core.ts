
class Deck {
  cards:Array<object>;

  constructor(cards:array<object>) {
    this.cards = cards;
  }
};


function readTxt(fileInput) {
  let file = fileInput.files[0];
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = readSuccess;

  function readSuccess(evt) {
      rawCardListFrom(evt.target.result);
  }
}

function rawCardListFrom(txt:string):string {
    let lines = txt.split("\n");
    let numLines = lines.length;
    let cardList = [];
    let idcount = 0;

    // parse
    for ( let i = 0 ; i < numLines ; i++ ) {
      let line = lines[i];

      if ( !((line.indexOf('/') == 0) || (line.indexOf(' ') == -1) || (line.indexOf('SB:') == 0)) )
      {
        let qty:Array<any> = line.match(/\d+/);
        let name = line.match(/\D+/);

        for ( let d = 0 ; d < qty[0] ; d++ ){
          cardList[ idcount++ ] = {
            'name': name[ 0 ].slice( 1, (name[0].length - 1) )
          }
        } //endfor
      } //endif
    }

    let result = `{ "identifiers" : ${JSON.stringify(cardList)}}`
    getCollection(result);
  }

async function getCollection(list:string) {
let url = `https://api.scryfall.com/cards/collection`;
const response = await fetch(url, {
  method: 'POST',
  body: list, // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json',
  }});
const data = await response.json();

nuevoMazo(data.data);
}

function nuevoMazo(cards){
  const primerMazo = new Deck(cards);
  console.log(primerMazo);
}





var fileInput:any = document.querySelector('#file-input');

document.getElementById('read-button').addEventListener('click', () =>
  { readTxt(fileInput); });

function getCardImageUri(object:object, size:string){
   return object['image_uris'][size];
}

function displayCard(source) {
  let img = document.createElement('img');
  document.querySelector(".card").appendChild(img);
  img.src = source;
}
