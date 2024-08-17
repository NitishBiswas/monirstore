export function getRandomMidRangeColorHex() {
    // Define the minimum and maximum values for RGB to avoid extremes
    const min = 48;  // Minimum value to avoid very dark colors
    const max = 208; // Maximum value to avoid very light colors

    // Generate random values within the defined range for red, green, and blue
    const red = Math.floor(Math.random() * (max - min + 1)) + min;
    const green = Math.floor(Math.random() * (max - min + 1)) + min;
    const blue = Math.floor(Math.random() * (max - min + 1)) + min;

    // Convert the RGB values to hex and pad with zeros if necessary
    const redHex = red.toString(16).padStart(2, '0');
    const greenHex = green.toString(16).padStart(2, '0');
    const blueHex = blue.toString(16).padStart(2, '0');

    // Combine the hex values into a single color code
    return `#${redHex}${greenHex}${blueHex}`;
}

// Example usage:
console.log(getRandomMidRangeColorHex()); // e.g., "#9f5ba0"
