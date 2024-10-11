function width(x, y)
{
  var points = [];
  points.push([x, y]);
  for (var d=1; d<=1; d++)
  {
    points.push([x, y-d]);
    points.push([x, y+d]);
  }
  return points
}

function plot(x, y)
{
  var points = [];
  points = points.concat(width(x, y));
  points = points.concat(width(x, -1*y));
  points = points.concat(width(-1*x, y));
  points = points.concat(width(-1*x, -1*y));
  points = points.concat(width(y, x));
  points = points.concat(width(-1*y, x));
  points = points.concat(width(y, -1*x));
  points = points.concat(width(-1*y, -1*x));
  return points;
}


function drawCircle(r)
{

// Midpoint Circle Algorithm plotting top sector of circle 
  var vertices = [];
  var points = [];

  var x0 = 0;
  var y0 = r;
  points = plot (x0, y0);
  for (var i=0; i<points.length; i++)
  {
    vertices.push(points[i]);
  }

  var p0 = 1 - r;

  var xk = x0;
  var yk = y0;
  var pk = p0;

  while (xk < yk)
  {
    if (pk < 0)
    {
      xk = xk + 1;
      points = plot (xk, yk);
      for (var i=0; i<points.length; i++)
      {
        vertices.push(points[i]);
      }
      pk = pk + (2 * xk) + 1;
    }
    else
    {
      xk = xk + 1;
      yk = yk - 1;
      points = plot (xk, yk);
      for (var i=0; i<points.length; i++)
      {
        vertices.push(points[i]);
      }
      pk = pk + (2 * xk) + 1 - (2 * yk);
    }
  }

  return vertices;
}



