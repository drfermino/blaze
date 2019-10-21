
$(".btn-loading").on("click", function() { 
    // disable button
    $(this).prop("disabled", true);

    $(this).attr("data-html", $(this).html());
    // add spinner to button
    $(this).html(
    `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Carregando...`
    );
    $(this).parents('form:first').submit();    
});