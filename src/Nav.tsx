export interface NavProps {
  numRepos: number;
  path: string;
}

export const Nav = ({ numRepos, path }: NavProps) => {
  return (
    <nav className="main-nav">
      <a className={path === "/" ? "active" : ""} href="/">
        Overview
      </a>
      <a
        className={path === "/repositories" ? "active" : ""}
        href="/repositories"
      >
        Repositories
        <span className="count">{numRepos}</span>
      </a>
    </nav>
  );
};

export default Nav;
