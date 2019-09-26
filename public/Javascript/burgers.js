$(function() {
  // Create a new burger
  // Creates listener that sits on submit button
  $(".createBurgerButton").on("submit", function(event) {
    event.preventDefault();
    // creates a burger variable to hold the form data
    var name = $("#burger")
      // grabs the values from our forms
      .val()
      .trim();
    if (name) {
      var burger = {
        burger_name: name,
        devoured: false
      };
      $.ajax("/api/burgers/", {
        type: "POST",
        data: burger
      }).then(function(data) {
        // this will reload our page to get the updated list of burgers
        location.reload();
      });
    } else {
      alert("Your order cannot be completed");
    }
  });

  // devour burger function
  // Creates a listener that sits on on our devour burger button
  $(".devourBurgerButton").on("click", function(event) {
    event.preventDefault();
    $.ajax("/api/burgers/" + this.id, {
      type: "PUT",
      data: {
        devoured: true
      }
    }).then(function(data) {
      // this will reload our page to get the updated list of burgers
      location.reload();
    });
  });
});
