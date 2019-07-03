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
