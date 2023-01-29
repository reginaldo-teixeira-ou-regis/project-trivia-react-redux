export const mockData = (() => {
  let store = {
    ranking: [
      { name: 'Julia Viana', assertions: 5, score: 360, gravatarEmail: 'julia_viana@test.com' },
      { name: 'Reginaldo Teixeira', assertions: 2, score: 200, gravatarEmail: 'reginaldo_teixeira@test.com' },
      { name: 'Maria Luiza', assertions: 1, score: 100, gravatarEmail: 'maria_luiza@test.com' },
    ],
  };

  return {
    getItem(key) {
      return JSON.stringify(store[key]);
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();
