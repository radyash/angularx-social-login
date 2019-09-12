/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/user';
export class LinkedInLoginProvider extends BaseLoginProvider {
    /**
     * @param {?} clientId
     * @param {?=} authorize
     * @param {?=} lang
     * @param {?=} fields
     */
    constructor(clientId, authorize, lang, fields = 'id,first-name,last-name,email-address,picture-url') {
        super();
        this.clientId = clientId;
        this.authorize = authorize;
        this.lang = lang;
        this.fields = fields;
    }
    /**
     * @return {?}
     */
    initialize() {
        /** @type {?} */
        let inner_text = '';
        inner_text += 'api_key: ' + this.clientId + '\r\n';
        inner_text += 'authorize:' + (this.authorize ? 'true' : 'false') + '\r\n';
        inner_text += 'lang: ' + (this.lang ? this.lang : 'fr_FR') + '\r\n';
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.loadScript(LinkedInLoginProvider.PROVIDER_ID, '//platform.linkedin.com/in.js', (/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                let that = this;
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this._readyState.next(true);
                    resolve();
                }), 800);
            }), false, inner_text);
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
                if (IN.User.isAuthorized()) {
                    IN.API.Raw(`/people/~:(${this.fields})`).result((/**
                     * @param {?} res
                     * @return {?}
                     */
                    (res) => {
                        /** @type {?} */
                        let user = new SocialUser();
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
    }
    /**
     * @return {?}
     */
    signIn() {
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
                IN.User.authorize((/**
                 * @return {?}
                 */
                () => {
                    IN.API.Raw(`/people/~:(${this.fields})`).result((/**
                     * @param {?} res
                     * @return {?}
                     */
                    (res) => {
                        /** @type {?} */
                        let user = new SocialUser();
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
                IN.User.logout((/**
                 * @return {?}
                 */
                () => {
                    resolve();
                }), {});
            }));
        }));
    }
}
LinkedInLoginProvider.PROVIDER_ID = 'LINKEDIN';
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