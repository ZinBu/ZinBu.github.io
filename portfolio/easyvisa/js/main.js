 function bgHeader() { 	
    var isiPad = navigator.userAgent.match(/iPad/i) != null;
    var isiPhone = navigator.userAgent.match(/iPhone/i) != null;
    var browserWitdh = $(window).width();

    var topDist = $(document).scrollTop()+0;
	var topFixed = $(document).scrollTop()-0;
	var topCallback = $(document).scrollTop()+0;
	
    if (isiPad == false && isiPhone == false 
    	&& device.windowsPhone() == false 
    	&& device.windowsTablet() == false
    	&& device.blackberryPhone() == false
    	&& device.blackberry() == false
    	&& device.androidPhone() == false
    	&& device.androidTablet() == false
    	&& device.android() == false
    	&& device.mobile() == false
    	&& browserWitdh > '995') {
    	// alert ('hi')
	    $('.main').css({
	        'background-position': 'center '+ -(topDist * .3) +'px'
	    });


	    $('.main .b-center').css({
	    	'top': (topFixed * .3) + "px"
	    }); 
	} else {
        $('.main').css({
        	'background-attachment':'scroll',
        	'background-position':'50% 0px'
        });
	    $('.main__fixed').css('position', "absolute");  
    }
}

function bgAbout() {
	var isiPad = navigator.userAgent.match(/iPad/i) != null;
    var isiPhone = navigator.userAgent.match(/iPhone/i) != null;
    var browserWitdh = $(window).width();
	
    if (isiPad == false && isiPhone == false 
    	&& device.windowsPhone() == false 
    	&& device.windowsTablet() == false
    	&& device.blackberryPhone() == false
    	&& device.blackberry() == false
    	&& device.androidPhone() == false
    	&& device.androidTablet() == false
    	&& device.android() == false
    	&& device.mobile() == false
    	&& browserWitdh > '995') {
		var priceOffset = $('.about').offset().top-1000;
	    var topDist = $(document).scrollTop()-priceOffset;
	    
	    $('.about').css({
	        'background-position': 'center '+ -(topDist * .35) +'px'
	    });
    } else {
        $('.about').css({
        	'background-attachment':'scroll'
        });
    }
}

/**
 * Обработка при загрузке страницы
 */
$(function() {

	$(".slider").owlCarousel({
		navigation : true,
		slideSpeed : 300,
		paginationSpeed : 400,
		singleItem : true,
		autoPlay : true,
        stopOnHover : true,
	});

	$(".slider-numbers").owlCarousel({
		navigation : true,
		slideSpeed : 300,
		paginationSpeed : 400,
		singleItem : true,
		autoPlay : true,
        stopOnHover : true,
        paginationNumbers : true
	});

	$(document).scroll(bgHeader);
	$(document).scroll(bgAbout);

	// init tabs
	$( ".tabs" ).tabs({ active: 0 });

	// $("a[rel='tile-group-1']").fancybox();
	
	// Добавляем маску к вводу телефона
	$("input[name='phone']").each(function() {
		$(this).mask("+38 (999) 999-9999");
	});

	$('.order-link').click(function() {
		var title = $(this).data('title');

		var form = $('#callForm');
		form.find('h3').html(title);
		form.find('input[name="formname"]').val(title);
	});

	
	$("a.call").click(function() {
		$('#callForm').reveal({
			 animation: 'fade',
			 animationspeed: 100
		});
		// Отслеживает закрытие модального окна
		$('.reveal-modal-bg, .close-reveal-modal').on('click', function(){
			var form = $('#callForm');
			form.find('input[type="text"]').each(function() {
				$(this).val('');
			});
			form.find('h3').html("Обратный звонок");
			form.find('input[name="formname"]').val("Обратный звонок");
		});
	});

	// Politics
	$("a.politics").click(function() {
        $('#politics').reveal({
            animation: 'fade',
            animationspeed: 100
        });
    });

	$('.politics').click(function(){
		var scrollTop = $('#politics').offset().top-107;
		// alert(scrollTop);
		$("html, body").animate({
            scrollTop: scrollTop + "px"
        }, {
            duration: 500
        });
	});

    
    $.fn.modal = function(options){
		options = $.extend({
			center: true,
			onStart: true,
			close: "#js-modal-close",
			context: ".order",
			delayHide: "400",
			delayShow: "600"
		}, options);
		var center = options.center;
		var close = options.close;
		var context = options.context;
		var delayHide = options.delayHide;
		var delayShow = options.delayShow;
		var onStart = options.onStart;
		var $modal = this;

		function init(){
			if (center) {
				$modal.show();
				var $mContext = $modal.find(context);
				var height = $mContext.outerHeight();
				$mContext.css({	
					"top": "50%",
					"bottom": "auto",
					"left": "0",
					"right": "0",
					"margin-top": -Math.floor(height/2),
					"margin-left": "auto",
					"margin-right": "auto",
					"margin-bottom": "0"
				});
			}
			$modal.hide();
		}		
		var modalHide = function(){
			$modal.fadeOut(delayHide);
			$modal.toggleClass('active');
            $("#backGround").fadeOut(500);
		};
		var modalShow = function(){
			$modal.fadeIn(delayShow);
			$modal.toggleClass('active');
            $("#backGround").fadeIn(500);
		}

		$(close).click(modalHide);
		
		$(document).keydown(function(event){
			event = event || window.event;
			if (event.which == 27) {
				if ($modal.hasClass("active")) {
					modalHide();
				}
			}
		});
		
		init();
		
		if (onStart) {
			modalShow();;
		}
	};

    
    
});


function initialize() {
	
	var brooklyn = new google.maps.LatLng(43.12860430, 131.89216850);

	var stylez = [
		{
		  featureType: "all",
		  elementType: "all",
		  stylers: [
			{ saturation: -100 } // <-- THIS
		  ]
		}
	];

	var mapOptions = {
		zoom: 16,
		center: brooklyn,
        mapTypeControl: false,
        scrollwheel: false,
        navigationControl: false,
        scaleControl: false,
	};

	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

	var mapType = new google.maps.StyledMapType(stylez, { name:"Grayscale" });    
	map.mapTypes.set('tehgrayz', mapType);
	map.setMapTypeId('tehgrayz');
    
    marker = new google.maps.Marker({
        map:map,
        draggable:true,
        position: brooklyn,
        title: "Мы находимся тут!"
    });
    google.maps.event.addListener(marker, 'click', toggleBounce);
}
function toggleBounce() {

  if (marker.getAnimation() != null) {
    marker.setAnimation(null);
  } else {            
    marker.setAnimation(google.maps.Animation.BOUNCE);
    delay(4).marker.setAnimation(null);            
  }
}