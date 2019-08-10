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
    bind(el) {
        // if (!binding.value) {
        //     throw new Error(
        //         "Custom directive 'v-flash' is missing a required value."
        //     );
        // }
        if (el) {
            let bg = 'red'
            let timesRun = 0;
            el.style.background = bg
            // while (count > 0) {
            let interval = setInterval(() => {
                timesRun += 1;
                if (timesRun === 7) {
                    clearInterval(interval);
                } else {
                    if (bg === 'red') {
                        el.classList.remove("error")
                        // el.classList.add("success")
                        bg = 'white'
                        // el.setAttribute('color', '#FFF')
                        el.style.backgroundColor = '#FFF';
                        el.style.color = 'red';
                    } else {
                        // el.classList.remove("success")
                        // el.classList.add("error")
                        bg = 'red'
                        // el.setAttribute('color', 'red')
                        el.style.backgroundColor = 'red';
                        el.style.color = '#FFF';
                    }
                }
            }, 400)
        }
    }
}
