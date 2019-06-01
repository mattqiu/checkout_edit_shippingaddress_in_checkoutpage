var config = {
    config: {
        mixins: {
            'Magento_Customer/js/model/customer/address': {
                'SR_Checkout/js/mixin/customer-address-mixin': true
            },
            'Magento_Checkout/js/view/shipping-address/address-renderer/default': {
                'SR_Checkout/js/mixin/address-renderer-default-mixin': true
            },
            'Magento_Checkout/js/view/shipping': {
                'SR_Checkout/js/mixin/shipping-mixin': true
            }
        }
    }
};