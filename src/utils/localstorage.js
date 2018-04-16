export default {
  set(data) {
    localStorage['enough-todo'] = JSON.stringify(data);
  },
  get() {
    return JSON.parse(localStorage['enough-todo'] || '[]');
  }
}
