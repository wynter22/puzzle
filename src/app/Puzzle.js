import React, { useState, useEffect, useCallback } from 'react';
import '../asset/Puzzle.css';

export default function Puzzle() {
  const originPuzzle = [1, 2, 0, 4, 5, 6, 3, 7, 9, 10, 11, 8, 13, 14, 15, 12];
  const [puzzle, setPuzzle] = useState([]);

  let sortedPuzzle = [];
  let zeroItem = -1;

  useEffect(() => {
    init();
  }, []);

  function init() {
    sortedPuzzle = [];
    setPuzzle([...originPuzzle]);
    const temp = [...originPuzzle].sort((a, b) => a - b);
    temp.push(temp.shift());
    sortedPuzzle = temp;
  }

  useEffect(() => {
    zeroItem = puzzle.indexOf(0);
  }, [puzzle]);

  function movePuzzle(item, targetIdx) {
    const diff = Math.abs(targetIdx - zeroItem);
    if (diff === 4 || diff === 1) {
      const temp = [...puzzle];
      temp.splice(zeroItem, 1, item);
      temp.splice(targetIdx, 1, 0);
    }

    finishPuzzle();
  }

  const finishPuzzle = useCallback(() => {
    if (puzzle.length && sortedPuzzle.length && puzzle.equals(sortedPuzzle)) {
      alert('The End!!');
      init();
    }
  }, [puzzle, sortedPuzzle]);

  return <div className="puzzle">
    {
      puzzle.map((item, idx) => {
        return item > 0
          ? <div key={idx} className="item" onClick={e => movePuzzle(item, idx)}>{item}</div>
          : <div key={idx} className="empty"></div>;
      })
    }
  </div>;
}
