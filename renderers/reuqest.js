const parameter_template = `<div class="item">
<div class="key">
  <input type="text" class="form-control params_key" name="params_key[]" placeholder="Parameter Key"/>
</div>
<div class="value">
  <input type="text" class="form-control params_value" name="params_value[]" placeholder="Parameter Value"/>
</div>
<div class="operation">
  <button class="btn btn-delete delete_param"><i class="fa fa-trash"></i></button>
</div>
</div>`;

const header_template = `
<div class="item">
    <div class="key">
        <input type="text" class="form-control params_key" name="headers_key[]" placeholder="Header Key"/>
    </div>
    <div class="value">
        <input type="text" class="form-control params_value" name="headerS_value[]" placeholder="Header Value"/>
    </div>
    <div class="operation">
        <button class="btn btn-delete delete_header"><i class="fa fa-trash"></i></button>
    </div>
</div>
`;


var body_editor;

function validateURL(){
    var url = $("#url").val();
    if(validate({website: url}, {website: {url: true}}) != undefined){
        return false;
    }else{
        return true;
    }
}

function checkParamsAndAdd(){
    var params = $("#tab-params .list input.params_key");
    if($(params[params.length-1]).val()){
        $("#tab-params .list").append(parameter_template);
    }
}

function checkHeadersAndAdd() {
    var header = $("#tab-headers .header-list input.params_key");
    if ($(header[header.length-1]).val()) {
        $("#tab-headers .header-list").append(header_template);
    }
}

$(function(){

    var active_tab_name = $("#props .nav-tabs .active").attr("tab");
    $("#props .tabs .tab[tab='"+active_tab_name+"']").show();

    $("#tab-params .list").append(parameter_template);
    $("#tab-params .list").append(parameter_template);
    $("#tab-params .list").append(parameter_template);
    $("#tab-headers .header-list").append(header_template);
    $("#tab-headers .header-list").append(header_template);
    $("#tab-headers .header-list").append(header_template);

    $("#tab-params .list").on("change", "input.params_key", function(e){
        checkParamsAndAdd();
    });

    $("#tab-headers .header-list").on("change", "input.params_key", function(e){
        checkHeadersAndAdd();
    });

    body_editor = ace.edit("body-editor");
    var JSONMode = require("ace-builds/src/mode-json").Mode;
    body_editor.session.setMode(new JSONMode());
    body_editor.setTheme(require('ace-builds/src/theme-xcode'));
    body_editor.setFontSize("14px");

    $("#body-editor-theme").on("change", function(e){
        switch ($("#body-editor-theme").val()) {
            case "light":
                body_editor.setTheme(require('ace-builds/src/theme-xcode'));
                break;
            case "dark":
                body_editor.setTheme(require('ace-builds/src/theme-tomorrow_night_eighties'));
                break;
            default:
                break;
        }
    });

    $("#body-content-type").on("change", function(e){
        var mode;
        switch ($("#body-content-type").val()) {
            case "application/json":
                mode = require("ace-builds/src/mode-json").Mode;
                break;
            case "application/xml":
                mode = require("ace-builds/src/mode-xml").Mode;
                break;
            case "application/text-plain":
                mode = require("ace-builds/src/mode-plain_text").Mode;
                break;
            case "application/text-html":
                mode = require("ace-builds/src/mode-html").Mode;
                break;
            default:
                mode = require("ace-builds/src/mode-plain_text").Mode;
                break;
        }
        body_editor.session.setMode(new mode());
    });

    $("#method-select").on("change", async function(e){
        if($("#method-select").val() == "custom"){
            const { value: method } = await Swal.fire({
                title: 'Create Custom Method',
                input: 'text',
                inputPlaceholder: 'Enter your custom method name',
                showCancelButton: true
            });
            if (method) {
                $("#method-select").append('<option>'+method+'</option>');
                $("#method-select option:last").attr("selected", "selected");
            }
        }
    });

    $("#method-list a").on("click", function(e){
        e.preventDefault();
    });

    $("#request-form").on("submit", function(e){
        e.preventDefault();
        if(validateURL()){

        }else{
            $("#request-alert span.message").html("<strong>Hata!</strong> Girdğiniz istek adresi geçerli bir URL değil.");
            $("#request-alert").show()
        }
    });

    $("#request-alert button").on("click", function(e){
        e.preventDefault();
        $("#request-alert").hide();
    });

    $("#props .nav-tabs .nav-item a").on("click", function(e){
        $("#props .nav-link").removeClass("active");
        $(this).addClass("active");
        var tab_name = $(this).attr("tab");
        $("#props .tabs .tab").hide();
        $("#props .tabs .tab[tab='"+tab_name+"']").show();
    });

    $("#tab-params .list").on("click", ".add_param", function(e){
        $("#tab-params .list").append(parameter_template);
    });

    $("#tab-params .list").on("click", ".delete_param", function(e){
        if($("#tab-params .list .item").length > 1){
            if($(this).parent().parent().find(".params_key").val()){
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#aaa',
                    confirmButtonText: 'Delete Parameter',
                    cancelButtonText: 'Cancel'
                }).then((result) => {
                    if (result.value) {
                        $(this).parent().parent().remove();
                    }
                });
            }else{
                $(this).parent().parent().remove();
            }
        }else{
            Swal.fire("Warning", "You cant delete last parameter, maybe you need it.", "warning");
        }
    });

    $("#tab-headers .header-list").on("click", ".delete_header", function(e){
        if($("#tab-headers .header-list .item").length > 1){
            if($(this).parent().parent().find(".header_key").val()){
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#aaa',
                    confirmButtonText: 'Delete Parameter',
                    cancelButtonText: 'Cancel'
                }).then((result) => {
                    if (result.value) {
                        $(this).parent().parent().remove();
                    }
                });
            }else{
                $(this).parent().parent().remove();
            }
        }else{
            Swal.fire("Warning", "You cant delete last header, maybe you need it.", "warning");
        }
    });

});