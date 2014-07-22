window.addEventListener("load", function(){

	var w = 640;
	var h = 480;


	//------------------------------------------------------------------------------
	//															Render
	var canvas, stage, update;
	canvas = document.getElementById("colony");
	stage = new createjs.Stage(canvas);
	createjs.Touch.enable(stage); 

	// enabled mouse over / out events
	stage.enableMouseOver(10);
	stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas


	var dataInfo = new createjs.Text("Score", "20px Arial", "#ff7700");
	dataInfo.x = 50;
	dataInfo.y = 20;
	dataInfo.textBaseline = "alphabetic";
	stage.addChild(dataInfo);

	var stopRender = function()
	{
		update = false;
		createjs.Ticker.removeEventListener("tick", updateRender);
	}
	var startRender = function(){
		update = true;
		createjs.Ticker.addEventListener("tick", updateRender);
	}
	var updateRender = function(e)
	{
		if (update) {
			//update = false;
			stage.update(e);
		}
	}
	var addObjectToRender = function(obj)
	{
		stage.addChild(obj);
		update = true;
	}
	//------------------------------------------------------------------------------



	//------------------------------------------------------------------------------
	//															Organism Life
	var lifeCycle = 1;
	var lifeInterval;	

	var updateLifeCycle = function()
	{
		for (var i = listOrganims.length - 1; i >= 0; i--) {
			var tmpOrg = listOrganims[i];
			tmpOrg.update();

		};
	}

	var startLifeCycle = function()
	{
		lifeInterval = setInterval(updateLifeCycle,lifeCycle);
	}
	var stoptLifeCycle = function()
	{
		clearInterval(lifeInterval);
	}


	var listOrganims = [];
	//------------------------------------------------------------------------------

	var organismCount = 0;
	var organismDeath = 0;

	var createNewOrganims = function(target){
		organismCount++;

		if(target !== undefined){
			console.log("create child");
		}

		var organism = new Organism(getId(),target);
		organism.newOrganismEvent = createNewOrganims;
		organism.destroyedEvent = destroyedOrganims;
		
		listOrganims.push(organism);

		var tmpRender = organism.getRender();
		addObjectToRender(tmpRender.getObj());
		tmpRender.setRandomPos(20,20,w-40,h-40);

		updateText();
	}

	var destroyedOrganims = function(target){
		console.log("destroyedOrganims");

		organismDeath++;

		//if( target !== undefined )
		{
			stage.removeChild( target.getRender().getObj() );

			var post = listOrganims.indexOf( target );
			listOrganims.splice(post, 1);
		}

		updateText();
	}

	var updateText = function(){
		dataInfo.text = "Organism - Lives:" + (organismCount - organismDeath) + " Created: " + organismCount + " - Death: " + organismDeath;
	}

	var start = function(countOrganism){


		for (var i = 0; i < countOrganism; i++) {
			createNewOrganims();
		};


		startRender();
		startLifeCycle();
		
		updateText();
	}

	start(10);




});

window.CountOrganimsId = 0;
function getId()
{
	var tmp = window.CountOrganimsId;
	window.CountOrganimsId++;
	return tmp;
}

