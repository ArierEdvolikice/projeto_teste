var shoppingCart = (function() {

  // =============================
  // Metódos privados e propiedades
  // =============================

  cart = [];
  
  // Constructor

  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }
  
  // Salvar cart

  function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }
  
    // Carregar cart

  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }
  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }
  

  // =============================
  // Métodos públicos e propriedades
  // =============================
  
  var obj = {};
  
  // Adicionar ao cart

  obj.addItemToCart = function(name, price, count) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart[item].count ++;
        saveCart();
        return;
      }
    }
    var item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  }

  // Contador para um item

  obj.setCountForItem = function(name, count) {
    for(var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };

  // Deletar um item do carrinho

  obj.removeItemFromCart = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count --;
          if(cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
    }
    saveCart();
  }

  // Deletar tudo do cart

  obj.removeItemFromCartAll = function(name) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  }

  // Limpar cart

  obj.clearCart = function() {
    cart = [];
    saveCart();
  }

  // Contador cart 
  obj.totalCount = function() {
    var totalCount = 0;
    for(var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  }

  // Carrinho todo

  obj.totalCart = function() {
    var totalCart = 0;
    for(var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  }

  // Lista do carrinho

  obj.listCart = function() {
    var cartCopy = [];
    for(i in cart) {
      item = cart[i];
      itemCopy = {};
      for(p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }

  // cart : Array
  // Item : Object/Class
  // addItemToCart : Function
  // removeItemFromCart : Function
  // removeItemFromCartAll : Function
  // clearCart : Function
  // countCart : Function
  // totalCart : Function
  // listCart : Function
  // saveCart : Function
  // loadCart : Function

  return obj;
})();


// *****************************************
// Eventos
// ***************************************** 
// Adicionar Itens

$('.add-to-cart').click(function(event) {
  event.preventDefault();
  var name = $(this).data('name');
  var price = Number($(this).data('price'));
  shoppingCart.addItemToCart(name, price, 1);
  displayCart();
});

// Clear items
$('.clear-cart').click(function() {
  shoppingCart.clearCart();
  displayCart();
});


function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";
  for(var i in cartArray) {
    output += "<tr>"
      + "<td>" + cartArray[i].name + "</td>" 
      + "<td>(" + cartArray[i].price + ")</td>"
      + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
      + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
      + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
      + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
      + " = " 
      + "<td>" + cartArray[i].total + "</td>" 
      +  "</tr>";
  }
  $('.show-cart').html(output);
  $('.total-cart').html(shoppingCart.totalCart());
  $('.total-count').html(shoppingCart.totalCount());
}

// Botão de Deletar

$('.show-cart').on("click", ".delete-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCart(name);
  displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.addItemToCart(name);
  displayCart();
})

// Contador de Itens
$('.show-cart').on("change", ".item-count", function(event) {
   var name = $(this).data('name');
   var count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});

displayCart();


$(function(){
    var state = 0;
    var maxState = 6;
    var winWidth = $(window).width();
    $(window).resize(function(){
        winWidth = $(window).width();
        $('.box,.container_element').width(winWidth-100);
        $('.container_element').scrollLeft((winWidth-100)*state);
    }).trigger('resize');
    $('#lefty').click(function(){
        if (state==0) {
           state = maxState;
        } else {
           state--;
        }
        $('.container_element').animate({scrollLeft:((winWidth-100)*state)+'px'}, 800);
    });
    $('#righty').click(function(){
        if (state==maxState) {
           state = 0;
        } else {
           state++;
        }
        $('.container_element').animate({scrollLeft:((winWidth-100)*state)+'px'}, 800);
    });
});


$(function(){
    var state = 0;
    var maxState = 6;
    var winWidth = $(window).width();
    $(window).resize(function(){
        winWidth = $(window).width();
        $('.box,.container_element').width(winWidth-100);
        $('.container_element').scrollLeft((winWidth-100)*state);
    }).trigger('resize');
    $('#lefty').click(function(){
        if (state==0) {
           state = maxState;
        } else {
           state--;
        }
        $('.container_element').animate({scrollLeft:((winWidth-100)*state)+'px'}, 800);
    });
    $('#righty').click(function(){
        if (state==maxState) {
           state = 0;
        } else {
           state++;
        }
        $('.container_element').animate({scrollLeft:((winWidth-100)*state)+'px'}, 800);
    });
});


  function toggle_visibility(TEXTO_ABERTO, TEXTO_FECHADO) {  
   var e = document.getElementById(TEXTO_ABERTO);
   var e2 = document.getElementById(TEXTO_FECHADO);
   if(e.style.display == 'none') {                
      e.style.display = 'block'; //block will show the conain in div            
      e2.style.display = 'none';
   }
   else {
      e.style.display = 'none';            
      e2.style.display = 'block';
   }              
}

function toggleClassMenu() {
  myMenu.classList.add("menu--animatable"); 
  if(!myMenu.classList.contains("menu--visible")) {   
    myMenu.classList.add("menu--visible");
  } else {
    myMenu.classList.remove('menu--visible');   
  } 
}


