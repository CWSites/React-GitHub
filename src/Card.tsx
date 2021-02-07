import { GoRepoForked, GoStar } from "react-icons/go";
import { formatNum, Repo } from "./App";

export interface CardProps {
  repo: Repo;
}

const Card = ({ repo }: CardProps) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>
          <a href={repo.url}>{repo.name}</a>
          {/* <span className="forked">Forked from {}</span> */}
        </h3>
        <span className="btn">
          <GoStar />
          Star
        </span>
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
  );
};

export default Card;
