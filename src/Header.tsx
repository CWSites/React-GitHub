import { useEffect, useState } from "react";
import { GoCheck, GoTriangleDown, GoX } from "react-icons/go";
import { Repos } from "./App";

export interface HeaderProps {
  filter: (event: React.FormEvent<HTMLInputElement>) => void;
  filterTypeLang: (types: string, langs: string) => void;
  refresh: () => void;
  repos: Repos;
}
export type Filters = Array<string>;

export const Header = ({
  filter,
  filterTypeLang,
  refresh,
  repos,
}: HeaderProps) => {
  const [types, updateTypes] = useState<Filters>([]);
  const [languages, updateLanguages] = useState<Filters>([]);
  const [filterType, updateFilterType] = useState("All");
  const [filterLang, updateFilterLang] = useState("All");
  const [showTypes, toggleShowTypes] = useState(false);
  const [showLangs, toggleShowLangs] = useState(false);

  useEffect(() => {
    if (languages.length < 1) {
      populateFilters();
    }
  });

  const populateFilters = () => {
    let langOptions: Filters = [];
    let typeOptions: Filters = [];

    for (let i = 0; i < repos.length; i++) {
      const lang = repos[i].language;

      if (lang && !langOptions.includes(lang)) {
        langOptions.push(lang);
      }

      if (repos[i].fork && !typeOptions.includes("Forks")) {
        typeOptions.push("Forks");
      }
    }

    updateLanguages(langOptions);
    updateTypes(typeOptions);
  };

  const selectFilter = (filter: string, selection: string) => {
    let typeSelection = filterType;
    let langSelection = filterLang;

    if (filter === "type") {
      typeSelection = selection;
      updateFilterType(selection);
    } else {
      langSelection = selection;
      updateFilterLang(selection);
    }

    toggleShowLangs(false);
    toggleShowTypes(false);
    filterTypeLang(typeSelection, langSelection);
  };

  return (
    <header>
      <h2>Popular repositories</h2>
      <button className="refresh" onClick={() => refresh()}>
        Refresh
      </button>
      <div className="filter">
        <input
          type="search"
          onChange={(event) => filter(event)}
          placeholder="Find a repository..."
        />
        <div>
          <button
            onClick={() => {
              toggleShowTypes(true);
              toggleShowLangs(false);
            }}
          >
            Type: <strong>{filterType}</strong>
            <GoTriangleDown />
          </button>
          {types.length > 0 && (
            <ul className={`filter-list ${showTypes ? "show" : ""}`}>
              <li>
                Select type
                <GoX onClick={() => toggleShowTypes(false)} />
              </li>
              <li
                className={filterType === "All" ? "active" : ""}
                onClick={() => selectFilter("type", "All")}
              >
                <GoCheck />
                All
              </li>
              {types.map((type, index) => (
                <li
                  className={filterType === type ? "active" : ""}
                  key={index}
                  onClick={() => selectFilter("type", type)}
                >
                  <GoCheck />
                  {type}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <button
            onClick={() => {
              toggleShowLangs(true);
              toggleShowTypes(false);
            }}
          >
            Language: <strong>{filterLang}</strong>
            <GoTriangleDown />
          </button>
          {languages.length > 0 && (
            <ul className={`filter-list ${showLangs ? "show" : ""}`}>
              <li>
                Select language
                <GoX onClick={() => toggleShowLangs(false)} />
              </li>
              <li
                className={filterLang === "All" ? "active" : ""}
                onClick={() => selectFilter("lang", "All")}
              >
                <GoCheck />
                All
              </li>
              {languages.map((lang, index) => (
                <li
                  className={filterLang === lang ? "active" : ""}
                  key={index}
                  onClick={() => selectFilter("lang", lang)}
                >
                  <GoCheck />
                  {lang}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
