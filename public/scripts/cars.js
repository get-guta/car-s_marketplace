
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
  const $card = $('<div>').addClass('card mb-3').css('max-width', '540px');
  const $row = $('<div>').addClass('row g-0').appendTo($card);
  const $col1 = $('<div>').addClass('col-md-4').appendTo($row);
  $('<img>').attr({
    src: `../assets/${car.image}`,
    alt: car.model,
    width: 200,
    height: 200,
  }).addClass('img-fluid rounded-start').appendTo($col1);
  const $col2 = $('<div>').addClass('col-md-8').appendTo($row);
  const $cardBody = $('<div>').addClass('card-body').appendTo($col2);
  $('<h5>').addClass('card-title').text(`${car.model} - ${car.price}`).appendTo($cardBody);
  $('<p>').addClass('card-text').text(car.description).appendTo($cardBody);
  $('<p>').addClass('card-text').append($('<small>').addClass('text-muted').text(timeElapsed)).appendTo($cardBody);
  const $favoriteIcon = $('<a>').attr('id', `favorite-${car.id}`);
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
  $cardBody.append($favoriteIcon);

  return $card;
}
/// end of createCarCard functions



$(document).ready(function () {
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
          $('#cars').append($carCard);

        }
      });
  });
});
