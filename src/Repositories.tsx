import { GoRepoForked, GoStar } from "react-icons/go";
import { Repos } from "./App";

export interface RepoProps {
  repos: Repos;
}

export const formatNum = (num: number) => {
  return num > 999
    ? num % 1000 === 0
      ? (num / 1000).toFixed(0) + "k"
      : (num / 1000).toFixed(1) + "k"
    : num;
};

const Repositories = ({ repos }: RepoProps) => {
  return (
    <section className="content">
      {repos.length > 0 &&
        repos.map((repo, index) => (
          <div className="card" key={index}>
            <div className="card-header">
              <h3>
                <a href={repo.url}>{repo.name}</a>
                {/* <span className="forked">Forked from {}</span> */}
              </h3>
            </div>
            <p>{repo.description}</p>
            <div className="card-footer">
              {repo.language && (
                <span>
                  <span className={`dot ${repo.language}`}></span>
                  {repo.language}
                </span>
              )}
              <span>
                <GoStar />
                {formatNum(repo.stargazers_count)}
              </span>
              <span>
                <GoRepoForked />
                {formatNum(repo.forks)}
              </span>
            </div>
          </div>
        ))}
    </section>
  );
};

export default Repositories;
