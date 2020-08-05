import { useState } from "react";
import React from "react";
import { IEntity } from "../models/entity";

interface TagsProps {
  filters: IEntity[];
  selectedFilter: number;
  selectFilter: React.Dispatch<React.SetStateAction<number>>;
}
export const Filters = ({
  filters,
  selectedFilter,
  selectFilter,
}: TagsProps) => {
  // TODO: toggle tags by touch
  // TODO: left-click to disable all but the clicked one?
  const [all, setAll] = useState(true);

  const toggleAll = () => {
    selectFilter(-1);
    setAll(true);
  };

  const tagClicked = (filter: number) => {
    if (filter === selectedFilter) {
      return;
    }

    setAll(filter === -1);
    selectFilter(filter);
  };

  const tagsToDisplay = filters.map((filter) => {
    return (
      <FilterToggle
        key={filter.id}
        filter={filter}
        selected={filter.id === selectedFilter}
        onClick={tagClicked}
      />
    );
  });

  // TODO: make this a hook again? Will need to pass up the selectedTags

  return (
    <div className="tags">
      <FilterToggle
        filter={{ name: "all", id: -1 }}
        selected={all}
        onClick={toggleAll}
      />
      {tagsToDisplay}
    </div>
  );
};

interface FilterToggleProps {
  filter: IEntity;
  selected: boolean;
  onClick: (id: number) => void;
}
const FilterToggle = ({ filter, selected, onClick }: FilterToggleProps) => {
  const selectedTag = selected ? "selected" : "";
  const handleClick = () => onClick(filter.id);

  return (
    <span className={`tag-item ${selectedTag}`} onClick={handleClick}>
      {filter.name.toUpperCase()}
    </span>
  );
};
