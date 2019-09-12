/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { BehaviorSubject } from 'rxjs';
/**
 * @abstract
 */
export class BaseLoginProvider {
    constructor() {
        this._readyState = new BehaviorSubject(false);
    }
    /**
     * @protected
     * @return {?}
     */
    onReady() {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this._readyState.subscribe((/**
             * @param {?} isReady
             * @return {?}
             */
            (isReady) => {
                if (isReady) {
                    resolve();
                }
            }));
        }));
    }
    /**
     * @param {?} id
     * @param {?} src
     * @param {?} onload
     * @param {?=} async
     * @param {?=} inner_text_content
     * @return {?}
     */
    loadScript(id, src, onload, async = true, inner_text_content = '') {
        if (document.getElementById(id)) {
            return;
        }
        /** @type {?} */
        let signInJS = document.createElement('script');
        signInJS.async = async;
        signInJS.src = src;
        signInJS.onload = onload;
        signInJS.text = inner_text_content; // LinkedIn
        document.head.appendChild(signInJS);
    }
}
if (false) {
    /**
     * @type {?}
     * @protected
     */
    BaseLoginProvider.prototype._readyState;
    /**
     * @abstract
     * @return {?}
     */
    BaseLoginProvider.prototype.initialize = function () { };
    /**
     * @abstract
     * @return {?}
     */
    BaseLoginProvider.prototype.getLoginStatus = function () { };
    /**
     * @abstract
     * @return {?}
     */
    BaseLoginProvider.prototype.signIn = function () { };
    /**
     * @abstract
     * @param {?=} revoke
     * @return {?}
     */
    BaseLoginProvider.prototype.signOut = function (revoke) { };
}
//# sourceMappingURL=base-login-provider.js.map