class Player
{
	
	constructor(_cardNames, _cardValues)
	{
		this.isAce = false;
		this.aceAmount = 0;
		this.score = 0;
		this.address = null;	
		this.balance = 0;
		this.cardNames = _cardNames;
		this.cardValues = _cardValues;
		this.isPlaying = false;
	}
	getCardNames()
	{
		return this.cardNames;
	}
	getCardValues()
	{
		return this.cardValues;
	}
	checkBustStatus()
	{
		//console.log(this.getScore());
		if(this.getScore() > 21)
		{
			if(this.getIsAce() == true)
			{	
				this.setScore((this.getScore() - (10 * this.getAceAmount())));
				this.setIsAce(false);
				this.setAceAmount(0);
				this.checkBustStatus();
			}
			else 
			{
				
				this.setIsAce(false);
				this.setAceAmount(0);			
				return true;
			}
		}
		else if(this.getScore() == 21)
		{
			
			this.setIsAce(false);
			this.setAceAmount(0);	
			return false;			
		}
		
		return null;	
	}
	
	calculateNewScore(card)
	{
		
		let _cardNames = this.getCardNames();
		let _cardValues = this.getCardValues();
		
		for(let i = 0; i < _cardNames.length; i++)
		{
			if(card.includes(_cardNames[i]))
			{
				
				for(let j= 0; j < _cardValues.length; j++)
				{
					
					 
					var name = new String(JSON.stringify(_cardValues[j]));
					var index = name.indexOf("\"");
					var endex = name.indexOf("\"", index + 1);
					name = name.slice(index + 1,endex);
					
					
					if(_cardNames[i].includes(name))
					{
						
						let value = new String(JSON.stringify(_cardValues[j]));
								
						value = value.replace(/\,/g, "");
						
						value = value.replace(/\{/g, "");
						value = value.replace(/\}/g, "");
						value = value.replace(/\"/g, "");
						value = value.replace(/\[/g, "");
						value = value.replace(/\]/g, "");
						value = value.split(":");
						
						var newScore = parseInt(value[1]);
						
						this.setScore(this.getScore() + (newScore));
						if(_cardNames[i] == 'ace')
						{
								this.setIsAce(true);
								this.setAceAmount(this.getAceAmount() + 1);
						}
							 			
					}
				}
			}		
		}
		return this.checkBustStatus();
	}
	
	getIsAce()
	{
		return this.isAce;
	}
	getAceAmount()
	{
		return this.aceAmount;
	}
	getScore()
	{
		return this.score;
	}
	getAddress()
	{
		return this.address;
	}
	getBalance()
	{
		return this.balance;
	}
	setAceAmount(_aceAmount)
	{
		this.aceAmount = _aceAmount;
	}
	setIsAce(_isAce)
	{
		this.isAce = _isAce;
	}
	setScore(_score)
	{
		this.score = _score;
	}
	setAddress(_address)
	{
		this.address = _address;
	}
	
	setBalance(_balance)
	{
		this.balance = _balance;//await (_balance/1000000000000000000); // converts to gwei;
	}
	
	
	
}
