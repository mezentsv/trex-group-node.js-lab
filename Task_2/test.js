const expect = require("chai").expect;
const findWayOut = require("./index");

const testCase_1 = {
  maze: [
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", "+", "+", "+", "#", "+", "+", "+", "#"],
    ["#", "+", "#", "+", "#", "+", "#", "+", "#"],
    ["+", "+", "#", "+", "0", "+", "#", "+", "#"],
    ["#", "#", "#", "+", "#", "#", "#", "#", "#"],
    ["#", "#", "+", "+", "#", "#", "#", "#", "#"],
    ["#", "#", "+", "#", "#", "#", "#", "#", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ],
  solution: ["left", "top", "top", "left", "left", "bottom", "bottom", "left"],
};

const testCase_2 = {
  maze: [
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", "+", "+", "+", "#", "+", "+", "+", "#"],
    ["#", "+", "#", "+", "#", "+", "#", "+", "#"],
    ["#", "#", "#", "+", "0", "+", "#", "#", "#"],
    ["#", "#", "#", "+", "+", "#", "#", "+", "+"],
    ["#", "#", "+", "#", "+", "#", "+", "+", "#"],
    ["#", "#", "+", "+", "+", "+", "#", "#", "#"],
    ["#", "#", "#", "+", "#", "#", "#", "#", "#"],
  ],
  solution: ["left", "bottom", "right", "bottom", "bottom", "left", "bottom"],
};

const testCase_3 = {
  maze: [
    ["#", "#", "#", "#", "#", "#", "#", "+", "#"],
    ["#", "+", "+", "+", "#", "+", "+", "+", "#"],
    ["#", "+", "#", "+", "#", "+", "#", "#", "#"],
    ["#", "#", "#", "+", "0", "+", "#", "#", "#"],
    ["#", "#", "#", "+", "+", "#", "#", "+", "+"],
    ["#", "#", "+", "#", "+", "#", "+", "+", "#"],
    ["#", "#", "+", "+", "+", "+", "#", "#", "#"],
    ["#", "#", "#", "#", "#", "+", "#", "#", "#"],
  ],
  solution: ["right", "top", "top", "right", "right", "top"],
};

describe("findWayOut", () => {
  it("should return the solution of the testCase_1 with the maze given", () => {
    expect(findWayOut(testCase_1.maze)).deep.to.equal(testCase_1.solution);
  });
  it("should return the solution of the testCase_2 with the maze given", () => {
    expect(findWayOut(testCase_2.maze)).deep.to.equal(testCase_2.solution);
  });
  it("should return the solution of the testCase_3 with the maze given", () => {
    expect(findWayOut(testCase_2.maze)).deep.to.equal(testCase_2.solution);
  });
});
