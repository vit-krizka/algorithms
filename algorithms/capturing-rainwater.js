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


//TESTS
const heights = [4, 2, 1, 3, 0, 1, 2];
console.log(capturingRainwater(heights));
console.log(capturingRainwater2(heights));