export const trim = {
    bind(el, binding) {
        // this directive accepts a value with witch to trim a string and appends '...'
        if (!binding.value) {
            throw new Error(
                "Custom directive 'v-trim' is missing a required value."
            );
        }
        if (el && el.textContent.length > binding.value) {
            el.textContent = el.textContent.substring(0, binding.value) + '...';
        }
    },
};

export const testref = {
    bind(el, binding) {
        // this directive is only used to create an attribute as a hook in the DOM for end-to-end testing
        if (!binding.value) {
            throw new Error(
                "Custom directive 'v-test-ref' is missing a required value."
            );
        }
        if (el) {
            el.setAttribute('app-test-ref', binding.value);
        }
    },
};

export const flash = {
    bind(el, binding) {
        flasher(el, binding)
    },
    update(el, binding) {
        flasher(el, binding)
    }
};

const flasher = (el, binding) => {
    if (el && binding.value) {
        el.style.backgroundColor = 'red';
        let bg = true
        let timesRun = 0;
        let interval = setInterval(() => {
            timesRun += 1;
            if (timesRun === 11) {
                clearInterval(interval);
            } else {
                if (bg) {
                    // if used on a v-alert, there is a default class of 'error' that overrides style.backgroundColor
                    // so remove it
                    el.classList.remove("error")
                    bg = !bg
                    el.style.backgroundColor = '#FFF';
                    el.style.borderColor = '#FFF';
                    el.style.color = 'red';
                } else {
                    bg = !bg
                    el.style.backgroundColor = 'red';
                    el.style.borderColor = 'red';
                    el.style.color = '#FFF';
                }
            }
        }, 200)
    } else if (el) {
        el.style.backgroundColor = null;
    }
};
