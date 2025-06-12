 class DraggableRect {
      constructor(x, y, w, h, name,bopKey) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.caption= name;
	  this.bopKey = bopKey;	
        this.selected = false;
        this.dragging = false;
      }

      display() {
		
        stroke(this.selected ? 'blue' : 'black');
        strokeWeight(this.selected ? 3 : 1);
        fill(this.selected ? '#aaddff' : '#eee');
        rect(this.x, this.y, this.w, this.h, 5);

        fill(0);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(16);
	  let captionShort = this.caption.slice(0,12)
	  if (this.selected){
        	//text(this.caption, this.x + this.w / 2, this.y + this.h / 2);
		text(this.caption, this.x + this.w / 2, this.y + this.h / 2);
	  }else{
		text(captionShort, this.x + this.w / 2, this.y + this.h / 2);
	  }	
      }

      isMouseInside(mx, my) {
        return mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h;
      }

      // Get center point
      center() {
        return createVector(this.x + this.w / 2, this.y + this.h / 2);
      }

      // Calculate boundary intersection for arrow end point
      // Returns point on boundary where a line from startPt to center touches rectangle border
      boundaryIntersection(startPt) {
        let cx = this.x;
        let cy = this.y;
        let cw = this.w;
        let ch = this.h;

        // Vector from startPt to center
        let centerPt = this.center();
        let dx = centerPt.x - startPt.x;
        let dy = centerPt.y - startPt.y;

        if (dx === 0 && dy === 0) return centerPt.copy();

        // Rectangle boundaries
        let left = cx;
        let right = cx + cw;
        let top = cy;
        let bottom = cy + ch;

        // Parametric line intersection approach:
        // Find t where line hits each side:
        // x = startPt.x + t*dx
        // y = startPt.y + t*dy
        // For vertical edges: x = left or right
        // For horizontal edges: y = top or bottom
        let tValues = [];

        // left edge
        if (dx !== 0) {
          let t = (left - startPt.x) / dx;
          let y = startPt.y + t * dy;
          if (t >= 0 && y >= top && y <= bottom) tValues.push(t);
        }

        // right edge
        if (dx !== 0) {
          let t = (right - startPt.x) / dx;
          let y = startPt.y + t * dy;
          if (t >= 0 && y >= top && y <= bottom) tValues.push(t);
        }

        // top edge
        if (dy !== 0) {
          let t = (top - startPt.y) / dy;
          let x = startPt.x + t * dx;
          if (t >= 0 && x >= left && x <= right) tValues.push(t);
        }

        // bottom edge
        if (dy !== 0) {
          let t = (bottom - startPt.y) / dy;
          let x = startPt.x + t * dx;
          if (t >= 0 && x >= left && x <= right) tValues.push(t);
        }

        if (tValues.length === 0) {
          return centerPt.copy();
        }

        // Smallest positive t is closest intersection
        let tMin = Math.min(...tValues);

        return createVector(startPt.x + tMin * dx, startPt.y + tMin * dy);
      }

    }


