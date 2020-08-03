import { useState } from "react";
import React from "react";

interface TagsProps {
  tags: string[];
  selectedTags: string[];
  selectTags: React.Dispatch<React.SetStateAction<string[]>>;
}
export const Tags = ({ tags, selectedTags, selectTags }: TagsProps) => {
  // TODO: support All (toggle for none)
  // TODO: toggle tags by touch
  // TODO: left-click to disable all but the clicked one

  //const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [all, setAll] = useState(true);

  const toggleAll = () => {
    selectTags([...tags]);
    setAll(true);
  };

  const toggleTag = (tag: string) => {
    selectTags((x) => {
      const tagFound = x.indexOf(tag) >= 0;

      if (tagFound) {
        // tag is already enabled
        if (all) {
          // select only this tag
          setAll(false);
          return [tag];
        }

        if (selectedTags.length === 1) {
          // This is the only tag selected so do nothing;
          return x;
        }
      } else {
        // tag is being enabled
      }

      // is this the last tag that can be selected? if so then enable ALL
      if (!tagFound && selectedTags.length + 1 === tags.length) {
        setAll(true);
      }

      // TODO: If ALL is selected, selecting a tag will deselect all others
      // TODO: If only this tag is selected then clicking does nothing
      // TODO: If others are selected but this one isn't, select this one (and check if ALL should be selected)

      const removedTag = x.filter((t) => {
        return t !== tag;
      });

      return tagFound ? removedTag : [...x, tag];
    });
  };

  const tagsToDisplay = tags.map((tag) => {
    return (
      <Tag
        key={tag}
        name={tag}
        selected={selectedTags.indexOf(tag) >= 0}
        onClick={toggleTag}
      />
    );
  });

  // TODO: make this a hook again? Will need to pass up the selectedTags

  return (
    <div className="tags">
      <Tag name="All" selected={all} onClick={toggleAll} />
      {tagsToDisplay}
    </div>
  );
};

interface TagProps {
  name: string;
  selected: boolean;
  onClick: (tag: string) => void;
}
const Tag = ({ name, selected, onClick }: TagProps) => {
  const selectedTag = selected ? "selected" : "";
  const handleClick = () => onClick(name);

  return (
    <span className={`tag-item ${selectedTag}`} onClick={handleClick}>
      {name.toUpperCase()}
    </span>
  );
};
