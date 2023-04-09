const URL_API_HOTEL = BASE_API_URL + '/hotel';
const LIST_HOTELS = $('#list-hotels');

$(() => {
    init();
})

function init() {
    getHotels();
}

function getHotels() {
    $.ajax({
        url: URL_API_HOTEL,
        method: 'GET',
        dataType: 'json',
        success: response => {
            const hotels = response.hotel
            let content = '';

            hotels.forEach(hotel => {
                content += `
                    <div class="col-12 col-md-6 col-lg-3" data-bs-toggle="modal" data-bs-target="#hotel" id="card-hotel" data-id="${hotel.id}">
                        <div class="card mb-3">
                            <div class="row g-0">
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">${hotel.nama}</h5>
                                        <p class="card-text" style="font-size: small;">${hotel.alamat}</p>
                                        <p class="card-text"><small class="text-body-secondary">${hotel.nomor_telp}</small>
                                        </p>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <img src="${hotel.gambar_url}"
                                        class="img-fluid rounded-end h-100 object-fit-cover" alt="${hotel.nama}">
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });

            LIST_HOTELS.html(content);
            COUNT_DATA.html(hotels.length);
        }
    });
}

$(document).on('click', '#card-hotel', function () {
    const id = $(this).data('id');

    $.ajax({
        url: `${URL_API_HOTEL}/${id}`,
        method: 'GET',
        dataType: 'json',
        success: (hotel) => {

            $('#hotelLabel').html(hotel.nama)

            let content = `
                <div class="row">
                    <div class="col-12 col-lg-4">
                        <img src="${hotel.gambar_url}"
                            alt="${hotel.nama}" class="w-100">
                    </div>
                    <div class="col-12 col-lg-8">
                        <ul class="list-group">
                            ${listInformation('Alamat', hotel.alamat)}
                            ${listInformation('Nomor Telp.', hotel.nomor_telp)}
                            ${listInformation('Kordinat', hotel.kordinat)}

                        </ul>
                    </div>
                </div>
            `;

            $('.modal-body').html(content);

        }
    })

});