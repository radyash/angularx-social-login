var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/user';
var FacebookLoginProvider = /** @class */ (function (_super) {
    __extends(FacebookLoginProvider, _super);
    function FacebookLoginProvider(clientId, opt, locale, fields, version) {
        if (opt === void 0) { opt = { scope: 'email,public_profile' }; }
        if (locale === void 0) { locale = 'en_US'; }
        if (fields === void 0) { fields = 'name,email,picture,first_name,last_name'; }
        if (version === void 0) { version = 'v2.9'; }
        var _this = _super.call(this) || this;
        _this.clientId = clientId;
        _this.opt = opt;
        _this.locale = locale;
        _this.fields = fields;
        _this.version = version;
        return _this;
    }
    /**
     * @return {?}
     */
    FacebookLoginProvider.prototype.initialize = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.loadScript(FacebookLoginProvider.PROVIDER_ID, "//connect.facebook.net/" + _this.locale + "/sdk.js", (/**
             * @return {?}
             */
            function () {
                FB.init({
                    appId: _this.clientId,
                    autoLogAppEvents: true,
                    cookie: true,
                    xfbml: true,
                    version: _this.version
                });
                // FB.AppEvents.logPageView(); #FIX for #18
                _this._readyState.next(true);
                resolve();
            }));
        }));
    };
    /**
     * @return {?}
     */
    FacebookLoginProvider.prototype.getLoginStatus = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.onReady().then((/**
             * @return {?}
             */
            function () {
                FB.getLoginStatus((/**
                 * @param {?} response
                 * @return {?}
                 */
                function (response) {
                    if (response.status === 'connected') {
                        /** @type {?} */
                        var authResponse_1 = response.authResponse;
                        FB.api("/me?fields=" + _this.fields, (/**
                         * @param {?} fbUser
                         * @return {?}
                         */
                        function (fbUser) {
                            /** @type {?} */
                            var user = new SocialUser();
                            user.id = fbUser.id;
                            user.name = fbUser.name;
                            user.email = fbUser.email;
                            user.photoUrl = 'https://graph.facebook.com/' + fbUser.id + '/picture?type=normal';
                            user.firstName = fbUser.first_name;
                            user.lastName = fbUser.last_name;
                            user.authToken = authResponse_1.accessToken;
                            user.facebook = fbUser;
                            resolve(user);
                        }));
                    }
                    else {
                        reject('No user is currently logged in.');
                    }
                }));
            }));
        }));
    };
    /**
     * @param {?=} opt
     * @return {?}
     */
    FacebookLoginProvider.prototype.signIn = /**
     * @param {?=} opt
     * @return {?}
     */
    function (opt) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.onReady().then((/**
             * @return {?}
             */
            function () {
                FB.login((/**
                 * @param {?} response
                 * @return {?}
                 */
                function (response) {
                    if (response.authResponse) {
                        /** @type {?} */
                        var authResponse_2 = response.authResponse;
                        FB.api("/me?fields=" + _this.fields, (/**
                         * @param {?} fbUser
                         * @return {?}
                         */
                        function (fbUser) {
                            /** @type {?} */
                            var user = new SocialUser();
                            user.id = fbUser.id;
                            user.name = fbUser.name;
                            user.email = fbUser.email;
                            user.photoUrl = 'https://graph.facebook.com/' + fbUser.id + '/picture?type=normal';
                            user.firstName = fbUser.first_name;
                            user.lastName = fbUser.last_name;
                            user.authToken = authResponse_2.accessToken;
                            user.facebook = fbUser;
                            resolve(user);
                        }));
                    }
                    else {
                        reject('User cancelled login or did not fully authorize.');
                    }
                }), _this.opt);
            }));
        }));
    };
    /**
     * @return {?}
     */
    FacebookLoginProvider.prototype.signOut = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.onReady().then((/**
             * @return {?}
             */
            function () {
                FB.logout((/**
                 * @param {?} response
                 * @return {?}
                 */
                function (response) {
                    resolve();
                }));
            }));
        }));
    };
    FacebookLoginProvider.PROVIDER_ID = 'FACEBOOK';
    return FacebookLoginProvider;
}(BaseLoginProvider));
export { FacebookLoginProvider };
if (false) {
    /** @type {?} */
    FacebookLoginProvider.PROVIDER_ID;
    /**
     * @type {?}
     * @private
     */
    FacebookLoginProvider.prototype.clientId;
    /**
     * @type {?}
     * @private
     */
    FacebookLoginProvider.prototype.opt;
    /**
     * @type {?}
     * @private
     */
    FacebookLoginProvider.prototype.locale;
    /**
     * @type {?}
     * @private
     */
    FacebookLoginProvider.prototype.fields;
    /**
     * @type {?}
     * @private
     */
    FacebookLoginProvider.prototype.version;
}
//# sourceMappingURL=facebook-login-provider.js.map