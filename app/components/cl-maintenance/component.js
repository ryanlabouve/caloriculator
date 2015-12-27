import Ember from 'ember';

export default Ember.Component.extend({
  didReceiveAttrs() {
    const diet = this.get('diet');
    const human = this.get('human');
    diet.set('human', human);
  }
});
