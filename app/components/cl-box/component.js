import Ember from 'ember';

export default Ember.Component.extend({
  boxSize: Ember.computed('boxClass', function() {
    const b = this.get('boxClass');
    return b ? b : ' md-col-6 col-12';
  })
});
