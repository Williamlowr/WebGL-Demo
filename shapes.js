function symmetry(x, y)
{
  var points = [];
  points.push(x, y);
  points.push(-x, y);
  points.push(x, -y);
  points.push(-x, -y);
  points.push(y, x);
  points.push(-y, x);
  points.push(y, -x);
  points.push(-y, -x);
  return points;
}

function drawCircle(xc, yc, r) {
 
  var vertices = [];
  var points = [];

  points = symmetry(0.0/100.0, r/100.0);
  for (var i =0; i<points.length; i++)
  {
    vertices.push(points[i]);
  }

  var p = 1 - r;
  var y = r;
  var x = 0;

  while (x <= y)
  {
    x++;
    if (p < 0)
    {
      points = symmetry(x/100.0, y/100.0);
      for (var i=0; i<points.length; i++)
      {
        vertices.push(points[i]);
      }
      p = p + (2*x) + 1;
    }
    else
    {
      y--;
      points = symmetry(x/100.0, y/100.0);
      for (var i=0; i<points.length; i++)
      {
        vertices.push(points[i]);
      }
      p = p + (2*x) + 1 - (2*y);
    }
  }

  for (var i=0; i<vertices.length; i+=2)
  {
    vertices[i] = vertices[i] + xc;
    vertices[i+1] = vertices[i+1] + yc;
  }

  return vertices;
}


