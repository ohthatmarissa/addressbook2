// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, address, emails) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.address = address,
  this.emails = emails
}
// Contact.prototype.addEmail = function(email) {
//   email.id = this.assignId();
//   this.emails.push(email);
// }

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}
var email = '';
function Email (workEmail, homeEmail) {
  this.workEmail = workEmail,
  this.homeEmail = homeEmail
}


// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

// var email = new Email();
// var workEmail = this.workEmail;
// var homeEmail = this.homeEmail;

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  console.log(contact);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".work-email").html(contact.emails.workEmail);
  $(".home-email").html(contact.emails.homeEmail);
  $(".address").html(contact.address);

  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedAddress = $("input#new-address").val();
    var inputtedWorkEmail = $("input#new-work-email").val();
    var inputtedHomeEmail = $("input#new-home-email").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-address").val("");
    $("input#new-work-email").val("");
    $("input#new-home-email").val("");

    var newEmail = new Email (inputtedWorkEmail, inputtedHomeEmail);

    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedAddress, newEmail);

    addressBook.addContact(newContact, newEmail);
    displayContactDetails(addressBook);
  })
})
