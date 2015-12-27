import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  weight: DS.attr('number'),
  height: DS.attr('number'),
  age: DS.attr('number'),
  sex: DS.attr('string')
});
