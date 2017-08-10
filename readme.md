# InnerVariationDuplicateBundle

Provides an easy way to duplicate an inner variation product in PIM



## Requirements

| InnerVariationDuplicateBundle   | Akeneo PIM CE or EE |
|:----------------------:|:----------------------------:|
| v1.0                   | <v1.7.*                      |
| v2.*                   | v1.7.*                      |



## Installation
Update repositories in composer.json
```
"repositories": [
    ...
    {
        "type": "git",
        "url": "https://github.com/madedotcom/InnerVariationDuplicateBundle.git"
    }
]
```

Require the bundle with composer
```bash
composer require "madedotcom/inner-variation-duplicate-bundle:^2.0"
```

Then enable the bundle in the `app/AppKernel.php` file, in the `registerBundles` method:
```php
$bundles[] = new Made\Bundle\InnerVariationDuplicateBundle\MadeInnerVariationDuplicateBundle();    
```

Last step, add the following lines in your `app/config/routing.yml` :
```yml
made_inner_variation_duplicate:
    resource: "@MadeInnerVariationDuplicateBundle/Resources/config/routing/inner_variation_type.yml"
    prefix: /variation
```

Now, let's clean your cache:
```bash
rm -rf app/cache/*
```
