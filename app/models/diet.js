import DS from 'ember-data';
import EmberCPM from 'ember-cpm';

const { computed: {equal}} = Ember;
const { Macros: { sum, difference, product, conditional }} = EmberCPM;

export default DS.Model.extend({
  _proteinCalories: 4,
  _carbCalories: 4,
  _fatCalories: 9,

  human: null,

  bmr: conditional(
    equal('human.sex', 'male'),
    'bmrMale',
    'bmrFemale'
  ),

  bmrMale: sum(
    66,
    product(6.23, 'human.weight'),
    product(12.7, 'human.height'),
    product(-1, product(6.8, 'human.age'))
  ),

  bmrFemale: sum(
    655,
    product(4.35, 'human.weight'),
    product(4.7, 'human.height'),
    product(-1, product(4.7, 'human.age'))
  ),

  bmrNoActivity: product('bmr', 1.2),
  bmrLightActivity: product('bmr', 1.375),
  bmrModerateActivity: product('bmr', 1.55),
  bmrIntenseActivity: product('bmr', 1.725),
});
