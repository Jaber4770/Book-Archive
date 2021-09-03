// get search text from input field
const getBookResult = async () => {
    const getInput = document.getElementById('get-input-value');
    const getInputValue = getInput.value;
    getInput.value = '';
    // cheak input value
    if( getInputValue === ''){
        let noResult = document.getElementById('no-result');
        noResult.innerText = 'Please write book name to get result.'
    }
    else{
        // dynamic search link
        const url = `https://openlibrary.org/search.json?q=${getInputValue}`
        const res = await fetch(url);
        const bookData = await res.json();
        displayBook(bookData.docs, bookData);
    }
};

// display search result
const displayBook = async (searchedBook, bookFound) => {
    // set founded result
    const displayBook = document.getElementById('set-search-result');
    displayBook.textContent = '';
    // display total result founded
    const totalResult = document.getElementById('total-result');
    totalResult.innerText = `Total book founded: ${bookFound.numFound}`;
    // cheak input value for search
    if(searchedBook.length === 0){
        const noResult = document.getElementById('no-result');
        noResult.innerText = 'Your result is not found! Please write carefully.'
    }
    else{
        // set information of founded book 
        searchedBook.forEach(books => {
            const div = document.createElement('div');
            div.classList.add('col')
            div.innerHTML = `
            <div class="card h-100"">
                <img src="https://covers.openlibrary.org/b/id/${books.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h4 class="card-title">${books.title}</h4>
                    <h6 class="card-title">Author: ${books.author_name}</h6>
                    <p>First Publish Year: ${books.first_publish_year}</p>
                    <p>Publisher: ${books.publisher}</p>
                </div>
            </div>
            `
            displayBook.appendChild(div);
            // clear error message
            const noResult = document.getElementById('no-result');
            noResult.innerText = ''
        });
    }
};


