import React, { useState, useEffect } from 'react';
import '../asset/Puzzle.css';

export default function Puzzle() {
  const originPuzzle = [1, 2, 0, 4, 5, 6, 3, 7, 9, 10, 11, 8, 13, 14, 15, 12];
  const [puzzle, setPuzzle] = useState([]);
  const [sortedPuzzle, setSortedPuzzle] = useState([]);

  const [zeroItem, setZeroItem] = useState(-1);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    setZeroItem(puzzle.indexOf(0));
    finishPuzzle();
  }, [puzzle]);

  function init() {
    setPuzzle([...originPuzzle]);
    setSortedPuzzle(() => {
      const temp = [...originPuzzle];
      temp.sort((a, b) => a - b);
      temp.push(temp.shift());
      return temp;
    });
  }

  function movePuzzle(item, targetIdx) {
    const diff = Math.abs(targetIdx - zeroItem);
    if (diff === 4 || diff === 1) {
      setPuzzle(puzzle => {
        const temp = [...puzzle];
        temp.splice(zeroItem, 1, item);
        temp.splice(targetIdx, 1, 0);
        return temp;
      });
    }
  }

  function finishPuzzle() {
    const isSortedPuzzle = puzzle.every(
      (puzzleItem, idx) => puzzleItem === sortedPuzzle[idx]
    );

    if (isSortedPuzzle && puzzle.length) {
      alert('퍼즐을 완료했습니다!!');
      init();
    }
  }

  return (
    <div className="puzzle">
      {puzzle.map((item, idx) => {
        return item > 0 ? (
          <div key={idx} className="item" onClick={e => movePuzzle(item, idx)}>
            {item}
          </div>
        ) : (
          <div key={idx} className="empty"></div>
        );
      })}
    </div>
  );
}
