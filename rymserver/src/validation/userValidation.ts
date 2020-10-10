import express, { Request } from 'express';
import Joi from 'joi';

export const registerValidation: any = Joi.object({
        username: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'cl', 'es', 'org'] } }),

        firstName: Joi.string()
            .alphanum()
            .min(3)
            .max(20)
            .required(),

        lastName: Joi.string()
            .alphanum()
            .min(3)
            .max(20)
            .required(),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'cl', 'es', 'org'] } }),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

        repeat_password: Joi.ref('password'),

        access_token: [
            Joi.string(),
            Joi.number()
        ]
    })
    .with('firstName', 'lastName')
    .xor('password', 'access_token')
    .with('password', 'repeat_password')



