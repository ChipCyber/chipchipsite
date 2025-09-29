import * as XLSX from "xlsx";

/**
 * 打开文件选择并解析 Excel，返回钱包地址数组
 * @returns {Promise<string[]>}
 */
export function importWalletsFromExcel() {
    return new Promise((resolve, reject) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".xlsx,.xls";
        input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return reject(new Error("No file selected"));
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = new Uint8Array(event.target.result);
                    const workbook = XLSX.read(data, { type: "array" });
                    const sheet = workbook.Sheets[workbook.SheetNames[0]];
                    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                    const walletList = rows.map((row) => row[0]).filter(Boolean);
                    resolve(walletList);
                } catch (err) {
                    reject(err);
                }
            };
            reader.readAsArrayBuffer(file);
        };
        input.click();
    });
}