// String calculator implementation
function add(numbers) {
  if (!numbers) return 0; // Handle empty input

  let delimiter = /,|\n/; // Default delimiters: comma and newline

  // Check for custom delimiter
  if (numbers.startsWith("//")) {
      const delimiterEndIndex = numbers.indexOf("\n");
      const customDelimiter = numbers.substring(2, delimiterEndIndex);

      if (customDelimiter.startsWith("[")) {
          // Handle multi-character delimiters
          const delimiters = customDelimiter
              .split("[").join("")
              .split("]").join("")
              .split("][");
          delimiter = new RegExp(delimiters.map(d => d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join("|"));
      } else {
          // Single-character delimiter
          delimiter = new RegExp(customDelimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
      }
      numbers = numbers.substring(delimiterEndIndex + 1);
  }

  // Split numbers using the delimiters
  const numArray = numbers.split(delimiter).map(num => num.trim());

  // Convert to numbers and validate
  const parsedNumbers = [];
  const negatives = [];

  for (const num of numArray) {
      if (num !== "") {
          const parsed = parseInt(num, 10);

          if (isNaN(parsed)) {
              throw new Error(`Invalid number: '${num}'`);
          }

          if (parsed < 0) {
              negatives.push(parsed);
          }
          parsedNumbers.push(parsed);
      }
  }

  if (negatives.length > 0) {
      throw new Error(`negative numbers not allowed: ${negatives.join(",")}`);
  }

  // Return the sum of the numbers
  return parsedNumbers.reduce((sum, n) => sum + n, 0);
}

// Test cases using TDD
