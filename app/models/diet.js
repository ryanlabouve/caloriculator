import DS from 'ember-data';
import EmberCPM from 'ember-cpm';

const { computed } = Ember;
const { computed: {equal}} = Ember;
const { Macros: { sum, difference, product, quotient, conditional }} = EmberCPM;

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

  proteinPerPound: 1.1,
  carbsPerPoundNoActivity: 0.4,
  carbsPerPoundLightActivity: 1.0,
  carbsPerPoundModerateActivity: 1.3,
  carbsPerPoundIntenseActivity: 1.7,

  proteinNoActivity: product('human.weight', 'proteinPerPound'),
  proteinLightActivity: computed.alias('proteinNoActivity'),
  proteinModerateActivity: computed.alias('proteinNoActivity'),
  proteinIntenseActivity: computed.alias('proteinNoActivity'),


  carbsNoActivity: product('human.weight', 'carbsPerPoundNoActivity'),
  carbsLightActivity: product('human.weight', 'carbsPerPoundLightActivity'),
  carbsModerateActivity: product('human.weight', 'carbsPerPoundModerateActivity'),
  carbsIntenseActivity: product('human.weight', 'carbsPerPoundIntenseActivity'),

  _caloriesNoFatsNoActivity: difference(
    'bmrNoActivity',
    sum(
      product('carbsNoActivity', '_carbCalories'),
      product('proteinNoActivity', '_proteinCalories')
    )
  ),
  fatsNoActivity: quotient('_caloriesNoFatsNoActivity', '_fatCalories'),

  _caloriesNoFatsLightActivity: difference(
    'bmrLightActivity',
    sum(
      product('carbsLightActivity', '_carbCalories'),
      product('proteinLightActivity', '_proteinCalories')
    )
  ),
  fatsLightActivity: quotient('_caloriesNoFatsLightActivity', '_fatCalories'),

  _caloriesNoFatsModerateActivity: difference(
    'bmrModerateActivity',
    sum(
      product('carbsModerateActivity', '_carbCalories'),
      product('proteinModerateActivity', '_proteinCalories')
    )
  ),
  fatsModerateActivity: quotient('_caloriesNoFatsModerateActivity', '_fatCalories'),

  _caloriesNoFatsIntenseActivity: difference(
    'bmrIntenseActivity',
    sum(
      product('carbsIntenseActivity', '_carbCalories'),
      product('proteinIntenseActivity', '_proteinCalories')
    )
  ),
  fatsIntenseActivity: quotient('_caloriesNoFatsIntenseActivity', '_fatCalories'),
});
