import { IEntry } from '../types';

export const getReqType = (locations: IEntry): any =>
  locations ? locations.type : null;

export const getReqPriority = (locations: IEntry): any =>
  locations ? locations.priority : null;

export const getAuthorName = (locations: IEntry): any =>
  locations && locations.author.name ? locations.author.name : null;

export const getCategory = (locations: IEntry): any =>
  locations && locations.category ? locations.category : null;

export const getDistrict = (locations: IEntry): any =>
  locations && locations.location && locations.location.city
    ? locations.location.city
    : null;

export const getStatus = (locations: IEntry): any =>
  locations && locations.status && locations.status ? locations.status : null;

export const getSummary = (locations: IEntry): any =>
  locations && locations.summary ? locations.summary : null;

export const getOrganization = (locations: IEntry): any =>
  locations && locations.author && locations.author.orgnization
    ? locations.author.orgnization
    : null;

export const IsVerified = (locations: IEntry): any =>
  locations && locations.isVerified ? locations.isVerified : false;
