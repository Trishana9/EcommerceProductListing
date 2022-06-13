fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(list_items => {console.log(list_items.products);
    let product_list = list_items.products

    const list_element = document.getElementById('productlist');
    const pagination_element = document.getElementById('pagination');
    const details = document.getElementById('details');

    let current_page = 1;
    let product_per_page = 20;

    function DisplayList (items, product_wrapper, products_per_page, page) {
        product_wrapper.innerHTML = "";
        page--;

        let start = products_per_page * page;
        let end = start + products_per_page;
        let paginatedItems = items.slice(start, end);
        console.log(paginatedItems.length)

        for (let i = 0; i < paginatedItems.length; i++) {
            let item = paginatedItems[i];

            let div_product = document.createElement('div');

            let div_img = document.createElement('div');
            let image_product = document.createElement('img');
            image_product.src = item.thumbnail;

            let div_detail = document.createElement('div');

            let title_product = document.createElement('p');
            title_product.innerHTML = item.title;

            let discount = item.discountPercentage;
            let price = item.price;
            let discount_amount = (price * discount)/100;
            let discounted_amount = price - discount_amount;

            let price_product = document.createElement('p');
            price_product.innerHTML = "Rs."+discounted_amount.toFixed(2);

            let div_price = document.createElement('div');

            let real_price = document.createElement('p');
            real_price.innerHTML = "Rs."+item.price;

            let discount_product = document.createElement('p');
            discount_product.innerHTML = "-"+item.discountPercentage+"%";

            div_product.classList.add('border','flex','flex-col','justify-center', 'py-8','cursor-pointer')
            div_img.classList.add('flex','justify-center', 'items-center')
            image_product.classList.add('h-64','w-80')
            div_detail.classList.add('px-10')
            div_price.classList.add('flex')
            price_product.classList.add('font-bold','text-emerald-500')
            real_price.classList.add('text-gray-500','mr-3','line-through','text-sm')
            discount_product.classList.add('text-sm')

            product_wrapper.appendChild(div_product);
            div_img.appendChild(image_product);
            div_product.appendChild(div_img);
            div_product.appendChild(div_detail);
            div_detail.appendChild(title_product);
            div_detail.appendChild(price_product);
            div_detail.appendChild(div_price);
            div_price.appendChild(real_price);
            div_price.appendChild(discount_product);

            div_product.addEventListener('click',()=>{
                console.log(item.id);
                let id = item.id;
                const url = "productDetail.html?id="+id;
                window.location.href = url;
            })
            
        }
    }

    function SetupPagination (items, page_wrapper, product_per_page) {
        page_wrapper.innerHTML = "";

        let page_count = Math.ceil(items.length / product_per_page);
        for (let i = 1; i < page_count + 1; i++) {
            let btn = PaginationButton(i, items);
            page_wrapper.appendChild(btn);
        }
    }

    function PaginationButton (page, items) {
        
        let button = document.createElement('button');
        button.innerText = page;
        button.classList.add('bg-gray-300','mx-2','h-10','w-10','hover:bg-green-300');

        button.addEventListener('click', function () {
            current_page = page;
            DisplayList(items, list_element, product_per_page, current_page);        
        });

        return button;
    }


    DisplayList(product_list, list_element, product_per_page, current_page);
    SetupPagination(product_list, pagination_element, product_per_page);

}).catch((error) => {
    console.log(error);
  });
