import React from 'react';
import ReactDOM from 'react-dom';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getBubbleSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getQuickSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {quickSortDivision} from '../sortingAlgorithms/sortingAlgorithms.js';
import {doquick} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getHeapSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {maxheap} from '../sortingAlgorithms/sortingAlgorithms.js';
import {swap} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

const ANIMATION_SPEED_MS = 1;

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);

        this.state={
            array:[],
        };
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const array = [];
        for(let i = 0; i < 310; i++) {
            array.push(randomIntFormInterval(5, 700));
        }
        this.setState({array});
    }

    mergeSort() {
      const animations = getMergeSortAnimations(this.state.array);
      for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');        
          //Main method of implementing animations
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % 3 === 0 ? 'red' : 'turquoise';
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        } else {
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }, i * ANIMATION_SPEED_MS);
        }
      }
    }
  
    quickSort() {
      const array = this.state.array;
      const animations = getQuickSortAnimations(array);
      const arrayBars = document.getElementsByClassName("array-bar");
      for(let i=0; i< animations.length; i++){
        setTimeout(()=>{
          var [oldPos, newPos] = animations[i];
          var oldBarStyle = arrayBars[oldPos].style;
          var newBarStyle = arrayBars[newPos].style;
          //Main method of implementing animations
          var idx;
          const randomAnimations = [];
          if(array.length > 1){
            idx = quickSortDivision(array, 0, array.length-1, randomAnimations);
          if(0 < idx-1){
            doquick(array, randomAnimations, 0, idx-1);
          }
          if(idx<array.length){
            doquick(array, randomAnimations, 0, array.length-1);
          }
        }
        oldBarStyle.height = `${this.state.array[oldPos]}px`;
        newBarStyle.height = `${this.state.array[newPos]}px`;

        oldBarStyle.backgroundColor = "red";
        newBarStyle.backgroundColor = "turquoise";

        var curPos = oldPos;
        for(let j=0; j < curPos; j++){
          var jBarStyle = arrayBars[j].style;
          jBarStyle.backgroundColor = "red";
        }
        if(i == animations.length-1){
          this.makesAllbarsTurqouise();
        }
        },i * ANIMATION_SPEED_MS );
      }
    }
  
    heapSort() {
      const array = this.state.array;
      const animations = getHeapSortAnimations(array);
      const arrayBars = document.getElementsByClassName("array-bar");   
      for(let i=0; i< animations.length; i++){
        const colorChange = i % 4 <= 1;
        if (colorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % 4 === 0 ? 'red' : 'turquoise';
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        } else {
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }, i * ANIMATION_SPEED_MS);
        }
      }
    }
  
    bubbleSort() {
      const array = this.state.array;
      const animations = getBubbleSortAnimations(array);
      const arrayBars = document.getElementsByClassName("array-bar");
      for(let i=0; i< animations.length; i++){
        setTimeout(()=>{
          var [oldPos, newPos] = animations[i];
          var oldBarStyle = arrayBars[oldPos].style;
          var newBarStyle = arrayBars[newPos].style;

          //Main method of implementing animations
          var temp = this.state.array[oldPos];
          this.state.array[oldPos] = this.state.array[newPos];
          this.state.array[newPos] = temp;

          oldBarStyle.height = `${this.state.array[oldPos]}px`;
          newBarStyle.height = `${this.state.array[newPos]}px`;

          oldBarStyle.backgroundColor = "red";
          newBarStyle.backgroundColor = "turquoise";

          var curPos = oldPos;
          for(let j=0; j < curPos; j++){
            var jBarStyle = arrayBars[j].style;
            jBarStyle.backgroundColor = "red";
          }
          if(i == animations.length-1){
            this.makesAllbarsTurqouise();
          }
        }, i * ANIMATION_SPEED_MS);
      }
    }

    makesAllbarsTurqouise(){
      const arrayBars = document.getElementsByClassName("array-bar");
      var arrayLength = arrayBars.length;
      for(let j=0; j<arrayLength; j++){
        var jBarStyle = arrayBars[j].style;
        jBarStyle.backgroundColor = "turquoise";
      }
    }

    render(){
      const {array} = this.state;
      
      return(
          <div className="array-container">
            {array.map((value, idx) => (
              <div
                className="array-bar"
                key={idx}
                style={{
                  height: `${value}px`,                  
                  backgroundColor: 'turquoise',
                      }}>
              </div>
          ))}
          <br></br>
          <button onClick={() => this.resetArray()}>Generate New Array</button>
          <button onClick={() => this.quickSort()}>Quick Sort</button>
          <button onClick={() => this.mergeSort()}>Merge Sort</button>
          <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
          <button onClick={() => this.heapSort()}>Heap Sort</button>
          </div>
      );
    }
}

function randomIntFormInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min );
}
