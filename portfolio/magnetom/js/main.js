/**
 * Обработка при загрузке страницы
 */
$(function() {

	$(window).scroll(function() {
		var browserWitdh = $(window).width();
		if (browserWitdh > '950') {
			var top = 40;
	  		var scroll_top = $(this).scrollTop();
			if (scroll_top > top) {		
				$('.top-line').css({'z-index':'20'}).fadeIn(0);
				$('.toggle-menu').css({'position':'fixed', 'z-index':'25'});
			} else {
				$('.top-line').css({'z-index':'-1'}).fadeOut(0);
				$('.toggle-menu').css({'position':'relative', 'z-index':'10'});
			}
		}
  	});

	$('.menu-toggle').toggle(function() {
		$('.toggle-menu').slideDown('400');
		$(this).find('em').fadeIn(400);
		$(this).find('i').removeClass('icon-menu').addClass('icon-remove');
	}, function() {
		$('.toggle-menu').slideUp('400');
		$(this).find('em').fadeOut(400);
		$(this).find('i').removeClass('icon-remove').addClass('icon-menu');
	});

	$('.toggle-menu li a').click(function() {
		$('.menu-toggle').click();
	});


	// Accordion outer
	$('.js-accordion-outer-down').click(function() {

		if ($(this).closest('.accordion-outer__head').hasClass('accordion-outer__head--active')) {
			event.preventDefault();
		} else {
			$(this).closest('.accordion').find('.accordion-outer').each(function(index) {
				$(this).find('.accordion-outer__head').removeClass('accordion-outer__head--active');
				$(this).find('.icon-circledown').fadeOut(0);
				$(this).find('.icon-circleright').fadeIn(0);
				$(this).find('.accordion-outer__content').slideUp('fast')
			});

			$(this).closest('.accordion-outer__head').addClass('accordion-outer__head--active');
			$(this).find('.icon-circledown').fadeIn(0);
			$(this).find('.icon-circleright').fadeOut(0);
			$(this).closest('.accordion-outer').find('.accordion-outer__content').slideDown('fast');
		}
	});	


	$('.fixed-menu, .toggle-menu, .static-menu, .feat').ddscrollSpy({
		scrolltopoffset: -80,
	});



	// init tabs
	$( ".tabs" ).tabs({ active: 0 });

	if ($(window).width() < 1024) {
		$('.tabs__menu li a').click(function(event) {
			var head = $(this).html();
			$(this).closest('.responsive-tabs-menu').find('.tabs__menu-head em').html(head);
			// $(this).closest('.tabs__menu').css('display', 'none');
			$('.tabs__menu').fadeOut();
		});

		$('.responsive-tabs-menu .tabs__menu-head').mouseover(function(event) {
			$('.tabs__menu').fadeIn();
		});
	}




	$(".slider").owlCarousel({
		navigation : true,
		slideSpeed : 300,
		paginationSpeed : 400,
		singleItem : true,
		// autoPlay : true,
        stopOnHover : true,
	});
	
	// Добавляем маску к вводу телефона
	$("input[name='phone']").each(function() {
		$(this).mask("+7 (999) 999-9999");
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

	$('form').submit(function(event){
		event = event || window.event;
		var data = $(this).serialize();
		var answer = $.post("mail.html", data).done(function(msg){
			$(".modal2 .message p").html(msg);
			$(".modal2").modal({
				close : '.modal2 .close',
				context : '.context'
			});
            $("#callForm").find('.close-reveal-modal').click();
		});	
		event.preventDefault();		
	});
    
    
});


function initialize() {
	
	var brooklyn = new google.maps.LatLng(55.67075178, 37.62538750);

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