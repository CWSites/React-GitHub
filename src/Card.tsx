import { GoLaw, GoRepoForked, GoStar } from "react-icons/go";
import { formatDistance } from "date-fns";
import { formatNum, Repo } from "./App";

export interface CardProps {
  repo: Repo;
}

const Card = ({ repo }: CardProps) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>
          <a href={repo.html_url}>{repo.name}</a>
          {repo.fork && (
            <span className="forked">
              Forked from{" "}
              <span title="Because the API didn't show where the repo was forked from...">
                Batman
              </span>
            </span>
          )}
        </h3>
        <button className="btn">
          <GoStar />
          Star
        </button>
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
        {repo.license && (
          <span className="license">
            <GoLaw />
            {repo.license.name}
          </span>
        )}
        <span className="updated">
          {`${formatDistance(new Date(repo.updated_at), new Date())} ago`}
        </span>
      </div>
    </div>
  );
};

export default Card;
