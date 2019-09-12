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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/user';
var GoogleLoginProvider = /** @class */ (function (_super) {
    __extends(GoogleLoginProvider, _super);
    function GoogleLoginProvider(clientId, opt) {
        if (opt === void 0) { opt = { scope: 'email' }; }
        var _this = _super.call(this) || this;
        _this.clientId = clientId;
        _this.opt = opt;
        return _this;
    }
    /**
     * @return {?}
     */
    GoogleLoginProvider.prototype.initialize = /**
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
            _this.loadScript(GoogleLoginProvider.PROVIDER_ID, 'https://apis.google.com/js/platform.js', (/**
             * @return {?}
             */
            function () {
                gapi.load('auth2', (/**
                 * @return {?}
                 */
                function () {
                    _this.auth2 = gapi.auth2.init(__assign({}, _this.opt, { client_id: _this.clientId }));
                    _this.auth2.then((/**
                     * @return {?}
                     */
                    function () {
                        _this._readyState.next(true);
                        resolve();
                    })).catch((/**
                     * @param {?} err
                     * @return {?}
                     */
                    function (err) {
                        reject(err);
                    }));
                }));
            }));
        }));
    };
    /**
     * @return {?}
     */
    GoogleLoginProvider.prototype.getLoginStatus = /**
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
                if (_this.auth2.isSignedIn.get()) {
                    /** @type {?} */
                    var user = new SocialUser();
                    /** @type {?} */
                    var profile = _this.auth2.currentUser.get().getBasicProfile();
                    /** @type {?} */
                    var token = _this.auth2.currentUser.get().getAuthResponse(true).access_token;
                    /** @type {?} */
                    var backendToken = _this.auth2.currentUser.get().getAuthResponse(true).id_token;
                    /** @type {?} */
                    var refreshToken = _this.auth2.currentUser.get().getAuthResponse(true).refresh_token;
                    user.id = profile.getId();
                    user.name = profile.getName();
                    user.email = profile.getEmail();
                    user.photoUrl = profile.getImageUrl();
                    user.firstName = profile.getGivenName();
                    user.lastName = profile.getFamilyName();
                    user.authToken = token;
                    user.idToken = backendToken;
                    user.refreshToken = refreshToken;
                    resolve(user);
                }
                else {
                    reject('No user is currently logged in.');
                }
            }));
        }));
    };
    /**
     * @param {?=} opt
     * @return {?}
     */
    GoogleLoginProvider.prototype.signIn = /**
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
                /** @type {?} */
                var offlineAccess = (opt && opt.offline_access) || (_this.opt && _this.opt.offline_access);
                /** @type {?} */
                var promise = !offlineAccess ? _this.auth2.signIn(opt) : _this.auth2.grantOfflineAccess(opt);
                promise.then((/**
                 * @param {?} response
                 * @return {?}
                 */
                function (response) {
                    /** @type {?} */
                    var user = new SocialUser();
                    /** @type {?} */
                    var profile = _this.auth2.currentUser.get().getBasicProfile();
                    /** @type {?} */
                    var token = _this.auth2.currentUser.get().getAuthResponse(true).access_token;
                    /** @type {?} */
                    var backendToken = _this.auth2.currentUser.get().getAuthResponse(true).id_token;
                    /** @type {?} */
                    var refreshToken = _this.auth2.currentUser.get().getAuthResponse(true).refresh_token;
                    user.id = profile.getId();
                    user.name = profile.getName();
                    user.email = profile.getEmail();
                    user.photoUrl = profile.getImageUrl();
                    user.firstName = profile.getGivenName();
                    user.lastName = profile.getFamilyName();
                    user.authToken = token;
                    user.idToken = backendToken;
                    user.refreshToken = refreshToken;
                    if (response && response.code) {
                        user.authorizationCode = response.code;
                    }
                    resolve(user);
                }), (/**
                 * @param {?} closed
                 * @return {?}
                 */
                function (closed) {
                    reject('User cancelled login or did not fully authorize.');
                })).catch((/**
                 * @param {?} err
                 * @return {?}
                 */
                function (err) {
                    reject(err);
                }));
            }));
        }));
    };
    /**
     * @param {?=} revoke
     * @return {?}
     */
    GoogleLoginProvider.prototype.signOut = /**
     * @param {?=} revoke
     * @return {?}
     */
    function (revoke) {
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
                /** @type {?} */
                var signOutPromise;
                if (revoke) {
                    signOutPromise = _this.auth2.disconnect();
                }
                else {
                    signOutPromise = _this.auth2.signOut();
                }
                signOutPromise.then((/**
                 * @param {?} err
                 * @return {?}
                 */
                function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                })).catch((/**
                 * @param {?} err
                 * @return {?}
                 */
                function (err) {
                    reject(err);
                }));
            }));
        }));
    };
    GoogleLoginProvider.PROVIDER_ID = 'GOOGLE';
    return GoogleLoginProvider;
}(BaseLoginProvider));
export { GoogleLoginProvider };
if (false) {
    /** @type {?} */
    GoogleLoginProvider.PROVIDER_ID;
    /**
     * @type {?}
     * @protected
     */
    GoogleLoginProvider.prototype.auth2;
    /**
     * @type {?}
     * @private
     */
    GoogleLoginProvider.prototype.clientId;
    /**
     * @type {?}
     * @private
     */
    GoogleLoginProvider.prototype.opt;
}
//# sourceMappingURL=google-login-provider.js.map