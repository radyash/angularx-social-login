"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var BaseLoginProvider = /** @class */ (function () {
    function BaseLoginProvider() {
        this._readyState = new rxjs_1.BehaviorSubject(false);
    }
    BaseLoginProvider.prototype.onReady = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._readyState.subscribe(function (isReady) {
                if (isReady) {
                    resolve();
                }
            });
        });
    };
    BaseLoginProvider.prototype.loadScript = function (id, src, onload, async, inner_text_content) {
        if (async === void 0) { async = true; }
        if (inner_text_content === void 0) { inner_text_content = ''; }
        if (document.getElementById(id)) {
            return;
        }
        var signInJS = document.createElement('script');
        signInJS.async = async;
        signInJS.src = src;
        signInJS.onload = onload;
        signInJS.text = inner_text_content; // LinkedIn
        document.head.appendChild(signInJS);
    };
    return BaseLoginProvider;
}());
exports.BaseLoginProvider = BaseLoginProvider;
//# sourceMappingURL=base-login-provider.js.map