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

  for(i = 2; i <= maxN; i++) {
      if (numbers.get(i) === true) {
          for(j = i * 2; j <= n; j = j + i) {
              numbers.set(j, false);
          }
      }
  }

  primeNumbers = [];

  numbers.forEach(function(value, key) {
      if(value === true) {
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

//TESTS
console.log(sieveOfEratosthenes(100));
console.log(sieveOfEratosthenes2(100));