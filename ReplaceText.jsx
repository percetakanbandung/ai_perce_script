/**
 * Author : adnanmugu (adnanmugu@gmail.com)
 * Program version : Adobe Illustrator CC+
 * Name : Replace Text
 *
 * Copyright (c) 2024
 * https://github.com/adnanmugu
 */

// Create a dialog window
var dialog = new Window('dialog', 'Replace Text');

// Add an input field
dialog.add('statictext', undefined, "Enter text to replace '<i>':");
var input = dialog.add('edittext', undefined, '');
input.characters = 20;

// Add OK and Cancel buttons
var buttonGroup = dialog.add('group');
buttonGroup.alignment = 'right';

var cancelButton = buttonGroup.add('button', undefined, 'Cancel');
var okButton = buttonGroup.add('button', undefined, 'OK');

// Define the behavior for the OK button
okButton.onClick = function () {
  var userInput = input.text;
  replaceTextInArtboard(userInput);
  dialog.close();
};

// Define the behavior for the Cancel button
cancelButton.onClick = function () {
  dialog.close();
};

// Show the dialog
dialog.show();

// Function to replace '<i>' with user input in text frames
function replaceTextInArtboard(userInput) {
  // Get active document
  var doc = app.activeDocument;

  // Loop through all layers
  for (var i = 0; i < doc.layers.length; i++) {
    var layer = doc.layers[i];

    // Skip hidden or locked layers
    if (!layer.visible || layer.locked) {
      continue;
    }

    // Loop through all text frames in the layer
    for (var j = 0; j < layer.textFrames.length; j++) {
      var textFrame = layer.textFrames[j];

      // Replace all occurrences of '<i>' with the user input
      textFrame.contents = textFrame.contents.replace(/<i>/g, userInput);
    }
  }
}
