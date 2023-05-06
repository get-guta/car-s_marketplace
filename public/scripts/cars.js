
function createCarModal(carId, model) {
  let $modalContent = $('<div>').addClass('modal fade').attr('id', `send-${carId}`).attr('role', 'dialog');
  let $modalDialog = $('<div>').addClass('modal-dialog').attr('role', 'document');
  let $modalContentInner = $('<div>').addClass('modal-content');

  let $modalHeader = $('<div>').addClass('modal-header');
  let $modalTitle = $('<h5>').addClass('modal-title').attr('id', 'messageModalLabel-' + carId).text('Send Message for ' + model);
  let $modalCloseButton = $('<button>').addClass('close').attr('type', 'button').attr('data-dismiss', 'modal').attr('aria-label', 'Close');
  let $closeIcon = $('<span>').attr('aria-hidden', 'true').html('&times;');
  $modalCloseButton.append($closeIcon);
  $modalHeader.append($modalTitle, $modalCloseButton);

  let $modalBody = $('<div>').addClass('modal-body');
  let $messageForm = $('<form>').attr('id', 'messageForm-' + carId);
  let $formGroup = $('<div>').addClass('form-group');
  let $messageLabel = $('<label>').attr('for', 'messageInput-' + carId).text('Message:');
  let $messageInput = $('<textarea>').addClass('form-control').attr('id', 'messageInput-' + carId).attr('rows', '4').attr('placeholder', 'Enter your message');
  $formGroup.append($messageLabel, $messageInput);
  $messageForm.append($formGroup);
  $modalBody.append($messageForm);

  let $modalFooter = $('<div>').addClass('modal-footer');
  let $sendButton = $('<button>').addClass('btn btn-primary').attr('type', 'button').attr('id', 'send-reply-' + carId).text('Send');
  $sendButton.click(function () {
    let message = $messageInput.val();
    // Send the message to the server using AJAX or any other method
    //cars_id, message_text
    console.log(message, carId);
    $.ajax({
      method: 'POST',
      url: '/reply',
      data: {
        cars_id: carId,
        message_text: message
      }
    })
      .done((response) => {
        // Close the modal
        $('#send-' + carId).modal('hide');
      });

    $('#send-' + carId).modal('hide');
  });
  let $closeButton = $('<button>').addClass('btn btn-secondary').attr('type', 'button').attr('data-dismiss', 'modal').text('Close');
  $modalFooter.append($sendButton, $closeButton);

  $modalContentInner.append($modalHeader, $modalBody, $modalFooter);
  $modalDialog.append($modalContentInner);
  $modalContent.append($modalDialog);

  return $modalContent;
}


function createTimeElampled(date_created) {
  let currentDate = new Date();
  let createdDate = new Date(date_created);
  let diffInMs = currentDate - createdDate;

  let diffInMins = Math.floor(diffInMs / (1000 * 60));
  let diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  let diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  let timeElapsed;

  if (diffInMins < 60) {
    timeElapsed = `${diffInMins} minute${diffInMins > 1 ? 's' : ''} ago`;
  } else if (diffInHours < 24) {
    timeElapsed = `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else {
    timeElapsed = `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
  return timeElapsed;
}
// get userid session value from hidden input
let userId = $('#userid').val();

function createCarCard(car) {
  const timeElapsed = createTimeElampled(car.date_created);
  const $card = $('<div>').addClass('card').css('max-width', '100%');
  const $cardBody = $('<div>').addClass('card-body').appendTo($card);

  const $row = $('<div>').addClass('row').appendTo($card);
  const $col1 = $('<div>').addClass('col-md-12').appendTo($row);
  $('<img>').attr({
    src: `../assets/${car.image}`,
    alt: car.model,
  }).addClass('img-fluid rounded-start').appendTo($col1);

  const $col2 = $('<div>').addClass('col-md-12');

  let price_model = `${car.model} - ${car.price} CAD`;

  if (car.is_sold) {
    $('<h5>').addClass('card-title').html(`${price_model} <span class="sold">(Sold)</span>`).appendTo($col2);
  } else {
    $('<h5>').addClass('card-title').text(price_model).appendTo($col2);
  }
  $('<p>').addClass('card-text').text(car.description).appendTo($col2);
  $('<p>').addClass('card-text').append($('<small>').addClass('text-muted').text(timeElapsed)).appendTo($col2);

  $row.append($col2);

  const $col3 = $('<div>').addClass('col-md-12');
  const $fav_message = $('<span>').addClass('fav-message');

  const $favoriteIcon = $('<a>').attr('id', `favorite-${car.id}`).addClass('fav-icon');

  const $icon = $('<i>').addClass('fa-regular fa-heart');
  $favoriteIcon.append($icon);
  $favoriteIcon.click(function () {
    // Make an AJAX request to insert the car_id into the cars table
    let carId = car.id;

    console.log("client", userId, carId);
    $.ajax({
      method: 'POST',
      url: 'api/wishlist',
      data: {
        car_id: carId,
        user_id: userId
      },
      success: function () {
        // Change the color of the favorite icon button to red
        $icon.removeClass('fa-regular fa-heart').addClass('fa-solid fa-heart').css('color', '#ff3300');
      },
    });
  });
  // Append the favorite icon button to the car details
  $fav_message.append($favoriteIcon);

  const $message = $('<a>').attr('id', `reply-${car.id}`).attr('data-target', `#send-${car.id}`).addClass('reply-icon').attr('title', 'Click here to contact the owner').attr('data-toggle', 'modal');
  const $replyIcon = $('<i>').addClass('fas fa-reply');
  $message.append($replyIcon);

  $fav_message.append($message);
  $col3.append($fav_message);
  $row.append($col3);
  $cardBody.append($row);
  return $card;
}
/// end of createCarCard functions



$(document).ready(function () {

  // Event handler for clicking the reply icon
  $('.reply-icon').click(function () {
    const carId = $(this).attr('id').split('-')[1];
    const modalId = '#send-' + carId;
    $(modalId).modal('show');
  });

  //on page load
  $.ajax({
    method: 'GET',
    url: 'api/cars'
  })
    .done((response) => {
      const $carsList = $('#cars');
      $carsList.empty();
      for (const car of response.cars) {
        const $carCard = createCarCard(car);
        $replyModal = createCarModal(car.id, car.model);
        $carCard.append($replyModal);
        $('#cars').append($carCard);
      };
    });


  $('#price-filter-form').on('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission

    const minPrice = $('input[name="min_price"]').val();
    const maxPrice = $('input[name="max_price"]').val();

    $.ajax({
      method: 'GET',
      url: '/api/price-filter',
      data: {
        min_price: minPrice,
        max_price: maxPrice
      }
    })
      .done((response) => {
        const $carsList = $('#cars');
        $carsList.empty();

        for (const car of response.cars) {
          const $carCard = createCarCard(car);
          $replyModal = createCarModal(car.id, car.model);
          $carCard.append($replyModal);
          $('#cars').append($carCard);

        }
      });
  });

  //wishlist
  $('#wishlist').on('click', (event) => {
    // const user_id = req.session.user_id;
    // console.log(user_id, userId);
    $.ajax({
      method: 'GET',
      url: '/wishlist',
      data: {
        userId: userId
      }
    })
      .done((response) => {
        const $carsList = $('#cars');
        $carsList.empty();

        for (const car of response.cars) {
          const $carCard = createCarCard(car);
          $replyModal = createCarModal(car.id, car.model);
          $carCard.append($replyModal);
          $('#cars').append($carCard);

        }
      });
  });

  // $("#edit-car-submit").on('click', function () {
  //   const id = $(this).data('id');
  //   // Get the form data
  //   const price = $('#price-input-' + id).val();
  //   const isSold = $('#is-sold-input-' + id).val();
  //   console.log(id, price, isSold);
  // }

  // Hide all modals initially
  $('.modal').modal('hide');
});

