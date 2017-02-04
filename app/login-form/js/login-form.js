(function () {

    var defaults = {
        handler: "#",
        password: "",
        "name-placeholder": "J.R.R. Tolkein",
        name: "",
        "password_min_length": 6,
        failed: false
    };

    function isPasswordValid(pwd, pwd_min_length) {
        return pwd.length >= parseInt(pwd_min_length)
    }

    /**
     * Get Attribute from element, if attribute non specified return default value if available, otherwise ""
     * @param  {[type]} element [description]
     * @param  {[type]} att     [description]
     * @return {[type]}         [description]
     */
    function getAttribute(element, att) {
        return element.getAttribute(att) ? element.getAttribute(att) : (typeof defaults[att] !== "undefined" ? defaults[att] : "");
    }

    /**
     * Add class to DOM element
     * @param {[type]} element   [description]
     * @param {[type]} className [description]
     */
    function addClass(element, className) {
        var regex = new RegExp('\\b' + className + '\\b', 'g');
        element.className = element.className.replace(regex, '');
        element.className = element.className + " " + className;
    }

    /**
     * Remove class from DOM element
     * @param  {[type]} element   [description]
     * @param  {[type]} className [description]
     * @return {[type]}           [description]
     */
    function removeClass(element, className) {
        var regex = new RegExp('\\b' + className + '\\b', 'g');
        element.className = element.className.replace(regex, '');
    }

    Polymer("login-form", {
        ready: function () {
            var myself = this;

            var username = myself.$.name;
            var password = myself.$.password;
            var submit = myself.$.submit;
            var form = myself.$.form;
            var msg = myself.$.msg;
            var password_min_length = getAttribute(myself, "password_min_length");

            //initializing element
            form.action = getAttribute(myself, "handler");
            password.value = getAttribute(myself, "password");
            if (getAttribute(myself, "failed")) {
                msg.innerHTML = "No user with this username/password";
                msg.style.display = "block";
            }

            //validating username
            name.onkeyup = function (e) {
                if (this.value.length > 6) {
                    removeClass(myself.$.name, "invalid");
                    addClass(myself.$.name, "valid");
                } else {
                    removeClass(myself.$.name, "valid");
                    addClass(myself.$.name, "invalid");
                }
            };

            //validating password
            password.onkeyup = function (e) {
                if (isPasswordValid(this.value, password_min_length)) {
                    removeClass(myself.$.password_status, "invalid");
                    addClass(myself.$.password_status, "valid");
                } else {
                    removeClass(myself.$.password_status, "valid");
                    addClass(myself.$.password_status, "invalid");
                }
            };

            //onclick
            submit.onclick = function (e) {
                if (name.value.length > 6 && isPasswordValid(password.value, password_min_length)) {
                    return true;
                }
                e.preventDefault();
                e.stopPropagation();
                return false;
            };
        }
    });
}())