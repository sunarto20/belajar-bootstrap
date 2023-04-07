$(function () {
    init();
})


function init() {
    getList();
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
                    <div class="col-12 col-md-6 col-lg-3 mb-2">
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
}

