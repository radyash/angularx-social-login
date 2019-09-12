/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/user';
export class GoogleLoginProvider extends BaseLoginProvider {
    /**
     * @param {?} clientId
     * @param {?=} opt
     */
    constructor(clientId, opt = { scope: 'email' }) {
        super();
        this.clientId = clientId;
        this.opt = opt;
    }
    /**
     * @return {?}
     */
    initialize() {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.loadScript(GoogleLoginProvider.PROVIDER_ID, 'https://apis.google.com/js/platform.js', (/**
             * @return {?}
             */
            () => {
                gapi.load('auth2', (/**
                 * @return {?}
                 */
                () => {
                    this.auth2 = gapi.auth2.init(Object.assign({}, this.opt, { client_id: this.clientId }));
                    this.auth2.then((/**
                     * @return {?}
                     */
                    () => {
                        this._readyState.next(true);
                        resolve();
                    })).catch((/**
                     * @param {?} err
                     * @return {?}
                     */
                    (err) => {
                        reject(err);
                    }));
                }));
            }));
        }));
    }
    /**
     * @return {?}
     */
    getLoginStatus() {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.onReady().then((/**
             * @return {?}
             */
            () => {
                if (this.auth2.isSignedIn.get()) {
                    /** @type {?} */
                    let user = new SocialUser();
                    /** @type {?} */
                    let profile = this.auth2.currentUser.get().getBasicProfile();
                    /** @type {?} */
                    let token = this.auth2.currentUser.get().getAuthResponse(true).access_token;
                    /** @type {?} */
                    let backendToken = this.auth2.currentUser.get().getAuthResponse(true).id_token;
                    /** @type {?} */
                    let refreshToken = this.auth2.currentUser.get().getAuthResponse(true).refresh_token;
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
    }
    /**
     * @param {?=} opt
     * @return {?}
     */
    signIn(opt) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.onReady().then((/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const offlineAccess = (opt && opt.offline_access) || (this.opt && this.opt.offline_access);
                /** @type {?} */
                let promise = !offlineAccess ? this.auth2.signIn(opt) : this.auth2.grantOfflineAccess(opt);
                promise.then((/**
                 * @param {?} response
                 * @return {?}
                 */
                (response) => {
                    /** @type {?} */
                    let user = new SocialUser();
                    /** @type {?} */
                    let profile = this.auth2.currentUser.get().getBasicProfile();
                    /** @type {?} */
                    let token = this.auth2.currentUser.get().getAuthResponse(true).access_token;
                    /** @type {?} */
                    let backendToken = this.auth2.currentUser.get().getAuthResponse(true).id_token;
                    /** @type {?} */
                    let refreshToken = this.auth2.currentUser.get().getAuthResponse(true).refresh_token;
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
                (closed) => {
                    reject('User cancelled login or did not fully authorize.');
                })).catch((/**
                 * @param {?} err
                 * @return {?}
                 */
                (err) => {
                    reject(err);
                }));
            }));
        }));
    }
    /**
     * @param {?=} revoke
     * @return {?}
     */
    signOut(revoke) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.onReady().then((/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                let signOutPromise;
                if (revoke) {
                    signOutPromise = this.auth2.disconnect();
                }
                else {
                    signOutPromise = this.auth2.signOut();
                }
                signOutPromise.then((/**
                 * @param {?} err
                 * @return {?}
                 */
                (err) => {
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
                (err) => {
                    reject(err);
                }));
            }));
        }));
    }
}
GoogleLoginProvider.PROVIDER_ID = 'GOOGLE';
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