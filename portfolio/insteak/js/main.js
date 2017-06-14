var speed = 700;
var fpOpts = {
  //Navigation
  menu: true,
  anchors: ['главная', 'почему_мы', 'кейсы', 'тарифы', 'вопросы', 'контакты'],
  navigation: false,
  navigationPosition: 'right',

  showActiveTooltips: false,
  slidesNavigation: true,
  slidesNavPosition: 'bottom',

  //Scrolling
  css3: true,
  scrollingSpeed: 700,
  autoScrolling: true,
  fitToSection: true,
  scrollBar: false,
  easing: 'easeInOutCubic',
  easingcss3: 'ease',
  loopBottom: false,
  loopTop: false,
  loopHorizontal: true,
  continuousVertical: false,
  scrollOverflow: false,
  touchSensitivity: 15,
  normalScrollElementTouchThreshold: 5,

  //Accessibility
  keyboardScrolling: true,
  animateAnchor: true,
  recordHistory: true,

  //Design
  controlArrows: true,
  verticalCentered: true,
  resize: false,
  sectionsColor: ['#ccc', '#fff'],
  fixedElements: 'nav',
  responsive: 1,

  //Custom selectors
  sectionSelector: '.page',

  //events
  onLeave: function(index, nextIndex, direction) {},
  afterLoad: function(anchorLink, index) {
    if (index === 1) {
      $('menu li').removeClass('active');
      return false;
    }
    $('menu li')
      .removeClass('active')
      .eq(index - 2)
      .addClass('active');
  },
  afterRender: function() {},
  afterResize: function() {},
  afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {},
  onSlideLeave: function(anchorLink, index, slideIndex, direction) {}
};



$(function() {

  fixHeight();

  // Fullpage
  $('.wrapper-all').fullpage(fpOpts);
  $('.questions').accordion({
    header: ".title",
    heightStyle: "content"
  });

  // Slider
  $('.slides').slick({
    easing: 'easeInOut',
    dots: true,
    prevArrow: $('.slider .ar-left'),
    nextArrow: $('.slider .ar-right')
  });


  // Maskedinput
  $('input[name="phone"]').mask("+9 (999) 999-9999")

  fixHeight();

  // onscroll resize
  $(window).resize(fixHeight);



  $(document).on('click', 'a.sc', function(event) {
    event.preventDefault();

    var id = $(this).attr('href');
    var pos = id == '#' ? 0 : $(id).offset().top;

    $('body').stop().animate({
      scrollTop: pos
    }, speed);
  });




  $(document).on('click', '.tariffs .button', function(event) {
    event.preventDefault();


    var index = $(this).data('id');
    var leftOffset = $('table tr th').eq(index).offset().left - 40;
    var names = ['Test', 'Standart', 'Pro'];
    var $win = $('.order-window');

    $win.hide();

    $win.find('.name span').text(names[index]);
    $win.find('input[name="plan"]').val(names[index]);

    $win
      .fadeIn(400)
      .offset({
        left: leftOffset
      });
  });


  $(document).on('click', '.order-window .cross', function(event) {
    event.preventDefault();

    $('.order-window').fadeOut('fast');
  });


  // Send forms
  $(document).on('submit', 'form', function(event) {
    event.preventDefault();

    var that = this;

    $.post('sendreq.html', $(that).serialize(), function(data) {

      if ($(that).find('[name="url"]').size() === 0) {
        $('.envelope')
          .width($(window).height() * 0.8)
          .css('left', -$(window).width() - $('.envelope').width() - 200)
          .fadeIn('320', function() {
            $(this)
              .stop()
              .animate({
                left: $(window).width()
              }, 500, function() {
                that.reset();
              });
          });
      } else {
        $('.thanks').fadeIn('fast', function() {
          setTimeout(
            function() {
              $('.order-window').fadeOut(300);
            }, 1000);
        });
        that.reset();
      }
    });

  });




});









function fixHeight() {
  var winH = $(window).height();

  if ($('fullpage-wrapper').size() > 0) {
    $.fn.fullpage.destroy('all');
    $('.wrapper-all').fullpage(fpOpts);
  }

  $('.wrapper-all').add('.page').height(winH);

  $.each($('.content'), function(index, el) {
    var h = $(this).height();

    if ((winH - h - 146) / 2 > 100) {
      // $('h1').css('padding-top', 133);
      // $('h2').css('padding-top', 75);
      $('#main .columns').css('padding-top', 115);
      $('#about .table')
        .css('margin-top', 85)
        .find('.cell:nth-child(1)')
        .add('.cell:nth-child(2)')
        .css('padding-bottom', 78);
      $('.slider').css('margin-top', 45);
    } else {
      $('#about .table')
        .css('margin-top', 10)
        .find('.cell:nth-child(1)')
        .add('.cell:nth-child(2)')
        .css('padding-bottom', 25);
      $('.slider').css('margin-top', 0);
    }

    h = $(this).height();

    $(this).css('margin-top', (winH - h - 146) / 2);
  });
}
