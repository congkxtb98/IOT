var path = require("path");
var express = require("express");
const cron = require('cron');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var ip = require("ip")
var PORT = 3000
//Chỉ ra đường dẫn chứa css, js, images...
app.use(express.static(path.join(__dirname, 'public')));

//Tạo router
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + '/views/home.html'));
});

//Tạo socket 
io.on('connection', function (socket) {
   let clientNumB=0;
   socket.on("clientSend",function(data){
       clientNumB+=1;
       console.log(`Vua co them 1 client connect. So client = ${clientNumB}`);
       
   })
    socket.on('espSend', function (data) {
        console.log('esp da connect vao server ');
    });
    
    socket.on('LED1', function (data) {
        // console.log(data);
        io.sockets.emit('LED1', data);
    });
    socket.on('LED2', function (data) {
        // console.log(data);
        io.sockets.emit('LED2', data);
    });
});

// io.on('connection', function(socket) {	
// 	//hàm console.log giống như hàm Serial.println trên Arduino
//     console.log("Connected"); //In ra màn hình console là đã có một Socket Client kết nối thành công.
	
// 	var led = [true, false] //định nghĩa một mảng 1 chiều có 2 phần tử: true, false. Mảng này sẽ được gửi đi nhằm thay đổi sự sáng tắt của 2 con đèn LED đỏ và xanh. Dựa vào cài đặt ở Arduino mà đèn LEd sẽ bị bật hoặc tắt. Hãy thử tăng hoạt giảm số lượng biến của mảng led này xem. Và bạn sẽ hiểu điều kỳ diệu của JSON!
	
// 	//Tạo một chu kỳ nhiệm vụ sẽ chạy lại sau mỗi 200ms
// 	var interval1 = setInterval(function() {
// 		//đảo trạng thái của mảng led, đảo cho vui để ở Arduino nó nhấp nháy cho vui.
// 		for (var i = 0; i < led.length; i++) {
// 			led[i] = !led[i]
// 		}
		
// 		//Cài đặt chuỗi JSON, tên biến JSON này là json 
// 		var json = {
// 			"led": led //có một phần tử là "led", phần tử này chứa giá trị của mảng led.
// 		}
// 		socket.emit('LED', json) //Gửi lệnh LED với các tham số của của chuỗi JSON
// 		console.log("send LED")//Ghi ra console.log là đã gửi lệnh LED
// 	}, 2000)//200ms
	
// 	//Khi socket client bị mất kết nối thì chạy hàm sau.
// 	socket.on('disconnect', function() {
// 		console.log("disconnect") 	//in ra màn hình console cho vui
// 		clearInterval(interval1)		//xóa chu kỳ nhiệm vụ đi, chứ không xóa là cái task kia cứ chạy mãi thôi đó!
// 	})
// });
//Khởi tạo 1 server listen tại 1 port
// server.listen(3000, ip.address(), function () {
//     console.log(`server run o ${ip.address()}:${3000} `);

// });

server.listen(3000, "192.168.153.101", function () {
    console.log(`server run o ${ip.address()}:${3000} `);

});