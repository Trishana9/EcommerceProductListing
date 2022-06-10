fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(list_items => {console.log(list_items.products);
    let product_list = list_items.products

    const list_element = document.getElementById('productlist');
    const pagination_element = document.getElementById('pagination');

    let current_page = 1;
    let rows = 20;

    function DisplayList (items, product_wrapper, rows_per_page, page) {
        product_wrapper.innerHTML = "";
        page--;

        let start = rows_per_page * page;
        let end = start + rows_per_page;
        let paginatedItems = items.slice(start, end);
        console.log(paginatedItems.length)

        for (let i = 0; i < paginatedItems.length; i++) {
            let item = paginatedItems[i];

            let div_product = document.createElement('div');
            let image_product = document.createElement('img');
            image_product.src = item.thumbnail;
            product_wrapper.appendChild(div_product);
            div_product.appendChild(image_product);


            image_product.classList.add('h-64','w-80')
        }
    }

    function SetupPagination (items, page_wrapper, rows_per_page) {
        page_wrapper.innerHTML = "";

        let page_count = Math.ceil(items.length / rows_per_page);
        for (let i = 1; i < page_count + 1; i++) {
            let btn = PaginationButton(i, items);
            page_wrapper.appendChild(btn);
        }
    }

    function PaginationButton (page, items) {
        let button = document.createElement('button');
        button.innerText = page;
        button.addEventListener('click', function () {
            current_page = page;
            DisplayList(items, list_element, rows, current_page);
        });

        return button;
    }


    DisplayList(product_list, list_element, rows, current_page);
    SetupPagination(product_list, pagination_element, rows);

})
