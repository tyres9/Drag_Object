let rectangles = [];
let connections =[];
let selectedRects = [];
let dragging = false;
let dragOffsets = [];

let canvas;
let ctrlPressec = false;

function setup(){
    //const container = document.getElementById("canvas-container")
    canvas = createCanvas(windowWidth, windowHeight)
    //canvas.parent(container)

    let addBtn = select('#addRectBtn')
    addBtn.mousePressed(addRectanglePrompt);
    
    let connectBtn = select('#connectBtn')
    connectBtn.mousePressed(connectSelectedRectangles);
}


function draw() {
    background(255);

    //connect 2rectangles with a line
    for (let conn of connections){
        conn.display();
    }

    //Draw rectangles
    for (let rect of rectangles){
        rect.display();
    }

    //Dragging function for multiple rectangles
    if (dragging && selectedRects.length > 0){
        for (i = 0; i < selectedRects.length; i++){
            let rect = selectedRects[i];
            let offset = dragOffsets[i];
            rect.x = mouseX + offset.x;
            rect.y = mouseY + offset.y;
        }
    }
}


function addRectanglePrompt(){
    let name = prompt("Enter a name:");
    if(name && name.trim() !== ""){
        //Create the object rectangle
        let w = 140;
        let h = 60;
        let x = 100;
        let y = 100;
        let newRect = new DraggableRect(x,y,w,h,name.trim());
        rectangles.push(newRect);
    }
}


function mousePressed(){
    //Check mouse location is inside the rectangle object
    let clickedRect = null;
    for (let i = rectangles.length -1; i >=0; i--){
        if (rectangles[i].isMouseInside(mouseX,mouseY)){
            clickedRect = rectangles[i];
            break;
        }
    }

    if (clickedRect){
        // if Control key is pressed, toggle slection
        if (keyIsDown(CONTROL)){
            if (clickedRect.selected){
                clickedRect.selected = false;
                selectedRects = selectedRects.filter(r => clickedRect);
            }else{
                clickedRect.selected = true;
                selectedRects.push(clickedRect);
            }
        }else{
            //if not Ctrl,slect only this rectangle
            clearSelection();
            clickedRect.selected = true;
            selectedRects = [clickedRect];
        }

            //Begin Dragging
        dragging = true
        dragOffsets = selectedRects.map(r=> createVector(r.x-mouseX, r.y-mouseY));

        //Bring clickedRect to front
        rectangles.push(rectangles.splice(rectangles.indexOf(clickedRect),1)[0])
    } else{
        //clicked empty space -clear section
        clearSelection();
    }
}


function mouseReleased(){
    dragging =false
}


function clearSelection(){
    for (let r of selectedRects){
        r.selected = false;
    }
    selectedRects = [];    
}


function connectSelectedRectangles(){
    let selected = rectangles.filter(r=>r.selected );
    if (selected ===2){
        connections.push(new connections(selected[0],selected[1]));
        selected.forEach(r => r.selected = false);            
    }else{
        alert("Please select exactly 2 rectangles")
    }
}


