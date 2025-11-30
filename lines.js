function vertical(x, y, n)
{
  var points = [];
  points.push(x, y);
  for (var i=1; i<=n; i++)
  {
    points.push(x, y+i);
    points.push(x, y-i);
  }
  return points;
}

function horizontal(x, y, n)
{
  var points = [];
  points.push(x, y);
  for (var i=1; i<=n; i++)
  {
    points.push(x+i, y);
    points.push(x-i, y);
  }
  return points;
}


function drawLine(x0, y0, xend, yend, thickness)
{
  var vertices = [];

  if (x0 > xend)
  {
    // swap points
    var t = x0;
    x0 = xend;
    xend = t;
    t = y0;
    y0 = yend;
    yend = t;
  }

  // vertical line
  if (x0 == xend)
  {
    var start = y0;
    var finish = yend;
    if (y0 > yend)
    {
      start = yend;
      finish = y0;
    }
    for (var i=start; i<=finish; i++)
    {
      vertices = vertices.concat( vertical(x0, i, thickness) );     
    }
  }
  else if (y0 == yend)  //horizontal line
  {
    var start = x0;
    var finish = xend;
    if (x0 > xend)
    {
      start = xend;
      finish = x0;
    }
    for (var i=start; i<=finish; i++)
    {
      vertices = vertices.concat( vertical(i, y0, thickness) );     
    }
  }
  else
  {
    var m = (1.0 * (yend - y0)) / (1.0 * (xend - x0));
    if ((m < 1.0) && (-1.0*m < 1.0))
    {
      // Bresenham's Algorithm assuming abs(slope) < 1.0
      var yincrement = 1;
      if (m < 0)
      {
        yincrement = -1;
      } 
      var dx = xend - x0;
      var dy = (yend - y0) * yincrement;
      var twodx = 2 * dx;
      var twody = 2 * dy;
      var twodydx = twody - twodx;
      var pk = twody - dx;
      var xk = x0;
      var yk = y0;

      vertices = vertices.concat( vertical(x0, y0, thickness) );
      vertices = vertices.concat( vertical(xend, yend, thickness) );

      while (xk < xend)
      {
        if (pk < 0)
        {
          vertices = vertices.concat ( vertical(xk + 1, yk, thickness) );
          pk = pk + twody;
        }
        else
        {
          vertices = vertices.concat ( vertical(xk + 1, yk + yincrement, thickness) );
          pk = pk + twodydx;
          yk = yk + yincrement; 
        }
        xk = xk + 1;
      }
    }
    else
    {
      // Bresenham's Algorithm assuming abs(slope) > 1.0
      var yincrement = 1;
      if (m < 0)
      {
        yincrement = -1;
      }  
      var dx = xend - x0;
      var dy = (yend - y0) * yincrement;
      var twodx = 2 * dx;
      var twody = 2 * dy;
      var twodxdy = twodx - twody;
      var pk = twodx - dy;
      var xk = x0;
      var yk = y0;
 
      vertices = vertices.concat ( horizontal(x0, y0, thickness) );
      vertices = vertices.concat ( horizontal(xend, yend, thickness) );

      while ((yk * yincrement) < (yend * yincrement))
      {
        if (pk < 0)
        {
          vertices = vertices.concat ( horizontal(xk, yk + yincrement, thickness) );
          pk = pk + twodx;
        }
        else
        {
          vertices = vertices.concat ( horizontal(xk + 1, yk + yincrement, thickness) );
          pk = pk + twodxdy;
          xk = xk + 1; 
        }
        yk = yk + yincrement;
      }
    }
  }

  return vertices;
}


