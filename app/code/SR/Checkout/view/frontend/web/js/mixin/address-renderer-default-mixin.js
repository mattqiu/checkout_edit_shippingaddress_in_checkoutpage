define([
    'jquery'
], function ($) {
    'use strict';

    return function (target) {
        return target.extend({
            editAddress: function () {
                this.assignAddress();
                this._super();
            },
            assignAddress: function () {
                var address = this.address();
                $("#shipping-new-address-form").find(':input').each(function() {
                    switch(this.name) {
                        case 'street[0]':
                            $(this).val(address.street[0]).change();
                            break;
                        case 'street[1]':
                            $(this).val(address.street[1]).change();
                            break;
                        case 'city':
                            $(this).val(address.city).change();
                            break;
                        case 'postcode':
                            $(this).val(address.postcode).change();
                            break;
                        case 'region':
                            $(this).val(address.region).change();
                            break;
                        case 'region_id':
                            $(this).val(address.regionId).change();
                            break;
                        case 'telephone':
                            $(this).val(address.telephone).change();
                            break;
                        case 'company':
                            $(this).val(address.company).change();
                            break;
                        case 'country_id':
                            $(this).val(address.countryId).change();
                            break;
                        case 'customer_address_id':
                            $(this).val(address.customerAddressId).change();
                            break;
                    }
                });
            }
        });
    }
});