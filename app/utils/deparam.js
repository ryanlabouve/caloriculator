import Ember from 'ember';

/*
 * Given 'test[a][b]',
 * Converts to ['test', 'a', 'b']
 */
function getValueAddress(address) {
  let valueAddress = address.split('[');

  if (valueAddress.length > 1) {
    valueAddress[valueAddress.length - 1] = valueAddress[valueAddress.length - 1].replace(/]+$/g, '');
  }

  return valueAddress;
}

function setValue(rootObject, valueAddress, value) {
  valueAddress.forEach(function(segment, i, arr) {
    let isLastElement = i === valueAddress.length -1;
    let address = arr.slice(0, i + 1).join('.');
    if (isLastElement) {
      Ember.set(rootObject, address, value);
    } else {
      if (!Ember.get(rootObject, address)) {
        Ember.set(rootObject, address, {});
      }
    }
  });
}

function deparam(queryParams) {
  var rootObject = {};
  let qpKeys = Object.keys(queryParams);

  qpKeys.forEach(function(key) {
    let value = queryParams[key];
    let valueAddress = getValueAddress(key)
    setValue(rootObject, valueAddress, value);
  });
  return rootObject;
};

export default deparam;
