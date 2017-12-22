/* function Action(type, target) {
    const FILL = 'fill';
    const ERASE = 'erase';
    this.type = type;
    this.target = target;
    ...
} Not now, maybe next decade */

window.onload = function () {
    var hIn, wIn, submitBtn, colorBtn, table, isLMBDwon, cells;
    [wIn, hIn] = document.querySelectorAll('.config input');
    colorBtn = document.querySelector('input[type="color"]');
    submitBtn = document.getElementsByClassName('btn')[0];
    table = document.getElementsByTagName('table')[0];
    isLMBDwon = false;
    currentColor = colorBtn.value;
    cells = []; /* this is - temporarly - being used in clearing cells, it was
     supposed to be used as a part of another feature (undo)*/

    function highlight(toggle) {
        if (toggle)
            this.parentElement.style.boxShadow = 'inset 0px -1px 0px 0px #28B78D';
        else
            this.parentElement.style.boxShadow = 'none';
    }

    function warnWrongInput() {
        let pattern = /^\d{0,3}$/;
        if(pattern.test(this.value))
            this.style.color = '#FFFFFF';
        else
             this.style.color = '#CC0000';
    }

    function makeGrid(rows, cols) {
        let tbody = document.createElement('tbody');
        for(let i = 0; i<rows; i++) {
            let tr = document.createElement('tr');
            for(let j = 0; j<cols; j++)
                tr.appendChild(document.createElement('td'));
            tbody.appendChild(tr);
        }
        return tbody;
    }

    function destructGrid(table) {
        while(table.firstChild) { //Should only go for 1 iteration (or two if there's a Text node)
            table.removeChild(table.firstChild);
        }
    }

    [hIn, wIn].forEach(function (elm) {
        elm.addEventListener('focus', function () {
            highlight.call(elm, true);
        });
        elm.addEventListener('blur', function () {
            highlight.call(elm, false);
        });
        elm.addEventListener('input', function () {
            warnWrongInput.call(elm);
        })

    });

    submitBtn.addEventListener('click', function () {
        let width = parseInt(wIn.value), height = parseInt(hIn.value);
        if(!isNaN(width) && !isNaN(height)) {
            table.appendChild(makeGrid(height, width));
            table.classList.add('animate');
            document.getElementsByClassName('toolbar')[0].style.display = 'block';
            this.style.display = 'none';
            hIn.disabled = true;
            wIn.disabled = true;
            setTimeout(function() {
                table.classList.remove('animate');
            }, 3000); //remove the class to all animation restart later
        }
    }, false);

    table.addEventListener('click', function (e) {
        e.target.style.backgroundColor = colorBtn.value;
        cells.push(e.target);
    });

    table.addEventListener('mousedown', function (e) {
        e.preventDefault(); //disable the 'drag n' drop' effect in browser
        isLMBDwon = e.which === 1; //1 is the code for LMB
    });

    table.addEventListener('mouseup', function() {
        isLMBDwon = false;
    });

    table.addEventListener('mouseleave', function() {
        isLMBDwon = false;
    });

    table.addEventListener('mousemove', function (e) {
       if(isLMBDwon) {
           e.target.style.backgroundColor = colorBtn.value;
           cells.push(e.target);
       }
    });

    document.getElementById('clear').addEventListener('click' , function () {
        cells.forEach(function (td) {
            td.style.backgroundColor = '#f5f5f5';
        })
    });

    document.getElementById('new').addEventListener('click', function () {
        destructGrid(table);
        this.parentElement.style.display = 'none';
        hIn.disabled = false;
        wIn.disabled = false;
        submitBtn.style.display = 'block';

    });
}