// @ts-expect-error ts(7019)
export const fetcher = (...args) => fetch(...args).then((res) => res.json());
