(() =>{
'use strict';

//タブ
const tabItems = document.querySelectorAll(".tab-item");

tabItems.forEach((tabItem) => {
  tabItem.addEventListener("click", () => {
    // すべてのタブを非アクティブにする
    tabItems.forEach((t) => {
      t.classList.remove("active");
    });
    // すべてのコンテンツを非表示にする
    const tabPanels = document.querySelectorAll(".tab-panel");
    tabPanels.forEach((tabPanel) => {
      tabPanel.classList.remove("active");
    });

    // クリックされたタブをアクティブにする
    tabItem.classList.add("active");

    // 対応するコンテンツを表示
    const tabIndex = Array.from(tabItems).indexOf(tabItem);
    tabPanels[tabIndex].classList.add("active");
  });
});

//表
let mi_array = [
    [1, 'アイウ　エオ', 2],
    [2, 'カキク　ケコ', 4],
    [3, 'サシス　セソ', 3],
    [4, 'タチツ　テト', 4]
];
let sumi_array = [];

const mi_tbody = document.getElementById(`mi_table`);
const sumi_tbody = document.getElementById('sumi_table');
const target = document.body;
let td_element = document.getElementsByTagName('td');

//一週目
for (let i = 0; i < mi_array.length; i++) {
    const row = document.createElement('tr');
    row.classList.add('mi');

    for (let j = 0; j < 4; j++) {
        const td = document.createElement('td');

        if (j === 3) {
            const button = document.createElement('button');
            button.textContent = '呼出済にする';
            td.appendChild(button);

            button.addEventListener('click', () => {
                row.classList.remove('mi');
                row.classList.add('sumi');
                sumi_array.push(mi_array[i]);
                mi_array.splice(i, 1); 
            });
        }
        else {
            td.textContent = mi_array[i][j];
        }

        row.appendChild(td);
    };
    mi_tbody.appendChild(row);
};

//２週目以降
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        //呼出待ち
        if (mutation.attributeName === 'class') {
            for (let a = 0; a < (mi_array.length + sumi_array.length) * 4; a++) {
                td_element[0].remove();
            };

            for (let i = 0; i < mi_array.length; i++) {
                const row = document.createElement('tr');

                for (let j = 0; j < 4; j++) {
                    const td = document.createElement('td');

                    if (j === 3) {
                        const button = document.createElement('button');
                        button.textContent = '呼出済にする';
                        td.appendChild(button);

                        button.addEventListener('click', () => {
                            row.classList.remove('mi');
                            row.classList.add('sumi');
                            sumi_array.push(mi_array[i]);
                            mi_array.splice(i, 1);
                        });
                    }
                    else {
                        td.textContent = mi_array[i][j];
                    }

                    row.appendChild(td);
                };
                mi_tbody.appendChild(row);
            };
            //呼出済
            for (let i = 0; i < sumi_array.length; i++) {
                const row = document.createElement('tr');
                
                for (let j = 0; j < 4; j++) {
                    const td = document.createElement('td');

                    if (j === 3) {
                        const button = document.createElement('button');
                        button.textContent = '呼出待ちにする';
                        td.appendChild(button);

                        button.addEventListener('click', () => {
                            row.classList.remove('sumi');
                            row.classList.add('mi');
                            mi_array.push(sumi_array[i]);
                            sumi_array.splice(i, 1);
                        });
                    }
                    else {
                        td.textContent = sumi_array[i][j];
                    }

                    row.appendChild(td);
                };
                sumi_tbody.appendChild(row);
            };
        }
    });
});
const config = {
    attributes: true,
    subtree: true
};
observer.observe(target, config);

})();
