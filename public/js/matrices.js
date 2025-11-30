function IdentityMatrix3D()
{
  return [[1, 0, 0, 0],
          [0, 1, 0, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 1]];
}

function TranslateMatrix3D(tx, ty, tz)
{
  return [[1, 0, 0, tx],
          [0, 1, 0, ty],
          [0, 0, 1, tz],
          [0, 0, 0, 1]];
}

function ScalingMatrix3D(sx, sy, sz)
{
  return [[sx, 0, 0, 0],
          [0, sy, 0, 0],
          [0, 0, sz, 0],
          [0, 0, 0, 1]];
}

function RotationZMatrix3D(degrees)
{
  radians = degrees * (Math.PI / 180.0);
  return [ [Math.cos(radians), -1.0*Math.sin(radians), 0, 0],
           [Math.sin(radians), Math.cos(radians), 0, 0],
           [0, 0, 1, 0],
           [0, 0, 0, 1]  ];
}

function RotationXMatrix3D(degrees)
{
  radians = degrees * (Math.PI / 180.0);
  return [ [1, 0, 0, 0],
           [0, Math.cos(radians), -1.0*Math.sin(radians), 0],
           [0, Math.sin(radians), Math.cos(radians), 0],
           [0, 0, 0, 1]  ];
}

function RotationYMatrix3D(degrees)
{
  radians = degrees * (Math.PI / 180.0);
  return [ [Math.cos(radians), 0, Math.sin(radians), 0],
           [0, 1, 0, 0], 
           [-1.0*Math.sin(radians), 0, Math.cos(radians), 0],
           [0, 0, 0, 1]  ];
}

function MatrixMultiply3D(u, v)
{
  var w = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0] ];
  for (var i=0; i<4; i++)
  {
    for (var j=0; j<4; j++)
    {
      w[i][j] = (u[i][0] * v[0][j]) + (u[i][1] * v[1][j]) + (u[i][2] * v[2][j]) + (u[i][3] * v[3][j]);
    }
  }
  return w;
}

function VectorMultiply3D(m, p)
{
  var q = [];
  for (var i=0; i<4; i++)
  {
    q[i] = (m[i][0] * p[0]) + (m[i][1] * p[1]) + (m[i][2] * p[2]) + (m[i][3] * p[3]);
  }
  return q;
}

function crossProduct(a, b)
{
  var rv = [];
  rv[0] = a[1]*b[2] - a[2]*b[1];
  rv[1] = a[2]*b[0] - a[0]*b[2];
  rv[2] = a[0]*b[1] - a[1]*b[0];
  return rv;
}

function dotProduct(V1, V2)
{
  return V1[0]*V2[0] + V1[1]*V2[1] + V1[2]*V2[2];
}

function magnitude(v)
{
  return Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
}

function getWorldToViewingMatrix3D(p0, pref)
{
  // Build View-Normal Vector
  var N = [];
  for (var i=0; i<4; i++)
  {
    N[i] = p0[i] - pref[i];
  }

  // Define View-Up Vector
  V = [0.0, 1.0, 0.0, 0.0];

  // Compute u, v, n unit vectors
  var magN = magnitude(N);
  var n = [];
  for (var i=0; i<4; i++)
  {
    n[i] = N[i]/magN;
  }
  var u = crossProduct(V, n);
  var magu = magnitude(u);
  for (var i=0; i<4; i++)
  {
    u[i] = u[i]/magu;
  }
  var v = crossProduct(n, u);

  var T = [ [1, 0, 0, -1.0 * p0[0] ],
            [0, 1, 0, -1.0 * p0[1] ],
            [0, 0, 1, -1.0 * p0[2] ],
            [0, 0, 0, 1 ]            ];

  var R = [ [u[0], u[1], u[2], 0],
            [v[0], v[1], v[2], 0],
            [n[0], n[1], n[2], 0],
            [0, 0, 0, 1           ]  ];

  return MatrixMultiply3D(R, T);
}


function getParallelProjectionMatrix(VP, zvp)
{
  return [  [1, 0, -1.0*VP[0]/VP[2], 1.0*zvp*VP[0]/VP[2] ],
            [0, 1, -1.0*VP[1]/VP[2], 1.0*zvp*VP[1]/VP[2] ],
            [0, 0, 1, 0],
            [0, 0, 0, 1]  ]; 
}

function getPerspectiveProjectionMatrix(prp, zvp)
{
  return [  [prp[2]-zvp, 0, -1*prp[0], prp[0]*prp[2] ],
            [0, prp[2]-zvp, -1*prp[1], prp[1]*prp[2] ],
            [0, 0, 1, 0],
            [0, 0, -1, prp[2]]  ]; 
}

function visibleFace(p1, p2, p3, p4)
{
  var x1 = p1[0];
  var y1 = p1[1];
  var z1 = p1[2];
  var x2 = p2[0];
  var y2 = p2[1];
  var z2 = p2[2];
  var x3 = p3[0];
  var y3 = p3[1];
  var z3 = p3[2];
  return ( (x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2)) > 0 )
}