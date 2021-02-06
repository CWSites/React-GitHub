import { useEffect, useState } from "react";

import "./App.css";

const GitHubToken = "178eb592ad0c8f0355bd64fbb806191bb8aa6ce5";

type Repo = {
  description: string;
  forks: number;
  language: string;
  name: string;
  stargazers_count: number;
  url: string;
};
type Repos = Array<Repo>;

const App = () => {
  const [repos, updateRepos] = useState<Repos>([]);
  const [status, updateStatus] = useState("loading");

  useEffect(() => {
    fetchData("https://api.github.com/users/octocat/repos");
  }, []);

  const fetchData = (url: string) => {
    fetch(url, {
      headers: {
        Authorization: `token ${GitHubToken}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          updateStatus("done");
          updateRepos(result);
        },
        (error) => {
          updateStatus("error");
          console.error(error);
        }
      );
  };

  // const sortRepos = (filter: string) => {
  //   // review repos.repository.stargazers_count
  //   // sort based on filter
  //   // update repos state
  // }

  return (
    <div className="app">
      <nav className="main-nav">
        <a href="/" className="active">
          Overview
        </a>
        <a href="/">
          Repositories{" "}
          <span className="count">{repos ? repos.length : null}</span>
        </a>
      </nav>
      <main>
        <header>
          <h2>Popular repositories</h2>
        </header>
        <section className="content">
          {status === "done" &&
            repos.map((repo, index) => (
              <div className="card" key={index}>
                <div className="card-header">
                  <h3>
                    <a href={repo.url}>{repo.name}</a>
                    <span className="forked">Forked from {}</span>
                  </h3>
                </div>
                <p>{repo.description}</p>
                <div className="card-footer">
                  <ul>
                    {repo.language && (
                      <li>
                        <i className="icon circle" /> {repo.language}
                      </li>
                    )}
                    <li>
                      <i className="icon star" /> {repo.stargazers_count}
                    </li>
                    <li>
                      <i className="icon fork" /> {repo.forks}
                    </li>
                  </ul>
                </div>
              </div>
            ))}
        </section>
      </main>
    </div>
  );
};

export default App;
