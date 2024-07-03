let container = document.querySelector(".container");

        // Async function to fetch API
        const result = async () => {
            const response = await fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448");
            const result = await response.json();

            const color1=result.product.options[0].values.map((colorObj, index) =>{
                const colorName = Object.keys(colorObj)[0]; // 'Yellow'
                const colorValue = colorObj[colorName];  
                let arr=[colorName,colorValue]   // '#ECDECC'
                return arr;
            })
            //console.log(color1);

            container.innerHTML = `
            <div class="container">
                <div class="product-image-container">
                    <div class="main-img">
                        <img class="main-img" src="https://as1.ftcdn.net/v2/jpg/01/20/36/84/1000_F_120368458_jM1rSc1O5k58W6KM4aaexJnVpTaD768g.jpg" alt="Product Image" class="product-image">
                    </div>
                    <div class="thumbnail-container">
                        <img src="https://as1.ftcdn.net/v2/jpg/01/20/36/84/1000_F_120368458_jM1rSc1O5k58W6KM4aaexJnVpTaD768g.jpg" alt="Product Thumbnail" class="thumbnail">
                        <img src="https://as1.ftcdn.net/v2/jpg/01/20/36/84/1000_F_120368458_jM1rSc1O5k58W6KM4aaexJnVpTaD768g.jpg" alt="Product Thumbnail" class="thumbnail">
                        <img src="https://as1.ftcdn.net/v2/jpg/01/20/36/84/1000_F_120368458_jM1rSc1O5k58W6KM4aaexJnVpTaD768g.jpg" alt="Product Thumbnail" class="thumbnail">
                    </div>
                </div>
                <div class="product">
                    <h1>${result.product.vendor}</h1>
                    <h2>${result.product.title}</h2>
                    <div class="price">
                        <span class="current-price">${result.product.price}</span>
                        <span class="discount">35% Off</span>
                        <span class="original-price">${result.product.compare_at_price}</span>
                    </div>
                    <div class="colors">
                        <label>Choose a Color:</label>
                        <div class="color-options">
                            ${color1.map((color, index) => `
                                <span style="background:${color[1]};" class="color" data-color="${color[0]}"></span>
                            `).join('')}
                        </div>
                    </div>
                    <div class="sizes">
                        <label>Choose a Size:</label>
                        <div class="size-options">
                            <label><input type="radio" name="size" value="Small" checked> Small</label>
                            <label><input type="radio" name="size" value="Medium"> Medium</label>
                            <label><input type="radio" name="size" value="Large"> Large</label>
                            <label><input type="radio" name="size" value="Extra Large"> Extra Large</label>
                            <label><input type="radio" name="size" value="XXL"> XXL</label>
                        </div>
                    </div>
                    <div class="quantity">
                        <label>Quantity:</label>
                        <div class="quantity-selector">
                            <button id="decrease">-</button>
                            <input type="number" id="quantity" value="1">
                            <button id="increase">+</button>
                        </div>
                    </div>
                    <button id="add-to-cart">Add to Cart</button>
                    <p id="cart-message"></p>
                    <div class="description">
                        <p>${result.product.description}</p>
                    </div>
                </div>
            </div>
            `;

            document.getElementById('add-to-cart').addEventListener('click', () => {
                const color = document.querySelector('.color-options .selected')?.dataset.color || 'default color';
                const size = document.querySelector('input[name="size"]:checked').value;
                const quantity = document.getElementById('quantity').value;

                const cartMessage = `Embrace Sideboard with Color ${color} and Size ${size} added to cart`;
                document.getElementById('cart-message').textContent = cartMessage;
            });

            // For making selection for chosen color
            document.querySelectorAll('.color').forEach(colorEl => {
                colorEl.addEventListener('click', () => {
                    document.querySelectorAll('.color').forEach(el => el.classList.remove('selected'));
                    colorEl.classList.add('selected');
                });
            });

            // Increase item quantity
            document.getElementById('increase').addEventListener('click', () => {
                const quantityInput = document.getElementById('quantity');
                quantityInput.value = parseInt(quantityInput.value) + 1;
            });

            // Decrease item quantity
            document.getElementById('decrease').addEventListener('click', () => {
                const quantityInput = document.getElementById('quantity');
                if (parseInt(quantityInput.value) > 1) {
                    quantityInput.value = parseInt(quantityInput.value) - 1;
                }
            });
        }

        result();