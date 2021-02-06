import { useEffect, useState } from "react";
import Repositories from "./Repositories";
import "./App.scss";

const GitHubToken = "178eb592ad0c8f0355bd64fbb806191bb8aa6ce5";
const lsRepos = localStorage.getItem("repos");

export type Repo = {
  description: string;
  forks: number;
  language: string;
  name: string;
  stargazers_count: number;
  url: string;
};
export type Repos = Array<Repo>;

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
    // sort repos desc based on stars
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
        <a href="/" className="active">
          Overview
        </a>
        <a href="/">
          Repositories
          <span className="count">{repos ? repos.length : "0"}</span>
        </a>
      </nav>
      <main>
        <header>
          <h2>Popular repositories</h2>
          <span className="refresh" onClick={refreshData}>
            Refresh
          </span>
        </header>
        <Repositories repos={repos} />
      </main>
    </div>
  );
};

export default App;
