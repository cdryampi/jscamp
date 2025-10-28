const searchButton = document.getElementById("search-button");

if (searchButton) {
    searchButton.addEventListener("click", (e) => {
        const searchInput = document.getElementById("search-input");
        if (searchInput) {
            const query = searchInput.value;
            console.log("Buscando:", query);
        }
        e.preventDefault();
    });
};