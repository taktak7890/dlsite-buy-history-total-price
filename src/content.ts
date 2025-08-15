console.log("Content script loaded");
function extractPriceFromTable(): number {
    // table取得
    const table = document.querySelector("#buy_history_this .work_list_main") as HTMLTableElement;
    // 行を取得
    const rows = Array.from(table.rows);

    let total = 0;
    rows.forEach((row, i) => {
        // 最初の1行はヘッダー行なのでスキップ
        if (i === 0) return;

        // 金額cellを取得
        const priceCell = row.cells[7];
        if (priceCell) {
            // 金額を取得
            // ,と円を削除して数値に変換
            const priceText = priceCell.textContent?.replace(/,/g, '').replace('円', '').trim();
            total += parseInt(priceText || '0', 10);
        }
    });
    return total;
}

// 要素にボタンを追加
// 追加する要素を取得
const displayCondition = document.querySelector("#mypage_userbuy .display_condition .display_condition_inner")
if (displayCondition) {
    // divを作成
    const div = document.createElement("div");
    div.id = "totalPriceDiv";
    // 要素にdivを追加
    displayCondition.appendChild(div);

    // ボタンを作成
    const button = document.createElement("button");
    button.textContent = "このページの合計金額を表示";
    // クリックイベントを追加
    button.addEventListener("click", (event) => {
        event.preventDefault();
        const totalPrice = extractPriceFromTable();
        console.log(`合計金額: ${totalPrice}円`);
        // ラベルに合計金額を表示
        const totalPriceLabel = document.getElementById("totalPriceLabel");
        totalPriceLabel.textContent = `合計金額: ${totalPrice}円`;
    });
    // 要素にボタンを追加
    div.appendChild(button);

    // spanを作成
    const span = document.createElement("span");
    span.textContent = "ここに金額を表示";
    span.id = "totalPriceLabel";
    // ラベルを追加
    div.appendChild(span);
}