$(document).ready(function () {
    getmessages();
});

function getmessages() {
    $.ajax({
        url: 'https://gabb56c31faef8a-bn0s7g73pkwbizup.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message',
        type: 'GET',
        dataType: 'json',
        success: function (messages) {
            let cs = messages.items;
            $("#contenttable").empty();

            for (i = 0; i < cs.length; i++) {
                $("#contenttable").append("<tr><td>" + cs[i].id + "</td><td> " + cs[i].messagetext + " </td><td><button onclick='borrarCliente(" + cs[i].id + ")'>Borrar</button><button onclick='showdatatoupdate(" + JSON.stringify(cs[i]) + ")'>Editar</button></td></tr>");
            }
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        },
    });
}



function savemessage() {
    let idmesage = $("#idmesage").val();
    let message = $("#message").val();

    let data = {
        id: idmesage,
        messagetext: message
    };

    let dataToSend = JSON.stringify(data);
    // console.log(dataToSend);

    $.ajax({
        url: 'https://gabb56c31faef8a-bn0s7g73pkwbizup.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message',
        type: 'POST',
        //dataType : 'json',
        data: dataToSend,
        contentType: 'application/json',

        success: function (response) {
            $("#idmesage").val("");
            $("#message").val("");
        },
        error: function (xhr, status) {
            //alert('ha sucedido un problema');
        },
        complete: function () {
            getmessages();
        }
    });
}

function showdatatoupdate(message) {
    console.log(message);
    $("#idmesage").attr("disabled",true);
    $("#idmesage").val(message.id);
    $("#message").val(message.messagetext);

}

function updatemessage() {
    let idmesage = $("#idmesage").val();
    let message = $("#message").val();

    let data = {
        id: idmesage,
        messagetext: message
    };

    let dataToSend = JSON.stringify(data);
    //console.log(dataToSend);
    $.ajax({
        url: 'https://gabb56c31faef8a-bn0s7g73pkwbizup.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message',
        type: 'PUT',
        //   dataType : 'json',
        data: dataToSend,
        contentType: 'application/json',
        success: function (response) {
            $("#idmesage").val("");
            $("#message").val("");
            $("#idmesage").attr("disabled",false);
        },
        error: function (xhr, status) {
            //     alert('ha sucedido un problema');
        },
        complete: function () {
            getmessages();
        }
    });

}

function borrarCliente(idmesage) {
    let data = {
        id: idmesage
    };
    let dataToSend = JSON.stringify(data);
    //console.log(dataToSend);
    $.ajax({
        url: 'https://gabb56c31faef8a-bn0s7g73pkwbizup.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message',
        type: 'DELETE',
        //   dataType : 'json',
        data: dataToSend,
        contentType: 'application/json',
        success: function (response) {
            $("#idmesage").val("");
            $("#message").val("");
        },
        error: function (xhr, status) {
            //     alert('ha sucedido un problema');
        },
        complete: function () {
            getmessages();
        }
    });

}