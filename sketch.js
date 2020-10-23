var dog,happyDog,foodS,foodStock
var dogImg,dog1Img;
var database;
var feedDog, addFoods;
var fedTime, lastFed;
var foodObj;
function preload()
{
  dogImg=loadImage("images/dog.png");
  dog1Img=loadImage("images/dog1.png");
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();
  dog= createSprite(200,250,20,20);
  dog.addImage("dog",dogImg);
  dog.scale=0.15;

  foodObj=new Food();
  feed= createButton(" Feed The dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("add Food")
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodStock=database.ref('food')
  foodStock.on("value",readStock);
}


function draw() {  
background(46,139,87);

fill(255,255,254);
stroke("black");
textSize(24);
text("Food remaining : "+foodS,150,150);
if(lastFed>=12){
  text("LastFed:"+lastFed%12+"PM",150,30);
}
else if(lastFed==0){
  text("lastFed: 12AM",150,30);
}
else
{
  text("lastFed :"+ lastFed+ "12AM",350,30);
}


drawSprites();
foodObj.display();
readlastFed();
readStock();
writeStock();
}

function readlastFed(){
   fedTime=database.ref("feedTime")
   fedTime.on("value",function(data){
     lastFed=data.val();
   });
}

function readStock(data){
  foodS=database.ref("food")
   foodS.on("value",function(data){
     foodS=data.val();
   });
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('food').update({
    food:x
  })
}





