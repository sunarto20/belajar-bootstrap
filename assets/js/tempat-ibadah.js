const BASE_URL_TEMPAT_IBADAH = BASE_API_URL + '/tempatibadah';
const LIST_TEMPAT_IBADAH = document.getElementById('list-tempat-ibadah');

$(function () {
    init();
})

function init() {
    getTempatIbadah();
}

function getTempatIbadah() {
    $.ajax({
        url: BASE_URL_TEMPAT_IBADAH,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            const places = response.tempat_ibadah;
            let number = 1;

            let content = '';

            places.forEach(place => {
                content += listData(place, number++);
            });

            LIST_TEMPAT_IBADAH.innerHTML = content
            COUNT_DATA.html(places.length)

        }
    });
}

$('#select-tempat-ibadah').on('change', function () {
    const category = this.value

    if (category == 'all') {
        getTempatIbadah();
    }

    $.ajax({
        url: BASE_URL_TEMPAT_IBADAH,
        method: 'GET',
        dataType: 'json',
        data: {
            jenis: category
        },
        success: function ({ tempat_ibadah }) {
            let number = 1;
            let content = '';

            tempat_ibadah.forEach(place => {
                content += listData(place, number++);
            });

            LIST_TEMPAT_IBADAH.innerHTML = content
            COUNT_DATA.html(tempat_ibadah.length)


        }
    });

});

function listData(place, number) {
    return `
        <tr>
            <td>${number++}</td>
            <td>${place.nama}</td>
            <td>${place.jenis}</td>
            <td>${place.latitude}, ${place.longitude}</td>
            <td>
                <button class="btn btn-sm btn-info" data-id="${place.id}">
                    <i class="bi bi-eye"></i>
                </button>
            </td>
        </tr>
    `;
}