//============================= Scroll Up ===================//

function scrollUp(){
    const scrollup = document.getElementById('scroll-up');
    if(this.scrollY >= 560) {
        scrollup.classList.add('show-scroll');
    }
    else {
        scrollup.classList.remove('show-scroll');
    }
    }
    
    window.addEventListener('scroll', scrollUp)
    
    //================================================================ CARD =================//
    function factor(elemA,elemB, prop) {
        //This method returns a DOMRect object with eight properties:
        const sizeA = elemA.getBoundingClientRect()[prop];
        const sizeB = elemB.getBoundingClientRect()[prop];
        console.log(sizeB/sizeA)
        return (sizeB / sizeA)
    }
    const height = (elem) => {
        return elem.getBoundingClientRect().height
    }
    
    const distance = (elemA, elemB, prop) => {
        const sizeA = elemA.getBoundingClientRect()[prop];
        const sizeB = elemB.getBoundingClientRect()[prop];
        return (sizeB - sizeA)
    }
    
    document.querySelectorAll('.card').forEach(i=>{
        const head = i.querySelector('.card__head')
        const image = i.querySelector('.card__image')
        const author = i.querySelector('.card__author')
        const body = i.querySelector('.card__body')
        const foot = i.querySelector('.card__foot')
    
        console.log(head.getBoundingClientRect())
    
        //using event handlers instead of event listeners
        i.onmouseenter = () => {
            console.log('mouse enter')
            i.classList.add('hover') //text white color & bg blue
            //we haven't added yet but we will get that in a second
    
            //now the bg scale
            const imageScale = 1 + factor(head, body, 'height')
            image.style.transform = `scale(${imageScale})`;
    
            //body moving up
            const bodyDistance = height(foot) * -1
            body.style.transform = `translateY(${bodyDistance}px)`
    
            //head mobing up
            const authorDistance = distance(head, author, 'height') 
            author.style.transform = `translateY(${authorDistance}px)`;
        }
        i.onmouseleave = () => {
            console.log('mouse leave')
            i.classList.remove('hover');
            //re-start the transform property 
            image.style.transform = 'none';
            body.style.transform = 'none';
            author.style.transform = 'none';
        }
    })
    
    $.fn.commentCards = function(){
    
        return this.each(function(){
      
          var $this = $(this),
              $cards = $this.find('.card'),
              $current = $cards.filter('.card--current'),
              $next;
      
          $cards.on('click',function(){
            if ( !$current.is(this) ) {
              $cards.removeClass('card--current card--out card--next');
              $current.addClass('card--out');
              $current = $(this).addClass('card--current');
              $next = $current.next();
              $next = $next.length ? $next : $cards.first();
              $next.addClass('card--next');
            }
          });
      
          if ( !$current.length ) {
            $current = $cards.last();
            $cards.first().trigger('click');
          }
      
          $this.addClass('cards--active');
      
        })
      
      };
      
      $('.cards').commentCards();
    
      //============================= TypeWriter Effect ===================//
    new Typewriter('#typewriter', {
        strings: ['Feliz 5to San Valentín <span class="span">Mi Amor </span> <i class="fas fa-heart"></i>'],
        autoStart: true,
        loop: true,
        cursor: "|"
      });








      (function ($) {
        $.fn.countTo = function (options) {
            options = options || {};
            
            return $(this).each(function () {
                // set options for current element
                var settings = $.extend({}, $.fn.countTo.defaults, {
                    from:            $(this).data('from'),
                    to:              $(this).data('to'),
                    speed:           $(this).data('speed'),
                    refreshInterval: $(this).data('refresh-interval'),
                    decimals:        $(this).data('decimals')
                }, options);
                
                // how many times to update the value, and how much to increment the value on each update
                var loops = Math.ceil(settings.speed / settings.refreshInterval),
                    increment = (settings.to - settings.from) / loops;
                
                // references & variables that will change with each update
                var self = this,
                    $self = $(this),
                    loopCount = 0,
                    value = settings.from,
                    data = $self.data('countTo') || {};
                
                $self.data('countTo', data);
                
                // if an existing interval can be found, clear it first
                if (data.interval) {
                    clearInterval(data.interval);
                }
                data.interval = setInterval(updateTimer, settings.refreshInterval);
                
                // initialize the element with the starting value
                render(value);
                
                function updateTimer() {
                    value += increment;
                    loopCount++;
                    
                    render(value);
                    
                    if (typeof(settings.onUpdate) == 'function') {
                        settings.onUpdate.call(self, value);
                    }
                    
                    if (loopCount >= loops) {
                        // remove the interval
                        $self.removeData('countTo');
                        clearInterval(data.interval);
                        value = settings.to;
                        
                        if (typeof(settings.onComplete) == 'function') {
                            settings.onComplete.call(self, value);
                        }
                    }
                }
                
                function render(value) {
                    var formattedValue = settings.formatter.call(self, value, settings);
                    $self.html(formattedValue);
                }
            });
        };
        
        $.fn.countTo.defaults = {
            from: 0,               // the number the element should start at
            to: 0,                 // the number the element should end at
            speed: 1000,           // how long it should take to count between the target numbers
            refreshInterval: 100,  // how often the element should be updated
            decimals: 0,           // the number of decimal places to show
            formatter: formatter,  // handler for formatting the value before rendering
            onUpdate: null,        // callback method for every time the element is updated
            onComplete: null       // callback method for when the element finishes updating
        };
        
        function formatter(value, settings) {
            return value.toFixed(settings.decimals);
        }
    }(jQuery));
    
    jQuery(function ($) {
      // custom formatting example
      $('.count-number').data('countToOptions', {
        formatter: function (value, options) {
          return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
      });
      
      // start all the timers
      $('.timer').each(count);  
      
      function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
      }
    });



    //============================= MODAL ===================//

function showModal(titleHtml, contentHtml, buttons) {
    const modal = document.createElement("div");
  
    modal.classList.add("modal");
    modal.innerHTML = `
          <div class="modal__inner">
              <div class="modal__top">
                  <div class="modal__title"><strong>${titleHtml}</strong></div>
                  
              </div>
              <br>
              <div class="modal__content">${contentHtml}</div>
              <div class="modal__bottom"></div>
          </div>
      `;
  
    for (const button of buttons) {
      const element = document.createElement("button");
  
      element.setAttribute("type", "button");
      element.classList.add("modal__button");
      element.textContent = button.label;
      element.addEventListener("click", () => {
        if (button.triggerClose) {
          document.body.removeChild(modal);
        }
  
        button.onClick(modal);
      });
  
      modal.querySelector(".modal__bottom").appendChild(element);
    }

    modal.addEventListener("click", ()=> {
        document.body.removeChild(modal);
    })

    modal.querySelector(".modal__button").addEventListener("click", () => {
        document.body.removeChild(modal);
      });
  
    document.body.appendChild(modal);
  }
  
  showModal("Bienvenida Mi Amor : ", "<p><center>¿Quieres Ser Mi San Valentín?</center> </p>", [
    {
      label: "¡SHI KIERO!",
      onClick: (modal) => {

      },
      triggerClose: false
    }
  ]);