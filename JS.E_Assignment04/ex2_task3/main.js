const names = ['Bert', 'SOOBIN', 'Anne', 'Rhymastic', 'Bùi Công Nam', 'Thơm', 'Thỏ', 'Donald Trump'];
const para = document.getElementById('para');

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chooseName(array) {
    const randomIndex = random(0, array.length - 1);
    return array[randomIndex];
}

para.textContent = chooseName(names);
