import { useEffect, useState } from "react";
import { compareAsc, differenceInMinutes } from "date-fns";
import Card from "./Card";
import Header from "./Header";
import Nav from "./Nav";
import "./App.scss";

const GitHubToken = "178eb592ad0c8f0355bd64fbb806191bb8aa6ce5";
const lsRepos = localStorage.getItem("repos");
const updated = localStorage.getItem("updated");

export type License = {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  node: string;
};
export type Repo = {
  description: string;
  forks: number;
  language: string;
  license: License;
  name: string;
  stargazers_count: number;
  updated_at: Date;
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
  const path = window.location.pathname;
  const [fetchStatus, updateFetchStatus] = useState(false);
  const [repos, updateRepos] = useState<Repos>(
    lsRepos ? JSON.parse(lsRepos) : []
  );

  useEffect(() => {
    const staleData = updated
      ? differenceInMinutes(Date.now(), JSON.parse(updated)) > 15
      : false;

    if ((!lsRepos && !fetchStatus) || staleData) {
      refreshData();
    }
  });

  const evaluateResult = (repos: Repos) => {
    if (repos.length > 0) {
      localStorage.setItem("repos", JSON.stringify(repos));
      localStorage.setItem("updated", Date.now().toString());
      updateRepos(repos);
    } else {
      console.error("an error occurred...", repos);
    }
  };

  const sortRepos = (repos: Repos) => {
    if (path === "/") {
      repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else {
      repos.sort((a, b) =>
        compareAsc(new Date(b.updated_at), new Date(a.updated_at))
      );
    }
    return repos;
  };

  const refreshData = () => {
    fetchData("https://api.github.com/users/octocat/repos");
  };

  const fetchData = (url: string) => {
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

  const filterRepos = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    let filteredRepos = [];

    if (newValue === "" && lsRepos) {
      filteredRepos = JSON.parse(lsRepos);
    } else {
      for (let i = 0; i < repos.length; i++) {
        if (repos[i].name.includes(newValue)) {
          filteredRepos.push(repos[i]);
        }
      }
    }
    updateRepos(filteredRepos);
  };

  return (
    <div className="app">
      <Nav numRepos={repos ? repos.length : 0} path={path} />
      <main className={path.replace("/", "")}>
        <Header filter={filterRepos} refresh={refreshData} />
        <section className="content">
          {repos.length > 0 &&
            sortRepos(repos).map((repo, index) => (
              <Card key={index} repo={repo} />
            ))}
        </section>
      </main>
    </div>
  );
};

export default App;
