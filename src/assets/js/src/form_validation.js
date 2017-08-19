;(function($) {
    'use strict';

    window.$ = window.jQuery = require('jquery');

    /**
     * Class for validation html form
     *
     * @Abstract
     */
    class FormValidation {

        constructor(form, options) {

            this.options = $.extend({
                isAjax: true,
            }, options);

            // Validate Options
            this.optionsValidate = {};

            // Selectors
            this.submitBtn = '.js-submit-form';
            this.inputs = '.js-input-form';
            this.checkbox = '.js-checkbox-form';
            this.file = '.js-file-form';
            this.checkboxGroup = '.js-checkbox-group';
            this.formMessage = '.js-error-message';

            // Constants
            this.maxFileSize = 10485760; // 10 MB (size is also in bytes)

            // Validate messages
            this.messages = {
                oneCheckbox: 'should be selected',
                groupCheckbox: 'Do not select any items',
                fileValidate: 'is not valid',
                fileRequired: 'is required'
            };

            this.$form = $(form);

            this.addDefaultValidateRules();

            this.init();
        }

        /**
         * Initial, for events
         */
        init() {
            this.$form.on('submit', () => {
                return !this.options.isAjax;
            });

            this.$form.find(this.submitBtn).on('click', () => this.beforeSubmit());
            this.$form.find(this.inputs).on('keyup', () => this.clearErrors());
            this.$form.find(this.checkbox).on('change', () => this.clearErrors());
            this.$form.find(`${this.checkboxGroup} input[type="checkbox"]`).on('change', () => this.clearErrors());
        }

        /**
         * Add custom validation rules example (http://validatejs.org/#custom-validator)
         *
         * @rule checkbox
         *  params:
         *      - message {string}
         *
         * @rule checkboxGroup
         *  params:
         *      - message {string}
         *      - minChecked {number}
         *
         * @rule file
         *  params:
         *      - message {string} - Message show if file is not valid
         *      - required {boolean}
         *      - maxFileSize {number}
         *
         */
        addDefaultValidateRules() {
            if (window.validate) {
                // Single checkbox
                window.validate.validators.checkbox = (value, options) => {
                    if (!!this.$form.find(this.checkbox).length) {
                        const message = options.message || this.messages.oneCheckbox;

                        return (this.$form.find(`${this.checkbox}:checked`).length < 1)
                            ? message
                            : null;
                    }
                };

                // Group checkbox
                window.validate.validators.checkboxGroup = (value, options) => {
                    if (!!this.$form.find(this.checkboxGroup).length) {
                        const message = options.message || this.messages.groupCheckbox;
                        const minChecked = options.minChecked || 1;

                        return (this.$form.find(`${this.checkboxGroup} input[type="checkbox"]:checked`).length < minChecked)
                            ? message
                            : null;
                    }
                };

                // File
                window.validate.validators.file = (value, options) => {
                    const $file = this.$form.find(this.file);

                    if (!!$file.length) {
                        const message = options.message || this.messages.fileValidate;
                        const maxFileSize = options.maxFileSize || this.maxFileSize;
                        const required = options.required || false;

                        let file = $file.get(0).files[0];
                        let isValid = (file && file.size < maxFileSize) ? null : message;

                        return (required)
                            ? file
                                ? isValid
                                : this.messages.fileRequired
                            : file
                                ? isValid
                                : null;
                    }
                };
            }
        }

        /**
         * Return default constraints
         *
         * @returns {object}
         */
        getDefaultConstraints() {
            const fileName = this.$form.find(this.file).attr('name');
            let result = {};

            this.$form.find(this.checkbox).each((indx, checkbox) => {
                result[checkbox.name] = {
                    checkbox: {}
                }
            });

            this.$form.find(`${this.checkboxGroup} input[type="checkbox"]`).each((indx, checkbox) => {
                result[checkbox.name] = {
                    checkboxGroup: {}
                }
            });

            if (fileName) {
                result[fileName] = {
                    file: {}
                };
            }

            return result;
        }

        /**
         * Get constraints for form
         */
        getConstraints() {
        }

        /**
         * Is for data valid
         *
         * @returns {boolean}
         */
        isValid() {
            const constraints = $.extend(this.getDefaultConstraints(), this.getConstraints());
            const errors = validate(this.$form, constraints, this.optionsValidate);

            this.clearErrors();

            if (errors) {
                this.renderErrors(errors)
            }

            return !errors;
        }

        /**
         * Render errors
         *
         * @param error {object}
         */
        renderErrors(error) {
            $.each(error, (i, val) => {
                const $error = this.$form.find(`[data-error="${i}"]`);
                const $field = this.$form.find(`[name="${i}"]`);

                // validate.js set errors as arrays...
                $error.text(typeof val === 'object' ? val[0] : val).addClass('error-active');
                $field.addClass('flag-error');
            });

            if (this.$form.find('.error-active').length) {
                this.setSaveButtonEnabled(false);
            }
        }

        /**
         * Clear all errors
         */
        clearErrors() {
            this.$form.find('.error-text').removeClass('error-active').empty();
            this.$form.find('.flag-error').removeClass('flag-error');
            this.setSaveButtonEnabled(true);
        }

        /**
         * Disable save button
         * @param value {boolean}
         */
        setSaveButtonEnabled(value) {
            this.$form.find(this.submitBtn).prop('disabled', !value);
        }

        /**
         * Before submit form to server
         */
        beforeSubmit() {
            if (this.isValid()) {
                this.submit()
            }
        }

        /**
         * Submit form to server
         */
        submit() {
        }
    }

    window.FormValidation = FormValidation;
})(jQuery);
