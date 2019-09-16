"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var AuthServiceConfig = /** @class */ (function () {
    function AuthServiceConfig(providers) {
        this.lazyLoad = false;
        this.providers = new Map();
        for (var i = 0; i < providers.length; i++) {
            var element = providers[i];
            this.providers.set(element.id, element.provider);
            this.lazyLoad = this.lazyLoad || element.lazyLoad;
        }
    }
    return AuthServiceConfig;
}());
exports.AuthServiceConfig = AuthServiceConfig;
var AuthService = /** @class */ (function () {
    function AuthService(config) {
        this._user = null;
        this._authState = new rxjs_1.ReplaySubject(1);
        this._readyState = new rxjs_1.BehaviorSubject([]);
        this.initialized = false;
        this.providers = config.providers;
        if (!config.lazyLoad) {
            this.initialize();
        }
    }
    AuthService_1 = AuthService;
    Object.defineProperty(AuthService.prototype, "authState", {
        get: function () {
            return this._authState.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "readyState", {
        /** Provides an array of provider ID's as they become ready */
        get: function () {
            return this._readyState.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.initialize = function () {
        var _this = this;
        this.initialized = true;
        this.providers.forEach(function (provider, key) {
            provider.initialize().then(function () {
                var readyProviders = _this._readyState.getValue();
                readyProviders.push(key);
                _this._readyState.next(readyProviders);
                provider.getLoginStatus().then(function (user) {
                    user.provider = key;
                    _this._user = user;
                    _this._authState.next(user);
                }).catch(function (err) {
                    _this._authState.next(null);
                });
            });
        });
    };
    AuthService.prototype.signIn = function (providerId, opt) {
        var _this = this;
        if (!this.initialized) {
            this.initialize();
        }
        return new Promise(function (resolve, reject) {
            var providerObject = _this.providers.get(providerId);
            if (providerObject) {
                providerObject.signIn(opt).then(function (user) {
                    user.provider = providerId;
                    resolve(user);
                    _this._user = user;
                    _this._authState.next(user);
                }).catch(function (err) {
                    reject(err);
                });
            }
            else {
                reject(AuthService_1.ERR_LOGIN_PROVIDER_NOT_FOUND);
            }
        });
    };
    AuthService.prototype.signOut = function (revoke) {
        var _this = this;
        if (revoke === void 0) { revoke = false; }
        if (!this.initialized) {
            this.initialize();
        }
        return new Promise(function (resolve, reject) {
            if (!_this._user) {
                reject(AuthService_1.ERR_NOT_LOGGED_IN);
            }
            else {
                var providerId = _this._user.provider;
                var providerObject = _this.providers.get(providerId);
                if (providerObject) {
                    providerObject.signOut(revoke).then(function () {
                        resolve();
                        _this._user = null;
                        _this._authState.next(null);
                    }).catch(function (err) {
                        reject(err);
                    });
                }
                else {
                    reject(AuthService_1.ERR_LOGIN_PROVIDER_NOT_FOUND);
                }
            }
        });
    };
    var AuthService_1;
    AuthService.ERR_LOGIN_PROVIDER_NOT_FOUND = 'Login provider not found';
    AuthService.ERR_NOT_LOGGED_IN = 'Not logged in';
    AuthService = AuthService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [AuthServiceConfig])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map