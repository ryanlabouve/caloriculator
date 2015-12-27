import Ember from 'ember';

export function difference(params/*, hash*/) {
  return params[0] - params[1];
}

export default Ember.Helper.helper(difference);
