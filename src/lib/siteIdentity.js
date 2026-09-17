import { CONFIG } from './config.js';

const root = `${CONFIG.website}/`;

export const SITE_IDENTITY = {
    projectId: `${root}#project`,
    websiteId: `${root}#website`,
    maintainerId: `${root}about/#maintainer`,
    repository: 'https://github.com/CH563/shot-easy-website',
    issues: 'https://github.com/CH563/shot-easy-website/issues',
    maintainerProfile: 'https://github.com/CH563',
    socialProfile: 'https://twitter.com/LiWen563',
    updatedDate: '2026-09-17'
};

export const siteGraph = [
    {
        '@type': 'Organization',
        '@id': SITE_IDENTITY.projectId,
        name: 'ShotEasy',
        description: 'The open-source ShotEasy browser tools project.',
        url: root,
        logo: `${root}favicon.svg`,
        sameAs: [SITE_IDENTITY.repository],
        member: { '@id': SITE_IDENTITY.maintainerId }
    },
    {
        '@type': 'Person',
        '@id': SITE_IDENTITY.maintainerId,
        name: 'CH563',
        url: SITE_IDENTITY.maintainerProfile
    },
    {
        '@type': 'WebSite',
        '@id': SITE_IDENTITY.websiteId,
        name: 'ShotEasy',
        url: root,
        publisher: { '@id': SITE_IDENTITY.projectId },
        about: { '@id': SITE_IDENTITY.projectId }
    }
];

// Prevent user-authored article metadata from closing a JSON-LD script tag.
export const serializeJsonLd = value => JSON.stringify(value).replace(/</g, '\\u003c');
