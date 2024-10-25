function respClean(resp) {
    return resp.replace(/(#+|\*\*|__|\*|_|`|~)/g, "")
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
        outdiv.innerHTML = `Here's the deformatted text:<br><br>${respClean(input)}`;
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
