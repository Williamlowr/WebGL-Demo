function lineCheck(x0, y0, xend, yend) {
  var points = [];
  var dx = (xend - x0);
  var dy = (yend - y0);
  var slope = dx === 0 ? Infinity : dy / dx;

  console.log(slope);
  console.log("Starting linecheck: ", x0, y0, xend, yend);
  if (slope > 0 && slope <= 1) {
    console.log("Reached 1");
    points = drawLinePos(x0, y0, xend, yend, dx, dy);
  } else if (slope > 1) {
    console.log("2");
    points = drawLinePos(y0, x0, yend, xend, dy, dx).map((p) => [p[1], p[0]]);
  } else if (slope >= -1 && slope < 0) {
    console.log("3");
    points = drawLineNeg(x0, y0, xend, yend, dx, dy);
  } else if (slope < -1) {
    console.log("4");
    points = drawLineSteepNeg(x0, y0, xend, yend, dy, dx).map((p) => [p[1], p[0]]);
  } else if (dx === 0) {
    console.log("5");
    points = drawLineVertical(x0, y0, yend);
  } else if (dy === 0) {
    console.log("6");
    points = drawLineHorizontal(x0, y0, xend);
  }
  
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
  var yk = y0;
  var absDY = Math.abs(dy);
  var twody = 2 * absDY;
  var twodydx = twody - twodx;
  var pk = twody - dx;
  console.log("Draw neg");

  console.log("x0")
  console.log(x0);
  console.log("xend")
  console.log(xend);

  for (let xk = x0; xk <= xend; xk++) {
    points.push([xk, yk]);
    console.log(pk);
    if (pk < 0) {
      pk = twodydx + pk;
    } else {
      yk--;
      pk = pk + (2 * (absDY - dx));
    }
  }
  return points;
}

function drawLineSteepNeg(x0, y0, xend, yend, dx, dy) {
  var points = [];
  var twody = 2 * dy;
  var xk = x0;
  var absDX = dx //Math.abs(dx);
  var twodx = 2 * dx;
  var twodxdy = twodx - twody;
  var pk = twodx - dy;
  console.log("Draw neg");

  console.log("starting point: ",  x0, y0);
  console.log("ending point: ", xend, yend);

  for (let yk = y0; yk >= yend; yk--) {
    points.push([yk, xk]);
    //console.log("Point: ", xk, yk);
    //if (pk < 0) {
    //  pk = twodxdy + pk;
    //} else {
      xk++;
    //  pk = pk + (2 * (absDX - dy));
    //}
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
