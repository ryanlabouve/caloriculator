import Ember from 'ember';
import EmberCPM from 'ember-cpm';

const { Macros: { sum, difference, product }} = EmberCPM;

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    const diet = this.get('diet');
    const human = this.get('human');
    // debugger;
  },

  diffNoActivity: difference('diet.adjustedBmrNoActivity', 'diet.bmrNoActivity'),
  diffLightActivity: difference('diet.adjustedBmrLightActivity', 'diet.bmrLightActivity'),
  diffModerateActivity: difference('diet.adjustedBmrModerateActivity', 'diet.bmrModerateActivity'),
  diffIntenseActivity: difference('diet.adjustedBmrIntenseActivity', 'diet.bmrIntenseActivity'),
});
