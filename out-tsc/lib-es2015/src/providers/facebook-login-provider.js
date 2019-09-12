/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/user';
export class FacebookLoginProvider extends BaseLoginProvider {
    /**
     * @param {?} clientId
     * @param {?=} opt
     * @param {?=} locale
     * @param {?=} fields
     * @param {?=} version
     */
    constructor(clientId, opt = { scope: 'email,public_profile' }, locale = 'en_US', fields = 'name,email,picture,first_name,last_name', version = 'v2.9') {
        super();
        this.clientId = clientId;
        this.opt = opt;
        this.locale = locale;
        this.fields = fields;
        this.version = version;
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
            this.loadScript(FacebookLoginProvider.PROVIDER_ID, `//connect.facebook.net/${this.locale}/sdk.js`, (/**
             * @return {?}
             */
            () => {
                FB.init({
                    appId: this.clientId,
                    autoLogAppEvents: true,
                    cookie: true,
                    xfbml: true,
                    version: this.version
                });
                // FB.AppEvents.logPageView(); #FIX for #18
                this._readyState.next(true);
                resolve();
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
                FB.getLoginStatus((/**
                 * @param {?} response
                 * @return {?}
                 */
                (response) => {
                    if (response.status === 'connected') {
                        /** @type {?} */
                        let authResponse = response.authResponse;
                        FB.api(`/me?fields=${this.fields}`, (/**
                         * @param {?} fbUser
                         * @return {?}
                         */
                        (fbUser) => {
                            /** @type {?} */
                            let user = new SocialUser();
                            user.id = fbUser.id;
                            user.name = fbUser.name;
                            user.email = fbUser.email;
                            user.photoUrl = 'https://graph.facebook.com/' + fbUser.id + '/picture?type=normal';
                            user.firstName = fbUser.first_name;
                            user.lastName = fbUser.last_name;
                            user.authToken = authResponse.accessToken;
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
                FB.login((/**
                 * @param {?} response
                 * @return {?}
                 */
                (response) => {
                    if (response.authResponse) {
                        /** @type {?} */
                        let authResponse = response.authResponse;
                        FB.api(`/me?fields=${this.fields}`, (/**
                         * @param {?} fbUser
                         * @return {?}
                         */
                        (fbUser) => {
                            /** @type {?} */
                            let user = new SocialUser();
                            user.id = fbUser.id;
                            user.name = fbUser.name;
                            user.email = fbUser.email;
                            user.photoUrl = 'https://graph.facebook.com/' + fbUser.id + '/picture?type=normal';
                            user.firstName = fbUser.first_name;
                            user.lastName = fbUser.last_name;
                            user.authToken = authResponse.accessToken;
                            user.facebook = fbUser;
                            resolve(user);
                        }));
                    }
                    else {
                        reject('User cancelled login or did not fully authorize.');
                    }
                }), this.opt);
            }));
        }));
    }
    /**
     * @return {?}
     */
    signOut() {
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
                FB.logout((/**
                 * @param {?} response
                 * @return {?}
                 */
                (response) => {
                    resolve();
                }));
            }));
        }));
    }
}
FacebookLoginProvider.PROVIDER_ID = 'FACEBOOK';
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