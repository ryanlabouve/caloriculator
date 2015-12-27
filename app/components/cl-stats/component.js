import Ember from 'ember';

export default Ember.Component.extend({
  humanReadableHeight: Ember.computed('human.height', function() {
    const feet = Math.floor(this.get('human.height') / 12);
    const inches = this.get('human.height') % 12;
    return `${feet}' ${inches}''`;
  })
});
