"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var base_login_provider_1 = require("../entities/base-login-provider");
var user_1 = require("../entities/user");
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
    LinkedInLoginProvider.prototype.initialize = function () {
        var _this = this;
        var inner_text = '';
        inner_text += 'api_key: ' + this.clientId + '\r\n';
        inner_text += 'authorize:' + (this.authorize ? 'true' : 'false') + '\r\n';
        inner_text += 'lang: ' + (this.lang ? this.lang : 'fr_FR') + '\r\n';
        return new Promise(function (resolve, reject) {
            _this.loadScript(LinkedInLoginProvider.PROVIDER_ID, '//platform.linkedin.com/in.js', function () {
                var that = _this;
                setTimeout(function () {
                    _this._readyState.next(true);
                    resolve();
                }, 800);
            }, false, inner_text);
        });
    };
    LinkedInLoginProvider.prototype.getLoginStatus = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.onReady().then(function () {
                if (IN.User.isAuthorized()) {
                    IN.API.Raw("/people/~:(" + _this.fields + ")").result(function (res) {
                        var user = new user_1.SocialUser();
                        user.id = res.id;
                        user.name = res.firstName + ' ' + res.lastName;
                        user.email = res.emailAddress;
                        user.photoUrl = res.pictureUrl;
                        user.firstName = res.firstName;
                        user.lastName = res.lastName;
                        user.authToken = IN.ENV.auth.oauth_token;
                        user.linkedIn = res;
                        resolve(user);
                    });
                }
                else {
                    reject('No user is currently logged in.');
                }
            });
        });
    };
    LinkedInLoginProvider.prototype.signIn = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.onReady().then(function () {
                IN.User.authorize(function () {
                    IN.API.Raw("/people/~:(" + _this.fields + ")").result(function (res) {
                        var user = new user_1.SocialUser();
                        user.id = res.id;
                        user.name = res.firstName + ' ' + res.lastName;
                        user.email = res.emailAddress;
                        user.photoUrl = res.pictureUrl;
                        user.firstName = res.firstName;
                        user.lastName = res.lastName;
                        user.authToken = IN.ENV.auth.oauth_token;
                        user.linkedIn = res;
                        resolve(user);
                    });
                });
            });
        });
    };
    LinkedInLoginProvider.prototype.signOut = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.onReady().then(function () {
                IN.User.logout(function () {
                    resolve();
                }, {});
            });
        });
    };
    LinkedInLoginProvider.PROVIDER_ID = 'LINKEDIN';
    return LinkedInLoginProvider;
}(base_login_provider_1.BaseLoginProvider));
exports.LinkedInLoginProvider = LinkedInLoginProvider;
//# sourceMappingURL=linkedIn-login-provider.js.map