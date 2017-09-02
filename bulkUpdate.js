/**
 * Send a bulk update to Firebase from an array or an object literal. 
 * 
 * When .push() is called on a Firebase reference without a parameter passed no
 * trip to the server is made. 
 * 
 * ex: 
 * var childRef = ref.push();
 * 
 * A reference is returned which has a push-id that can be returned by calling .name().
 * Because of this, we can create an object with push-ids as keys and send to Firebase
 * with one .set() method. 
 *
 * This function takes in a Firebase reference and a collection to bulk update. The
 * colleciton can either be an Array or an Object. If an Object is used, its keys
 * are ignored and push-ids are used instead.
 * 
 * @param {Firebase Reference} ref
 * @param {Array or Object} collection
 * @returns a Promise that is fulfilled through the onComplete argument
 */
var bulkUpdate = function(ref, collection) {
  // object to hold the bulk update
  var batch = {};
  // Using a ES6 promise here, use a library or polyfil for compatibility
  var deferred = Promise.defer();
  
  // using Object.keys will allow us to iterate over an array or object
  Object.keys(collection).forEach(function(key) {
    // get the push id from the child reference, no server trip is made here
    var pushId = ref.push().key;
    // get the value from the collection
    var itemValue = collection[key];
    // using the pushId, assign the value to the bulk update object
    batch[pushId] = itemValue;
  });
  
  // send the bulk update to Firebase
  ref.update(batch, function onComplete(arg) {
    // if the argument is null then it's a successful update
    if(arg === null) {
      deferred.resolve(arg);
    } else {
      // if the argument is not null then it is an error
      deferred.reject(arg);
    }
  });
  
  return deferred.promise;
}

module.exports = bulkUpdate;