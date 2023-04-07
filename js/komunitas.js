$(function () {
    init();
})


function init() {
    getList();
    getCategories();
}

function getCategories() {
    $.ajax({
        url: 'https://dev.farizdotid.com/api/purwakarta/komunitas/kategori',
        method: 'GET',
        dataType: 'json',
        success: function ({ kategori }) {
            let content = '';

            // console.log(response);

            kategori.forEach(category => {
                content += `
                    <option value="${category.nama}">${category.nama}</option>
                `;
            })

            $('.select-category').html(content)
        }
    })
}

function getList() {
    $.ajax({
        url: "https://dev.farizdotid.com/api/purwakarta/komunitas",
        method: 'GET',
        dataType: 'json',
        success: (response) => {
            let content = '';
            const communities = response.komunitas;
            communities.forEach(community => {
                content += `
                    <div class="col-12 col-md-6 col-lg-3 mb-2 card-community" data-bs-toggle="modal" data-bs-target="#detailKomunitas" data-communityId="${community.id}">
                        <div class="card">
                            <img src="${community.logo_url}"
                                class="card-img-top p-1" alt="${community.nama}">
                            <div class="card-body">
                                <a href="#" class="card-title h5 text-decoration-none mb-3 d-inline-block">${community.nama}</a>
                                <p class="card-text">${community.deskripsi}</p>
                                <p class="text-info">${community.kategori}</p>
                            </div>
                        </div>
                    </div>
                `;

                $('#list-komunitas').html(content)
            })
        }
    })
}

$('.select-category').on('change', function () {
    const value = $(this).val()

    $.ajax({
        url: "https://dev.farizdotid.com/api/purwakarta/komunitas",
        data: {
            kategori: value
        },
        method: 'GET',
        dataType: 'json',
        success: (response) => {
            let content = '';
            $('#list-komunitas').html('')
            const communities = response.komunitas;
            communities.forEach(community => {
                content += `
                    <div class="col-12 col-md-6 col-lg-3 mb-2 card-community" data-bs-toggle="modal" data-bs-target="#detailKomunitas" data-communityId="${community.id}">
                        <div class="card">
                            <img src="${community.logo_url}"
                                class="card-img-top p-1" alt="${community.nama}">
                            <div class="card-body">
                                <h5 class="card-title">${community.nama}</h5>
                                <p class="card-text">${community.deskripsi}</p>
                                <p class="text-info">${community.kategori}</p>
                            </div>
                        </div>
                    </div>
                `;

                $('#list-komunitas').html(content)
            })
        }
    })
})


$(document).on('click', '.card-community', function () {
    const communityId = $(this).data('communityid')
    const modalTitle = $('#detailKomunitasLabel');
    const listGroup = $('.list-group');
    let listItem = '';

    $.ajax({
        url: 'https://dev.farizdotid.com/api/purwakarta/komunitas/' + communityId,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            modalTitle.html(response.nama);
            $('#image-community').attr('src', response.logo_url)
            listItem += `
                <div class="mb-1">
                    <label class="form-label fw-bold">Deskripsi</label>
                    <p>${response.deskripsi}</p>
                </div>
                <div class="mb-1">
                    <label class="form-label fw-bold">Jadwal</label>
                    <p>${response.jadwal}</p>
                </div>
                <div class="mb-1">
                    <label class="form-label fw-bold">Kontak</label>
                    <p>${response.kontak}</p>
                </div>
                <div class="mb-1">
                    <label class="form-label fw-bold">Instagram</label>
                    <p>${response.instagram}</p>
                </div>
                <div class="mb-1">
                    <label class="form-label fw-bold">Facebook</label>
                    <p>${response.facebook}</p>
                </div>
            `;

            listGroup.html(listItem)
        }
    })
})

