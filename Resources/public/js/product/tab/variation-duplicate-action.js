/* global define */
define(['underscore',
        'oro/mediator',
        'oro/datagrid/model-action'],
    function(_, mediator, ModelAction) {
        'use strict';

        /**
         * Duplicate variation actionsss
         *
         * @export  oro/datagrid/duplicate-action
         * @class   oro.datagrid.DuplicateAction
         * @extends oro.datagrid.ModelAction
         */
        return ModelAction.extend({

            /**
             * Edit model
             */
            execute: function() {
                mediator.trigger('datagrid:inner_variation:duplicate', { 'productId' : this.model.get('id') });
            }

        });
    }
);
