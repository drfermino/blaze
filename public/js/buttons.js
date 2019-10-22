
$(".btn-loading").on("click", function() { 
    $(this).loading(); 
});


$(".btn-loading-submit").on("click", function() { 
    $(this).loading();
    $(this).parents('form:first').submit();    
});

(function( $ ){
    $.fn.loading = function() {
        // disable button
        this.prop("disabled", true);

        this.attr("data-html", this.html());
        this.attr("data-width", this.width() * 2.625);
        this.removeAttr('style');


        // add spinner to button
        this.html(
        `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Carregando...`
        );
        return this;
    }; 
 })( jQuery );