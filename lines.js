function lineCheck(x0, y0, xend, yend) {
  var points = [];
  var dx = (xend - x0);
  var dy = (yend - y0);
  var slope = dx === 0 ? Infinity : dy / dx;

  

  if (slope > 0 && slope <= 1) {
    points = drawLinePos(x0, y0, xend, yend, dx, dy);
  } else if (slope > 1) {
    points = drawLinePos(y0, x0, yend, xend, dy, dx).map((p) => [p[1], p[0]]);
  } else if (slope >= -1 && slope < 0) {
    points = drawLineNeg(x0, y0, xend, yend, dx, dy);
  } else if (slope < -1) {
    points = drawLineNeg(y0, x0, yend, xend, dy, dx).map((p) => [p[1], p[0]]);
  } else if (dx === 0) {
    points = drawLineVertical(x0, y0, yend);
  } else if (dy === 0) {
    points = drawLineHorizontal(x0, y0, xend);
  }
  
  console.log("lineCheck called with", { x0, y0, xend, yend, slope });
  return points;
}

function drawLinePos(x0, y0, xend, yend, dx, dy) {
  var points = [];
  var twodx = 2 * dx;
  var twody = 2 * dy;
  var twodydx = twody - twodx;
  var pk = twody - dx;
  var yk = y0;

  for (let xk = x0; xk <= xend; xk++) {
    points.push([xk, yk]);
    if (pk < 0) {
      pk = pk + twody;
    } else {
      yk++;
      pk = pk + twodydx;
    }
  }
  return points;
}

function drawLineNeg(x0, y0, xend, yend, dx, dy) {
  var points = [];
  var twodx = 2 * dx;
  var twody = 2 * dy;
  var twodydx = twody - twodx;
  var pk = twody - dx;
  var yk = y0;

  for (let xk = x0; xk <= xend; xk++) {
    points.push([xk, yk]);
    if (pk < 0) {
      pk = pk + twody;
    } else {
      // Handle the slope direction for negative slope
      yk = y0 < yend ? yk - 1 : yk + 1;  // Ensure correct slope direction
      pk = pk + twodydx;
    }
  }
  return points;
}

drawLineVertical = (x0, y0, xend, yend) => {
  let points = [];
  for (let y = Math.min(y0, yend); (y <= Math.max(y0, yend)); y++) {
    points.push([x0, y]);
  }
  return points;
};

drawLineHorizontal = (x0, y0, xend) => {
  let points = [];
  for (let x = Math.min(x0, xend); x <= Math.max(x0, xend); x++) {
    points.push([x, y0]);
  }
  return points;
};
