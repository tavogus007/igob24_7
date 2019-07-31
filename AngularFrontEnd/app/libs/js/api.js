$.extend({
    listar: function(v_option,v_sdoc_usuario,v_sdoc_sistema,v_sdoc_proceso,v_sdoc_id) {
        // local var
        var theResponse = null;
        // jQuery ajax
        /*$.ajax({
            url:constantes.url,
            type: 'POST',
            data:{
					option		  : v_option,
					sdoc_usuario  : v_sdoc_usuario,
					sdoc_sistema  : v_sdoc_sistema,
					sdoc_proceso  : v_sdoc_proceso,
					sdoc_id       : v_sdoc_id
				},
            dataType: "html",
            async: false,
            success: function(respText) {
                theResponse = respText;
            }
        });*/
        // Return the response text
        //return theResponse;
        return false;
    },
	
	propiedades: function(v_sid) {
        // local var
        var theResponse = null;
        // jQuery ajax
        $.ajax({
            url:constantes.url,
            type: 'POST',
            data:{
					option	: "LISTARPROPIEDADES",					
					sid		: v_sid
				},
            dataType: "html",
            async: false,			
            success: function(respText) {
                theResponse = respText;
            }
        });
        // Return the response text
        return theResponse;
    }	
});
