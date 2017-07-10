import Ember from 'ember';
import deparam from '../utils/deparam';

export default Ember.Route.extend({
  model(_, { queryParams }) {
    let deparamedQueryParams = deparam(queryParams);
    let humanFromURL = deparamedQueryParams.human || {};
    let dietFromURL = deparamedQueryParams.diet || {};

    let human = this.store.createRecord('human', humanFromURL);
    let diet = this.store.createRecord('diet', Object.assign({}, dietFromURL, { human}));

    return Ember.RSVP.hash({
      human,
      diet
    });
  }
});
