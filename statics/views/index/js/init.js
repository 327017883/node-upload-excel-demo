

$(() =>{
	var page = {
		init(){

			this.loadfileByHtml5()
		},
		loadfileByHtml5(){

			$('#loadfileByHtml5').on('change', function(e){

				var file = e.target.files;
				
				var formData = new FormData();

				Array.prototype.slice.call(file).forEach(function(v, i){
					formData.append("upload", file[i]);
				})

		        var xhr = new XMLHttpRequest();
		        xhr.addEventListener('progress', function(){
		            //console.log('progress');
		        }, false);
		        xhr.addEventListener('load', function(e){
		            //console.log(e);
		        }, false);
		        xhr.addEventListener('readystatechange', function(e){
		        	if(xhr.readyState == 4 && xhr.status == 200){
						console.log(xhr.responseText)
					}
		        }, false);
		        xhr.open('post', '/loadfile', true);

		        xhr.send(formData);

			})
		}
	}

	page.init();
});


