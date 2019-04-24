var input = document.querySelector('input[type=file]'); // see Example 4
var file;
var filesystem = null;
var img;

var borrarFoto = false;




//A simple error handler to be used throughout this demo.
function errorHandler(error) {
  var message = '';

  switch (error.code) {
    case FileError.SECURITY_ERR:
      message = 'Security Error';
      break;
    case FileError.NOT_FOUND_ERR:
      message = 'Not Found Error';
      break;
    case FileError.QUOTA_EXCEEDED_ERR:
      message = 'Quota Exceeded Error';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      message = 'Invalid Modification Error';
      break;
    case FileError.INVALID_STATE_ERR:
      message = 'Invalid State Error';
      break;
    default:
      message = 'Unknown Error';
      break;
  }

  console.log(message);
}



//Request a FileSystem and set the filesystem variable.
function initFileSystem() {
navigator.webkitPersistentStorage.requestQuota(1024 * 1024 * 5,
 function(grantedSize) {

   // Request a file system with the new size.
   window.requestFileSystem(window.PERSISTENT, grantedSize, function(fs) {

     // Set the filesystem variable.
     filesystem = fs;

     // Setup event listeners on the form.
    // setupFormEventListener();

     // Update the file browser.
     //listFiles();

   }, errorHandler);

 }, errorHandler);
}

//Save a file in the FileSystem.
function saveFile(file) {
  filesystem.root.getFile(file.name, {create: true}, function(fileEntry) {

    fileEntry.createWriter(function(fileWriter) {
    	console.log(fileWriter.fullPath);
      /*fileWriter.onwriteend = function(e) {
        // Update the file browser.
        listFiles();

        // Clean out the form field.
        filenameInput.value = '';
        contentTextArea.value = '';

        // Show a saved message.
        messageBox.innerHTML = 'File saved!';
      };*/

      fileWriter.onerror = function(e) {
        console.log('Write error: ' + e.toString());
        alert('An error occurred and your file could not be saved!');
      };

      fileWriter.write(file);

    }, errorHandler);

  }, errorHandler);
}


input.onchange = function () {
  file = input.files[0];
  //saveAs(file,"example.txt");
  console.log(file);
  //drawOnCanvas(file);   // see Example 6
  displayAsImage(file); // see Example 7
};

function drawOnCanvas(file) {
  var reader = new FileReader();

  reader.onload = function (e) {
    var dataURL = e.target.result,
        c = document.querySelector('canvas'), // see Example 4
        ctx = c.getContext('2d'),
        img = new Image();

    img.onload = function() {
      c.width = img.width;
      c.height = img.height;
      ctx.drawImage(img, 0, 0);
    };

    img.src = dataURL;
  };

  reader.readAsDataURL(file);
}

function displayAsImage(file) {
  var imgURL = URL.createObjectURL(file),
      img = document.createElement('img');
  	  img.style.position = "absolute";
  	  img.style.top = "312px";
  	  img.style.left = "428px";
  	  img.style.width = "170px";
  	  img.style.height = "170px";
  	  img.style.zIndex = 99;

  img.onload = function() {
    URL.revokeObjectURL(imgURL);
  };

  img.src = imgURL;
  document.body.appendChild(img);
}

$("#upfile1").click(function () {
    $("#file1").trigger('click');
});
$("#upfile2").click(function () {
    $("#file2").trigger('click');
});
$("#upfile3").click(function () {
    $("#file3").trigger('click');
});