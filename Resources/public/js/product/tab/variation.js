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
        'piminnervariation/js/product/tab/variation',
        'oro/mediator',
        'pim/fetcher-registry',
        'pim/form-builder',
        'pim/dialog',
        'text!piminnervariation/template/product/tab/variation',
        'pim/field-manager'
    ],
    function ($, _, Backbone, BaseForm, mediator, fetcherRegistry, FormBuilder, Dialog, formTemplate, FieldManager) {
        return BaseForm.extend({
            configure: function () {
                mediator.off('datagrid:inner_variation:edit');
                mediator.off('datagrid:inner_variation:create');
                mediator.off('datagrid:inner_variation:duplicate');

                this.listenTo(mediator, 'datagrid:inner_variation:edit', this.editVariation);
                this.listenTo(mediator, 'datagrid:inner_variation:create', this.createVariation);
                this.listenTo(mediator, 'datagrid:inner_variation:duplicate', this.duplicateVariation);

                return BaseForm.prototype.configure.apply(this, arguments);
            },
            duplicateVariation: function (event, fetcherFunction) {
                var $formContainer = this.$('.variation-edit-form');
                FieldManager.fields = {};

                FormBuilder.build('pim-innervariation-variation-form')
                    .done(function (form) {
                        var modal = new Backbone.BootstrapModal({
                            className: 'modal modal-large modal-full modal-variation',
                            modalOptions: {
                                backdrop: 'static',
                                keyboard: false
                            },
                            allowCancel: true,
                            okCloses: false,
                            title: _.__('pim_inner_variation.form.product.variation.create.title'),
                            content: '',
                            template: _.template('')
                        });

                        modal.open();
                        modal.$el.addClass('product-edit-form');

                        $('#flash-messages').addClass('flash-messages-variations');
                        modal.on('cancel', function () {
                            $('#flash-messages').removeClass('flash-messages-variations');
                        });

                        var productVariation = fetcherRegistry.getFetcher('productVariation');

                        fetcherRegistry.getFetcher('productVariation').clear();
                        fetcherRegistry.getFetcher('productVariation').duplicateVariation(event.productId).done(function (product) {
                            form.setData(product, {silent: true});
                            $formContainer.empty().append(form.$el);

                            form.setElement(modal.$el).render();
                        });

                        form.on('close_modal', function () {
                            $('#flash-messages').removeClass('flash-messages-variations');
                            modal.close();
                            modal.remove();
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
        });
    }
);
