function init_canvas() {
  canvas = document.getElementById("gamecanvas");

  pen = canvas.getContext("2d");
  W = canvas.width = 700;
  H = canvas.height = 700;
  cell_size = 66
  score = 5


  pen = canvas.getContext("2d");
  game_over = false;
  
  food_img = new Image()
  food_img.src = "assets/apple.png"
  
  trophy = new Image()
  trophy.src = "assets/trophy.png"


  food = getfoodLocation()
  snake = {
      init_len :5,
      color: "blue",
      cells: [],
      direction: "right",

      createSnake: function(){
          for(let i = this.init_len ; i>0 ; i--)
             this.cells.push({x:i,y:0})
      },
     drawSnake: function(){
        for(let i= 0 ;i<this.cells.length ; i++){
            pen.fillStyle = this.color
            pen.fillRect(this.cells[i].x*cell_size,this.cells[i].y*cell_size,cell_size-3,cell_size-3)
        }
     },
     updateSnake: function(){
        var headX = this.cells[0].x;
        var headY = this.cells[0].y;
        if(headX == food.x && headY == food.y){
            //console.log("food eaten")
            score++
            food = getfoodLocation()
        } else{
        this.cells.pop()
        }
        

        var new_x,new_y
        if(this.direction == "right"){
            new_x = headX+1
            new_y = headY
        }
        else if(this.direction == "left"){
            new_x = headX-1
            new_y = headY
        }
        else if(this.direction == "up"){
            new_x = headX
            new_y = headY-1
        }
        else if(this.direction == "down"){
            new_x = headX
            new_y = headY+1
        }
        this.cells.unshift({x:new_x,y:new_y})

        let last_x = Math.round(W/cell_size)
        let last_y = Math.round(H/cell_size)

        if(this.cells[0].x<0 || this.cells[0].x> last_x || this.cells[0].y >last_y || this.cells[0].y <0)
           game_over = true
     }
  }
     snake.createSnake()

    function keyPressed(e){
        if(e.key == "ArrowUp"){
            snake.direction = "up"
        }
        else if(e.key == "ArrowDown"){
            snake.direction = "down"
        }
        else if(e.key == "ArrowLeft"){
            snake.direction = "left"
        } else {
            snake.direction = "right"
        }
        console.log(snake.direction)
    } 
    document.addEventListener("keydown",keyPressed)
}
function getfoodLocation(){
    var foodX = Math.round(Math.random()*((W-1)-cell_size)/cell_size)
    var foodY = Math.round(Math.random()*((H-1)-cell_size)/cell_size)

    var food = {
        x:foodX,
        y:foodY,
        color:"red",
    }
    return food

}
function draw() {
  pen.clearRect(0,0,W,H)
  snake.drawSnake()

  pen.fillStyle = food.color
  pen.drawImage(food_img,food.x*cell_size,food.y*cell_size,cell_size,cell_size)
  pen.drawImage(trophy ,18,20,cell_size,cell_size)

  pen.fillStyle = "blue"
  pen.font = "20px Sans-serif"
  pen.fillText(score,50,50);

}

function update() {
    snake.updateSnake()
}

function gameloop() {
    if(game_over == true){
        clearInterval(game)
        alert("Game Over!!!")
        return
    }
  draw();
  update();
};

init_canvas();
let game = setInterval(gameloop, 300);
