const cache = {};

const Theme = {
  set(value) {
    Object.assign(cache, value);
  },
  get() {
    return cache;
  },
};

export default Theme;
