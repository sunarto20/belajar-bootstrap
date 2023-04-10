const BASE_API_URL = 'https://dev.farizdotid.com/api/purwakarta';
const COUNT_DATA = $('#count-data');

function listInformation(title, value) {
    return `
        <li class="list-group-item">
            <p class="fw-bolder">${title}</p>
            <p>${value}</p>
        </li>
    `;
}