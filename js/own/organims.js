/**
	Organism
*/
function Organism(id, par)
{
	if(par === undefined){
		par = null;
	}

	var t = this;

	//	When the Organism has a disease, start to generate "antibodies" for this disease.
	var antibodies = [];

	//	? maybe in the future, to see the behavior
	var mobility = parseInt( Math.random() * 80 );

	//	? maybe in the future, to do something
	var intelligence = parseInt( Math.random() * 60 );


	var regeneration = parseInt( Math.random() * 30 );
	var reproduction;
	var identification = id;

	//	Strength
	var strength = 100;

	//	Ages Max = 36500 ( 100 ages ). The life it's one day by loop.
	var life = 0;

	var food = 100;
	var parent = par;
	var diseases = [];

	var render = new OrganismRender();

	//	Geneate a "reproduction" value, that need to be bigger than 0 and 1.
	do
	{
		reproduction = parseInt( Math.random() * 50 );

	}while(reproduction <= 1);

	//	1 age = 365 days
	//	Reproduction life 20 to 50 ages.
	var lifeReproduction = 18250 - 7300;
	var countReproduction = 0;
	//	Percent of Reproduction n of m.
	var newReproduction = parseInt((lifeReproduction * reproduction) / 100) ;


	//	Events
	this.newOrganismEvent = null;
	this.destroyedEvent = null;


	var checkReproduction = function()
	{
		//	20 to 50
		if( life > 7300 && life < 18250 ){
			countReproduction++;
			if(countReproduction >= newReproduction){
				countReproduction = 0;

				//	Create new child
				if( t.newOrganismEvent !== null ){
					t.newOrganismEvent(t);
				}
			}
		}
	}

	var checkLife = function(){
		
		//if(life >= 36500){
		if(life >= 10000){
			//	Die

			if( t.destroyedEvent !== null ){
				t.destroyedEvent(t);
			}
			return false;
		}
		return true;
	}


	


	this.update = function(){

		if(checkLife())
		{
			render.update();

			life++;

			checkReproduction();
		}
	}

	this.getRender = function(){
		return render;
	}
}

/**

*/
function OrganismRender()
{
	var min = 5;
	var max = 10;
	var way = 1;

	var currentSize = min;

	var object = new createjs.Shape();
    object.graphics.beginFill("red").drawCircle(0, 0, currentSize);
    

    this.setPos = function(x,y){
    	object.x = x;
    	object.y = y;
    }
    this.setRandomPos = function(x,y,w,h)
    {
		object.x = x + (Math.random() * w);
    	object.y = y + (Math.random() * h);
    }

    this.getObj = function(){
    	return object;
    }

    this.update = function(){

    	object.graphics.clear();
    	if( way > 0 )
    	{
    		//	Increment
    		if(currentSize > max){
    			way = -1;
    		}
    	}else{
    		//	Decrement
    		if(currentSize < min){
    			way = 1;
    		}
    	}
    	currentSize += way;
    	object.graphics.beginFill("red").drawCircle(0, 0, currentSize);

    }
}