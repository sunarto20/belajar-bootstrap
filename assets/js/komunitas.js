const URL_COMMUNITY = BASE_API_URL + '/komunitas';
const URL_COMMUNITY_CATEGORIES = URL_COMMUNITY + '/kategori';
const LIST_COMMUNITIES = $('#list-communities');
const LIST_CATEGORIES = $('#list-categories');


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
                content += `
                    <div class="col-12 col-md-6 col-lg-3 mb-3">
                        <div class="card">
                            <img src="${community.logo_url}"
                                class="card-img-top p-2" alt="${community.nama}">
                            <div class="card-body">
                                <h5 class="card-title">${community.nama}</h5>
                                <p class="card-text">${community.deskripsi}</p>
                                <span class="text-primary">${community.kategori}</span>
                            </div>
                        </div>
                    </div>
                `;
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

