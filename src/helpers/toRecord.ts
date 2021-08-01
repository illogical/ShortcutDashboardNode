export const toRecord = <T, O>(
    collection: T[],
    getKey: () => number | string
): Record<number | string, T> =>
    collection.reduce((prev, cur) => ({ ...prev, [getKey()]: cur }), {});
