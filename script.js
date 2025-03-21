function calculate() {
    let aa = parseInt(document.getElementById("aa").value) || 0;
    let bb = parseInt(document.getElementById("bb").value) || 0;
    let cc = parseInt(document.getElementById("cc").value) || 0;
    let dd = parseInt(document.getElementById("dd").value) || 0;
    let vv = parseInt(document.getElementById("vv").value) || 0;
    let xx = parseInt(document.getElementById("xx").value) || 0;
    let yy = parseInt(document.getElementById("yy").value) || 0;
    let zz = parseInt(document.getElementById("zz").value) || 0;
    let oo = parseInt(document.getElementById("oo").value) || 0;

    let checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
    let selected_values = Array.from(checkboxes).map(cb => cb.id);

    // Store all possible values
    let all_values = ["aysh", "adym", "karch", "aym", "nak", "vrm", "tidhi", "dikpth", "amsa", "ygm", "karnm", "thvm", "kulm", "lagnam","kala", "grahamu"];

    // Check if we need to apply filtering
    let applyFilters = selected_values.length > 0;

    let resultBody = document.getElementById("result-body");
    resultBody.innerHTML = ""; // Clear previous results
    let count = 0;

    let a = (aa * 12) + bb;
    let b = (cc * 12) + dd;
    let c = (vv * 12) + xx;
    let d = (yy * 12) + zz;

    for (let e = a; e <= b; e++) {
        for (let f = c; f <= d; f++) {
            let i = (e * f) / 144; // Area in sq. ft.
            let j = Math.floor(e / 12), k = e % 12;
            let l = Math.floor(f / 12), m = f % 12;

            let values = {
                "aysh": Math.ceil((i * 9) % 120) || 120,
                "adym": Math.ceil((i * 8) % 12) || 12,
                "karch": Math.ceil((i * 3) % 8) || 8,
                "aym": Math.ceil((i * 9) % 8) || 8,
                "nak": Math.ceil((i * 8) % 27) || 27,
                "vrm": Math.ceil((i * 9) % 7) || 7,
                "tidhi": Math.ceil((i * 6) % 30) || 30,
                "dikpth": Math.ceil((i * 9) % 8) || 8,
                "amsa": Math.ceil((i * 6) % 9) || 9,
                "ygm": Math.ceil((i * 4) % 27) || 27,
                "karnm": Math.ceil((i * 5) % 11) || 11,
                "thvm": Math.ceil((i * 7) % 5) || 5,
                "kulm": Math.ceil((i * 9) % 4) || 4,
                "lagnam": Math.ceil((i * 9) % 12) || 12,
                "kala": Math.ceil((i * 4) % 16) || 16,
                "grahamu": Math.ceil((i * 5) % 9) || 9,
            };

            let conditions_met = true;

            if (applyFilters) {
                if (selected_values.includes("lagnam") && ![2, 3, 4, 6, 7, 9, 12].includes(values["lagnam"])) conditions_met = false;
                if (selected_values.includes("thvm") && ![1, 2].includes(values["thvm"])) conditions_met = false;
                if (selected_values.includes("karnm") && ![1, 2, 3, 4, 5, 6].includes(values["karnm"])) conditions_met = false;
                if (selected_values.includes("ygm") && ![1, 4, 5, 6, 8, 9, 10, 13, 14, 15, 16, 17, 19, 21, 22, 23, 24, 25].includes(values["ygm"])) conditions_met = false;
                if (selected_values.includes("amsa") && ![2, 3, 7, 8, 9].includes(values["amsa"])) conditions_met = false;
                if (selected_values.includes("dikpth") && ![1, 5, 6, 7, 8].includes(values["dikpth"])) conditions_met = false;
                if (selected_values.includes("tidhi") && ![2, 3, 5, 7, 10, 11, 13, 14, 15, 16, 17, 18, 20, 22, 25, 26, 28].includes(values["tidhi"])) conditions_met = false;
                if (selected_values.includes("vrm") && ![2, 4, 5, 6].includes(values["vrm"])) conditions_met = false;
                if (selected_values.includes("aysh") && values["aysh"] <= 60) conditions_met = false;
                if (selected_values.includes("kala") && ![1,2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].includes(values["kala"])) conditions_met = false;
                if (selected_values.includes("grahamu") && ![2, 5, 7, 9].includes(values["grahamu"])) conditions_met = false;
                if (selected_values.includes("aym") && values["aym"] % 2 === 0) conditions_met = false;
                if (selected_values.includes("nak") && ![0, 1, 10, 19, 2, 11, 20, 4, 13, 22, 6, 15, 24, 8, 17, 26, -1, -10, -19, -3, -12, -21, -5, -14, -23, -7, -16, -25, -8, -17, -26].includes(oo - values["nak"])) conditions_met = false;

                if (selected_values.includes("adym") && selected_values.includes("karch")) {
                    let o = Math.ceil(values["adym"] - values["karch"]);
                    if (o <= 1) conditions_met = false;
                }
            }

            if (conditions_met) {
                count++;
                let row = document.createElement("tr");

                let cell0 = document.createElement("td");
                cell0.innerText = count;
                row.appendChild(cell0);

                let cell1 = document.createElement("td");
                cell1.innerText = `(${j}-${k}, ${l}-${m})`;
                row.appendChild(cell1);

                let cell2 = document.createElement("td");
                cell2.innerText = i.toFixed(2) + " sq. ft.";
                row.appendChild(cell2);

                let displayed_values = applyFilters ? selected_values : all_values;
                let cell3 = document.createElement("td");
                cell3.innerText = displayed_values.map(val => `${val}: ${values[val]}`).join(", ");
                row.appendChild(cell3);

                resultBody.appendChild(row);
            }
        }
    }

    if (count === 0) {
        let row = document.createElement("tr");
        let cell = document.createElement("td");
        cell.colSpan = 4;
        cell.innerText = "No matches found.";
        row.appendChild(cell);
        resultBody.appendChild(row);
    }
}

function clearInputs() {
    document.querySelectorAll("input[type=number]").forEach(input => input.value = "");
    document.querySelectorAll("input[type=checkbox]").forEach(checkbox => checkbox.checked = false);
    document.getElementById("result-body").innerHTML = "";
}
