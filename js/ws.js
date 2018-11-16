function initSocket(socetIP) {

	var socetName = "ws://"+socetIP+":8123/";

	log("try to connect " + socetName);

	var ws = new WebSocket(socetName);
	ws.onopen = function(e) {
		log("WS open");
	};

	ws.onmessage = function (e) {
		
		var data = JSON.parse(e.data),
			type = data.type,
			i = 0,
			$webcams = $('#webcams'),
			$img = null;

		log('WS message '+type);

		/*if (type === 'list') {
			for (i = 0; i < data.webcams.length; i += 1) {
				$img = $("<img></img>")
					.attr("src", "webcam-capture-logo-small.jpg")
					.attr("alt", data.webcams[i])
					.attr("name", data.webcams[i]);
				$webcams.append($img)
			}
		} else*/ if (type === 'image') {
			var $img = $("img")
				.attr("src", "data:image/jpeg;base64," + data.image)
				.addClass('shadow')
				.trigger("change");
			setTimeout(function() {
				$img
					.removeClass('shadow')
					.trigger("change");
			}, 1000);
		}
	};

	ws.onclose = function() {
		log('WS close');
	};

	ws.onerror = function(err) {
		log('WS error')
	};

	return ws;
}

function log(msg) {
    if (typeof console !== 'undefined') {
        console.info(msg);
    }
    $("#message-console").text(msg);
}

