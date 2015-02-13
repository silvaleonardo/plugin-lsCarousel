// Zepto Plugins

(function($){
	$.extend($.fn, {
		//FadeIn
		fadeIn: function(ms, callback){
			if(typeof(ms) === 'undefined'){
				ms = 400;
			}
			if(typeof(callback) === 'undefined'){
				callback = function(){};
			}
			$(this).css({
				display: 'block',
				opacity:0
			}).animate({ opacity: 1 }, ms, "linear", function(){
				callback.call(this);
			});
			return this;
		},
		//FadeOut
		fadeOut: function(ms, callback){
			if(typeof(ms) === 'undefined'){
				ms = 400;
			}
			if(typeof(callback) === 'undefined'){
				callback = function(){};
			}
			$(this).css({
				display: 'block',
				opacity:1
			}).animate({ opacity: 0 }, ms, "linear", function(){
				$(this).css({ display: "none" }); 
				callback.call(this);
			});
			return this;
		},
		//FadeTo
		fadeTo: function(ms, opa, callback){
			if(typeof(ms) === 'undefined'){
				ms = 400;
			}
			if(typeof(opa) === 'undefined'){
				opa = 1;
			}
			if(typeof(callback) === 'undefined'){
				callback = function(){};
			}
			$(this).css({
				display: 'block',
				opacity: ( $(this).css("opacity") ? $(this).css("opacity") : 0 )
			}).animate({ opacity: opa }, ms, "linear", function(){
				if( opa == 0 ) $(this).css({ display: "none" }); 
				callback.call(this);
			});
			return this;
		},
		//maskCpf
		/*maskCpf: function(){
			
			var message = this;
			var obj = new Object;
			
			if(maskComplete(message)==false){
				obj.returnValue = false;
			}	
			return formatField(message, '000.000.000-00', obj);
			
			function maskComplete(){
				if (obj.keyCode < 48 || obj.keyCode > 57){
					obj.returnValue = false;
					return false;
				}
				return true;
			}
			
			function formatField( field, mask, events ){
				
				var bolleanMask; 
				
				var digit = events.keyCode;
				exp = /\-|\.|\/|\(|\)| /g
				fieldNumber = field.val().toString().replace( exp, "" ); 
			   
				var fieldPosition = 0;	 
				var newFieldContent = "";
				var maskLength = fieldNumber.length;; 
				
				if (digit != 8) { // backspace 
					for(i=0; i<= maskLength; i++) { 
						bolleanMask  = ((mask.charAt(i) == "-") || (mask.charAt(i) == ".") || (mask.charAt(i) == "/"));
						bolleanMask  = bolleanMask || ((mask.charAt(i) == "(") || (mask.charAt(i) == ")") || (mask.charAt(i) == " "));
						if (bolleanMask) { 
							newFieldContent += mask.charAt(i); 
							 maskLength++;
						}else { 
							newFieldContent += fieldNumber.charAt(fieldPosition); 
							fieldPosition++; 
						  }	   	 
					  }	 
					field.val() = newFieldContent;
					  return true; 
				}else { 
					return true; 
				}
					
			}
			
		}*/
	});
})(Zepto);