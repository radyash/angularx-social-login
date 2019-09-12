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
var LinkedInLoginProvider = /** @class */ (function (_super) {
    __extends(LinkedInLoginProvider, _super);
    function LinkedInLoginProvider(clientId, authorize, lang, fields) {
        if (fields === void 0) { fields = 'id,first-name,last-name,email-address,picture-url'; }
        var _this = _super.call(this) || this;
        _this.clientId = clientId;
        _this.authorize = authorize;
        _this.lang = lang;
        _this.fields = fields;
        return _this;
    }
    /**
     * @return {?}
     */
    LinkedInLoginProvider.prototype.initialize = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var inner_text = '';
        inner_text += 'api_key: ' + this.clientId + '\r\n';
        inner_text += 'authorize:' + (this.authorize ? 'true' : 'false') + '\r\n';
        inner_text += 'lang: ' + (this.lang ? this.lang : 'fr_FR') + '\r\n';
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.loadScript(LinkedInLoginProvider.PROVIDER_ID, '//platform.linkedin.com/in.js', (/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var that = _this;
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this._readyState.next(true);
                    resolve();
                }), 800);
            }), false, inner_text);
        }));
    };
    /**
     * @return {?}
     */
    LinkedInLoginProvider.prototype.getLoginStatus = /**
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
                if (IN.User.isAuthorized()) {
                    IN.API.Raw("/people/~:(" + _this.fields + ")").result((/**
                     * @param {?} res
                     * @return {?}
                     */
                    function (res) {
                        /** @type {?} */
                        var user = new SocialUser();
                        user.id = res.id;
                        user.name = res.firstName + ' ' + res.lastName;
                        user.email = res.emailAddress;
                        user.photoUrl = res.pictureUrl;
                        user.firstName = res.firstName;
                        user.lastName = res.lastName;
                        user.authToken = IN.ENV.auth.oauth_token;
                        user.linkedIn = res;
                        resolve(user);
                    }));
                }
                else {
                    reject('No user is currently logged in.');
                }
            }));
        }));
    };
    /**
     * @return {?}
     */
    LinkedInLoginProvider.prototype.signIn = /**
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
                IN.User.authorize((/**
                 * @return {?}
                 */
                function () {
                    IN.API.Raw("/people/~:(" + _this.fields + ")").result((/**
                     * @param {?} res
                     * @return {?}
                     */
                    function (res) {
                        /** @type {?} */
                        var user = new SocialUser();
                        user.id = res.id;
                        user.name = res.firstName + ' ' + res.lastName;
                        user.email = res.emailAddress;
                        user.photoUrl = res.pictureUrl;
                        user.firstName = res.firstName;
                        user.lastName = res.lastName;
                        user.authToken = IN.ENV.auth.oauth_token;
                        user.linkedIn = res;
                        resolve(user);
                    }));
                }));
            }));
        }));
    };
    /**
     * @return {?}
     */
    LinkedInLoginProvider.prototype.signOut = /**
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
                IN.User.logout((/**
                 * @return {?}
                 */
                function () {
                    resolve();
                }), {});
            }));
        }));
    };
    LinkedInLoginProvider.PROVIDER_ID = 'LINKEDIN';
    return LinkedInLoginProvider;
}(BaseLoginProvider));
export { LinkedInLoginProvider };
if (false) {
    /** @type {?} */
    LinkedInLoginProvider.PROVIDER_ID;
    /**
     * @type {?}
     * @private
     */
    LinkedInLoginProvider.prototype.clientId;
    /**
     * @type {?}
     * @private
     */
    LinkedInLoginProvider.prototype.authorize;
    /**
     * @type {?}
     * @private
     */
    LinkedInLoginProvider.prototype.lang;
    /**
     * @type {?}
     * @private
     */
    LinkedInLoginProvider.prototype.fields;
}
//# sourceMappingURL=linkedIn-login-provider.js.map