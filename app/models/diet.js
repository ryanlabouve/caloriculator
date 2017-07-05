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

  calorieAdjustment: -440,

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

  goalWeight: conditional(
    equal('human.sex', 'male'),
    'goalWeightMale',
    'goalWeightFemale'
  ),

  adjustedBmr: sum('bmr', product('calorieAdjustment', 1)),

  adjustedBmrNoActivity: product('adjustedBmr', 1.2),
  adjustedBmrLightActivity: product('adjustedBmr', 1.375),
  adjustedBmrModerateActivity: product('adjustedBmr', 1.55),
  adjustedBmrIntenseActivity: product('adjustedBmr', 1.725),

  goalWeightMale: quotient(
    sum(
      -66,
      'adjustedBmr',
      product(-1, product('human.height', 12.7)),
      product('human.age', 6.8),
    ),
    6.23
  ),

  goalWeightFemale: quotient(
    sum(
      'adjustedBmr',
      product(-1, product('human.height', 4.7)),
      product('human.age', 4.7),
      -655
    ),
    4.35
  ),


  proteinPerPound: 1.1,
  carbsPerPoundNoActivity: 0.5,
  carbsPerPoundLightActivity: 0.7,
  carbsPerPoundModerateActivity: 1.0,
  carbsPerPoundIntenseActivity: 1.2,

  proteinNoActivity: product('goalWeight', 'proteinPerPound'),
  proteinLightActivity: computed.alias('proteinNoActivity'),
  proteinModerateActivity: computed.alias('proteinNoActivity'),
  proteinIntenseActivity: computed.alias('proteinNoActivity'),


  carbsNoActivity: product('goalWeight', 'carbsPerPoundNoActivity'),
  carbsLightActivity: product('goalWeight', 'carbsPerPoundLightActivity'),
  carbsModerateActivity: product('goalWeight', 'carbsPerPoundModerateActivity'),
  carbsIntenseActivity: product('goalWeight', 'carbsPerPoundIntenseActivity'),

  _caloriesNoFatsNoActivity: difference(
    'adjustedBmrNoActivity',
    sum(
      product('carbsNoActivity', '_carbCalories'),
      product('proteinNoActivity', '_proteinCalories')
    )
  ),
  fatsNoActivity: quotient('_caloriesNoFatsNoActivity', '_fatCalories'),

  _caloriesNoFatsLightActivity: difference(
    'adjustedBmrLightActivity',
    sum(
      product('carbsLightActivity', '_carbCalories'),
      product('proteinLightActivity', '_proteinCalories')
    )
  ),
  fatsLightActivity: quotient('_caloriesNoFatsLightActivity', '_fatCalories'),

  _caloriesNoFatsModerateActivity: difference(
    'adjustedBmrModerateActivity',
    sum(
      product('carbsModerateActivity', '_carbCalories'),
      product('proteinModerateActivity', '_proteinCalories')
    )
  ),
  fatsModerateActivity: quotient('_caloriesNoFatsModerateActivity', '_fatCalories'),

  _caloriesNoFatsIntenseActivity: difference(
    'adjustedBmrIntenseActivity',
    sum(
      product('carbsIntenseActivity', '_carbCalories'),
      product('proteinIntenseActivity', '_proteinCalories')
    )
  ),
  fatsIntenseActivity: quotient('_caloriesNoFatsIntenseActivity', '_fatCalories'),
});
