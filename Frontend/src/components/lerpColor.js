function lerpColor(color1, color2, factor) {
  // Parse colors
  const r1 = parseInt(color1.substring(1, 3), 16);
  const g1 = parseInt(color1.substring(3, 5), 16);
  const b1 = parseInt(color1.substring(5, 7), 16);
  const r2 = parseInt(color2.substring(1, 3), 16);
  const g2 = parseInt(color2.substring(3, 5), 16);
  const b2 = parseInt(color2.substring(5, 7), 16);
  // Interpolate RGB values
  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);
  //Convert RGB back to hex
  const interpolatedColor =
    "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return interpolatedColor;
}
module.exports = lerpColor;
