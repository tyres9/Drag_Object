class DraggableRect{
    constructor(x,y,w,h,name){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.name = name;
        this.selected = false;
        this.dragging = false;        
    }

    display(){
        stroke(this.selected?'blue':'black');
        strokeWeight(this.selected?3:1);
        fill(this.selected? '#aaddff':'#eee');
        rect(this.x,this.y,this.w,this.h,5);

        fill(0);
        noStroke();
        textAlign(CENTER,CENTER);
        textSize(16);
        text(this.name, this.x + this.w/2, this.y + this.h/2);
    }

    isMouseInside(mx,my){
        return mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h;
    }

    center(){
        return createVector(this.x + this.w/2, this.y + this.h/2);
    }

    //Calculate boundary intersection for arrow end point
    //Returns point on boundary where a line from start poimt to center touches rectangle border
    boundaryIntersection(){
        let cx =this.x;
        let cy = this.y;
        let cw = this.w;
        let ch = this.h;

        //vector from startPt to center
        let centerPt = this.center;
        let dx = centerPt.x - startPt.x;
        let dy = centerPt.y - startPt.y;

        if (dx ===0 && dy === 0) return centerPt.copy();

        //Rectangle boundaries
        let left = cx;
        let right = cx + cw;
        let top = cy;
        let bottom = cy + ch;

        let tValues = [];

        
    }
}