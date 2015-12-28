import Ember from 'ember';

export function percents(params/*, hash*/) {
  const n = Math.ceil(params[0] * 100);
  return `${n}%`;
}

export default Ember.Helper.helper(percents);
