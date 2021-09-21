$(document).ready(function() {
    let oldHash = location.hash;
    let oldProdAttribute;
    
    //fires when a product quick-view button is selected
    prestashop.on('clickQuickView', 
        function(e){
            oldProdAttribute = e.dataset.idProductAttribute;
    });
    
    //fires when a product quantity is updated or a combination selected
    prestashop.on('updatedProduct',
        function(e) {
          //get the currently selected product combination info
          let currentProdAttribute = e.id_product_attribute;
          let currentHash = location.hash;
          
          //get quantity-wanted text field on page
          let quantityInput = $('#quantity_wanted');
          
          if (e && e.product_minimal_quantity) {
            //only continue if product combination has been changed
            //(otherwise this will be called every time the quantity input is updated)
            if(oldHash !== currentHash || (e.is_quick_view == true && oldProdAttribute != currentProdAttribute)) {                
                let minimalProductQuantity = parseInt(e.product_minimal_quantity, 10); 
                
                // @see http://www.virtuosoft.eu/code/bootstrap-touchspin/ about Bootstrap TouchSpin 
                
                //if the quantity input value hasn't already reset to the product minimum quantity
                if(quantityInput.val() != minimalProductQuantity) {        
                    setTimeout(function() { 
                        fixQty(quantityInput);
                    }, 1); //we need a slight delay otherwise the outcome is overriden by other Prestashop JS processes
                    
                    //the quick view mode needs an extra touchspin call to trigger a price update
                    if(e.is_quick_view) {
                        quantityInput.trigger("touchspin.startdownspin");
                        quantityInput.trigger("touchspin.stopspin");
                    }
                }
            }
            //update these to the current combination selection so it can compare again on the next function call
            oldHash = currentHash;
            oldProdAttribute = currentProdAttribute;
        }
    });    
    
    function fixQty(quantityInput) {
        var difference = quantityInput.val() - quantityInput.attr('min');
        //spin down until the quantity reaches the min value, where it should be
        for(var spins = difference; spins > 0; spins--) {
            quantityInput.trigger("touchspin.downonce");
            //for debugging:
            //console.log(quantityInput.val());
            //console.log("min: " + quantityInput.attr("min"));
        }
    }
}); 

