export const toRecord = <T>(
    collection: T[],
    getKey: (item: T) => number | string
): Record<number | string, T> =>
    collection.reduce((prev, cur) => ({ ...prev, [getKey(cur)]: cur }), {});
