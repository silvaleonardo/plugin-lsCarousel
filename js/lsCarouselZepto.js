


//////////////////////////////////////////////////////////////////////
//				@charset "UTF-8"									//
//				@language ECMASCRIPT5							    //
//				@ Title: Plugin Carrossel com Zepto				//
//				@ Author: Leonardo Silva							//
//				@ Version: 1.0										//
//				@ Todos os direitos reservados						//
//////////////////////////////////////////////////////////////////////



(function($){
	
	// Opções default
	var $opDefault = {
						topFactor : 0.2,	// Fator de divisão para posicionamento dos elementos PREV e NEXT
						sizeFactor: 0.6,	// Fator de multiplicação para width e height dos elementos PREV e NEXT
						name	  : ""
					 };
	
	// Variáveis
	var element   = "";
	var _divs 	  = [];
	var count 	  = 0;
	var clickTime = 0;
	
	var countPrev, countNext, countDisa;
	var btnPrev, btnNext;
	
	// Difinido plugin	
	$.fn.lsCarousel = function( options ){
		
		// Verifica opções
		if( options ) $.extend( $opDefault, options );
		
		// Define o elemento carrossel
		element = $(this);
		
		// Inicia o plugin
		_constructor();
		
	}//lsCarousel
	
	// Função principal
	var _constructor = function(){
		
		// Verifica as divs com class item e separa em um array
		element.find(".item").each(function(ind, val){
			val.id = $opDefault.name + "item-" + ind;
			_divs.push($(element.selector + " #" + val.id));
		});
		
		// Define botões anterior e proximo
		btnNext = element.find(".btn-next");
		btnPrev = element.find(".btn-prev");
		_buttons();
		
		// Posição inicial das divs itens
		for(var i = count; i < _divs.length; i++){
			if(i == 0){
				_divs[i].addClass("active");
			}else if(i == 1){
				_resize( _divs[i], "next" );
				countNext = i;
			}else if(i == (_divs.length - 1)){
				_resize( _divs[i], "previous" );
				countPrev = i;
			}else{
				_divs[i].addClass("disabled");
			}
		}
		
	}//_constructor
	
	// Função que cria funções dos botões
	var _buttons = function(){
		
		// Cria a função dos botões e cria um intervalo de clique para não interromper a animação
		btnNext.click(function(e){ 
			if(clickTime == 0 || e.timeStamp >= (clickTime + 600)){
				clickTime = e.timeStamp;
				_changeDiv( true ); 
			}
		});
		
		btnPrev.click(function(e){ 
			if(clickTime == 0 || e.timeStamp >= (clickTime + 600)){
				clickTime = e.timeStamp;
				_changeDiv( false ); 
			}
		});
		
	}//_buttons
	
	// Função que gerencia os indeces para troca das divs
	var _changeDiv = function( next ){
		
		if( next ){
							
			countDisa = countPrev; // Define o indice que será desativado
			count++;
			if(count >= _divs.length) count = 0;
			if(count == 0){	countPrev = _divs.length - 1; countNext = count + 1;
			}else if(count == (_divs.length - 1)){ countPrev = count - 1; countNext = 0;
			}else{ countPrev = count - 1; countNext = count + 1; }
			
			_interpolation( countDisa, count, countPrev, countNext, "active", "previous", "next" );
			
		}else{
			
			countDisa = countNext;
			count--;
			if(count < 0) count = _divs.length - 1;
			if(count == 0){ countPrev = _divs.length - 1; countNext = count + 1;
			}else if(count == (_divs.length - 1)){ countPrev = count - 1; countNext = 0;
			}else{ countPrev = count - 1; countNext = count + 1;
			}
			
			_interpolation( countDisa, count, countNext, countPrev, "active", "next", "previous" );
			
		}
		
	}//_changeDiv
	
	// Cria as animações de interpolação
	var _interpolation = function( disabled, active, previous, next, classA, classPrev, classNext ){
		
		// Define a div ativa
		_divs[active]
		.css({"z-index"	 : 4})
		.animate({ 
								"margin-left": $("." + classA).css("margin-left"),
								"opacity"	 : $("." + classA).css("opacity"),
								"top"		 : $("." + classA).css("top"),
								"width"		 : $("." + classA).css("width"),
								"height"	 : $("." + classA).css("height")
							 }, 500)
		.addClass(classA)
		.removeClass(classNext);
		
		// Define a div anterior
		_divs[previous]
		.css({"z-index"	 : 2})
		.animate({ 
								"margin-left": $("." + classPrev).css("margin-left"),
								"opacity"	 : $("." + classPrev).css("opacity"),
								"top"		 : (_divs[previous].height() * $opDefault.topFactor) + "px",
								"width"		 : _divs[previous].width() * $opDefault.sizeFactor + "px",
								"height"	 : _divs[previous].height() * $opDefault.sizeFactor + "px"
							 }, 500)
		.removeClass(classA)
		.addClass(classPrev);
		
		// Define a proxima div
		_divs[next]
		.css({"z-index"	 : 2})
		.addClass(classNext)
		.css({		
								"margin-left": $("." + classNext).css("margin-left"),
								"opacity"	 : $("." + classNext).css("opacity"),
								"top"		 : (_divs[next].height() * $opDefault.topFactor) + "px",
								"width"		 : _divs[next].width() * $opDefault.sizeFactor + "px",
								"height"	 : _divs[next].height() * $opDefault.sizeFactor + "px"
				})
		.fadeTo(500, $("." + classNext).css("opacity"), function(){
			_divs[next]
			.removeClass("disabled");
		});
		
		// Desativa a div que sobra
		_divs[disabled]
		.css({"z-index"	 : 0})
		.removeClass(classPrev)
		.fadeOut(500, function(){
			_divs[disabled]
			.addClass("disabled")
			.removeAttr("style");
		});
				
		
	}//_interpolation
	
	// Função que faz o posicionamento inicial dos elementos
	var _resize = function( obj, classe ){
		
		obj
		.addClass( classe )
		.css({				
								"margin-left": $("." + classe).css("margin-left"),
								"top"		 : (obj.height() * $opDefault.topFactor) + "px",
								"width"		 : obj.width() * $opDefault.sizeFactor + "px",
								"height"	 : obj.height() * $opDefault.sizeFactor + "px"
			});
			
	}//_resize
	
})(Zepto);

