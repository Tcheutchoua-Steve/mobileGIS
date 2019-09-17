  document.onload = getLocation();
  //var database = firebase.database();
  var formMessage = firebase.database().ref('users');

  var x = document.getElementById("message");
  var lat = document.getElementById("latitude");
  var long = document.getElementById("longitude");
  var imageString = document.getElementById("imageString");
  var imageUploadStatus = document.getElementById("imageUploadStatus");
  var audioUploadStatus = document.getElementById("audioUploadStatus");
  document
  .getElementById('registrationform')
  .addEventListener('submit', formSubmit);

  let storageRef = firebase.storage().ref('images/')
  let fileUpload = document.getElementById("imageFile")

  fileUpload.addEventListener('change', function(evt) {
      let firstFile = evt.target.files[0]; // upload the first file only
      let uploadTask = storageRef.put(firstFile);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          imageUploadStatus.innerHTML = 'Upload is ' + progress + '% done'
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, function(error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

          case 'storage/canceled':
            // User canceled the upload
            break;

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, function() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          imageString.value = downloadURL;
          console.log('File available at', downloadURL);
        });
      });
  })

    let storageRefAudio = firebase.storage().ref('audios/')
    let fileUploadAudio = document.getElementById("audioFile")
  fileUploadAudio.addEventListener('change', function(evt) {
      let firstFile = evt.target.files[0]; // upload the first file only
      let uploadTask = storageRefAudio.put(firstFile);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          audioUploadStatus.innerHTML = 'Upload is ' + progress + '% done'
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, function(error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

          case 'storage/canceled':
            // User canceled the upload
            break;

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, function() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          audioString.value = downloadURL;
          console.log('File available at', downloadURL);
        });
      });
  })


  function getLocation() {
    if (navigator.geolocation) {
    var positionOptions = {
    timeout : Infinity,
    maximumAge : 0,
    enableHighAccuracy : false
    }
      navigator.geolocation.getCurrentPosition(showPosition, showError, positionOptions);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function showPosition(position) {

    lat.value = position.coords.latitude;
    long.value = position.coords.longitude;
    console.log(long.value + " and " + lat.value);
  }

  function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      // x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
  }

function formSubmit(e) {
  e.preventDefault();
  // Get Values from the DOM
  let name = document.querySelector('#name').value;
  let phone_number = document.querySelector('#phone_number').value;
  let latitude = document.querySelector('#latitude').value;
  let longitude = document.querySelector('#longitude').value;
  let imageFile = document.querySelector('#imageString').value;
  let audioFile = document.querySelector('#audioString').value;
  let description = document.querySelector('#description').value;

  //send message values
  sendMessage(name, phone_number, latitude, longitude, imageFile, audioFile, description);

  //Show Alert Message(5)
  document.querySelector('.alert').style.display = 'block';

  //Hide Alert Message After Seven Seconds(6)
  setTimeout(function() {
    document.querySelector('.alert').style.display = 'none';
  }, 7000);

  
  
}

function sendMessage(name, phone_number, latitude, longitude, imageFile, audioFile, description) {
  let newFormMessage = formMessage.push();
  newFormMessage.set({
    name: name,
    phone_number: phone_number,
    lat: latitude,
    long: longitude,
    imageFile: imageFile,
    audioFile: audioFile,
    description: description
  });
  //Form Reset After Submission(7)
  document.getElementById('registrationform').reset();
  alert("Your information was sent to the server");
}
