
	
var defaultMessage = "Welcome to Avax BlackJack!";
window.ethereum.on('accountsChanged', function (accounts) {			// Time to reload your interface with accounts[0]!
	onButtonClick();
})

var cardImgNames  = new Array();

var player;
var dealer;

function getPlayer()
{
	return player;
}
function getDealer()
{
	return dealer;
}
function setPlayer(_player)
{
	player = _player;
}

function setDealer(_dealer)
{
	dealer = _dealer;
}

function setCardImgNames(_cardImgNames)
{
	cardImgNames = _cardImgNames;
}
function getCardImgNames()
{
	return cardImgNames;
}


function generateNewCard()
{
	return "<img class='card' src='./res/cards/" + cardImgNames[Math.floor(Math.random() * cardImgNames.length)] + "'/>";
}
function onClickHit()
{
	
	removeButton = document.getElementById("hand").innerHTML;
	button = "<div><button onclick=\"onClickHit();\" id=\"hit\">Hit</button></div>";
	removeButton = removeButton.replace(button, '');
	newCard = generateNewCard();
	document.getElementById("hand").innerHTML = removeButton + newCard + button;
	_player = getPlayer();
	
	endGame(_player.calculateNewScore(newCard));
	
	
}
function endGame(isWon)
{
	
	
	var message = null;
	Score = "<h3 id=\"game-message\">Player Score: " + getPlayer().getScore() + "<br> Dealer Score: " + getDealer().getScore() + "</h3>";
	if(isWon == false) message = "You Won! <br>";
	else if(isWon == true) message = "You Lost! <br>";
	else if(isWon == null)
	{
		removeScore = document.getElementById("score").innerHTML;
		// get the updated html for the scores
		Score = "<h3 id=\"game-message\">Player Score: " + getPlayer().getScore() + "<br> Dealer Score: " + getDealer().getScore() + "</h3>";
		//get the indexes of the button i want to remove
		index = removeScore.indexOf("<h3");
		endex = removeScore.indexOf("</h3>");
		//get the button html that we want to remove
		removeScore = removeScore.substring(index,endex);
		//remove the button
		removeScore2 = document.getElementById("score").innerHTML;
		removeScore2 = removeScore2.replace(removeScore, '');
		//add the button again with the updated html
		document.getElementById("score").innerHTML = removeScore2 + Score;
			
 		return;
	}
	document.getElementById("game-area").innerHTML = "<div class='wrapper'><h3 id='game-message'>" + message + "</h3>" + Score + "</div>";
	document.getElementById("play").innerHTML = "<h3>Try Again?</h3>";
	document.getElementById("play").style.backgroundColor = "#3465a4";
	document.getElementById("play").disabled = false;
}

async function onClickPlay()
{
	
	var isConnected = document.getElementById("connect-button").innerHTML;	
	
	if(isConnected.toString().localeCompare("<h3>Connect Wallet</h3>") !== 0)
	{
		
				let promise = new Promise(resolve => {
				var xhttp = new XMLHttpRequest();
				
				xhttp.onreadystatechange = function() {
					if(this.readyState == 4 && this.status == 200)
					{
						resolve(xhttp.responseText.split("\n"));	
					}
			
				};
			
				xhttp.open("GET", "./res/cards/file_names.txt?n=2");
				xhttp.send();		
			});
			promise.then(async(text) => {
			
				setCardImgNames(text);		     //removes the last item from the array
				getCardImgNames().pop();//which is always blank text for some reason; 
				var cardNames = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace', 'joker'];
				var cardValues =[ {'2':'2'} , {'3':'3'}, {'4':'4'},{'5':'5'} ,{'6':'6'},{'7':'7'},{'8':'8'},{'9':'9'},{'10':'10'},{'jack':'10'}, {'queen':'10'}, {'king':'10'}, {'ace':'11'}, {'joker':0}];    
				
				//initialize player and dealer
				
				setPlayer(new Player(getCardImgNames(), cardValues));
				setDealer(new Dealer(cardNames, cardValues));
					
				document.getElementById("error").innerHTML = "Wallet Connected";
				document.getElementById("game-area").innerHTML = defaultMessage;
				
				var card1 = generateNewCard();
				var card2 = generateNewCard();
				
				var backOfCard = "backofcard.jpeg";
				
				document.getElementById("game-area").innerHTML = "<div class='wrapper' id='game-center'><div class='deck'><img class='card' src='./res/cards/"+backOfCard+"'/></div><div id='score'></div><div id='hand' class='hand'> " + card1 + card2 + " <div><button onclick='onClickHit();' id='hit'>Hit</button></div></div></div>";
				document.getElementById("play").style.backgroundColor = "grey";
				document.getElementById("play").disabled = true;
				var _player = getPlayer();
				
				
				await window.ethereum.request({method: 'eth_requestAccounts'})
		.then(result => (getPlayer().setAddress(result[0].toString())));
		
				await window.ethereum.request({method: 'eth_getBalance', params: [getPlayer().getAddress(), 'latest']})
	.then(_balance => getPlayer().setBalance((parseInt(_balance)/1000000000000000000))).catch((err) => {console.log(err);});
				
				if(_player.getBalance() == 0)
				{
					document.getElementById("game-area").innerHTML = "<div id='game-message'>Insufficient Funds</div>";
					document.getElementById("error").innerHTML = "Error: Insuficient Funds";	
				}
				document.getElementById("connect-button").innerHTML = "Address: "+ _player.getAddress()+ " Balance: " +_player.getBalance() + "</h3>";	
				
							
				endGame(_player.calculateNewScore(card1));
				
				endGame(_player.calculateNewScore(card2));
				
				});
				
		
		
	}
	else
	{
		document.getElementById("error").innerHTML = "Error: Wallet not Connected";
	}
	
	
}
function displayInfo()
{
	document.getElementById("game-area").innerHTML = "<h3 id='game-message'>Avax Blackjack Version: 0.01</h3>";
}
function onDeselect()
{
	document.getElementById("dropdown").innerHTML ="";
	document.getElementById("about").style.backgroundColor = 'silver';
	document.getElementById("about").style.color = 'black';
				
}
function highlighter()
{
	document.getElementById("menu-item-one").style.backgroundColor = '';
	
	document.getElementById("about-link").style.color = '#A9A9A9';
}
function onMenuSelect()
{
	document.getElementById("dropdown").innerHTML ="<button onmouseover='highlighter();' id='menu-item-one'>About</button>";
	document.getElementById("about").style.backgroundColor = '#3A3B3C';
	document.getElementById("about").style.color = '#A9A9A9';
				
}

async function onButtonClick() 
{
	
	if(typeof window.ethereum !== 'undefined')
	{
		
		
		document.getElementById("connect-button").innerHTML = "<h3>Wallet Connected!</h3>";
		document.getElementById("connect-button").style.backgroundColor = "#2e7d00";
		document.getElementById("connect-button").style.color = "#ffffff";
		document.getElementById("game-area").innerHTML = "<h3 id='game-message'>Wallet Successfully Connected</h3>";
   	} 
   	else 
   	{
		document.getElementById("error").innerHTML = "Error: Web3 Not Detected please install Metamask!";
   	}
}



