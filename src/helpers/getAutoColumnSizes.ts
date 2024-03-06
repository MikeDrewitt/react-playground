// Must align with the CSS threshholds for this to work correctly
const COLUMN_THRESHOLDS = {
  1: {
    max: 21,
    5000: 20,
    4600: 19,
    4300: 18,
    4000: 17,
    3500: 16,
    3100: 15,
    2800: 14,
    2500: 13,
    2300: 11,
    1800: 10,
    1500: 9,
    1200: 8,
    1000: 6,
    800: 5,
    600: 3,
  },
  2: {
    max: 18,
    5000: 17,
    4600: 16,
    4300: 15,
    4000: 14,
    3500: 13,
    3100: 12,
    2800: 10,
    2500: 9,
    2300: 8,
    1800: 6,
    1500: 5,
    1200: 5,
    1000: 3,
    800: 3,
    600: 2,
  },
  3: {
    max: 17,
    5000: 16,
    4600: 15,
    4300: 14,
    4000: 13,
    3500: 12,
    3100: 11,
    2800: 10,
    2500: 9,
    2300: 8,
    1800: 6,
    1500: 5,
    1200: 4,
    1000: 3,
    800: 2,
    600: 1,
  },
}

export function getColumnCount(imageSize: 1 | 2 | 3, width: number): number {
  const thresholds = COLUMN_THRESHOLDS[imageSize]

  let columnCount = thresholds.max

  if (width <= 5000) columnCount = thresholds[5000]
  if (width <= 4600) columnCount = thresholds[4600]
  if (width <= 4300) columnCount = thresholds[4300]
  if (width <= 4000) columnCount = thresholds[4000]
  if (width <= 3500) columnCount = thresholds[3500]
  if (width <= 3100) columnCount = thresholds[3100]
  if (width <= 2800) columnCount = thresholds[2800]
  if (width <= 2500) columnCount = thresholds[2500]
  if (width <= 2300) columnCount = thresholds[2300]
  if (width <= 1800) columnCount = thresholds[1800]
  if (width <= 1500) columnCount = thresholds[1500]
  if (width <= 1200) columnCount = thresholds[1200]
  if (width <= 1000) columnCount = thresholds[1000]
  if (width <= 800) columnCount = thresholds[800]
  if (width <= 600) columnCount = thresholds[600]

  return columnCount
}
