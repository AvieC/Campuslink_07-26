const names = ['Bert', 'SOOBIN', 'Anne', 'Rhymastic', 'Bùi Công Nam', 'Thơm', 'Thỏ', 'Donald Trump'];
const para = document.getElementById('para');

function chooseName() {
    const randomIndex = Math.floor(Math.random() * names.length);
    para.textContent = names[randomIndex];
}

chooseName();
