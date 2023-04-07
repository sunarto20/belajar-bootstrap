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
                content += cardCommunity(community);
                $('#list-komunitas').html(content)
                $('.total-item').html(communities.length + " item");
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
                content += cardCommunity(community);
                $('#list-komunitas').html(content)
                $('.total-item').html(communities.length + " item");

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
            modalTitle.html(`${response.nama} (${response.kategori})`);
            $('#image-community').attr('src', response.logo_url)
            listItem += assertListItem('Deskripsi', response.deskripsi);
            listItem += assertListItem('Jadwal', response.jadwal);
            listItem += assertListItem('Kontak', response.kontak);
            listItem += assertListItem('Instagram', response.instagram);
            listItem += assertListItem('Facebook', response.facebook);
            listGroup.html(listItem)
        }
    })
})

function assertListItem(label, value) {
    return `<div class="mb-1">
                <label class="form-label fw-bold">${label}</label>
                <p>${value}</p>
            </div>`;
}

function cardCommunity(community) {
    return `<div class="col-12 col-md-6 col-lg-3 mb-2 card-community" data-bs-toggle="modal" data-bs-target="#detailKomunitas" data-communityId="${community.id}">
                <div class="card">
                    <img src="${community.logo_url}"
                        class="card-img-top p-1" alt="${community.nama}">
                    <div class="card-body">
                        <h5 class="card-title">${community.nama}</h5>
                        <p class="card-text">${community.deskripsi}</p>
                        <p class="text-info">${community.kategori}</p>
                    </div>
                </div>
            </div>`;
}

