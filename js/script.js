$(document).ready(function(){
    // Ẩn, hiện mật khẩu form đăng ký
    $('#register-show-password').click(function(){
        var passwordInput = $('#register-password');
        if (passwordInput.attr('type') === 'password') {
            passwordInput.attr('type', 'text');
        } else {
            passwordInput.attr('type', 'password');
        }
        $('#register-show-password').toggleClass('fa-eye fa-eye-slash');
    });

    $('#register-show-re_password').click(function(){
        var passwordInput = $('#register-re_password');
        if (passwordInput.attr('type') === 'password') {
            passwordInput.attr('type', 'text');
        } else {
            passwordInput.attr('type', 'password');
        }
        $('#register-show-re_password').toggleClass('fa-eye fa-eye-slash');
    });

    // Ẩn, hiện mật khẩu form đăng nhập
    $('#login-show-password').click(function(){
        var passwordInput = $('#login-password');
        if (passwordInput.attr('type') === 'password') {
            passwordInput.attr('type', 'text');
        } else {
            passwordInput.attr('type', 'password');
        }
        $('#login-show-password').toggleClass('fa-eye fa-eye-slash');
    });

    // hiện lỗi khi nhập không đúng yêu cầu của form
    var usernameInput = $('input[name="username"]');
    var passwordInput = $('input[name="password"]');
    var re_passwordInput  = $('input[name="re_password"]');
    var usernameError = $('.username-error');
    var passwordError = $('.password-error');
    var re_passwordError = $('.re_password-error');

    usernameInput.on('input', function () {
        validateInput(usernameInput, usernameError, 'Tên tài khoản phải chứa từ 3 đến 20 ký tự và chỉ bao gồm chữ cái và số');
    });

    passwordInput.on('input', function () {
        validateInput(passwordInput, passwordError, 'Mật khẩu phải chứa từ 6 đến 20 ký tự');
    });

    re_passwordInput.on('input', function () {
        validateInput(re_passwordInput, re_passwordError, 'Mật khẩu phải chứa từ 6 đến 20 ký tự');  
    });

    function validateInput(input, errorElement, errorMessage) {
        var isValid = input[0].checkValidity();
        if (!isValid) {
            errorElement.text(errorMessage);
            errorElement.css('color', 'red');
            $('.show-password').css('top', '20px');
        } else {
            errorElement.text('');
        }
    }

    //Form đăng ký
    $('#user-register-form').submit(function(event){
        event.preventDefault();
        
        var username = $('#register-username').val();
        var password = $('#register-password').val();
        var re_password = $('#register-re_password').val();

        var user = {
            username : username,
            password : password,
        };

        if(password !== re_password){
            alert("Mật khẩu không khớp, xin hãy nhập lại"); 
        } else {
            if(localStorage.getItem(username) !== null){
                alert("Tên tài khoản đã tồn tại, vui lòng chọn tên khác.");         
            } else{
                var data = JSON.stringify(user);
                localStorage.setItem(username, data);
                alert("Đăng ký thành công!");  
                window.location.href = "login.html";
            }
        }
    });

    //Form đăng nhập
    $('#user-login-form').submit(function(event){
        event.preventDefault();

        var username = $('#login-username').val();
        var password = $('#login-password').val();

        if(localStorage.getItem(username) !== null){
            var data = JSON.parse(localStorage.getItem(username));
            if(password === data.password){
                alert("Đăng nhập thành công");
                window.location.href = "register.html";
            } else {
                alert("Mật khẩu không chính xác, vui lòng nhập lại");
            }
        } else {
            alert("Tài khoản không tồn tại");
        }
    });

    //Giỏ hàng
    let cart = [];

    // Gán sự kiện "click" vào mỗi nút "Thêm vào giỏ hàng"
    $(".addToCart").click(function() {
      // Lấy thông tin về sản phẩm
      const product = $(this).closest(".sanpham");
      const name = product.find(".ten").text();
      const price = product.find(".gia").text();
      const imageSrc = product.find(".item").attr("src");

      // Thêm sản phẩm vào giỏ hàng
      addToCart(name, price, imageSrc);
    });

    // Hàm thêm sản phẩm vào giỏ hàng
    function addToCart(name, price, imageSrc) {
      // Lấy danh sách sản phẩm đã có trong giỏ hàng từ localStorage (nếu có)
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const newItem = {
        name: name,
        price: price,
        imageSrc: imageSrc,
      };

      // Thêm sản phẩm mới vào danh sách sản phẩm trong giỏ hàng
      cartItems.push(newItem);

      // Lưu lại danh sách sản phẩm trong giỏ hàng vào localStorage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      console.log(`Sản phẩm ${name} với giá ${price} đã được thêm vào giỏ hàng.`);

      alert("Sản phẩm đã được thêm vào giỏ hàng");
    }

    const cartItemsDiv = $("#list");

    // Lấy danh sách sản phẩm từ localStorage (nếu có)
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Tạo phần tử HTML tương ứng cho mỗi sản phẩm và thêm vào phần tử HTML cha
    $.each(cartItems, function(index, product) {
      const productDiv = $("<div>").addClass("card").html(`
        <div class="product-item under-line mb-3">
          <div class="image">
            <a href="" class="thumb"><img src="${product.imageSrc}" alt="${product.name}"></a>
          </div>
          <div class="sidebar-info">
            <div class='name-cart'>${product.name}</div>
            <span class='cost'>${product.price}&nbsp;</span>
            <div class='numbers'><p>Số lượng:</p><input type='number' value='1' min='1'></div>
          </div>
          <div class="delete">
            <button type="button"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      `);
      cartItemsDiv.append(productDiv);
    });

    // Cập nhật nút xóa
    $(".delete button").on("click", function() {
      // Lấy thông tin về sản phẩm cần xoá
      const product = $(this).closest(".product-item");
      const name = product.find(".name-cart").text();
      const price = product.find(".cost").text();
      const imageSrc = product.find(".thumb img").attr("src");

      // Xoá sản phẩm khỏi danh sách sản phẩm trong giỏ hàng
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      cartItems = cartItems.filter(function(item) {
        return (
          item.name !== name && item.price !== price && item.imageSrc !== imageSrc
        );
      });

      // Lưu lại danh sách sản phẩm trong giỏ hàng vào localStorage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      // Xoá sản phẩm khỏi phần tử HTML cha
      product.remove();

      let totalMoney = 0;
      $.each(cartItems, function(index, product) {
        let priceParts = product.price.split(" ");
        let price = parseFloat(priceParts[0].replace(/\./g, ""));
        totalMoney += price;
      });

      // Hiển thị giá tiền lên trang web
      const sumMoneyDiv = $("#sum-money");
      sumMoneyDiv.text(totalMoney.toLocaleString("vi-VN", { style: "currency", currency: "VND" }));

      console.log(`Sản phẩm ${name} với giá ${price} đã được xoá khỏi giỏ hàng.`);
    });

    // Lặp qua danh sách sản phẩm và tính tổng giá tiền
    let totalMoney = 0;
    $.each(cartItems, function(index, product) {
      let priceParts = product.price.split(" ");
      let price = parseFloat(priceParts[0].replace(/\./g, ""));
      totalMoney += price;
    });

    // Hiển thị giá tiền lên trang web
    let sumMoneyDiv = $("#sum-money");
    sumMoneyDiv.text(totalMoney.toLocaleString("vi-VN", { style: "currency", currency: "VND" }));
});

    


