const BASE_API_RUTE_ANGKOT = BASE_API_URL + '/ruteangkot';
const LIST_RUTE_ANGKOT = $('#list-rute-angkot');

$(function () {
    init();
});

function init() {
    getRuteAngkot();
}

function getRuteAngkot() {
    $.ajax({
        url: BASE_API_RUTE_ANGKOT,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            const routes = response.rute_angkot;
            let content = '';
            let number = 1;

            routes.forEach(route => {
                content += `
                    <tr>
                        <td>${number++}</td>
                        <td>${route.trayek}</td>
                        <td>${route.nomor_angkot}</td>
                        <td>${route.lintasan}</td>
                        <td>
                            <button class="btn btn-sm btn-info" data-bs-toggle="modal" data-bs-target="#ruteAngkot" id="detail-route" data-id="${route.id}">
                                <i class="bi bi-eye"></i>
                            </button>
                        </td>
                    </tr>
                `;
            });

            // console.log(content);
            LIST_RUTE_ANGKOT.html(content)
            COUNT_DATA.html(routes.length)


        }
    })
}

$(document).on('click', '#detail-route', function () {
    const id = $(this).data('id');

    $.ajax({
        url: `${BASE_API_RUTE_ANGKOT}/${id}`,
        method: 'GET',
        dataType: 'json',
        success: function (rute) {
            $('#hotelLabel').html(rute.trayek)

            let content = `
                <div class="row">
                    <div class="col-12 col-lg-4">
                        <img src="${rute.gambar_url}"
                            alt="${rute.trayek}" class="w-100">
                    </div>
                    <div class="col-12 col-lg-8">
                        <ul class="list-group">
                            ${listInformation('Nomor Angkot', rute.nomor_angkot)}
                            ${listInformation('Lintasan', rute.lintasan)}

                        </ul>
                    </div>
                </div>
            `;

            $('.modal-body').html(content);
        }
    })

})