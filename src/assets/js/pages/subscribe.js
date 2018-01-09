;(function($) {
    'use strict';

    /**
     *  Get in touch form settings
     */
    class Subscribe extends FormValidation {

        /**
         *  Form initialize
         */
        init() {
            super.init();

            // Validate Options
            this.optionsValidate = {
                fullMessages: false
            };

            this.$form.find(this.inputs).on('focus', () => this.clearErrors());
        }

        /**
         * Get constraints form
         * @returns {{username: {presence: {message: string}, email: {message: (function(*=))}}, password: {presence: {message: string}}}}
         */
        getConstraints() {
            return {
                'subscriber': {
                    presence: {
                        message: 'Пожалуйста, введите e-mail'
                    },

                    email: {
                        message: 'Введите корректный e-mail'
                    }
                }
            };
        }

        /**
         * Clear all errors
         */
        clearErrors() {
            super.clearErrors();
            this.$form.find('.js-error-form').html('');
        }

        /**
         * Send form
         */
        submit() {
            const data = {};
            const formData = this.$form.serializeArray();

            for (const index in formData) {
                data[formData[index].name] = formData[index].value;
            }

            this.setSaveButtonEnabled(false);

            // Check is pending login ajax request
            if (typeof this.xhr == 'undefined' || this.xhr.state() != 'pending') {
                this.xhr = this._sendAjax(data);
            }
        }

        /**
         * Send ajax to controller
         *
         * @param {object} data
         * @returns {promise}
         */
        _sendAjax(data) {
          window.Loader.show();

          $.ajax({
            url: '/scripts/mail.php',
            type: 'POST',
            data: data,
            dataType: 'json'
          }).always(() => {
            window.Loader.hide()
          });
        }

        /**
         * Show message from controller
         *
         * @param message
         */
        _showErrorForm(message) {
            this.$form.find('.js-error-form').html(message);
        }
    }

    $(() => {
        new Subscribe($('.js-form-subscribe'));
    });

})(jQuery);
