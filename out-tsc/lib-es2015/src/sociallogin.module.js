/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, AuthServiceConfig } from './auth.service';
/**
 * @param {?} config
 * @return {?}
 */
export function configFactory(config) {
    return config;
}
export class SocialLoginModule {
    /**
     * @param {?} config
     * @return {?}
     */
    static initialize(config) {
        return {
            ngModule: SocialLoginModule,
            providers: [
                AuthService,
                {
                    provide: AuthServiceConfig,
                    useValue: config
                }
            ]
        };
    }
}
SocialLoginModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                providers: [
                    AuthService
                ]
            },] },
];
//# sourceMappingURL=sociallogin.module.js.map