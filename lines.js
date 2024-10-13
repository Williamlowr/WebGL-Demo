function lineCheck(x0, y0, xend, yend) {
  var points = [];
  var dx = xend - x0;
  var dy = yend - y0;
  // Customizable thickness
  var thickness = 10;

  // Check vertical
  if (dx === 0) {
    points = drawLineVertical(x0, y0, yend, thickness);
    return points;
  }

  // Check horizontal
  if (dy === 0) {
    points = drawLineHorizontal(x0, y0, xend, thickness);
    return points;
  }

  // Calculate slope
  var slope = dy / dx;

  // Slope cases
  if (slope > 0 && slope <= 1) {
    console.log("Pos " + slope);
    points = drawLinePos(x0, y0, xend, yend, dx, dy, thickness);

  } else if (slope > 1) {
    console.log("StPos " + slope);
    points = drawLineSteepPos(y0, x0, yend, xend, dy, dx, thickness).map(
      (p) => [p[1], p[0]]
    );

  } else if (slope >= -1 && slope < 0) {
    console.log("Neg " + slope);
    points = drawLineNeg(x0, y0, xend, yend, dx, dy, thickness);

  } else if (slope < -1) {
    console.log("StNeg " + slope);
    points = drawLineSteepNeg(y0, x0, yend, xend, dx, dy, thickness).map(
      (p) => [p[1], p[0]]
    );
  }

  return points;
}

function drawLinePos(x0, y0, xend, yend, dx, dy, thickness) {
  var points = [];
  var twodx = 2 * dx;
  var twody = 2 * dy;
  var twodydx = twody - twodx;
  var pk = twody - dx;
  var yk = y0;

  for (let xk = x0; xk <= xend; xk++) {
    // Iterate through points, add vertical thickness
    for (let width = -thickness; width <= thickness; width++) {
      points.push([xk, yk + width]);
    }
    if (pk < 0) {
      pk = pk + twody;
    } else {
      yk++;
      pk = pk + twodydx;
    }
  }
  return points;
}

function drawLineSteepPos(y0, x0, yend, xend, dx, dy, thickness) {
  var points = [];
  var twodx = 2 * dx;
  var twody = 2 * dy;
  var twodxdy = twody - twodx;
  var pk = twodx - dy;
  var xk = x0;

  if (x0 > xend) {
    [x0, xend] = [xend, x0];
    [y0, yend] = [yend, y0];
    dx = xend - x0;
    dy = yend - y0;
  }

  for (let yk = y0; yk <= yend; yk++) {
    for (let width = -thickness; width <= thickness; width++) {
      points.push([yk, xk + width]);
    }
    if (pk < 0) {
      pk = twodx + pk;
    } else {
      xk++;
      pk = pk + twodxdy;
    }
  }
  return points;
}

function drawLineNeg(x0, y0, xend, yend, dx, dy, thickness) {
  var points = [];
  var twodx = 2 * dx;
  var yk = y0;
  var dy = -dy;
  var twody = 2 * dy;
  var twodydx = twody - twodx;
  var pk = twody - dx;

  for (let xk = x0; xk <= xend; xk++) {
    for (let width = -thickness; width <= thickness; width++) {
      points.push([xk, yk + width]);
    }
    if (pk < 0) {
      pk = pk + twody;
    } else {
      yk--;
      pk = pk + twodydx;
    }
  }
  return points;
}

function drawLineSteepNeg(y0, x0, yend, xend, dx, dy, thickness) {
  var points = [];

  if (y0 < yend) {
    [y0, yend] = [yend, y0];
    [x0, xend] = [xend, x0];
    dx = xend - x0;
    dy = yend - y0;
  }

  var xk = x0;
  dy = -dy;
  var twody = 2 * dy;
  var twodx = 2 * dx;
  var twodxdy = twodx - twody;
  var pk = twodx - dy;

  for (let yk = y0; yk >= yend; yk--) {
    for (let width = -thickness; width <= thickness; width++) {
      points.push([yk, xk + width]);
    }
    if (pk < 0) {
      pk = twodx + pk;
    } else {
      xk++;
      pk = pk + twodxdy;
    }
  }
  return points;
}

drawLineVertical = (x0, y0, yend, thickness) => {
  let points = [];
  for (let y = Math.min(y0, yend); y <= Math.max(y0, yend); y++) {
    for (let width = -thickness; width <= thickness; width++) {
      points.push([x0 - width, y]);
    }
  }
  return points;
};

drawLineHorizontal = (x0, y0, xend, thickness) => {
  let points = [];
  for (let x = Math.min(x0, xend); x <= Math.max(x0, xend); x++) {
    for (let width = -thickness; width <= thickness; width++) {
      points.push([x, y0 - width]);
    }
  }
  return points;
};
