import { useEffect, useState } from "react";
import Card from "./Card";
import "./App.scss";

const GitHubToken = "178eb592ad0c8f0355bd64fbb806191bb8aa6ce5";
const lsRepos = localStorage.getItem("repos");
const path = window.location.pathname;

export type Repo = {
  description: string;
  forks: number;
  language: string;
  name: string;
  stargazers_count: number;
  url: string;
};
export type Repos = Array<Repo>;
export type Tab = "overview" | "repositories";

export const formatNum = (num: number) => {
  return num > 999
    ? num % 1000 === 0
      ? (num / 1000).toFixed(0) + "k"
      : (num / 1000).toFixed(1) + "k"
    : num;
};

const App = () => {
  const [fetchStatus, updateFetchStatus] = useState(false);
  const [repos, updateRepos] = useState<Repos>(
    lsRepos ? JSON.parse(lsRepos) : []
  );

  useEffect(() => {
    if (!lsRepos && !fetchStatus) {
      refreshData();
    }
  });

  const evaluateResult = (repos: Repos) => {
    if (repos.length > 0) {
      const sortedRepos: Repos = sortByStars(repos);
      localStorage.setItem("repos", JSON.stringify(sortedRepos));
      updateRepos(sortedRepos);
    } else {
      console.error("an error occurred...", repos);
    }
  };

  const sortByStars = (repos: Repos) => {
    repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    return repos;
  };

  const refreshData = () => {
    fetchData("https://api.github.com/users/octocat/repos");
  };

  const fetchData = (url: string) => {
    // prevent from sending repeated requests
    updateFetchStatus(true);

    fetch(url, {
      headers: {
        Authorization: `token ${GitHubToken}`,
        "User-Agent": "CWSites",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          evaluateResult(result);
        },
        (error) => {
          console.error(error);
        }
      );
  };

  return (
    <div className="app">
      <nav className="main-nav">
        <a className={path === "/" ? "active" : ""} href="/">
          Overview
        </a>
        <a
          className={path === "/repositories" ? "active" : ""}
          href="/repositories"
        >
          Repositories
          <span className="count">{repos ? repos.length : "0"}</span>
        </a>
      </nav>
      <main className={path.replace("/", "")}>
        <header>
          <h2>Popular repositories</h2>
          <span className="btn refresh" onClick={refreshData}>
            Refresh
          </span>
          <div className="filter">
            <input type="search" placeholder="Find a repository..." />
            <span className="btn">
              Type: <strong>All</strong>
            </span>
            <span className="btn">
              Language: <strong>All</strong>
            </span>
          </div>
        </header>
        <section className="content">
          {repos.length > 0 &&
            repos.map((repo, index) => <Card key={index} repo={repo} />)}
        </section>
      </main>
    </div>
  );
};

export default App;
