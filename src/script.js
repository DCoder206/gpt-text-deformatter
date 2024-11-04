function respClean(resp) {
    const replacements = [
        [/#+|(\*\*|__|\*|_)/g, ""],
        [/\\[{}\[\]]/g, ""],
        [/\$(.*?)\$/g, "$1"],
        [/\\cdot/g, "⋅"],
        [/\\text{([^}]+)}/g, "$1"],
        [/\\leq/g, "≤"], [/\\geq/g, "≥"], [/\\neq/g, "≠"],
        [/\\approx/g, "≈"], [/\\infty/g, "∞"], [/\\pm/g, "±"],
        [/\\times/g, "×"], [/\\rightarrow/g, "→"], [/\\leftarrow/g, "←"],
        [/\\frac{([^}]+)}{([^}]+)}/g, "($1 / $2)"],
        [/\\sqrt{([^}]+)}/g, "√($1)"],
        [/\^{([^}]+)}/g, "^($1)"], [/\^([a-zA-Z0-9])/g, "^$1"],
        [/_\{([^}]+)}/g, "_($1)"], [/_(\w)/g, "_$1"],
        [/\\alpha/g, "α"], [/\\beta/g, "β"], [/\\gamma/g, "γ"],
        [/\\delta/g, "δ"], [/\\epsilon/g, "ε"], [/\\theta/g, "θ"],
        [/\\lambda/g, "λ"], [/\\mu/g, "μ"], [/\\pi/g, "π"],
        [/\\sigma/g, "σ"], [/\\phi/g, "φ"], [/\\omega/g, "ω"]
    ];
    replacements.forEach(([pattern, replacement]) => {
        resp = resp.replace(pattern,replacement);
    });
    return resp.trim();
}
async function clipboardCopy(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        alert("Error copying text to clipboard");
        return false;
    }
}
const subbut = document.querySelector("#subbut");
const copybut = document.querySelector("#copybut");
const outdiv = document.querySelector("#outp");
const inpfield = document.querySelector("#inptext");
let input = "";
inpfield.addEventListener("input", () => {
    const textLength = inpfield.value.length;
    input.style.width = (textLength * 10 + 100) + "px";
});
subbut.addEventListener("click", (event) => {
    event.preventDefault();
    input = inpfield.value;
    if (Boolean(input)) {
        outdiv.innerHTML = `Here's the deformatted text:<br><br>${respClean(input).replace(/\n/g,"<br>")}`;
    }
})
copybut.addEventListener("click", (event) => {
    event.preventDefault();
    const newinp = inpfield.value;
    if (Boolean(newinp) && newinp !== input) {
        input = newinp;
        const changedtext = respClean(input);
        if (clipboardCopy(changedtext)) {
            outdiv.innerHTML = "Text copied to clipboard";
            setTimeout(() => {
                outdiv.innerHTML = "";
            }, 25000);
        }
    }
    else if (Boolean(input)) {
        clipboardCopy(outdiv.innerHTML);
        outdiv.innerHTML += "<br>Text copied to clipboard";
        setTimeout(() => {
            outdiv.innerHTML = "";
        }, 25000);
    }
});
const darkModeToggle = document.querySelector("#darkModeToggle");
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    inpfield.classList.toggle("dark-mode");
    subbut.classList.toggle("dark-mode");
    copybut.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    if (isDarkMode) {
        localStorage.setItem("darkMode", "enabled");
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem("darkMode", "disabled");
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    darkModeToggle.classList.toggle("dark-mode");   
});
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    inpfield.classList.add("dark-mode");
    subbut.classList.add("dark-mode");
    copybut.classList.add("dark-mode");
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}
