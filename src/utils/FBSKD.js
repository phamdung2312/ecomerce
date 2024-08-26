export const initFacebookSDK = () => {
  // Kiểm tra xem SDK của Facebook (đối tượng FB) đã được tải hay chưa
  if (window.FB) {
    window.FB.XFBML.parse(); // Phân tích và render các plugin xã hội có sẵn trên trang
  }

  // Đặt ngôn ngữ cho SDK của Facebook, "vi_VN" là mã ngôn ngữ cho tiếng Việt
  let locale = "vi_VN";

  // Định nghĩa hàm fbAsyncInit, hàm này sẽ được gọi khi SDK đã được tải xong
  window.fbAsyncInit = function () {
    // Khởi tạo SDK của Facebook với các tùy chọn sau
    window.FB.init({
      appId: process.env.REACT_APP_FB_ID, // Sử dụng Facebook App ID từ biến môi trường
      cookie: true, // Cho phép sử dụng cookie để duy trì trạng thái phiên
      xfbml: true, // Tự động phân tích và render các thẻ XFBML trên trang
      version: "v8.6", // Chỉ định phiên bản của Facebook Graph API
    });
  };

  // Tải SDK của Facebook một cách bất đồng bộ bằng cách sử dụng hàm tức thì (IIFE)
  (function (d, s, id) {
    console.log(s); // In ra tên thẻ script (thường là "script")
    var js,
      fjs = d.getElementsByTagName(s)[0]; // Lấy thẻ script đầu tiên trong tài liệu
    if (d.getElementById(id)) return; // Nếu script với ID này đã tồn tại, thoát khỏi hàm
    js = d.createElement(s); // Tạo một phần tử script mới
    js.id = id; // Đặt ID cho phần tử script mới
    js.src = `//connect.facebook.net/${locale}/sdk.js`; // Đặt thuộc tính src để tải SDK từ Facebook với ngôn ngữ đã chọn
    fjs.parentNode.insertBefore(js, fjs); // Chèn script mới trước thẻ script đầu tiên
  })(document, "script", "facebook-jssdk"); // Thực thi hàm với các tham số document, "script", và "facebook-jssdk"
};
