function intensity(
  p,
  N,
  V,
  lightPositions,
  lightDirections,
  lightIntensities,
  ambientLight,
  surfaceEmission
) {
  var Ifinal = 0.0;
  var ka = 0.5;
  var kd = 0.5;
  var ks = 1.0;
  var ns = 2.0;

  // Compute Ambient contribution, Iambdiff
  Iamb = ambientLight * ka;

  // Compute Radial Intensity Attenuation, Frad, for each light source
  var Frad = [];
  for (var i = 0; i < lightPositions.length; i++) {
    var lp = lightPositions[i];
    var dist = Math.sqrt(
      (p[0] - lp[0]) * (p[0] - lp[0]) +
        (p[1] - lp[1]) * (p[1] - lp[1]) +
        (p[2] - lp[2]) * (p[2] - lp[2])
    );
    Frad[i] = (1000.0 * 1000.0) / (dist * dist);
  }

  // Compute angular attenuation, Fang, for each light source if it is a spotlight
  // If light source is not a spotlight, use a value of 1.0
  var Fang = [];
  for (var i = 0; i < lightPositions.length; i++) {
    var lp = lightPositions[i];
    var ld = lightDirections[i];

    var Vobj = [p[0] - lp[0], p[1] - lp[1], p[2] - lp[2]];
    var mag = magnitude(Vobj);
    Vobj = [Vobj[0] / mag, Vobj[1] / mag, Vobj[2] / mag];

    var Vlight = [ld[0] - lp[0], ld[1] - lp[1], ld[2] - lp[2]];
    mag = magnitude(Vlight);
    Vlight = [Vlight[0] / mag, Vlight[1] / mag, Vlight[2] / mag];

    var dot = dotProduct(Vobj, Vlight);
    if (dot < 0.0 || dot > 1.0) {
      dot = 0.0;
    }
    Fang[i] = dot;
  }

  // Compute the diffuse reflection from the surface point, Idiff, for each light source
  var Idiff = [];
  for (var i = 0; i < lightPositions.length; i++) {
    var lp = lightPositions[i];

    var L = [lp[0] - p[0], lp[1] - p[1], lp[2] - p[2]];
    var mag = magnitude(L);
    L = [L[0] / mag, L[1] / mag, L[2] / mag];

    mag = magnitude(N);
    var Nunit = [N[0] / mag, N[1] / mag, N[2] / mag];

    var dot = dotProduct(Nunit, L);
    if (dot > 0.0) {
      Idiff[i] = dot * kd * lightIntensities[i];
    } else {
      Idiff[i] = 0.0;
    }
  }

  // Compute the specular reflection from the surface point, Ispec, for each light source
  var Ispec = [];
  for (var i = 0; i < lightPositions.length; i++) {
    var L = [lp[0] - p[0], lp[1] - p[1], lp[2] - p[2]];
    var mag = magnitude(L);
    L = [L[0] / mag, L[1] / mag, L[2] / mag];

    mag = magnitude(V);
    var Vunit = [V[0] / mag, V[1] / mag, V[2] / mag];

    var H = [L[0] + Vunit[0], L[1] + Vunit[1], L[2] + Vunit[2]];
    mag = magnitude(H);
    H = [H[0] / mag, H[1] / mag, H[2] / mag];

    mag = magnitude(N);
    var Nunit = [N[0] / mag, N[1] / mag, N[2] / mag];

    var dot = dotProduct(Nunit, H);
    if (dot > 0.0) {
      Ispec[i] = ks * Math.pow(dot, ns) * lightIntensities[i];
    } else {
      Ispec[i] = 0.0;
    }
  }

  var sum = 0.0;
  for (var i = 0; i < lightPositions.length; i++) {
    sum += Frad[i] * Fang[i] * (Idiff[i] + Ispec[i]);
  }
  Ifinal = surfaceEmission + Iamb + sum;
  return Ifinal;
}

function hsv2rgb(h, s, v) {
  var c = v * s;
  var hp = h / 60.0;
  var x = c * (1.0 - Math.abs((hp % 2) - 1.0));
  var rgb = [];

  if (hp < 1.0) {
    rgb = [c, x, 0.0];
  } else if (hp < 2.0) {
    rgb = [x, c, 0.0];
  } else if (hp < 3.0) {
    rgb = [0.0, c, x];
  } else if (hp < 4.0) {
    rgb = [0.0, x, c];
  } else if (hp < 5.0) {
    rgb = [x, 0.0, c];
  } else if (hp < 6.0) {
    rgb = [c, 0.0, x];
  }

  var m = v - c;
  rgb = [rgb[0] + m, rgb[1] + m, rgb[2] + m];
  return rgb;
}
