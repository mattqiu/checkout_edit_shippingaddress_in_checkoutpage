define(
    [
        'jquery',
        'ko',
        'Magento_Checkout/js/model/quote',
        'Magento_Checkout/js/action/select-shipping-method',
        'Magento_Checkout/js/checkout-data',
        'Magento_Customer/js/model/address-list',
        'Magento_Checkout/js/model/url-builder',
        'mage/storage',
        'Magento_Checkout/js/model/error-processor',
        'Magento_Ui/js/model/messageList',
        'Magento_Checkout/js/model/address-converter',
        'mage/utils/objects'
    ], function (
        $,
        ko,
        quote,
        selectShippingAddress,
        checkoutData,
        addressList,
        urlBuilder,
        storage,
        errorProcessor,
        messageList,
        addressConverter,
        mageUtils
    ) {
        'use strict';

        return function (target) {
            return target.extend({
                addressSaveState: ko.observable(0),
                /**
                 * Show address form popup
                 */
                showFormPopUp: function () {
                    $("#shipping-new-address-form").find(':input').each(function() {
                        $(this).val('').change();
                    });

                    this._super();
                },
                /**
                 * Save new shipping address
                 */
                saveNewAddress: function () {
                    var addressData;
                    var self = this;
                    this.source.set('params.invalid', false);
                    this.triggerShippingDataValidateEvent();

                    if (!this.source.get('params.invalid')) {
                        addressData = this.source.get('shippingAddress');
                        if (mageUtils.isObject(addressData.street)) {
                            addressData.street = addressConverter.objectToArray(addressData.street);
                        }
                        var customerAddressId = 0;
                        if (addressData.customer_address_id != undefined) {
                            customerAddressId = Number(addressData.customer_address_id);
                        }

                        if (customerAddressId > 0) {
                            var newAddressList = ko.observableArray();
                            addressList().some(function(currentAddress) {
                                if (currentAddress.customerAddressId == addressData.customer_address_id) {
                                    var finalAddress = Object.assign({}, currentAddress, addressData);
                                    self.updateCustomerAddress(finalAddress);
                                    if (self.addressSaveState() != 2) {
                                        selectShippingAddress(finalAddress);
                                        newAddressList.push(finalAddress);
                                    }
                                } else {
                                    newAddressList.push(currentAddress);
                                }
                                return false;
                            });

                            if (self.addressSaveState() != 2) {
                                addressList.removeAll();

                                newAddressList().some(function(currentAddress) {
                                    addressList.push(currentAddress);

                                    return false;
                                });
                            }


                            this.getPopUp().closeModal();
                            return;
                        }

                        this._super();
                    }
                },
                updateCustomerAddress: function (shippingAddress) {
                    var params = {
                        cartId: quote.getQuoteId()
                    };
                    var payload = {
                        addressInformation: {
                            shipping_address: shippingAddress
                        }
                    };
                    var self = this;
                    return storage.post(
                        urlBuilder.createUrl('/carts/mine/save-shipping-address', params),
                        JSON.stringify(payload)
                    ).done(function(response) {
                        console.log(response);
                    }).fail(function(response) {
                        self.addressSaveState(2);
                        errorProcessor.process(response, messageList);
                    });
                }
            });
        }
    }
);