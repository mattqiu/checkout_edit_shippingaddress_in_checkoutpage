<?php
namespace SR\Checkout\Api;

/**
 * Interface ShippingAddressManagementInterface
 * @api
 * @package SR\Checkout\Api
 */
interface ShippingAddressManagementInterface
{
    /**
     * @param int $cartId
     * @param \Magento\Checkout\Api\Data\ShippingInformationInterface $addressInformation
     * @return int Customer ID
     */
    public function saveAddress(
        $cartId,
        \Magento\Checkout\Api\Data\ShippingInformationInterface $addressInformation
    );
}
