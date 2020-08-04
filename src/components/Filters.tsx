import { useState } from "react";
import React from "react";

interface TagsProps {
  tags: string[];
  selectedFilter: string;
  selectFilter: React.Dispatch<React.SetStateAction<string>>;
}
export const Filters = ({ tags, selectedFilter, selectFilter }: TagsProps) => {
  // TODO: support All (toggle for none)
  // TODO: toggle tags by touch
  // TODO: left-click to disable all but the clicked one

  //const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [all, setAll] = useState(true);

  const toggleAll = () => {
    selectFilter("all");
    setAll(true);
  };

  const tagClicked = (tag: string) => {
    if (tag === selectedFilter) {
      return;
    }

    setAll(tag === "all");
    selectFilter(tag);
  };

  const tagsToDisplay = tags.map((tag) => {
    return (
      <FilterToggle
        key={tag}
        name={tag}
        selected={tag === selectedFilter}
        onClick={tagClicked}
      />
    );
  });

  // TODO: make this a hook again? Will need to pass up the selectedTags

  return (
    <div className="tags">
      <FilterToggle name="All" selected={all} onClick={toggleAll} />
      {tagsToDisplay}
    </div>
  );
};

interface TagProps {
  name: string;
  selected: boolean;
  onClick: (tag: string) => void;
}
const FilterToggle = ({ name, selected, onClick }: TagProps) => {
  const selectedTag = selected ? "selected" : "";
  const handleClick = () => onClick(name);

  return (
    <span className={`tag-item ${selectedTag}`} onClick={handleClick}>
      {name.toUpperCase()}
    </span>
  );
};
