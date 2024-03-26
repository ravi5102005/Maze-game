
let mazeObj;
let imageArray = [
  {
    "productName" : "Billing",
    "imageSrc" : "./Billing-Logo.jpg"
  },

  {
    "productName" : "Apptics",
    "imageSrc" : "./Apptics-512.png"
  },

  {
    "productName" : "Ula",
    "imageSrc" : "./logo.svg"
  },

  {
    "productName" : "ToolKit",
    "imageSrc" : "./Toolkit-whiteBG.svg"
  },

  {
    "productName" : "TeamInBox",
    "imageSrc" : "./TeamInbox-whiteBG.svg"
  },

  {
    "productName" : "RouteIQ",
    "imageSrc" : "./RouteIQ-whiteBG.svg"
  },

  {
    "productName" : "Catalyst",
    "imageSrc" : "./Catalyst-whiteBG.svg"
  },

  {
    "productName" : "Bigin",
    "imageSrc" : "./Bigin-whiteBG.svg"
  },
 
]

function mazeImageGeration(){
  mazeObj = imageArray[Math.floor(Math.random() * imageArray.length)]
  document.querySelector("#logo").style.backgroundImage = `url('${mazeObj.imageSrc}')`;
  document.querySelector(".logo-img").style.backgroundImage = `url('${mazeObj.imageSrc}')`
  document.querySelector(".name-logo").textContent = mazeObj.productName
}

function lastResult(name){
  document.querySelector(".result-page").style.display = "flex"
  document.querySelector(".GameViewBox").style.display = "none"
  document.querySelector(".result-name").textContent = name
}






const GameViewBox = document.querySelector(".GameViewBox")
GameViewBox.style.display = "none"

document.querySelector(".start-bt-1").addEventListener("click" , function(){
  document.querySelector("#userDetails").style.display = "flex"
  console.log(document.querySelector("#userDetails"));
})

document.querySelectorAll(".player-inp").forEach((e) => {
  e.addEventListener("focus" , function(){
    e.value = ""
  })
})

document.querySelector("#startGame").addEventListener("click", function(){
  console.log(this);
  document.querySelector(".startPage").style.display = "none"
GameViewBox.style.display = "block"
  console.log(    document.querySelector("#player_1_name"));
  document.querySelector("#player1Name").textContent = document.querySelector("#player_1_name").value
  document.querySelector("#player2Name").textContent = document.querySelector("#player_2_name").value
})
      
class Model {
  mazeRows = 13;
  mazeColumn = 25;

  getRandomNumber(range) {
    let rNum = Math.floor(Math.random() * range);
    return rNum;
  }

  // getRandomPlace() {
  //   // let r_row = this.getRandomNumber(this.mazeRows / 2);
  //   let r_c;
  //   let stop = 0;
  //   while (stop === 0) {
  //     r_c = this.getRandomNumber(this.mazeColumn-15);
  //     if (this.mazeRoot[8][r_c] === 0 && r_c >15) {
  //       stop = 1;
  //     }
  //   }
  //   return [8, r_c];
  // }

  generateRandomMaze(rows, cols) {
    this.mazeRoot = Array.from({ length: rows }, () => Array(cols).fill(1));

    function visit(row, col) {
      this.mazeRoot[row][col] = 0; // Mark the cell as a pathway

      const directions = [
        [-2, 0], // Up
        [2, 0], // Down
        [0, -2], // Left
        [0, 2], // Right
      ];

      directions.sort(() => Math.random() - 0.5); // Shuffle the directions randomly

      for (const [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;

        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          this.mazeRoot[newRow][newCol] === 1
        ) {
          this.mazeRoot[row + dx / 2][col + dy / 2] = 0; // Remove the wall between the cells
          visit.call(this, newRow, newCol);
        }
      }
    }

    visit.call(this, 0, 0); // Start the recursion from the top-left corner
    console.log(this.mazeRoot)
  }
}
// mazeImageGeration();

class View {
  static oldLogoPlace ;
  fixLogo(place,remove=undefined) {
    console.log("placeeeeeeeeeeee");
    console.log(place);
    let parentElement = document.getElementById(`mazeRow${place[0]}`);
    let child = parentElement.children[place[1]];
    // child.style.backgroundColor = 'red';
    if (child) {
         child.id = 'logo';
    }
    console.log("loso seteled");
mazeImageGeration();

    document.querySelector("#logo").style.backgroundImage = `url('${mazeObj.imageSrc}')`;


    // if(remove){
    //   let parentElement = document.getElementById(`mazeRow${remove[0]}`);
    //   let child = parentElement.children[remove[1]];
    //   child.removeAttribute("id");
    // }
  }


  createMazeColumn(mazeRoot) {
    mazeRoot[0][this.row-1]=0;
    for (let i = 0; i < mazeRoot.length; i++) {
      let maze = mazeRoot[i];
      // console.log(maze);

      for (let j = 0; j < mazeRoot[i].length; j++) {
        const col = document.createElement('div');
        if (maze[j] === 0) {
          col.setAttribute('class', 'openPath');
        } else {
          col.setAttribute('class', 'closePath mazeWall');
        }
        document.getElementById(`mazeRow${i}`).appendChild(col);
      }
    }
  }



  createMazeRowPath(mazeRows) {
    for (let i = 0; i < mazeRows; i++) {
      const div = document.createElement('div');
      div.setAttribute('class', 'mazeRow');
      div.setAttribute('id', `mazeRow${i}`);
      document.getElementById('mazeRootMap').appendChild(div);
    }
  }

  movePlayersToStartingPlace(){
    console.log("wertyuiopsdfghkxcvbnm,fghjklrtyuihjkvbn")
    document.getElementById("player2").style.top="65px";
    document.getElementById("player2").style.right="65px";
    document.getElementById("player1").style.bottom="65px";
    document.getElementById("player1").style.left="65px";
    document.getElementById("player2").style.transform="translate(0)";
    document.getElementById("player1").style.transform="translate(0)";
  }


  changeMazePathUi(newRoot){
    newRoot[0][this.row-1]=0;
    console.log("welcom to chwnge");
    console.log(newRoot);
    let row_count = document.getElementsByClassName("mazeRow");
    for(let i=0;i<row_count.length;i++){
      console.log("first loopppppppppppppppppp");
      let pathRow = document.getElementById(`mazeRow${i}`);
      for(let j=0;j<pathRow.children.length;j++){
        pathRow.children[j].classList = []
        if (newRoot[i][j] === 0) {
          pathRow.children[j].classList.add('openPath');
          // console.log(pathRow.children[j]);
        } else {
          pathRow.children[j].classList.add('closePath','mazeWall');
        }

      }
    }
    this.setClosePathBgImg();
  }


  setClosePathBgImg(){
    let img = ["block-1.png","block-2.png"];
    let closePath = document.getElementsByClassName("mazeWall");
    let openPath = document.getElementsByClassName("openPath");
    for(let i=0;i<closePath.length;i++){
      let ranNum = Math.floor(Math.random()*2);
      closePath[i].style.backgroundImage = `url(${img[ranNum]})`;
      closePath[i].style.backgroundSize="cover";
    }
    img = ["openPath.png","openPath1.png","openPath2.png","openPath3.png"];
    for(let i=0;i<openPath.length;i++){
      let ranNum = Math.floor(Math.random()*4);
      openPath[i].style.backgroundImage = `url(${img[ranNum]})`;
      openPath[i].style.backgroundSize="cover";
    }
  }

}

class Controller {
  viewHeight = window.innerHeight;
  viewWidth  = window.innerWidth;
  static model;
  static view;
  static newlogoPlace=[];
  static logoPlace=[];

  constructor(model, view) {
    Controller.model = model;
    Controller.view = view;
    Controller.logoPlace=[Math.floor(model.mazeRows/2),Math.floor(model.mazeColumn/2)];
    console.log(Controller.logoPlace)
  }

  static startGame() {
    document.getElementById('startGame').addEventListener('click', () => {
      console.log("new puzzele is started !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

    //   function myEventListenerFunction() {
    //    console.log('Event triggered!');
    //  }
    //  document.getElementById("player1").removeEventListener('click', Controller.movePlayers);
    //  document.getElementById("player2").removeEventListener('click', Controller.movePlayers);




    // Function to remove all event listeners from an element
function removeAllEventListeners(element) {
const clone = element.cloneNode(true);
element.parentNode.replaceChild(clone, element);
}

// Remove all event listeners except for 'startGame'
document.querySelectorAll('*').forEach(function (element) {
// console.log(element.id);
if (element.id == "player1" || element.id == "player2") {
  removeAllEventListeners(element);
}
});




      // console.log(getMazeRoot());
      Controller.model.generateRandomMaze(Controller.model.mazeRows, Controller.model.mazeColumn);
      // Controller.newlogoPlace=Controller.model.getRandomPlace();
      // Controller.oldLogoPlace = Controller.newlogoPlace;
      Controller.view.changeMazePathUi(Controller.model.mazeRoot);
      Controller.view.fixLogo(Controller.logoPlace);
      Controller.view.movePlayersToStartingPlace();
      Controller.movePlayers();

      Controller.startGame();

    });
}

  static init(){
    document.getElementById("mazeRootMap").innerHTML="";
      Controller.model.generateRandomMaze(Controller.model.mazeRows, Controller.model.mazeColumn);
      Controller.view.createMazeRowPath(Controller.model.mazeRows);
      Controller.view.createMazeColumn(Controller.model.mazeRoot);
      // Controller.oldLogoPlace=Controller.model.getRandomPlace();
      console.log("oooooosoosososoososos");
      console.log(Controller.oldLogoPlace);
      Controller.view.setClosePathBgImg();
      Controller.view.fixLogo(Controller.logoPlace);
      Controller.view.movePlayersToStartingPlace();
      Controller.movePlayers();
  }
  





static movePlayers(){
  let keysPressedPlayer1 = {};
  let keysPressedPlayer2 = {};

  function handleKeyDown(event, keysPressed) {
      keysPressed[event.key] = true;
      handleKeyActions(keysPressed);
  }

  function handleKeyUp(event, keysPressed) {
      keysPressed[event.key] = false;
      handleKeyActions(keysPressed);
  }

  function handleKeyActions(keysPressed) {
      // Player 1
      if (keysPressed['w']) {
          movePlayer(-28, 0, "player1", player1);
      }
      if (keysPressed['s']) {
          movePlayer(28, 0, "player1", player1);
      }
      if (keysPressed['a']) {
          movePlayer(0, -28, "player1", player1);
      }
      if (keysPressed['d']) {
          movePlayer(0, 28, "player1", player1);
      }

      // Player 2
      if (keysPressed['i']) {
          movePlayer(-28, 0, "player2", player2);
      }
      if (keysPressed['k']) {
          movePlayer(28, 0, "player2", player2);
      }
      if (keysPressed['j']) {
          movePlayer(0, -28, "player2", player2);
      }
      if (keysPressed['l']) {
          movePlayer(0, 28, "player2", player2);
      }
  }

  let player1 = document.getElementById("player1");
  if (player1) {
      document.addEventListener("keydown", function(event) {
          handleKeyDown(event, keysPressedPlayer1);
      });
      document.addEventListener("keyup", function(event) {
          handleKeyUp(event, keysPressedPlayer1);
      });
  }

  let player2 = document.getElementById("player2");
  if (player2) {
      document.addEventListener("keydown", function(event) {
          handleKeyDown(event, keysPressedPlayer2);
      });
      document.addEventListener("keyup", function(event) {
          handleKeyUp(event, keysPressedPlayer2);
      });
      
  }
  


  let otherDivs = document.querySelectorAll(".closePath");

  function movePlayer(deltaTop, deltaLeft, player, div) {
      const myRect = div.getBoundingClientRect();
      const newTop = myRect.top + deltaTop;
      const newLeft = myRect.left + deltaLeft;

      if (!isOverlap(newTop, newLeft, player)) {

          // Get the current transform value
const currentTransform = div.style.transform || 'translate(0px, 0px)';

// Extract X and Y translations
const match = currentTransform.match(/(-?\d+)px, (-?\d+)px/);
const currentTranslateX = match ? parseInt(match[1]) : 0;
const currentTranslateY = match ? parseInt(match[2]) : 0;
console.log("current x translate value is : ",currentTranslateX);

// Update translation based on deltaTop and deltaLeft
if (deltaTop === -28 && deltaLeft === 0) {
  div.style.transform = `translate(${currentTranslateX}px, ${currentTranslateY - 28}px)  rotate(-90deg)`;
  div.children[0].style.transform="rotate(90deg) translateY(-45px)";
} else if (deltaTop === 28 && deltaLeft === 0) {
  div.style.transform = `translate(${currentTranslateX}px, ${currentTranslateY + 28}px)  rotate(90deg)`;
  div.children[0].style.transform="rotate(-90deg) translateY(-105px)";
} else if (deltaTop === 0 && deltaLeft === 28) {
  div.style.transform = `translate(${currentTranslateX + 28}px, ${currentTranslateY}px)  rotate(0deg)`;
  div.children[0].style.transform="rotate(0deg) translateY(-55px)";
} 
else if (deltaTop === 0 && deltaLeft === -28) {
  div.style.transform = `translate(${currentTranslateX - 28}px, ${currentTranslateY}px)  rotate(-180deg)`;
  div.children[0].style.transform="rotate(180deg) translateY(-75px)";
}

            // div.style.top = `${newTop}px`;
          // div.style.left = `${newLeft}px`;
          // div.style.backgroundColor = "aquamarine";
      } 
      // else {
      //     div.style.backgroundColor = "red";
      // }
  }

  


  function isOverlap(newTop, newLeft, player) {
      // Implement your overlap logic if needed
      return false;
  }







      function isOverlap(newTop, newLeft ,player) {
          let result = false;
          const myRect = { top: newTop, left: newLeft, right: newLeft + 35, bottom: newTop + 35 };
          for (let i = 0; i < otherDivs.length; i++) {
              const otherRect = otherDivs[i].getBoundingClientRect();
              if (
                  myRect.right > otherRect.left &&
                  myRect.left < otherRect.right &&
                  myRect.bottom > otherRect.top &&
                  myRect.top < otherRect.bottom
              ) {
                  result=true;
              }
          }

          const logo = document.getElementById("logo").getBoundingClientRect();
          if (
                  myRect.right > logo.left &&
                  myRect.left < logo.right &&
                  myRect.bottom > logo.top &&
                  myRect.top < logo.bottom
              ) {

                if (player === "player1"){
                  let name = document.querySelector("#player1Name").textContent
                  console.log("logo catched by ",name);
                  lastResult(name)
                  result=true;
                }
                else if (player === "player2"){
                  console.log("logo catched by ",player);
                  let name = document.querySelector("#player2Name").textContent
                  lastResult(name)
                  result=true;
                }
              }
          return result;
      }
  // });
}




}








new Controller(new Model(), new View());

Controller.init();
Controller.startGame();
