import Ember from 'ember';
import EmberCPM from 'ember-cpm';
const { computed } = Ember;
const { computed: {equal}} = Ember;
const { Macros: { sum, difference, product, quotient, conditional }} = EmberCPM;

export default Ember.Component.extend({
  numberOfMeals: 5,
  workoutTime: 'am',
  workoutMarkers: {
    'am': {
      3: 1,
      4: 1,
      5: 1,
      6: 1,
      7: 1
    },
    'noon': {
      3: 1,
      4: 2,
      5: 2,
      6: 3,
      7: 3
    },
    'pm': {
      3: 2,
      4: 3,
      5: 3,
      6: 5,
      7: 6
    },
    'late': {
      3: 2,
      4: 3,
      5: 4,
      6: 5,
      7: 6
    }
  },
  currentWorkoutMarker: Ember.computed('numberOfMeals', 'workoutTime', function() {
    return this.get('workoutMarkers')[this.get('workoutTime')][this.get('numberOfMeals')];
  }),
  _partitionNutrientsEven: function(numberOfMeals, workoutPointer) {
    let percentsLeftCarbs = 100;
    let percentsLeftProtein = 100;
    let percentsLeftFats = 100;

    const partitionMap = {
      protein: [],
      fats: [],
      carbs: []
    };

    let i = 0;
    for(i; i < numberOfMeals; i += 1) {
      // proteins
      let factorProtein = 100/numberOfMeals;
      percentsLeftProtein -= factorProtein
      partitionMap.protein.push(factorProtein / 100);

      // fats
      let factorFats = 100/numberOfMeals;
      percentsLeftFats -= factorFats
      partitionMap.fats.push(factorFats / 100);

      // carbs
      let factorCarbs = 100/numberOfMeals;
      percentsLeftCarbs -= factorCarbs
      partitionMap.carbs.push(factorCarbs / 100);
    }

    return partitionMap;
  },

  _partitionNutrientsWeighted: function(numberOfMeals, workoutPointer) {
    let percentsLeftCarbs = 100;
    let percentsLeftProtein = 100;
    let percentsLeftFats = 100;

    const partitionMap = {
      protein: [],
      fats: [],
      carbs: []
    };

    const weightedSpreadCarbs = 30 / (numberOfMeals - 2);
    const weightedSpreadFats = 90 / (numberOfMeals - 2);

    let i = 0;
    for(i; i < numberOfMeals; i += 1) {

      // proteins
      let factorProtein = 100/numberOfMeals;
      percentsLeftProtein -= factorProtein
      partitionMap.protein.push(factorProtein / 100);

      if (i === (workoutPointer - 1) || i === workoutPointer) {
        // fats
        let factorFats = 5;
        percentsLeftFats -= factorFats
        partitionMap.fats.push(factorFats / 100);

        // carbs
        let factorCarbs = 35;
        percentsLeftCarbs -= factorCarbs
        partitionMap.carbs.push(factorCarbs / 100);
      } else {
        // fats
        let factorFats = weightedSpreadFats;
        percentsLeftFats -= factorFats
        partitionMap.fats.push(factorFats / 100);

        // carbs
        let factorCarbs = weightedSpreadCarbs;
        percentsLeftCarbs -= factorCarbs
        partitionMap.carbs.push(factorCarbs / 100);
      }
    }

    return partitionMap;
  },
  meals: Ember.computed('numberOfMeals', 'workoutTime', 'proteins', 'fats', 'carbs', 'calories', function() {
    const numberOfMeals = this.get('numberOfMeals');
    const workoutPointer = this.get('workoutMarkers')[this.get('workoutTime')][this.get('numberOfMeals')]

    let partitionMap = null;
    if (this.get('weighted') === true) {

      partitionMap = this._partitionNutrientsWeighted(numberOfMeals, workoutPointer);
    } else {
      partitionMap = this._partitionNutrientsEven(numberOfMeals, workoutPointer);
    }
    const ret = [];
    let i = 0;
    for(i; i < numberOfMeals; i+=1) {

      const fat = this.get('fats') * partitionMap['fats'][i];
      const protein = this.get('proteins') * partitionMap['protein'][i];
      const carbs = this.get('carbs') * partitionMap['carbs'][i];
      const calories = carbs * 4 + protein * 4 + fat * 9

      ret.push(
        {
          "id": i + 1,
          calories,
          protein,
          fat,
          carbs
        }
      );
    }
    return ret;
  })
});
