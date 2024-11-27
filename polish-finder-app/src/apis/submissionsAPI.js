/**
 * @author Valeria Molina Recinos
 */

import axiosInstance from '@/utils/axios';
import config from '@/config';

const SERVER = config.SERVER;

/**
 * This is a protected endpoint
 * @param {*} firstPolishId
 * @param {*} secondPolishId
 * @returns
 */
export async function submitDupe(firstPolishId, secondPolishId) {
    try {
        const response = await axiosInstancet.post(`/submit/dupe`, {
            polishId: firstPolishId,
            dupeId: secondPolishId,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

/**
 * This is a protected endpoint
 * @returns
 */
export async function getDupeSubmissions() {
    try {
        const response = await axiosInstance.get('/submissions/dupes');
        return response.data;
    } catch (error) {
        throw error;
    }
}
