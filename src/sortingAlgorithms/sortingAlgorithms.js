//---------------------------------Bubble Sort--------------------------------------------------------
export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

//----------------------------------------Bubble Sort-------------------------------
export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  doBubble(auxiliaryArray, animations);
  return animations;
}


export function doBubble(auxiliaryArray, animations) {
  var swapped;
  do {
    swapped = false;
    for(var i=0; i < auxiliaryArray.length-1; i++){ 
      if (auxiliaryArray[i]>auxiliaryArray[i+1])
      {
        var temp = auxiliaryArray[i];
        auxiliaryArray[i] = auxiliaryArray[i+1];
        auxiliaryArray[i+1] = temp;
        animations.push([i, i+1]);
        swapped = true;
        }
      }
  } while (swapped);
  return auxiliaryArray;
}


//----------------------------------------Quick Sort-------------------------------
export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
    const jsSortedArray = array.slice().sort((a, b)=>a-b);
    if (arraysAreEqual(jsSortedArray, array)) return animations;
    const auxiliaryArray = array.slice();
    doquick(auxiliaryArray, animations, 0, auxiliaryArray.length-1);
    return animations;
}

function arraysAreEqual(arrayOne, arrayTwo){
  if(arrayOne.length != arrayTwo.length) return false;
  for(let i=0; i< arrayOne.length; i++){
    if(arrayOne[i] != arrayTwo[i]){
      return false;
    }
  }
  return true;
}

function changePosition(animations, item, leftIdx, rightIdx){
  var temp = item[leftIdx];
      item[leftIdx] = item[rightIdx];
      item[rightIdx] = temp;

    animations.push([leftIdx, rightIdx]);
}

export function quickSortDivision(item, left, right, animations){
  var pivot = item[Math.floor((right+left)/2)],
          i = left,
          j = right;
    while(i<=j){
      while(item[i] < pivot){
        i++
      }
      while(item[j] > pivot){
        j--;
      }
      if(i<= j){
        changePosition(animations, item, i, j);
        i++;
        j--;
      }
    }
    return i;
}

export function doquick(item, animations, left, right){
  var idx;
  if(item.length > 1){
    idx = quickSortDivision(item, left, right, animations);
    if(left < idx -1){
      doquick(item, animations, left, idx-1);
    }
    if(idx < right){
      doquick(item, animations, idx, right);
    }
  }
  return item;
}

//----------------------------------------Heap Sort-------------------------------
export function getHeapSortAnimations(array) {
  const animations = [];
  doHeap(array, animations);
  return animations;
}

export function swap(item, i, j, animations){
  animations.push([i, j]);
  animations.push([i, j]);
  animations.push([i, item[j]]);
  animations.push([j, item[i]]);
  var temp = item[i];
  item[i] = item[j];
  item[j] = temp;
}

export function maxheap(auxiliaryArray, i, n,animations){
  var largest=i;
  var l=2*i+1;
  var r=2*i+2;
  if(l<n && auxiliaryArray[l] > auxiliaryArray[largest]){
    animations.push([l, largest]);
    animations.push([l, largest]);
    animations.push([0, auxiliaryArray[0]]);
    animations.push([0, auxiliaryArray[0]]);
    largest = l;
  }
  if(r<n && auxiliaryArray[r] > auxiliaryArray[largest]){
    animations.push([r, largest]);
    animations.push([r, largest]);
    animations.push([0, auxiliaryArray[0]]);
    animations.push([0, auxiliaryArray[0]]);
    largest = r;
  }
  if(largest!== i){
    swap(auxiliaryArray, i, largest, animations);
    maxheap(auxiliaryArray, largest, n, animations);
  }
}

export function doHeap(auxiliaryArray, animations){
  var arrLength = auxiliaryArray.length;
  for(var i=Math.floor(arrLength/2)-1; i>=0; i--){

    maxheap(auxiliaryArray, i, arrLength, animations);
  }
  for(i=arrLength-1; i>0; i--){
    swap(auxiliaryArray, 0, i, animations);
    arrLength--;
    maxheap(auxiliaryArray, 0, arrLength, animations);
  }
}