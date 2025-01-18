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
function runTests() {
  const tests = [
      { input: "", expected: 0 },
      { input: "1", expected: 1 },
      { input: "1,5", expected: 6 },
      { input: "1\n2,3", expected: 6 },
  ];

  tests.forEach(({ input, expected, expectedError }, index) => {
      try {
          const result = add(input);
          if (expectedError) {
              console.error(`Test ${index + 1} failed: Expected error '${expectedError}', but got result '${result}'`);
          } else if (result !== expected) {
              console.error(`Test ${index + 1} failed: Expected ${expected}, but got ${result}`);
          } else {
              console.log(`Test ${index + 1} passed`);
          }
      } catch (error) {
          if (expectedError && error.message === expectedError) {
              console.log(`Test ${index + 1} passed`);
          } else {
              console.error(`Test ${index + 1} failed: ${error.message}`);
          }
      }
  });
}

// Run tests
runTests();