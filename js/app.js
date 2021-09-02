// get search text and find book

const getBookResult = async () => {
    const getInput = document.getElementById('get-input-value');
    const getInputValue = getInput.value;
    getInput.value = '';
    if( getInputValue === ''){
        let noResult = document.getElementById('no-result');
        noResult.innerText = 'Please write book name to get result.'
    }
    else{
        const url = `https://openlibrary.org/search.json?q=${getInputValue}`
        const res = await fetch(url);
        const bookData = await res.json();
        displayBook(bookData.docs);
        const totalResult = document.getElementById('total-result');
        const h5 = document.createElement('h5');
        h5.innerText = `Total result found: ${bookData.numFound}`
        totalResult.appendChild(h5);
        
    }
};


// display search result

const displayBook = async searchedBook => {
    const displayBook = document.getElementById('set-search-result');
    displayBook.textContent = '';
    if(searchedBook.length === 0){
        const noResult = document.getElementById('no-result');
        noResult.innerText = 'your result is not found'
    }
    else{
        searchedBook.forEach(books => {
            const div = document.createElement('div');
            div.classList.add('col')
            div.innerHTML = `
            <div class="card h-100"">
                <img src="https://covers.openlibrary.org/b/id/${books.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h4 class="card-title">${books.title}</h4>
                    <h6 class="card-title">Author: ${books.author_name}</h6>
                    <p>First Publish Year: ${books?.first_publish_year}</p>
                </div>
            </div>
            `
            displayBook.appendChild(div);
        });
    }

}


