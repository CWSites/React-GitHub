import React from "react";
import { render, screen } from "@testing-library/react";
import { repos } from "./sampleRepos";
import Card from "./Card";

it("renders cards", () => {
  render(<Card key={0} repo={repos[0]} />);
  expect(screen.getByText("boysenberry-repo-1")).toBeTruthy();
  expect(screen.getByText("Testing")).toBeTruthy();
});

it("cards display forked from if necessary", () => {
  render(<Card key={0} repo={repos[0]} />);
  expect(screen.getByText("Forked from")).toBeTruthy();
});

it("cards display language if available", () => {
  render(<Card key={0} repo={repos[4]} />);
  expect(screen.getByText("Ruby")).toBeTruthy();
});

it("cards display license if available", () => {
  render(<Card key={0} repo={repos[4]} />);
  expect(screen.getByText("MIT License")).toBeTruthy();
});
