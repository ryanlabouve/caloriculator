import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  queryParams: [
    'human[weight]',
    'human[name]',
    'human[height]',
    'human[age]',
    'human[sex]',
    'diet[calorieAdjustment]',
    'diet[proteinPerPound]',
    'diet[carbsPerPoundNoActivity]',
    'diet[carbsPerPoundLightActivity]',
    'diet[carbsPerPoundModerateActivity]',
    'diet[carbsPerPoundIntenseActivity]'
  ],
  human: null,
  diet: null,

  asdf: Ember.observer(
    'model.human.{name,weight,height,age,sex}',
    'model.diet.{calorieAdjustment,proteinPerPound,carbsPerPoundNoActivity,carbsPerPoundLightActivity,carbsPerPoundModerateActivity,carbsPerPoundIntenseActivity}',
    function() {
    this.get('syncQPs').perform();
  }),

  syncQPs: task(function*() {
    yield timeout(100);
    let humanProperties = ['name', 'weight', 'height', 'age', 'sex'];
    humanProperties.forEach((prop) => {
      this.set(`human[${prop}]`, this.get(`model.human.${prop}`));
    });

    let dietProperties = ['calorieAdjustment', 'proteinPerPound', 'carbsPerPoundNoActivity', 'carbsPerPoundLightActivity', 'carbsPerPoundModerateActivity', 'carbsPerPoundIntenseActivity'];
    dietProperties.forEach((prop) => {
      this.set(`diet[${prop}]`, this.get(`model.diet.${prop}`));
    });
  }).restartable()
});
