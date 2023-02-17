# Algorithms
- a portfolio of several algorithms for tech interviews

## Technologies used
- HTML, CSS
- JavaScript

## Examples
### Sieve of Eratosthenes
- an algorithm for finding prime numbers

```js
//SOLUTION WITH MAP
function sieveOfEratosthenes(n) {
  if (n <= 1) {
    return [];
  }

  const numbers = new Map();

  for (i = 0; i <= n; i++) {
    numbers.set(i, true);
  }

  numbers.set(0, false);
  numbers.set(1, false);

  const maxN = Math.sqrt(n);

  for (i = 2; i <= maxN; i++) {
    if (numbers.get(i) === true) {
      for (j = i * 2; j <= n; j = j + i) {
        numbers.set(j, false);
      }
    }
  }

  primeNumbers = [];

  numbers.forEach(function (value, key) {
    if (value === true) {
      primeNumbers.push(key);
    }
  });

  return primeNumbers;
}

//SOLUTION WITH ARRAYS

function sieveOfEratosthenes2(limit) {
  // Handle edge cases
  if (limit <= 1) {
    return [];
  }

  // Create the output
  const output = new Array(limit + 1).fill(true);
  // Mark 0 and 1 as non-prime
  output[0] = false;
  output[1] = false;

  // Iterate up to the square root of the limit
  for (let i = 2; i < Math.pow(limit, 0.5); i++) {
    if (output[i] === true) {
      // Mark all multiples of i as non-prime
      for (let j = Math.pow(i, 2); j <= limit; j = j + i) {
        output[j] = false;
      }
    }
  }

  // Remove non-prime numbers
  return output.reduce((primes, current, index) => {
    if (current) {
      primes.push(index);
    }
    return primes
  }, []);
}
```

### Capturing 
- the capturing rainwater problem asks you to calculate how much rainwater would be trapped in the empty spaces
- the naive solution had a quadratic runtime, but it’s possible to solve this problem in O(n) time by using two pointers

```js
//NAIVE SOLUTION
function capturingRainwater(heights) {
    let totalWater = 0;

    for(let i = 1; i < heights.length - 1; i++) {
        let leftBound = 0;
        let rightBound = 0;

        //left elements
        for (let j = 0; j <= i; j++) { 
            leftBound = Math.max(leftBound, heights[j]);
        }

        //right elements
        for (let j = i; j < heights.length; j++) { 
            rightBound = Math.max(rightBound, heights[j]);
        }

        totalWater += Math.min(leftBound, rightBound) - heights[i];
    }

    return totalWater;
}

//OPTIMIZED SOLUTION - The Two Pointer Approach
function capturingRainwater2(heights) {
    let totalWater = 0;
    let leftPointer = 0;
    let rightPointer = heights.length - 1;
    let leftBound = 0;
    let rightBound = 0;

    while (leftPointer < rightPointer) {
        if (heights[leftPointer] <= heights[rightPointer]) {
          leftBound = Math.max(heights[leftPointer], leftBound);
          totalWater += leftBound - heights[leftPointer];
          leftPointer++;
        } else {
          rightBound = Math.max(heights[rightPointer], rightBound);
          totalWater += rightBound - heights[rightPointer];
          rightPointer--;
        }
    }

    return totalWater;
}
```

### The Knapsack problem 
- imagine that you’re a thief breaking into a house; there are so many valuables to steal - diamonds, gold, jewelry, and more, but remember, you’re just one person who can only carry so much
- each item has a weight and value, and your goal is to maximize the total value of items while remaining within the weight limit of your knapsack

```js
//Recursive Knapsack
const recursiveKnapsack = function(weightCap, weights, values, i) {
    if (weightCap === 0 || i === 0) {
      return 0;
    } else if (weights[i - 1] > weightCap) {
      return recursiveKnapsack(weightCap, weights, values, i - 1);
    } else {
      const includeItem = values[i - 1] + recursiveKnapsack(weightCap - weights[i - 1], weights, values, i - 1);
      const excludeItem = recursiveKnapsack(weightCap, weights, values, i - 1);
      return Math.max(includeItem, excludeItem);
    }
};

//Dynamic Programming Approach
const dynamicKnapsack = function(weightCap, weights, values) {
    const numItem = weights.length;
    const matrix = new Array(numItem);
    
    for (let index = 0; index <= numItem; index++) {
      matrix[index] = new Array(weightCap + 1);
      for (let weight = 0; weight <= weightCap; weight++) {
        if (index === 0 || weight === 0) {
            matrix[index][weight] = 0;
        } else if (weights[index - 1] <= weight) {
            const includeItem = values[index - 1] + matrix[index - 1][weight - weights[index - 1]];
            const excludeItem = matrix[index - 1][weight];
            matrix[index][weight] = Math.max(includeItem, excludeItem);
        } else {
            matrix[index][weight] = matrix[index - 1][weight];
        }
      }
    }
    return matrix[numItem][weightCap]; 
  };

```
