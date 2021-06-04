const findWayOut = (maze) => {
  if (maze.length === 0 && !maze) return [];
  let startPoint;
  const coordsGrid = maze.map((row, i) =>
    row.map((el, j) => {
      if (el === "+") {
        return [j, i];
      } else if (el === "0") {
        startPoint = [j, i];
        return [j, i];
      }
    })
  );

  const directions = {
    right: [1, 0],
    left: [-1, 0],
    bottom: [0, 1],
    top: [0, -1],
  };

  isExit = (point) => {
    const [x, y] = point;
    return (
      x === 0 ||
      x === coordsGrid[y].length - 1 ||
      y === 0 ||
      y === coordsGrid.length - 1
    );
  };

  let result;

  const traverse = (currentPoint, path = []) => {
    for (const [dir, coord] of Object.entries(directions)) {
      if (isExit(currentPoint)) {
        result = path;
        break;
      }
      coordsGrid[currentPoint[1]][currentPoint[0]] = undefined;
      const nextPoint = [
        currentPoint[0] + coord[0],
        currentPoint[1] + coord[1],
      ];
      if (coordsGrid[nextPoint[1]][nextPoint[0]]) {
        traverse(nextPoint, [...path, dir]);
      }
    }
  };

  traverse(startPoint);

  return result;
};

module.exports = findWayOut;
