  // Get a database reference to our blog
  var db = admin.database();
  var ref = db.ref('recipients');
  
  // subscribe on updates
  // ref.on("value", function(snapshot) {
  //   console.log(snapshot.val());
  // }, function (errorObject) {
  //   console.log("The read failed: " + errorObject.code);
  // });

  // if we want to push new values
  // ref.push().set({
  //   newUser_3,
  //   newUser_4
  // });