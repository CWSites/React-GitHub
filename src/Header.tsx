import { GoTriangleDown } from "react-icons/go";

export interface HeaderProps {
  filter: (event: React.FormEvent<HTMLInputElement>) => void;
  refresh: () => void;
}

export const Header = ({ filter, refresh }: HeaderProps) => {
  return (
    <header>
      <h2>Popular repositories</h2>
      <button className="refresh" onClick={refresh}>
        Refresh
      </button>
      <div className="filter">
        <input
          type="search"
          onChange={(event) => filter(event)}
          placeholder="Find a repository..."
        />
        <button>
          Type: <strong>All</strong>
          <GoTriangleDown />
        </button>
        <button>
          Language: <strong>All</strong>
          <GoTriangleDown />
        </button>
        <div className="filter-list type"></div>
        <div className="filter-list language"></div>
      </div>
    </header>
  );
};

export default Header;
