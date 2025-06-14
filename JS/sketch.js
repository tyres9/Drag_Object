    let rectangles = [];
    let connections = [];
    let selectedRects = [];
    let dragging = false;
    let dragOffsets = [];
    let selectedLines = []; 
    let clickedLine = null;	

    let canvas;
    let ctrlPressed = false;

 

    function setup() {
     const container = document.getElementById('canvas-container');
      canvas = createCanvas(windowWidth*3, windowHeight*4);
      canvas.parent(container);

      // Prevent default context menu on right-click for canvas
      canvas.elt.oncontextmenu = e => e.preventDefault();

      textFont('Arial');

	let addBtn = select('#addRectBtn');
      addBtn.mousePressed(addRectanglePrompt);

      let connectBtn = select('#connectBtn');
      connectBtn.mousePressed(connectSelectedRectangles)

      let delBtn = select('#deleteBtn');
      delBtn.mousePressed(delRec)

	let disconnectBtn = select('#disconnectBtn');
      disconnectBtn .mousePressed(delConnect)	
	

	
  /*    // Setup buttons
      document.getElementById('addRectBtn').addEventListener('click', addRectanglePrompt);
      document.getElementById('connectBtn').addEventListener('click', connectSelectedRectangles); 

	canvas = createCanvas(windowWidth*2, windowHeight*2);
      let addBtn = select('#addRectBtn');
      addBtn.mousePressed(addRectanglePrompt);

      let connectBtn = select('#deleteBtn');
      connectBtn.mousePressed(connectSelectedRectangles);	*/


    }

    function draw() {
      background(200);

      // Draw connections behind rectangles
      for (let conn of connections) {
        conn.display();
      }

      // Draw rectangles on top
      for (let rect of rectangles) {
        rect.display();
      }

      // Handle dragging multiple rectangles
      if (dragging && selectedRects.length > 0) {
        for (let i = 0; i < selectedRects.length; i++) {
          let rect = selectedRects[i];
          let offset = dragOffsets[i];
          rect.x = mouseX + offset.x;
          rect.y = mouseY + offset.y;
        }
      }
    }

    function addRectanglePrompt() {
      let name = prompt('Enter a name for the rectangle:');
      if (name && name.trim() !== '') {
        // Create rectangle at random position
        let w = 140;
        let h = 60;
        let x = 100;
        //let y = random(20, height - h - 20);
        let y = 100;
	  let bopKey = "BOP_" + Date.now()	
        let newRect = new DraggableRect(x, y, w, h, name.trim(),bopKey);
        rectangles.push(newRect);
      }
    }

    function mousePressed() {
      // Check if mouse is inside any rectangle (topmost first)
      let clickedRect = null;
      for (let i = rectangles.length - 1; i >= 0; i--) {
        if (rectangles[i].isMouseInside(mouseX, mouseY)) {
          clickedRect = rectangles[i];
          break;
        }
      }

      if (clickedRect) {
        // If Ctrl pressed, toggle selection
        if (keyIsDown(CONTROL)) {
          if (clickedRect.selected) {
            clickedRect.selected = false;
            selectedRects = selectedRects.filter(r => r !== clickedRect);
          } else {
            clickedRect.selected = true;
            selectedRects.push(clickedRect);
          }
        } else {
          // If not Ctrl, select only this rectangle
          clearSelection();
          clickedRect.selected = true;
          selectedRects = [clickedRect];
        }

        // Begin dragging
        dragging = true;
        dragOffsets = selectedRects.map(r => createVector(r.x - mouseX, r.y - mouseY));

        // Bring clickedRect to front
        rectangles.push(rectangles.splice(rectangles.indexOf(clickedRect), 1)[0]);
      } else {
        // Clicked empty space - clear selection
        clearSelection();
      }

	//select a line	
	 for (let i = connections.length - 1; i >= 0; i--) {
		if (connections[i].isMouseNear(mouseX,mouseY) && selectedRects.length ===0){
			connections[i].selected = true;
			break;
		}
	}
    }

    function mouseReleased() {
      dragging = false;
    }

    function clearSelection() {
      for (let r of selectedRects) {
        r.selected = false;
      }
	for (conn of connections) {
        conn .selected = false;
	}
      selectedRects = [];
    }

    function connectSelectedRectangles() {
      let selected = rectangles.filter(r => r.selected);
      if (selected.length === 2) {
		
     //   connections.push([selected[0], selected[1]]);
	connections.push(new Connection(selected[0], selected[1]));
        selected.forEach(r => r.selected = false); // Auto deselect after connect
      } else {
        alert("Please select exactly 2 rectangles.");
      }

    }

     function delRec(){
		 for (let i = rectangles.length - 1; i >= 0; i--){
			if (rectangles[i].selected === true){
				 for (let c = connections.length - 1; c >= 0; c--){
					if (connections[c].rectA === rectangles[i] || connections[c].rectB === rectangles[i]){
						connections[c]=null;
						connections.splice([c],1);
					}
				}
				rectangles[i]=null;
				rectangles.splice([i],1);				
			}
		}selectedRects=[] 	
    }
	
     function delConnect(){
		 for (let i = connections.length - 1; i >= 0; i--){
			if (connections[i].selected === true){
				connections[i]=null;
				connections.splice([i],1);				
			}
		}selectedRects=[] 	
    }

   






