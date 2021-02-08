import { useEffect, useState } from "react";
import { compareAsc, differenceInMinutes } from "date-fns";
import Card from "./Card";
import Header from "./Header";
import Nav from "./Nav";
import "./App.scss";

const GitHubToken = "178eb592ad0c8f0355bd64fbb806191bb8aa6ce5";
const GitHubUser = "CWSites";
const lsRepos = localStorage.getItem("repos");
const updated = localStorage.getItem("updated");
const staleMinutes = 60;

export type License = {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  node: string;
};
export type Repo = {
  description: string;
  fork: boolean;
  forks: number;
  html_url: string;
  language: string;
  license: License;
  name: string;
  stargazers_count: number;
  updated_at: Date;
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
      ? differenceInMinutes(Date.now(), JSON.parse(updated)) > staleMinutes
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
    console.log("FETCHING DATA");
    updateFetchStatus(true);

    fetch(url, {
      headers: {
        Authorization: `token ${GitHubToken}`,
        "User-Agent": GitHubUser,
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
    const allRepos: Repos = lsRepos ? JSON.parse(lsRepos) : [];
    const newValue = event.currentTarget.value;
    let filteredRepos: Repos = [];

    if (newValue === "" && lsRepos) {
      filteredRepos = JSON.parse(lsRepos);
    } else {
      for (let i = 0; i < allRepos.length; i++) {
        if (allRepos[i].name.includes(newValue)) {
          filteredRepos.push(allRepos[i]);
        }
      }
    }
    updateRepos(filteredRepos);
  };

  const filterTypeLang = (types: string, langs: string) => {
    const allRepos: Repos = lsRepos ? JSON.parse(lsRepos) : [];
    let filteredRepos: Repos = [];

    for (let i = 0; i < allRepos.length; i++) {
      const langMatch =
        (langs !== "All" && allRepos[i].language === langs) || langs === "All";
      const typeMatch =
        (types !== "All" && allRepos[i].fork) || types === "All";

      if (typeMatch && langMatch) {
        filteredRepos.push(allRepos[i]);
      }
    }

    updateRepos(filteredRepos);
  };

  return (
    <div className="app">
      <Nav numRepos={repos ? repos.length : 0} path={path} />
      <main className={path.replace("/", "")}>
        <Header
          filter={filterRepos}
          filterTypeLang={filterTypeLang}
          refresh={refreshData}
          repos={repos}
        />
        <section className="content">
          {repos.length > 0 ? (
            sortRepos(repos).map((repo, index) => (
              <Card key={index} repo={repo} />
            ))
          ) : (
            <h1 className="no-results">No Results</h1>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
