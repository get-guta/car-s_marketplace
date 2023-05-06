$(document).ready(function () {
  $('#cars-table').DataTable();

  $('#edit-car-submit').on('click', function () {
    let form = $('#edit-car-form');
    let id = form.data('id');
    let price = form.find('input[name="price"]').val();
    let isSold = form.find('select[name="is_sold"]').val();
    console.log("admin test", id, price, isSold);
    // $.ajax({
    //   url: '/api/cars/' + id,
    //   method: 'PUT',
    //   data: {
    //     price: price,
    //     is_sold: isSold
    //   },
    //   success: function (data) {
    //     alert('Car updated successfully');
    //     location.reload();
    //   },
    //   error: function (xhr, status, error) {
    //     alert('Error updating car');
    //   }
    // });
  });

  $('.delete-car').on('click', function () {
    let id = $(this).data('id');

    $.ajax({
      url: '/api/cars/' + id,
      method: 'DELETE',
      success: function (data) {
        alert('Car deleted successfully');
        location.reload();
      },
      error: function (xhr, status, error) {
        alert('Error deleting car');
      }
    });
  });


});
