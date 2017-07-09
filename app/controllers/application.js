import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: [
    'human[weight]',
    'human[name]',
    'human[height]',
    'human[age]',
    'human[sex]'
  ],
  human: null,
  diet: null,
  asdf: Ember.observer('model.human.{name,weight,height,age,sex}', function() {
    Ember.run.debounce(null, () => {
      let humanProperties = ['name', 'weight', 'height', 'age', 'sex'];
      humanProperties.forEach((prop) => {
        this.set(`human[${prop}]`, this.get(`model.human.${prop}`));
      }, 150);
    });
  })
});
