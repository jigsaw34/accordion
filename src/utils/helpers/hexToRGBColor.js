export const hexToRGB = hexColor => {
  const hasHas = hexColor.charAt(0) == '#';
  const cut = hasHas ? hexColor.substring(1, 7) : hexColor;
  const toRgb = (start, end) => parseInt(cut.substring(start, end), 16) / 255;

  return {
    r: toRgb(0, 2),
    g: toRgb(2, 4),
    b: toRgb(4, 6),
  }
}