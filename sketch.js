var dog,sadDog,happyDog,foodS,foodObj,foodStock;
var feed,addFood;
var feedTime,lastFed;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database=firebase(database);
  createCanvas(1000,500);

  foodObj = new Food();

  foodStock = database.ref('Food')
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog)

  
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)

}

function draw() {
  background(46,139,87);

feedTime = database.ref("FeedTime")
feedTime.on("value", function (data){
  lastFed=data.val();
})

fill(255,255,244);
textSize(15);
if(lastFed >=12){
  text("Last Fed:" +lastFed%12 +"PM",350,30);
}
else if(lastFed==0){
  text("Last Fed:12 AM",350,30);
}

else{
text("Last Fed:"+lastFed+"AM",350,30);
}
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS = data.val();
  foodObj=updateFoodStock(foodS);
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food :foodObj.getFoodStock(),
    feedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
