var cards = [
{
  name:"pig",
  id_nos: 0,
  cardImage: "images/pig.png",
  cardSound: "sounds/pig.wav"
},
{
  name:"giraffe",
  id_nos: 1,
  cardImage: "images/giraffe.png",
  cardSound: "sounds/giraffe.wav"
},
{
  name:"dog",
  id_nos: 2,
  cardImage: "images/dog.png",
  cardSound: "sounds/dog.wav"
},
{
  name:"hippo",
  id_nos: 3,
  cardImage: "images/hippo.png",
  cardSound: "sounds/hippo.wav"
},
{
  name:"owl",
  id_nos: 4,
  cardImage: "images/owl.png",
  cardSound: "sounds/owl.wav"
},
{
  name:"pig",
  id_nos: 5,
  cardImage: "images/pig.png",
  cardSound: "sounds/pig.wav"
},
{
  name:"cow",
  id_nos: 6,
  cardImage: "images/cow.png",
  cardSound: "sounds/cow.wav"
},
{
  name:"elephant",
  id_nos: 7,
  cardImage: "images/elephant.png",
  cardSound: "sounds/elephant.wav"
},
{
  name:"cow",
  id_nos: 8,
  cardImage: "images/cow.png",
  cardSound: "sounds/cow.wav"
},
{
  name:"giraffe",
  id_nos: 9,
  cardImage: "images/giraffe.png",
  cardSound: "sounds/giraffe.wav"
},
{
  name:"leopard",
  id_nos: 10,
  cardImage: "images/leopard.png",
  cardSound: "sounds/leopard.wav"
},
{
  name:"dog",
  id_nos: 11,
  cardImage: "images/dog.png",
  cardSound: "sounds/dog.wav"
},
{
  name:"elephant",
  id_nos: 12,
  cardImage: "images/elephant.png",
  cardSound: "sounds/elephant.wav"
},
{
  name:"leopard",
  id_nos: 13,
  cardImage: "images/leopard.png",
  cardSound: "sounds/leopard.wav"
},
{
  name:"duck",
  id_nos: 14,
  cardImage: "images/duck.png",
  cardSound: "sounds/duck.wav"
},
{
  name:"owl",
  id_nos: 15,
  cardImage: "images/owl.png",
  cardSound: "sounds/owl.wav"
},
{
  name:"duck",
  id_nos: 16,
  cardImage: "images/duck.png",
  cardSound: "sounds/duck.wav"
},
{
  name:"hippo",
  id_nos: 17,
  cardImage: "images/hippo.png",
  cardSound: "sounds/hippo.wav"
}
];

var sec = 0, min = 0, hr = 0;
var timerElement = document.createElement('span');
timerElement.setAttribute('id','timer');
document.getElementById('time-tick').appendChild(timerElement);
var interval;
timerElement.innerHTML = hr+"hrs "+min+"mins "+sec+"secs";

startTimer = function()
{
    interval = setInterval(function()
    {
        timerElement.innerHTML = hr+"hrs "+min+"mins "+sec+"secs";
        sec++;
        if(sec == 60)
        {
            min++;
            sec=0;
        }
        if(min == 60)
        {
            hr++;
            min = 0;
        }
    },1000);
}

document.getElementById("mybtn").addEventListener('click', startTimer);

var cardsInPlay = [];                               
var cardsIdInPlay = [];
var successCount = 0;
var moveCount = 0;
var clickCount = 0;

var flipCard = function() 
{ 
  var cardId = this.getAttribute('data-id');  
  cardsInPlay.push(cards[cardId].name);       
  cardsIdInPlay.push(cards[cardId].id_nos);         
  this.setAttribute('src',cards[cardId].cardImage);  
  checkForMatch();
  clickCount++;
  var audio = new Audio(this.getAttribute("src_sound"));
  audio.play();
 }

var checkForMatch = function() 
{
  if(cardsInPlay.length === 1)
  {
    document.getElementsByTagName('img')[cardsIdInPlay[0]].removeEventListener('click', flipCard);
  }
    if(cardsInPlay.length === 2) 
    {
        if(cardsInPlay[0] === cardsInPlay[1]) 
        {
          successCount += 1;
          moveCount +=1;
          document.getElementsByTagName('img')[cardsIdInPlay[0]].removeEventListener('click', flipCard);
          document.getElementsByTagName('img')[cardsIdInPlay[1]].removeEventListener('click', flipCard);
          if (cardsInPlay.length >= 2)
            {
              cardsInPlay = [];
              cardsIdInPlay = [];
            }
        }       
          else 
            {         
              moveCount +=1;
              setTimeout(function()
                {
                  document.getElementsByTagName('img')[cardsIdInPlay[0]].setAttribute('src', 'images/back.png');
                  document.getElementsByTagName('img')[cardsIdInPlay[0]].addEventListener('click', flipCard);
                  document.getElementsByTagName('img')[cardsIdInPlay[1]].setAttribute('src', 'images/back.png');
                  document.getElementsByTagName('img')[cardsIdInPlay[1]].addEventListener('click', flipCard);
                  cardsInPlay = [];
                  cardsIdInPlay = [];
                  if (cardsInPlay.length >= 2)
                      {
                        cardsInPlay = [];
                        cardsIdInPlay = [];
                      }
                },100);
            }

            if (successCount === (cards.length / 2)) 
              {
                alert("Congrats, You have won the game in " + moveCount + " turns with a time record of " + timerElement.innerHTML);
                clearInterval(interval);
                clearInterval(timerElement);
                sec = 0;
                min = 0;
                hr = 0;
                timerElement.innerHTML = 0+"hrs "+0+"mins "+0+"secs";
              }
    }        
}

var createBoard = function() 
  {
  for (var i = 0; i < cards.length; i++) 
    {
    var cardElement = document.createElement('img');    
    cardElement.setAttribute('src', 'images/back.png'); 
    cardElement.setAttribute('data-id', i);             
    document.getElementById('game-board').appendChild(cardElement); 
    }
  }

createBoard();

var startGame = function() 
{
  for (var i = 0; i < cards.length; i++) 
  {
    var cardElement = document.createElement('img');    
    cardElement.setAttribute('src', 'images/back.png'); 
    cardElement.setAttribute('data-id', i);
    cardElement.setAttribute('src_sound', cards[i].cardSound); 
    document.getElementById('game-board').appendChild(cardElement);
    cards[i].id_nos = parseInt(document.getElementsByTagName('img')[i].getAttribute('data-id')) 
    cardElement.addEventListener('click', flipCard);
  }
}

function shuffle(array) 
{
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  while (0 !== currentIndex) 
  {                                                           
    randomIndex = Math.floor(Math.random() * currentIndex); 
    currentIndex -= 1;
    temporaryValue = array[currentIndex]; 
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function reset() 
{ 
  for (var i = 0; i < cards.length; i++)
  {
    var newCardElement = document.getElementsByTagName('img')[0];
    newCardElement.parentNode.removeChild(newCardElement);
  }
  cardsInPlay = [];                                
  cardsIdInPlay = [];
  successCount = 0;
  moveCount = 0;
  clickCount = 0;
  shuffle(cards);
  startGame();
  clearInterval(interval);
  clearInterval(timerElement);
  sec = 0;
  min = 0;
  hr = 0;
  timerElement.innerHTML = 0+"hrs "+0+"mins "+0+"secs";
}