$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/carousel/chevron-left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/carousel/chevron-right.png"></button>', 
        responsive: [
            {
              breakpoint: 992,
              settings: {
                dots: true, 
                arrows: false
              }
            }, 
        ]
  });

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.conteiner').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  function toggleSlide(item) {
    $(item).each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
    });
};

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  // Modals

  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
  });
  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });

  $('.button_mini').each(function(i) {
    $(this).on('click', function () {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    });
  });

  function validateForm(form) {
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: "Пожалуйста, введите своё имя",
        phone: "Пожалуйста, введите свой номер телефона",
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "в формате, example@gmail.com"
        }
      }
    });
  };

  validateForm('#consultation-form');
  validateForm('#order form');
  validateForm('#consultation form');

  $('input[name=phone]').mask("+7 (999) 999-99-99");

  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST", /* отправляем или получаем данные на сервер или с сервера */
      url: "mailer/smart.php", /* какой обработчик будет обрабатывать данные */
      data: $(this).serialize() /* данные, которые надо отправить на сервер */
    }).done(function() {
      $(this).find("input").val(""); /* после отправки данных на сервер, мы устанавливаем в вэлью в инпутах пустые поля, т.е очистим все инпуты от данных */
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');
      $('form').trigger('reset');
    });
    return false;
  });

  $(window).scroll(function(){
    if ($(this).scrollTop() > 1400 ) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });

  $("a[href=#up]").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
});

});
