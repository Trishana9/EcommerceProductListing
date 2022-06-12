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
    let prev = document.getElementById('prev');
    let next = document.getElementById('next');

    let product_detail_div = document.createElement('div');
    let title = document.createElement('p')
    title.innerHTML = product_list.title;

    title.classList.add('text-xl','font-bold')

    let brand_detail = document.createElement('div');
    let brand_name = document.createElement('p');
    brand_name.innerHTML = "<b>Brand</b> | "+product_list.brand;

    brand_name.classList.add('text-[12px]')

    let star_outer = document.createElement('div');
    let star_inner = document.createElement('div');
    let number_rating = document.createElement('span');

    star_outer.classList.add('stars-outer')
    star_inner.classList.add('stars-inner')
    number_rating.classList.add('number-rating')


    let discount = product_list.discountPercentage;
    let price = product_list.price;
    let discount_amount = (price * discount)/100;
    let discounted_amount = price - discount_amount;

    let price_product = document.createElement('p');
    price_product.innerHTML = "Rs."+discounted_amount.toFixed(2);

    let div_price = document.createElement('div');

    let real_price = document.createElement('p');
    real_price.innerHTML = "Rs."+product_list.price;

    let discount_product = document.createElement('p');
    discount_product.innerHTML = "-"+product_list.discountPercentage+"%";

    div_price.classList.add('flex')
    price_product.classList.add('font-bold','text-emerald-500','text-xl','mt-5')
    real_price.classList.add('text-gray-500','mr-3','line-through','text-sm')
    discount_product.classList.add('text-sm')

    let button_section = document.createElement('div');
    button_section.classList.add('pt-5')

    let button_buy = document.createElement('button');
    button_buy.innerText="Buy Now"
    button_buy.classList.add('bg-orange-500','font-bold','text-white','mr-5','w-44','h-10')

    let button_cart = document.createElement('button');
    button_cart.innerText="Add to Cart"
    button_cart.classList.add('bg-blue-500','font-bold','w-44','h-10','text-white')

    let description_section = document.createElement('div');
    let p_description = document.createElement('p');
    p_description.innerHTML="Product Details"
    p_description.classList.add('font-bold','pt-3')
    let description = document.createElement('p');
    description.innerHTML=product_list.description
    description.classList.add('text-sm')

    product_detail_div.classList.add('ml-10')
    

    detail.appendChild(product_detail_div);
    product_detail_div.appendChild(title);
    product_detail_div.appendChild(brand_detail)   
    brand_detail.appendChild(brand_name)
    product_detail_div.appendChild(star_outer);
    star_outer.appendChild(star_inner);
    star_outer.appendChild(number_rating)
    product_detail_div.appendChild(price_product);
    product_detail_div.appendChild(div_price);
    div_price.appendChild(real_price);
    div_price.appendChild(discount_product); 
    product_detail_div.appendChild(button_section)
    button_section.appendChild(button_buy)
    button_section.appendChild(button_cart)
    product_detail_div.appendChild(description_section)
    description_section.appendChild(p_description)
    description_section.appendChild(description)

    if(document.getElementById("picswap")){
          let i = 0;
          const sliders = () => {
              document.getElementById("images").src= product_list.images[i];
              document.getElementById("images").classList.add('fade-in');
  
              (i < product_list.images.length - 1) ? i++ : i = 0;
              console.log("after:",i);
              prev.addEventListener('click',()=>{
                  console.log("action:",product_list.images[i],"i:",i);
                
                  if(i>1){
                      i--;
                      document.getElementById("images").src= product_list.images[i];
                      console.log("if->:",i);
                      document.getElementById("images").classList.add('fade-in');
                      
                
                  }
                  if(i==1){
                      i=product_list.images.length-1;
                      document.getElementById("images").src= product_list.images[i];
                      console.log("if-1:",i);
                      document.getElementById("images").classList.add('fade-in');
                
                  }
                  if(i==0){
                      i=product_list.images.length-2;
                      document.getElementById("images").src= product_list.images[i];
                      console.log("if-0:",i);
                      document.getElementById("images").classList.add('fade-in');
                
                  }
               
              })
  
              next.addEventListener('click',()=>{
                  console.log(i)
                  document.getElementById("images").src= product_list.images[i];                      
                  document.getElementById("images").classList.add('fade-in');
                
              })
              
          };
  
          sliders(); // Start slider immediately
          setInterval(sliders, 4000); // Slide every 4 seconds
  
      }
    


    const starsTotal =5;
    function getRatings() {
        // Get percentage
        const starPercentage = (product_list.rating / starsTotal) * 100;

        // Round to nearest 10
        const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)-22}%`;

        // Set width of stars-inner to percentage
        document.querySelector(`.stars-inner`).style.width = starPercentageRounded;

        // Add number rating
        document.querySelector(`.number-rating`).innerHTML = product_list.rating;
      
      }

      getRatings();



})
