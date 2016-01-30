var Game = (function () {
    "use strict"
    var mat;
    var score;
    var best = 0;
    var shown2048dialog;
    var overMain;
    var wonMain;

    function copyMat(m2) {
        var m1 = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                m1[i][j] = m2[i][j];
            }
        }
        return m1;
    }

    function isSame(m1, m2) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (m1[i][j] !== m2[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }

    function shiftLeft() {
        var i, j, pos;
        for (i = 0; i < 4; i++) {
            pos = 0;
            j = 0;
            while (j < 4) {
                if (mat[i][j] !== 0) {
                    mat[i][pos] = mat[i][j];
                    if (j !== pos) {
                        mat[i][j] = 0;
                    }
                    pos++;
                    j++;
                } else {
                    j++;
                }
            }
        }
    }

    function solveLeft(m, checking) {
        var i, j, first;
        var flag = false;
        for (i = 0; i < 4; i++) {
            first = 0;
            while (true) {
                while (first < 3 && m[i][first] === 0) {
                    first++;
                }
                if (first >= 3) {
                    break;
                } else {
                    if (m[i][first] === m[i][first + 1]) {
                        flag = true;
                        m[i][first] *= 2;
                        if (!checking) {
                            score += m[i][first];
                        }
                        m[i][first + 1] = 0;
                        first += 2;
                    } else {
                        first++;
                    }
                }
            }
        }
        return flag;
    }

    function moveLeft() {
        var prev = copyMat(mat);
        shiftLeft();
        solveLeft(mat, false);
        shiftLeft();
        return isSame(prev, mat);
    }

    function shiftRight() {
        var i, j, pos;
        for (i = 0; i < 4; i++) {
            pos = 3;
            j = 3;
            while (j > -1) {
                if (mat[i][j] !== 0) {
                    mat[i][pos] = mat[i][j];
                    if (j !== pos) {
                        mat[i][j] = 0;
                    }
                    pos--;
                    j--;
                } else {
                    j--;
                }
            }
        }
    }

    function solveRight(m, checking) {
        var i, j, first;
        var flag = false;
        for (i = 0; i < 4; i++) {
            first = 3;
            while (true) {
                while (first > 0 && m[i][first] === 0) {
                    first--;
                }
                if (first <= 0) {
                    break;
                } else {
                    if (m[i][first] === m[i][first - 1]) {
                        flag = true;
                        m[i][first] *= 2;
                        if (!checking) {
                            score += m[i][first];
                        }
                        m[i][first - 1] = 0;
                        first -= 2;
                    } else {
                        first--;
                    }
                }
            }
        }
        return flag;
    }

    function moveRight() {
        var prev = copyMat(mat);
        shiftRight();
        solveRight(mat, false);
        shiftRight();
        return isSame(prev, mat);
    }

    function shiftUp() {
        var i, j, pos;
        for (j = 0; j < 4; j++) {
            pos = 0;
            i = 0;
            while (i < 4) {
                if (mat[i][j] !== 0) {
                    mat[pos][j] = mat[i][j];
                    if (i !== pos) {
                        mat[i][j] = 0;
                    }
                    pos++;
                    i++;
                } else {
                    i++;
                }
            }
        }
    }

    function solveUp(m, checking) {
        var i, j, first;
        var flag = false;
        for (j = 0; j < 4; j++) {
            first = 0;
            while (true) {
                while (first < 3 && m[first][j] === 0) {
                    first++;
                }
                if (first >= 3) {
                    break;
                } else {
                    if (m[first][j] === m[first + 1][j]) {
                        flag = true;
                        m[first][j] *= 2;
                        if (!checking) {
                            score += m[first][j];
                        }
                        m[first + 1][j] = 0;
                        first += 2;
                    } else {
                        first++;
                    }
                }
            }
        }
        return flag;
    }

    function moveUp() {
        var prev = copyMat(mat);
        shiftUp();
        solveUp(mat, false);
        shiftUp();
        return isSame(prev, mat);
    }

    function shiftDown() {
        var i, j, pos;
        for (j = 0; j < 4; j++) {
            pos = 3;
            i = 3;
            while (i > -1) {
                if (mat[i][j] !== 0) {
                    mat[pos][j] = mat[i][j];
                    if (i !== pos) {
                        mat[i][j] = 0;
                    }
                    pos--;
                    i--;
                } else {
                    i--;
                }
            }
        }
    }

    function solveDown(m, checking) {
        var i, j, first;
        var flag = false;
        for (j = 0; j < 4; j++) {
            first = 3;
            while (true) {
                while (first > 0 && m[first][j] === 0) {
                    first--;
                }
                if (first <= 0) {
                    break;
                } else {
                    if (m[first][j] === m[first - 1][j]) {
                        flag = true;
                        m[first][j] *= 2;
                        if (!checking) {
                            score += m[first][j];
                        }
                        m[first - 1][j] = 0;
                        first -= 2;
                    } else {
                        first--;
                    }
                }
            }
        }
        return flag;
    }

    function moveDown() {
        var prev = copyMat(mat);
        shiftDown();
        solveDown(mat, false);
        shiftDown();
        return isSame(prev, mat);
    }

    function redraw() {
        var flag = true;
        var k = 1;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                var ele = document.querySelector('#game > div:nth-child(' + k + ')');
                if (mat[i][j] !== 0) {
                    ele.setAttribute('class', 'tile tile_' + mat[i][j]);
                } else {
                    flag = false;
                    ele.setAttribute('class', 'tile')
                }
                k += 1;
            }
        }
        var now = document.getElementById('now');
        now.innerHTML = score + "";
        var highest = document.getElementById('best');
        var highest_val = parseInt(highest.innerHTML);
        if (score > highest_val) {
            highest.innerHTML = score + "";
        }
        return flag;
    }

    function getRandomValue() {
        return (Math.floor(Math.random() * 2) + 1) * 2;
    }

    function getRandomEmptyCell() {
        do {
            var x, y;
            x = Math.floor(Math.random() * 4);
            y = Math.floor(Math.random() * 4);
            if (mat[x][y] === 0) {
                return {
                    x: x,
                    y: y
                };
            }
        } while (true);
    }

    function fillOneRandomEmptyCell() {
        var coord = getRandomEmptyCell();
        var value = getRandomValue();
        mat[coord.x][coord.y] = value;
    }

    function checkIf2048() {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (mat[i][j] === 2048) {
                    return true;
                }
            }
        }
        return false;
    }

    function isGameOver() {
        var n = copyMat(mat);
        if (solveLeft(n, true) || solveRight(n, true) || solveUp(n, true) || solveDown(n, true)) {
            return false;
        } else {
            return true;
        }
    }

    function showGameOverDialog() {
        overMain.style.display = 'flex';
    }

    function show2048Dialog() {
        wonMain.style.display = 'flex';
    }

    function goFurther() {
        wonMain.style.display = 'none';
    }

    function move(e) {
        e.preventDefault();
        var res;
        if (e.keyCode === 37) {
            res = moveLeft();
        } else if (e.keyCode === 38) {
            res = moveUp();
        } else if (e.keyCode === 39) {
            res = moveRight();
        } else if (e.keyCode === 40) {
            res = moveDown();
        } else {
            return;
        }
        if (!res) {
            var coord = getRandomEmptyCell();
            var value = getRandomValue();
            mat[coord.x][coord.y] = value;
            if (redraw()) {
                if (isGameOver()) {
                    showGameOverDialog();
                }
            }
            if (shown2048dialog === false) {
                if (checkIf2048()) {
                    show2048Dialog();
                    shown2048dialog = true;
                }
            }
        }
    }

    function reset(e) {
        if (e) {
            e.preventDefault();
        }
        overMain.style.display = 'none';
        wonMain.style.display = 'none';
        mat = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        score = 0;
        shown2048dialog = false;
        fillOneRandomEmptyCell();
        fillOneRandomEmptyCell();
        redraw();
    }


    function init() {
        overMain = document.getElementById('over');
        wonMain = document.getElementById('won');
        reset();
        document.getElementById('restart').addEventListener('click', reset);
        document.getElementById('reset').addEventListener('click', reset);
        document.getElementById('try_again').addEventListener('click', reset);
        document.getElementById('continue').addEventListener('click', goFurther);
        window.addEventListener('keydown', move);
    }
    return {
        init: init
    };
})();