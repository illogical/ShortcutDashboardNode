export const compareTagsToFilters = (
  filterId: number,
  filterIds: number[] | undefined
) => {
  if (!filterIds || filterIds.length === 0 || filterId === -1) {
    // tagless buttons are always included
    return true;
  }

  for (let i = 0; i < filterIds.length; i++) {
    if (filterIds[i] === filterId) {
      return true;
    }
  }
  return false;
};
