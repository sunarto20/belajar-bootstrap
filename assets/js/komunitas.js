const URL_COMMUNITY = BASE_API_URL + '/komunitas';
const URL_COMMUNITY_CATEGORIES = URL_COMMUNITY + '/kategori';
const LIST_COMMUNITIES = $('#list-communities');
const LIST_CATEGORIES = $('#list-categories');
const CARD_COMMUNITY = $('#card-community');


$(function () {
    init();
})

function init() {
    getCommunities();
    getCategories();
}

function getCommunities() {

    $.ajax({
        url: URL_COMMUNITY,
        method: 'GET',
        dataType: 'json',
        success: (response) => {
            const communities = response.komunitas;

            let content = '';

            communities.forEach((community) => {
                content += cardCommunity(community);
            });

            LIST_COMMUNITIES.html(content)


        }
    });

}


function getCategories() {
    $.ajax({
        url: URL_COMMUNITY_CATEGORIES,
        method: 'GET',
        dataType: 'json',
        success: (response) => {
            let content = '';

            response.kategori.forEach((category) => {
                content += `<option value="${category.nama}">${category.nama}</option>`;
            });

            LIST_CATEGORIES.append(content);

        }
    })
}

LIST_CATEGORIES.on('change', function () {
    const categoryName = $(this).val();

    if (categoryName === 'all') {
        getCommunities();
        return;
    }

    $.ajax({
        url: URL_COMMUNITY,
        data: {
            kategori: categoryName
        },
        method: 'GET',
        dataType: 'json',
        success: response => {
            let content = '';
            response.komunitas.forEach(community => {
                content += cardCommunity(community);
            })
            LIST_COMMUNITIES.html(content)
        }
    })
})


$(document).on('click', '#card-community', function () {
    const communityId = $(this).data('id');

    $.ajax({
        url: URL_COMMUNITY + '/' + communityId,
        method: 'GET',
        dataType: 'json',
        success: response => {
            $('#communityLabel').html(`${response.nama} (${response.kategori})`)

            let content = `
                <div class="row">
                    <div class="col-12 col-lg-4">
                        <img src="${response.logo_url}"
                            alt="${response.name}" class="w-100">
                    </div>
                    <div class="col-12 col-lg-8">
                        <ul class="list-group">
                            ${listInformation('Deskripsi', response.deskripsi)}
                            ${listInformation('Jadwal', response.jadwal)}
                            ${listInformation('Kontak', response.kontak)}
                            ${listInformation('Instagram', response.instagram)}
                            ${listInformation('Facebook', response.facebook)}
                        </ul>
                    </div>
                </div>
            `;

            $('.modal-body').html(content);

        }
    })
})

function cardCommunity(community) {
    return `<div class="col-12 col-md-6 col-lg-3 mb-3" data-bs-toggle="modal" data-bs-target="#community" id="card-community" data-id="${community.id}">
                <div class="card">
                    <img src="${community.logo_url}"
                        class="card-img-top p-2" alt="${community.nama}">
                    <div class="card-body">
                        <h5 class="card-title">${community.nama}</h5>
                        <p class="card-text">${community.deskripsi}</p>
                        <span class="text-primary">${community.kategori}</span>
                    </div>
                </div>
            </div>`;
}

function listInformation(title, value) {
    return `
        <li class="list-group-item">
            <p class="fw-bolder
            ">${title}</p>
            <p>${value}</p>
        </li>
    `;
}

