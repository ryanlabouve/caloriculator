import Ember from 'ember';
import deparam from '../utils/deparam';

export default Ember.Route.extend({
  model(_, { queryParams }) {
    let deparamedQueryParams = deparam(queryParams);
    let humanFromURL = deparamedQueryParams.human || {};
    let dietFromURL = deparamedQueryParams.diet || {};

    return Ember.RSVP.hash({
      human: this.store.createRecord('human', humanFromURL),
      diet: this.store.createRecord('diet', dietFromURL)
    });
  }
});
