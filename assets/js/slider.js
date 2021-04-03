const carusel = document.querySelector('.card__carusel')
const container = document.querySelector('.card');

const caruselItems = document.querySelectorAll('.card__carusel__item');
const pointers = document.querySelectorAll('.card__pointer__item');
const pointerParrent = document.querySelector('.card__pointer')


const ItemWidth = caruselItems[0].clientWidth + 10; // + margin
let position = 0;

///////////////// swipe

let x1 = null,
    x2 = null,
    swipe = null,
    isSwipe = false
needToSwipe = ItemWidth / 3;

container.addEventListener('touchstart', event => {
    x1 = event.changedTouches[0].clientX;
})

container.addEventListener('touchmove', event => {

    x2 = event.changedTouches[0].clientX;
    swipe = x2 - x1;
    slideCard(position + swipe);
    if (swipe > needToSwipe || swipe * -1 > needToSwipe) {
        isSwipe = true;
    } else {
        isSwipe = false;
    }
});

container.addEventListener('touchend', () => {
    if (!isSwipe) {
        slideCard(position);

    } else if (swipe > needToSwipe && isSwipe) {
        isSwipe = !isSwipe;
        leftSwipeApp();

    } else if (Math.abs(swipe) > needToSwipe && isSwipe) {
        isSwipe = !isSwipe;
        rightSwipeApp();
    }
});




pointerParrent.addEventListener('click', event => {
    if (event.target) {
        if (event.target == pointers[0]) {
            position = 0;
        } else if (event.target == pointers[1]) {
            position = ItemWidth * -1;
        } else if (event.target == pointers[2]) {
            position = ItemWidth * -2;
        }
        toogleClass(position)
        slideCard(position);
    }

})



/////////////////////////// functions


function rightSwipeApp() {

    position -= ItemWidth;
    if (position <= (caruselItems.length * ItemWidth) * -1) position = 0;
    toogleClass(position)
    slideCard(position);

}

function leftSwipeApp() {
    position += ItemWidth;
    if (position > 0) position = ((caruselItems.length - 1) * ItemWidth) * -1;
    toogleClass(position)
    slideCard(position);

}

function slideCard(pos) {
    carusel.style.transform = `translateX(${pos}px)`;
};

function toogleClass(pos) {

    let activeItem;
    if (pos == 0) {
        activeItem = 0
    } else if (pos == ItemWidth * -1) {
        activeItem = 1;
    } else {
        activeItem = 2;
    }


    caruselItems.forEach(item => {
        item.classList.remove('active')
    });
    pointers.forEach(item => {
        item.classList.remove('active')
    });

    caruselItems[activeItem].classList.add('active');
    pointers[activeItem].classList.add('active');
}