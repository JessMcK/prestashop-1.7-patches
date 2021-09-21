# Prestashop 1.7 "patches"
Various file "patches", tips, &amp; tricks that I've found for Prestashop 1.7. I'm not a professional Prestashop developer; these were simply a few fiddly things that I found while developing a client project. I've described them below and listed any (possibly temporary) fixes that I've found.

### Issue 1: Parent-child theme asset inheritance ###
Once a child theme is applied, it seems most of the js and css assets aren't carried over from the parent theme, even if `use_parent_assets` is set to `true` in the child theme's `config/theme.yml`. The best solution I've found is here:

https://www.prestashop.com/forums/topic/1031790-child-theme-doesnt-load-parent-assets/

### Issue 2: Product combinations
Hoo boy, once you add combinations in Prestashop 1.7, there's a few fiddly things that go wrong.

**Fix for: Quantity input field not updating when switching between combinations**

If Combination A has a minimum quantity (e.g., 0) lower than Combination B (which is set to 5, for example). When you switch from A &rarr; B, the product quantity input displays as 5. When you switch back, from B &rarr; A, the quantity input doesn't reset to 0, but stays on 5.

To correct this issue, follow these steps:
1) Download the `quantity-fixes.js` file.
2) Go to your Prestashop themes folder via FTP, and place the downloaded file in `[your_current_theme_name]/assets/js`. (If the `js` folder doesn't exist, create it there).
3) Open this file: `[your_current_theme_name]/config/theme.yml`.

If you have a section that says:
```
js:
    all:
```
followed by entries with an id, path, and probably a priority number, then you can add this on the line underneath the `all:`
```
- id: fixes
         path: assets/js/quantity-fixes.js
         priority: 350
         position: bottom
```
If you don't have the `js: all:` section, then paste this code into your theme.yml file:
```
js:
    all:
      - id: fixes
         path: assets/js/quantity-fixes.js
         priority: 350
         position: bottom
```

Hopefully this fixes the issue! There's a slight delay while the product prices refresh but it's minimal.

### Issue 3: 'Tax included' labels
Perhaps you're not able to get 'Tax Included' prices and/or labels to show up on your site, even when you have tax applied to a product in the Prestashop backend. Here's the fix:

1) In the Admin dashboard, go to `Shop Parameters → Customer Settings → Groups`.
2) Click `Edit` on each of the customer groups that need to see the tax prices, and change `Price display method` to `Tax included` (the actual text option may differ depending on the shop language and translations selected).
3) Download the `product-prices.tpl`.
5) Place the downloaded file in `[your_current_theme_name]/templates/catalog/_partials/`. (You may need to create these folders yourself if they don't already exist). 
6) If you ever want to revert to the old display, switch to `Tax excluded` in the Customer Groups, delete the `product-prices.tpl` that you added, and all should work. (OR, alternatively, you may need to open the `product-prices.tpl`, and paste in the code from the `product-prices-original-code.txt` that I've provided).
