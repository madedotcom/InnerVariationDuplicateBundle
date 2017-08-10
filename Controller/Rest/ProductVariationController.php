<?php

namespace Made\Bundle\InnerVariationDuplicateBundle\Controller\Rest;

use Pim\Bundle\InnerVariationBundle\Controller\ProductVariationController as BaseProductVariationController;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Class ProductVariationController
 * @package Made\Bundle\InnerVariationDuplicateBundle\Controller\Rest
 */
class ProductVariationController extends BaseProductVariationController
{
    /**
     * @param int $id
     * @return JsonResponse
     * @throws \Exception
     */
    public function duplicateVariationAction($id)
    {
        $product = $this->findProductOr404($id);
        $product->getIdentifier()->setData(null);
        $product->setId(null);
        $product->getValue('version')->setData(1);
        $channels = array_keys($this->userContext->getChannelChoicesWithUserChannel());
        $locales  = $this->userContext->getUserLocaleCodes();

        return new JsonResponse(
            $this->normalizer->normalize(
                $product,
                'internal_api',
                [
                    'locales'     => $locales,
                    'channels'    => $channels,
                    'filter_type' => 'pim.internal_api.product_value.view',
                ]
            )
        );
    }
}
