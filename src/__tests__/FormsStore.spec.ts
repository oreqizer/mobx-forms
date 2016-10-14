import FormsStore from '../FormsStore';

describe('#FormsStore', () => {
  let store = new FormsStore();

  beforeEach(() => {
    store = new FormsStore();
  });

  it('should add a form', () => {
    store.addForm('doge');

    expect((<any> store).forms.doge).toBeDefined();
  });

  it('should remove a form', () => {
    store.addForm('doge');
    store.removeForm('doge');

    expect((<any> store).forms.doge).toBeUndefined();
  });
});
