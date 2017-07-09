import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  weight: DS.attr('number', {
    defaultValue: 270
  }),
  height: DS.attr('number', {
    defaultValue: 72
  }),
  age: DS.attr('number', {
    defaultValue: 29
  }),
  sex: DS.attr('string', {
    defaultValue: 'male'
  })
});
