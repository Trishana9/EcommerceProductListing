fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(list_items => {
    console.log(list_items.products);
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')
    console.log(id);
    let product_list = list_items.products[id-1];
    console.log(product_list);

    const detail = document.getElementById('details');

    let img_slider = document.createElement('div');
    let images = document.createElement('img');
    images.src = product_list.thumbnail;

    let product_detail_div = document.createElement('div');
    let title = document.createElement('p')
    title.innerHTML = product_list.title;

    detail.appendChild(img_slider);
    detail.appendChild(product_detail_div);
    img_slider.appendChild(images);
    product_detail_div.appendChild(title);



})
