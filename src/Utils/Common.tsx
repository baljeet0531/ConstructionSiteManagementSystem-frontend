export const removeNullUndefined = (obj: object) =>
    Object.entries(obj).reduce(
        (a: { [x: string]: any }, [k, v]) => (!v ? a : ((a[k] = v), a)),
        {}
    );
