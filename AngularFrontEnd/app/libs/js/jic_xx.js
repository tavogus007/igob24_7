
var jicompres = {
    compress: function(source_img_obj, quality, output_format){               
        var mime_type = "image/jpeg";
        if(typeof output_format !== "undefined" && output_format=="png"){
            mime_type = "image/png";
        }           
        var cvs = document.createElement('canvas');
        cvs.width = source_img_obj.naturalWidth;
        cvs.height = source_img_obj.naturalHeight;
        var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0);
        var newImageData = cvs.toDataURL(mime_type, quality/100);
        var result_image_obj = new Image();
        result_image_obj.src = newImageData;
        return result_image_obj;
    },
};


function compressImage (fileItem){
	return new Promise (function(resolve, reject) {
		var target_img = document.createElement("img");
		var current_file = fileItem;
		var img_comprimido = '';
		var arrayData = [];
	    var reader = new FileReader();                        
		    if (current_file.type.indexOf('image') == 0) {
		    	reader.onload = function (event) {
		            var image = new Image();
		            image.src = event.target.result;
		            image.onload = function() {
		                var canvas = document.createElement('canvas');
		                canvas.width = image.width;
		                canvas.height = image.height;
		                var ctx = canvas.getContext("2d");
		                ctx.drawImage(image, 0, 0, image.width, image.height);                        
		                var source_img = new Image();
		                source_img.src = canvas.toDataURL(current_file.type);                    
	                    var quality =  30;
	                    var output_format = 'jpg';
	                    target_img.src = jicompres.compress(image,quality,output_format).src; 
	                    img_comprimido = target_img.src.replace(/data:image\/jpeg;base64,/g, '');
	                   	arrayData.push(img_comprimido); 
                        var namefile = current_file.name.split('.');
                        var nombre = namefile[0];
                        var nombrearch = nombre + '.jpg';	
                        var cianverso = convertirImgBase64(img_comprimido, nombrearch).then(function(respuesta){
                            resolve(respuesta)
                        });  		    
	                } 
	            }
	        reader.readAsDataURL(current_file);
	    };   
	});
}

function convertirImgBase64 (imagen, nombre){
    return new Promise (function(resolve, reject) {
        var contentType = 'image/png';
        var b64Data = imagen;
        var blob = b64toBlob(b64Data, contentType);
        var blobUrl = URL.createObjectURL(blob);
        function b64toBlob(b64Data, contentType, sliceSize) {
            contentType = contentType || '';
            sliceSize = sliceSize || 512;
            var byteCharacters = atob(b64Data);
            var byteArrays = [];
            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);
                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }
                var byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }
            var blob = new Blob(byteArrays, {type: contentType});
            blob.name = nombre;
            resolve(blob);
        }
    });
};
