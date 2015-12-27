import Ember from 'ember';

const humanDefaults = {
  weight: 270,
  height: 72,
  age: 27,
  sex: 'male'
}
export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      human: this.store.createRecord('human', humanDefaults),
      diet: this.store.createRecord('diet')
    });
  }
});
