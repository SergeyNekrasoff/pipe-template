;(function ($) {
    'use strict';

    const cssSelector = {
        wrapper: '.js-wrap-field',
        input: '.js-input-form, .js-form-textarea',
        closeButton: '.js-form-input-clear'
    };

    /**
     * Initialization validate mode for all inputs
     */
    function initValidateMod() {
        $(cssSelector.wrapper).filter('.flag-important').find(cssSelector.input).addClass('flag-important');

        $(cssSelector.wrapper).each(function () {
            $(this).addClass('active');

            $(this).parent().removeClass('field-error');

            const $input = $(this).find('.js-input-form'),
                $textarea = $(this).find('.js-form-textarea');

            if ($input.val()) {
                $input.addClass('active');
            }
            if ($textarea.val()) {
                $textarea.addClass('active');
            }
            showAsterix($input);
        });
    }

    /**
     * Show asterix in required fields
     */
    function showAsterix($input) {
        if (!$input.val() && $input.parent().hasClass('wrap-field-required')) {
            $input.parent().addClass('show-asterisk');
        }
    }

    /**
     * Call initValidateMod()
     */
    $(initValidateMod);

    $(document)
        .on('focus', cssSelector.input, (e) => {
          console.log('input input input');
            $(e.currentTarget).removeClass('flag-error');
            $(e.currentTarget).parent().removeClass('field-error show-asterisk');
        })
        .on('keyup', cssSelector.input, (e) => {
            const input = e.currentTarget;

            if (input.value) {
                $(input).addClass('active');
                $(input).parent().removeClass('field-error');
            } else {
                $(input).removeClass('active');
            }
        })
        .on('blur', cssSelector.input, (e) => {
            const input = e.currentTarget;

            if ($(input).hasClass('flag-important') && !input.value) {
                $(input).addClass('flag-error');
                $(input).parent().addClass('field-error');
            } else {
                $(input).removeClass('flag-error');
                $(input).parent().removeClass('field-error');
            }
            showAsterix($(input));
        })
        .on('click', cssSelector.closeButton, (e) => {
            const $input = $(e.currentTarget).closest(cssSelector.wrapper).find(cssSelector.input);

            if ($input.val()) {
                $input.val('').removeClass('flag-error, active').parent().removeClass('field-error');

                //Safari focus fix
                setTimeout(() => {$input.get(0).focus()}, 50);
            }
        });

})(jQuery);
