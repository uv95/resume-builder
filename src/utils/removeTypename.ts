export const removeTypename = (object: Object | [] | null) => {
  if (typeof object !== 'object') return object;
  if (!object) return;
  return Object.keys(object)
    .filter((key) => key !== '__typename')
    .reduce((obj: any, key: string) => {
      const value = object[key as keyof typeof object] as any;
      let newobj;
      if (typeof value === 'object') {
        newobj = value.hasOwnProperty('length')
          ? value.map(removeTypename)
          : removeTypename(value);
      } else {
        newobj = value;
      }
      obj[key] = newobj;
      return obj;
    }, {});
};
