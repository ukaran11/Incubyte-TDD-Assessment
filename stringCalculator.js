function add(numbers) {
  if (!numbers) return 0; // Return 0 for empty string

  let delimiter = /[,\n]/; // Default delimiters: comma and newline

  if (numbers.startsWith("//")) {
    const delimiterMatch = numbers.match(/^\/\/(.+)\n(.*)/);
    if (delimiterMatch) {
      delimiter = new RegExp(`[${delimiterMatch[1]}]`, "g"); // Fix: Allow multiple delimiters
      numbers = delimiterMatch[2]; // Extract the numbers part
    }
  }

  const numArray = numbers.split(delimiter).map(Number);

  // Handle negative numbers
  const negatives = numArray.filter(n => n < 0);
  if (negatives.length) {
    throw new Error(`negative numbers not allowed: ${negatives.join(", ")}`);
  }

  return numArray.reduce((sum, num) => sum + num, 0);
}

module.exports = { add };
