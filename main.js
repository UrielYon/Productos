const main = document.querySelector("main");
const URLMain = "https://fakestoreapi.com/products";

function getData() {
    fetch(URLMain)
        .then((response) => response.json())
        .then((res) => {
            createCards(res);
        })
        .catch((err) => {
            main.insertAdjacentHTML("beforeend",
                `<div class="alert alert-danger" role="alert">
                    ${err.message}
                </div>`);
        });
}

getData();

function createCards(prods) {
    const row = document.createElement("div");
    row.className = "row";

    prods.forEach((prod, index) => {
        const modalId = `productModal${index}`;

        row.insertAdjacentHTML("beforeend", `
            <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
                <div class="card h-100">
                    <img src="${prod.image}" class="card-img-top" alt="${prod.title}" style="object-fit: contain; height: 200px;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${prod.title}</h5>
                        <p class="card-text">${prod.description.substring(0, 100)}...</p>
                        <button class="btn btn-primary mt-auto" data-bs-toggle="modal" data-bs-target="#${modalId}">
                            Ver más
                        </button>
                    </div>
                </div>
            </div>

            <!-- Modal -->
            <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="${modalId}Label">${prod.title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>
                        <div class="modal-body">
                            <img src="${prod.image}" class="img-fluid mb-3" alt="${prod.title}">
                            <p><strong>Categoría:</strong> ${prod.category}</p>
                            <p><strong>Precio:</strong> $${prod.price}</p>
                            <p><strong>Descripción:</strong></p>
                            <p>${prod.description}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        `);
    });

    main.appendChild(row);
}
