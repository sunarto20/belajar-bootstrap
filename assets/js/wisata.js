const BASE_URL_WISATA = BASE_API_URL + '/wisata'
const LIST_WISATA = document.getElementById('list-wisata')

$(function () {
    init();
})

function init() {
    getWisata();
}

function getWisata() {
    $.ajax({
        url: BASE_URL_WISATA,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            const places = response.wisata;
            let content = '';

            places.forEach(place => {
                content += `
                    <div class="col-12 col-md-6 col-lg-4" data-bs-toggle="modal" data-bs-target="#wisata" id="card-wisata" data-id="${place.id}">
                        <div class="card mb-3">
                            <div class="row g-0">
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">${place.nama}</h5>
                                        <p class="card-text mb-0">
                                        <small class="text-body-secondary">${place.kategori}</small></p>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <img src="${place.gambar_url}" class="img-fluid rounded-end h-100 object-fit-cover"
                                        alt="${place.nama}">
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });


            LIST_WISATA.innerHTML = content
            COUNT_DATA.html(places.length)
        }
    })
}

$(document).on('click', '#card-wisata', function () {

    const id = $(this).data('id');

    $.ajax({
        url: `${BASE_URL_WISATA}/${id}`,
        method: 'GET',
        dataType: 'json',
        success: function (wisata) {
            $('#wisataLabel').html(wisata.nama)

            const location = `${wisata.latitude}, ${wisata.longitude}`;

            const content = `
                <div class="row">
                    <div class="col-12 col-lg-4">
                        <img src="${wisata.gambar_url}"
                            alt="${wisata.nama}" class="w-100">
                    </div>
                    <div class="col-12 col-lg-8">
                        <ul class="list-group">
                            ${listInformation('Deskripsi', wisata.deskripsi)}
                            ${listInformation('Kategori', wisata.kategori)}
                            ${listInformation('Lokasi', location)}
                            ${listInformation('Photo Dari', wisata.photo_by)}
                        </ul>
                    </div>
                </div>
            `;

            $('.modal-body').html(content)
        }
    });

});

