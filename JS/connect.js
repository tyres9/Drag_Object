let start
let end
	
   class Connection {
      constructor(rectA, rectB) {
        this.rectA = rectA;
        this.rectB = rectB;
	　this.selected = false;

      }


      display() {

	start = this.rectA.center();
      end = this.rectB.boundaryIntersection(start);	

        stroke(this.selected? 'red':'black');
        strokeWeight(2);
        fill(0);

        // Draw line
        line(start.x, start.y, end.x, end.y);

        // Draw arrowhead
        push();
        translate(end.x, end.y);
        let angle = atan2(end.y - start.y, end.x - start.x);
        rotate(angle);
        noStroke();
        fill(this.selected? 'red':'black');
        // Triangle for arrowhead
        triangle(0, 0, -10, 5, -10, -5);
        pop();
      }
	

	// Helper function: check if mouse is near a line
	isMouseNear(mx,my) {
		start = this.rectA.center();
      	end = this.rectB.boundaryIntersection(start);
  		let d = distToSegment(createVector(mx, my),
                        createVector( start.x, start.y),
                        createVector( end.x, end.y));
  			return d < 10; // 10 pixels tolerance
	}



    }

	function distToSegment(p, v, w) {
  		const l2 = p5.Vector.dist(v, w) ** 2;
  		if (l2 === 0) return p5.Vector.dist(p, v);

  		let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  		t = constrain(t, 0, 1);
  		const projection = createVector(
    						v.x + t * (w.x - v.x),
   						 v.y + t * (w.y - v.y)
  						);
  			return p5.Vector.dist(p, projection);
      }