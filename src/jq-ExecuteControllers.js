/*
    $.ExecuteControllers
    =======================================
    Author          liamegan
    email           liam@wethecollective.com
    Created         2014-03-11 17:07:58
    namespace       jquery
    Requirements    jquery
    Description     This is a JQ plugin that goes through and finds all elements with a named controller and initialises it.
    Edited by       liamegan
    Edited          2014-06-10 11:17:20
    Version         0.5
*/
; 'use strict';

window.wtc || (window.wtc = {});

(function($)
{
  // Queue up anything requiring a controller
  $.fn.ExecuteControllers = function()
  {
    var els, instanciate, objreturn;
    // Find all elements that provide a controller name and are not yet initialised
    els = this.find('[data-controller]');
    // The function to instanciate the controller
    instanciate = function(data, controller, ns, $op)
    {
      if (typeof ns[controller] === 'function')
      {
        data.instance = new ns[controller]($op);
        data.initialised = 'yes';
        return data.instance;
      } else
      {
        throw new Error("The controller " + controller + " does not exist at namespace " + data.namespace);
      }
    };
    
    objreturn = $();
    
    // Loop through the found elements and find and initialise the required controller
    els.each(function()
    {
      var $op, controller, data, ns, _ns;
      $op = $(this);
      data = $op.data();
      
      // If we're already initialised, we don't want to do so again
      if (data.initialised)
      {
        return;
      }
      
      ns = data.namespace || (data.namespace = '');
      _ns = ns;
      controller = data.controller;
      
      // Derive the namespace from the string, delimited by dots
      ns = (function(address)
      {
        var baseAddress, i;
        baseAddress = window;
        for (i in address)
        {
          if (typeof baseAddress[address[i]] === "object")
          {
            baseAddress = baseAddress[address[i]];
          } else
          {
            return window;
          }
        }
        return baseAddress;
      })(ns.split('.'));
      
      objreturn = objreturn.add($op);
      
      // Check to see if the controller actually exists
      try
      {
        instanciate(data, controller, ns, $op);
      } catch (e)
      {
        console.warn("Error: " + e.message + ". For " + _ns + "." + controller + " ");
      }
      return $op.data().controller;
    });
    return objreturn;
  };
})(jQuery);