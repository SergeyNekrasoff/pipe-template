;(function($) {
    'use strict';

    /**
     *  Get in touch form settings
     */
    class Registration extends FormValidation {

        /**
         *  Form initialize
         */
        init() {
            super.init();

            // Validate Options
            this.optionsValidate = {
                fullMessages: false
            };

            this.$successMessage = $('.js-form-registration');
            this.$form.find(this.inputs).on('focus', () => this.clearErrors());
        }

        /**
         * Get constraints form
         * @returns {{username: {presence: {message: string}, email: {message: (function(*=))}}, password: {presence: {message: string}}}}
         */
        getConstraints() {
            return {
                'firstname': {
                    presence: {
                        message: 'Please enter your firstname'
                    }
                },

                'lastname': {
                    presence: {
                        message: 'Please enter your lastname'
                    }
                },

                'email': {
                    presence: {
                        message: 'Please enter your email'
                    },

                    email: {
                        message: 'Please enter correct email'
                    }
                },

                'password': {
                    presence: {
                        message: 'Please enter your password'
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
            // return submitEmailFromBlogPage(data)
            //     .done((response) => {
            //         if (response.message) {
            //             this.$successMessage.text(response.message);
            //         }
            //     })
            //     .fail((response) => this._showErrorForm(response.responseJSON.message))
            //     .always(() => this.setSaveButtonEnabled(true));

            alert('success!')
            console.log('data form-subscribe: ' + data);
        }

        /**
         * Send form
         *
         * @param {object} data
         * @returns {Promise}
         */
        // submitEmailFromBlogPage(data) {
        //     return $.post('/path-to-method/postHowVisionBenefit', data);
        // }

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
        new Registration($('.js-form-registration'));
    });

})(jQuery);