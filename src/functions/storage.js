import localforage from 'localforage';

export const storage=localforage.createInstance({
  name: "info-trainer"
});

