
var targetDiv = document.getElementsByClassName('all-pages');

var nextButtons = document.querySelectorAll('.next_button');



var formationsCards = document.querySelectorAll('.card-input-element');

var inputFields = document.querySelectorAll('.input_element_text');


var contactForm = document.querySelector('#all-pages');
    



const helper = {
    getDelta(event) {
        if(event.wheelDelta) {
            return event.wheelDelta;
        } else {
            return -event.detail;
        }
    },
    throttle(method, delay, context) {
        let inThrottle = false;
        return function() {
            if (!inThrottle) {
                inThrottle = true;
                method.apply(context, arguments);
                setTimeout(() => {
                    inThrottle = false;
                }, delay);
            }
        }
    },
    debounce(method, delay, context) {
        let inDebounce;
        return function() {
            clearTimeout(method.inDebounce);
            inDebounce = setTimeout(() => {
                method.apply(context, arguments);
            }, delay);
        }
    }
}
class ScrollPages {
    constructor(currentPageNumber, totalPageNumber, pages){
        this.currentPageNumber = currentPageNumber;
        this.totalPageNumber = totalPageNumber;
        this.pages = pages;
        this.viewHeight = document.documentElement.clientHeight;
    }
    mouseScroll(event) {
        let delta = helper.getDelta(event);
        if (delta < 0) {
            this.scrollDown();
        } else {
            this.scrollUp();
        }
    }
    scrollDown() {
        if (this.currentPageNumber !== this.totalPageNumber){
            this.pages.style.top = (-this.viewHeight * this.currentPageNumber) + 'px';
            this.currentPageNumber++;
            
            this.textFadeInOut();
        }
    }
    scrollUp() {
        if (this.currentPageNumber !== 1) {
            this.pages.style.top = (-this.viewHeight * (this.currentPageNumber - 2)) + 'px';
            this.currentPageNumber--;
            
            this.textFadeInOut();
        }
    }
    scrollTo(targetPageNumber) {
        while (this.currentPageNumber !== targetPageNumber) {
            if (this.currentPageNumber > targetPageNumber) {
                this.scrollUp();
            } else {
                this.scrollDown();
            }
        }
    }
    

    
    
    resize() {
        this.viewHeight = document.documentElement.clientHeight;
        this.pages.style.height = this.viewHeight + 'px';
        this.pages.style.top = -this.viewHeight * (this.currentPageNumber-1) + 'px';
    }
    textFadeInOut() {
        const containersDom = document.getElementsByClassName('page');
        let textContainers = Array.prototype.slice.call(containersDom);
        textContainers.forEach((e) => {
            e.classList.remove('in-sight');
        });
        let textContainerInSight = textContainers[this.currentPageNumber-1];
        textContainerInSight.classList.add('in-sight')
    }
    init() {
        if (window.location.hash === '#select-formation') { //https://stackoverflow.com/questions/33758025/link-with-href-and-call-function-on-new-page
            this.scrollTo(2);
        }
        let handleMouseWheel = helper.throttle(this.mouseScroll, 800, this);
        let handleResize = helper.debounce(this.resize, 800, this);
        this.pages.style.height = this.viewHeight + 'px';
        
        this.textFadeInOut();
        if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
            document.addEventListener('wheel', handleMouseWheel);
        } else {
            document.addEventListener('DOMMouseScroll', handleMouseWheel);
        }
        document.addEventListener('touchstart', (event) => {
            this.startY = event.touches[0].pageY;
        });
        document.addEventListener('touchend', (event) => {
            let endY = event.changedTouches[0].pageY;
            if (this.startY - endY < 0) {
                this.scrollUp();
            }
            if (this.startY - endY > 0) {
                this.scrollDown();
            }
        });
        document.addEventListener('touchmove', (event) => {
            event.preventDefault();
        });
        window.addEventListener('resize', handleResize);

        
         nextButtons.forEach(btn => {

            btn.addEventListener('click', event => {
                this.scrollDown( );
                    
                const data = Object.fromEntries(new FormData(contactForm).entries());
                console.log(data);
            });
         
    

         });

         
         formationsCards.forEach(card => {

            card.addEventListener('click', event => {
                setTimeout(() => {
                    this.scrollDown( );
                }, 100);
            });
         
         });

         inputFields.forEach(inputField => {
             inputField.addEventListener('keypress', event => {
                 // If the user presses the "Enter" key on the keyboard
                 //event.preventDefault();
                 if (event.key === "Enter") {
                    //alert("You pressed the Enter key!");
                    this.scrollDown();
                }
                });
                
                
             });


    
        }
}

document.addEventListener('DOMContentLoaded', function() {
    var s = new ScrollPages(1,9,document.getElementById('all-pages'));
    s.init();
})

