/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
/**
 * @record
 */
export function AuthServiceConfigItem() { }
if (false) {
    /** @type {?} */
    AuthServiceConfigItem.prototype.id;
    /** @type {?} */
    AuthServiceConfigItem.prototype.provider;
    /**
     * This field allows to load login providers SDKs lazily.
     * Lazy loading is activated if it's true and vice versa.
     * @type {?|undefined}
     */
    AuthServiceConfigItem.prototype.lazyLoad;
}
/**
 * @record
 */
export function LoginOpt() { }
if (false) {
    /**
     * Facebook FB.login options: https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11.
     * @type {?|undefined}
     */
    LoginOpt.prototype.auth_type;
    /** @type {?|undefined} */
    LoginOpt.prototype.scope;
    /** @type {?|undefined} */
    LoginOpt.prototype.return_scopes;
    /** @type {?|undefined} */
    LoginOpt.prototype.enable_profile_selector;
    /** @type {?|undefined} */
    LoginOpt.prototype.profile_selector_ids;
    /**
     * Google gapi.auth2.ClientConfig: \
     * https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig.
     * @type {?|undefined}
     */
    LoginOpt.prototype.client_id;
    /** @type {?|undefined} */
    LoginOpt.prototype.cookie_policy;
    /** @type {?|undefined} */
    LoginOpt.prototype.fetch_basic_profile;
    /** @type {?|undefined} */
    LoginOpt.prototype.hosted_domain;
    /** @type {?|undefined} */
    LoginOpt.prototype.openid_realm;
    /** @type {?|undefined} */
    LoginOpt.prototype.ux_mode;
    /** @type {?|undefined} */
    LoginOpt.prototype.redirect_uri;
    /** @type {?|undefined} */
    LoginOpt.prototype.offline_access;
    /** @type {?|undefined} */
    LoginOpt.prototype.prompt;
    /** @type {?|undefined} */
    LoginOpt.prototype.login_hint;
}
export class AuthServiceConfig {
    /**
     * @param {?} providers
     */
    constructor(providers) {
        this.lazyLoad = false;
        this.providers = new Map();
        for (let i = 0; i < providers.length; i++) {
            /** @type {?} */
            let element = providers[i];
            this.providers.set(element.id, element.provider);
            this.lazyLoad = this.lazyLoad || element.lazyLoad;
        }
    }
}
if (false) {
    /** @type {?} */
    AuthServiceConfig.prototype.lazyLoad;
    /** @type {?} */
    AuthServiceConfig.prototype.providers;
}
export class AuthService {
    /**
     * @param {?} config
     */
    constructor(config) {
        this._user = null;
        this._authState = new ReplaySubject(1);
        this._readyState = new BehaviorSubject([]);
        this.initialized = false;
        this.providers = config.providers;
        if (!config.lazyLoad) {
            this.initialize();
        }
    }
    /**
     * @return {?}
     */
    get authState() {
        return this._authState.asObservable();
    }
    /**
     * Provides an array of provider ID's as they become ready
     * @return {?}
     */
    get readyState() {
        return this._readyState.asObservable();
    }
    /**
     * @private
     * @return {?}
     */
    initialize() {
        this.initialized = true;
        this.providers.forEach((/**
         * @param {?} provider
         * @param {?} key
         * @return {?}
         */
        (provider, key) => {
            provider.initialize().then((/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                let readyProviders = this._readyState.getValue();
                readyProviders.push(key);
                this._readyState.next(readyProviders);
                provider.getLoginStatus().then((/**
                 * @param {?} user
                 * @return {?}
                 */
                (user) => {
                    user.provider = key;
                    this._user = user;
                    this._authState.next(user);
                })).catch((/**
                 * @param {?} err
                 * @return {?}
                 */
                (err) => {
                    this._authState.next(null);
                }));
            }));
        }));
    }
    /**
     * @param {?} providerId
     * @param {?=} opt
     * @return {?}
     */
    signIn(providerId, opt) {
        if (!this.initialized) {
            this.initialize();
        }
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            /** @type {?} */
            let providerObject = this.providers.get(providerId);
            if (providerObject) {
                providerObject.signIn(opt).then((/**
                 * @param {?} user
                 * @return {?}
                 */
                (user) => {
                    user.provider = providerId;
                    resolve(user);
                    this._user = user;
                    this._authState.next(user);
                })).catch((/**
                 * @param {?} err
                 * @return {?}
                 */
                err => {
                    reject(err);
                }));
            }
            else {
                reject(AuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
            }
        }));
    }
    /**
     * @param {?=} revoke
     * @return {?}
     */
    signOut(revoke = false) {
        if (!this.initialized) {
            this.initialize();
        }
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            if (!this._user) {
                reject(AuthService.ERR_NOT_LOGGED_IN);
            }
            else {
                /** @type {?} */
                let providerId = this._user.provider;
                /** @type {?} */
                let providerObject = this.providers.get(providerId);
                if (providerObject) {
                    providerObject.signOut(revoke).then((/**
                     * @return {?}
                     */
                    () => {
                        resolve();
                        this._user = null;
                        this._authState.next(null);
                    })).catch((/**
                     * @param {?} err
                     * @return {?}
                     */
                    (err) => {
                        reject(err);
                    }));
                }
                else {
                    reject(AuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
                }
            }
        }));
    }
}
AuthService.ERR_LOGIN_PROVIDER_NOT_FOUND = 'Login provider not found';
AuthService.ERR_NOT_LOGGED_IN = 'Not logged in';
AuthService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AuthService.ctorParameters = () => [
    { type: AuthServiceConfig }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    AuthService.ERR_LOGIN_PROVIDER_NOT_FOUND;
    /**
     * @type {?}
     * @private
     */
    AuthService.ERR_NOT_LOGGED_IN;
    /**
     * @type {?}
     * @private
     */
    AuthService.prototype.providers;
    /**
     * @type {?}
     * @private
     */
    AuthService.prototype._user;
    /**
     * @type {?}
     * @private
     */
    AuthService.prototype._authState;
    /**
     * @type {?}
     * @private
     */
    AuthService.prototype._readyState;
    /**
     * @type {?}
     * @private
     */
    AuthService.prototype.initialized;
}
//# sourceMappingURL=auth.service.js.map