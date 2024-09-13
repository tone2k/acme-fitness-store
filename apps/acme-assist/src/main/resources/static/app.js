const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8081/ai/v2'
});

stompClient.onConnect = (frame) => {
    setConnected(true);
    console.log('Connected: ' + frame);
    stompClient.subscribe('/greetings', (greeting) => {
        console.log('Greeting' + greeting);
        showGreeting(JSON.parse(greeting.body).suggestedPrompts[0]);
    });
    stompClient.subscribe('/answer', (chatResponse) => {
        console.log('Answer' + chatResponse);
        showGreeting(JSON.parse(chatResponse.body).messages[0])
    });
};

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    } else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    stompClient.activate();
}

function disconnect() {
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.publish({
        destination: "/hello",
        // body: JSON.stringify({'name': $("#name").val()})
        body: JSON.stringify(
            {
                conversationId: 'test-id',
                userId: $("#name").val(),
                page: '/'
            })
    });
}

function sendQuestion() {
    stompClient.publish({
        destination: "/question",
        body: JSON.stringify(
            {
                page:'/question',
                productId: '42ca484d-1e2a-4a3c-bc65-556df7d8f3cd',
                messages: [{role:'USER', content:$("#question").val(), currentProduct: ''}]
            }
        )
    })
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $("#connect").click(() => connect());
    $("#disconnect").click(() => disconnect());
    $("#send").click(() => sendName());
    $("#send-question").click(() => sendQuestion());
});
