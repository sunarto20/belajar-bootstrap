const BASE_URL_KULINER = BASE_API_URL + '/kuliner';
const LIST_KULINER = $('#list-kuliner');


$(function () {
    init();
});

function init() {
    getKuliner();
}

function getKuliner() {
    $.ajax({
        url: BASE_URL_KULINER,
        method: 'GET',
        dataType: 'json',
        success: function (res) {
            const foods = res.kuliner
            let content = '';

            foods.forEach(food => {
                content += `
                    <div class="col-12 col-md-6 col-lg-4" data-bs-toggle="modal" data-bs-target="#kuliner" id="card-kuliner" data-id="${food.id}">
                        <div class="card mb-3">
                            <div class="row g-0">
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">${food.nama}</h5>
                                        <p class="card-text" style="font-size: small;">${food.alamat}</p>
                                        <p class="card-text mb-0"><small class="text-body-secondary">${food.jam_buka_tutup}</small></p>
                                        <span>${food.kategori}</span>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <img src="${food.gambar_url}"
                                        class="img-fluid rounded-end h-100 object-fit-cover" alt="${food.nama}">
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            })

            COUNT_DATA.html(res.kuliner.length);
            LIST_KULINER.html(content);
        }
    });
}

$(document).on('click', '#card-kuliner', function () {

    const id = $(this).data('id');

    $.ajax({
        url: `${BASE_URL_KULINER}/${id}`,
        method: 'GET',
        dataType: 'json',
        success: function (kuliner) {
            document.getElementById('kulinerLabel').innerHTML = kuliner.nama
            let content = `
                <div class="row">
                    <div class="col-12 col-lg-4">
                        <img src="${kuliner.gambar_url}"
                            alt="${kuliner.nama}" class="w-100">
                    </div>
                    <div class="col-12 col-lg-8">
                        <ul class="list-group">
                            ${listInformation('Alamat', kuliner.alamat)}
                            ${listInformation('Jam Operasional.', kuliner.jam_buka_tutup)}
                            ${listInformation('Kategori', kuliner.kategori)}
                            ${listInformation('Kordinat', kuliner.kordinat)}

                        </ul>
                    </div>
                </div>
            `;
            document.getElementsByClassName('modal-body')[0].innerHTML = content



        }
    });


});