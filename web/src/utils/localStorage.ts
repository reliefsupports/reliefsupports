const localStorage = {
  set: (key: string, value: string) => window.localStorage.setItem(key, value),
  get: (key: string) => window.localStorage.getItem(key),
  getParsed: (key: string) => {
    try {
      const data: any = window?.localStorage?.getItem(key);
      const dataParsed = JSON.parse(data);
      return dataParsed;
    } catch (err) {
      return null;
    }
  },
  unset: (key: string) => window.localStorage.removeItem(key),
  clear: () => window.localStorage.clear(),
};

export default localStorage;
