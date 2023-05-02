$(() => {
  //on page load
  $.ajax({
    method: 'GET',
    url: 'api/cars'
  })
    .done((response) => {
      const $carsList = $('#cars');
      $carsList.empty();

      for (const car of response.cars) {
        let cardetail = `
        <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
    <div class="col-md-4">
      <img src="../assets/${car.image}" alt="${car.model}" width="200" height="200" class="img-fluid rounded-start">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${car.model} - ${car.price}</h5>
        <p class="card-text">${car.description}</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
  </div>
          `;
        $("#cars").append(cardetail);
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
          let cardetail = `
        <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
    <div class="col-md-4">
      <img src="../assets/${car.image}" alt="${car.model}" width="200" height="200" class="img-fluid rounded-start">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${car.model} - ${car.price}</h5>
        <p class="card-text">${car.description}</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
  </div>
          `;
          $("#cars").append(cardetail);
        }
      });
  });
});
