import FormsStore from '../FormsStore';

describe('#FormsStore', () => {
  let store = null;

  beforeEach(() => {
    store = new FormsStore();
  });

  it('should add a form', () => {
    store.addForm('doge');

    expect(store.forms.doge).toBeDefined();
  });

  it('should remove a form', () => {
    store.addForm('doge');
    store.removeForm('doge');

    expect(store.forms.doge).toBeUndefined();
  });
});
