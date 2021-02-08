// import React from "react";
// import { render, screen } from "@testing-library/react";
import { formatNum, sortRepos } from "./App";
import { repos } from "./sampleRepos";

// const localStorageMock = {
//   getItem: jest.fn(),
//   setItem: jest.fn(),
//   removeItem: jest.fn(),
//   clear: jest.fn(),
//   repos: JSON.stringify(repos),
//   updated: Date.now().toString(),
// };
// global.localStorage = localStorageMock;

it("formatNum displays as expected", () => {
  expect(formatNum(999)).toEqual(999);
  expect(formatNum(1000)).toEqual("1k");
  expect(formatNum(10100)).toEqual("10.1k");
});

it("sortRepos orders as expected", () => {
  const sortedRepos = sortRepos(repos);
  expect(sortedRepos[0].name).toEqual("Spoon-Knife");
});
