'use strict';
/**
 * Variation tab extension
 *
 * @author    Stephane Chapeau <stephane.chapeau@akeneo.com>
 * @copyright 2015 Akeneo SAS (http://www.akeneo.com)
 */
define(
    [
        'jquery',
        'underscore',
        'backbone',
        'pim/form',
        'oro/mediator',
        'pim/fetcher-registry',
        'pim/form-builder',
        'pim/dialog',
        'text!piminnervariation/template/product/tab/variation',
        'pim/field-manager'
    ],
    function ($, _, Backbone, BaseForm, mediator, fetcherRegistry, FormBuilder, Dialog, formTemplate, FieldManager) {
        return BaseForm.extend({
            template: _.template(formTemplate),
            className: 'tab-pane active',
            id: 'product-variation',
            events: {
            },
            initialize: function () {
                BaseForm.prototype.initialize.apply(this, arguments);
            },
            configure: function () {

                this.trigger('tab:register', {
                    code: this.code,
                    label: _.__('pim_inner_variation.form.product.tab.variation.title'),
                    isVisible: this.isVisible.bind(this)
                });

                mediator.off('datagrid:inner_variation:edit');
                mediator.off('datagrid:inner_variation:create');

                this.listenTo(mediator, 'datagrid:inner_variation:edit', this.editVariation);
                this.listenTo(mediator, 'datagrid:inner_variation:create', this.createVariation);
                this.listenTo(mediator, 'datagrid:inner_variation:duplicate', this.duplicateVariation);

                return BaseForm.prototype.configure.apply(this, arguments);
            },
            render: function () {
                this.$el.empty().append(this.template());

                return this.renderExtensions();
            },
            editVariation: function (event) {
                var $formContainer = this.$('.variation-edit-form');
                FieldManager.fields = {};

                FormBuilder.build('pim-innervariation-variation-form')
                    .done(function (form) {

                        var modal = new Backbone.BootstrapModal({
                            modalOptions: {
                                backdrop: 'static',
                                keyboard: false
                            },
                            allowCancel: true,
                            okCloses: false,
                            title: _.__('pim_inner_variation.form.product.variation.edit.title'),
                            content: ''
                        });

                        modal.open();
                        modal.$el.addClass('modal-variation');
                        modal.$el.addClass('product-edit-form');

                        var productVariation = fetcherRegistry.getFetcher('productVariation');

                        fetcherRegistry.getFetcher('productVariation').clear();
                        fetcherRegistry.getFetcher('productVariation').fetch(event.productId).done(function (product) {
                            form.setData(product, {silent: true});
                            $formContainer.empty().append(form.$el);

                            form.setElement(modal.$('.modal-body')).render();
                        });
                    }).fail(function(response, textStatus, errorThrown) {
                        switch (response.status) {
                            case 400:
                            case 403:
                                Dialog.alert(_.__('pim_enrich.alert.not_allowed'));
                                break;
                        }
                    });

            },
            createVariation: function (event, fetcherFunction) {
                var $formContainer = this.$('.variation-edit-form');
                FieldManager.fields = {};

                FormBuilder.build('pim-innervariation-variation-form')
                    .done(function (form) {

                        var modal = new Backbone.BootstrapModal({
                            modalOptions: {
                                backdrop: 'static',
                                keyboard: false
                            },
                            allowCancel: true,
                            okCloses: false,
                            title: _.__('pim_inner_variation.form.product.variation.create.title'),
                            content: ''
                        });

                        modal.open();
                        modal.$el.addClass('modal-variation');
                        modal.$el.addClass('product-edit-form');

                        var productVariation = fetcherRegistry.getFetcher('productVariation');

                        fetcherRegistry.getFetcher('productVariation').clear();
                        fetcherRegistry.getFetcher('productVariation').createVariation(event.productId).done(function (product) {
                            form.setData(product, {silent: true});
                            $formContainer.empty().append(form.$el);

                            form.setElement(modal.$('.modal-body')).render();
                        });
                    }).fail(function(response, textStatus, errorThrown) {
                        switch (response.status) {
                            case 400:
                            case 403:
                                Dialog.alert(_.__('pim_enrich.alert.not_allowed'));
                                break;
                        }
                    });

            },
            duplicateVariation: function (event, fetcherFunction) {
                var $formContainer = this.$('.variation-edit-form');
                FieldManager.fields = {};

                FormBuilder.build('pim-innervariation-variation-form')
                    .done(function (form) {

                        var modal = new Backbone.BootstrapModal({
                            modalOptions: {
                                backdrop: 'static',
                                keyboard: false
                            },
                            allowCancel: true,
                            okCloses: false,
                            title: _.__('pim_inner_variation.form.product.variation.create.title'),
                            content: ''
                        });

                        modal.open();
                        modal.$el.addClass('modal-variation');
                        modal.$el.addClass('product-edit-form');

                        var productVariation = fetcherRegistry.getFetcher('productVariation');

                        fetcherRegistry.getFetcher('productVariation').clear();
                        fetcherRegistry.getFetcher('productVariation').duplicateVariation(event.productId).done(function (product) {
                            form.setData(product, {silent: true});
                            $formContainer.empty().append(form.$el);

                            form.setElement(modal.$('.modal-body')).render();
                        });
                    }).fail(function(response, textStatus, errorThrown) {
                        switch (response.status) {
                            case 400:
                            case 403:
                                Dialog.alert(_.__('pim_enrich.alert.not_allowed'));
                                break;
                        }
                    });

            },
            /**
             * Check if this extension is visible
             *
             * @returns {boolean}
             */
            isVisible: function () {
                return this.getFormData().meta.is_inner_variation_parent == true;
            }
        });
    }
);
