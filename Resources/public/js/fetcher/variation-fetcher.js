'use strict';
/**
 * Variation fetcher
 *
 * @author    Stephane Chapeau <stephane.chapeau@akeneo.com>
 * @copyright 2015 Akeneo SAS (http://www.akeneo.com)
 */
define(['underscore', 'jquery', 'pim/base-fetcher', 'pim/product-manager'], function (_, $, BaseFetcher, ProductManager) {
    return BaseFetcher.extend({

        /**
         * Create an variation based on its parent product id
         *
         * @param String id
         *
         * @return Promise
         */
        createVariation: function (id) {
            if (!(id in this.entityPromises)) {
                var deferred = $.Deferred();

                if (this.options.urls.create) {
                    $.getJSON(
                        Routing.generate(this.options.urls.create, { id: id })
                    ).then(_.identity).done(function (entity) {
                            ProductManager.generateMissing(entity);
                            deferred.resolve(entity);
                        }).fail(function () {
                            console.log(arguments);

                            return deferred.reject();
                        });
                } else {
                    this.fetchAll().done(function (entities) {
                        var entity = _.findWhere(entities, {code: id});
                        if (entity) {
                            deferred.resolve(entity);
                        } else {
                            deferred.reject();
                        }
                    });
                }

                this.entityPromises[id] = deferred.promise();
            }

            return this.entityPromises[id];
        },
        duplicateVariation: function (id) {
            if (!(id in this.entityPromises)) {
                var deferred = $.Deferred();

                if (this.options.urls.duplicate) {
                    $.getJSON(
                        Routing.generate(this.options.urls.duplicate, { id: id })
                    ).then(_.identity).done(function (entity) {
                            ProductManager.generateMissing(entity);
                            deferred.resolve(entity);
                        }).fail(function () {
                            return deferred.reject();
                        });
                } else {
                    this.fetchAll().done(function (entities) {
                        var entity = _.findWhere(entities, {code: id});
                        if (entity) {
                            deferred.resolve(entity);
                        } else {
                            deferred.reject();
                        }
                    });
                }

                this.entityPromises[id] = deferred.promise();
            }

            return this.entityPromises[id];
        },
        /**
         * Fetch an element based on its id
         *
         * @param String id
         *
         * @return Promise
         */
        fetch: function (id) {
            if (!(id in this.entityPromises)) {
                var deferred = $.Deferred();

                if (this.options.urls.get) {
                    $.getJSON(
                        Routing.generate(this.options.urls.get, { id: id })
                    ).then(_.identity).done(function (entity) {
                            ProductManager.generateMissing(entity);
                            deferred.resolve(entity);
                        }).fail(function () {
                            return deferred.reject();
                        });
                } else {
                    this.fetchAll().done(function (entities) {
                        var entity = _.findWhere(entities, {code: id});
                        if (entity) {
                            deferred.resolve(entity);
                        } else {
                            deferred.reject();
                        }
                    });
                }

                this.entityPromises[id] = deferred.promise();
            }

            return this.entityPromises[id];
        }
    });
});
